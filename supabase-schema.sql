-- ============================================================
-- KREATE FOR EVENTS — SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES TABLE (linked to auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- WORKSPACES TABLE
-- ============================================================
create table public.workspaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null check (char_length(name) <= 255),
  description text check (char_length(description) <= 500),
  logo_url text,
  owner_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.workspaces enable row level security;

create policy "Members can view workspace"
  on public.workspaces for select
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = workspaces.id and user_id = auth.uid()
    )
  );

create policy "Owners can update workspace"
  on public.workspaces for update
  using (owner_id = auth.uid());

create policy "Anyone authenticated can create workspace"
  on public.workspaces for insert
  with check (auth.uid() = owner_id);

create policy "Owners can delete workspace"
  on public.workspaces for delete
  using (owner_id = auth.uid());

-- ============================================================
-- WORKSPACE MEMBERS TABLE
-- ============================================================
create table public.workspace_members (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  responsibilities text,
  supplies text[],
  instagram_handle text,
  youtube_handle text,
  linkedin_handle text,
  x_handle text,
  joined_at timestamptz default now() not null,
  unique(workspace_id, user_id)
);

alter table public.workspace_members enable row level security;

create policy "Members can view workspace members"
  on public.workspace_members for select
  using (
    exists (
      select 1 from public.workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id and wm.user_id = auth.uid()
    )
  );

create policy "Owners and admins can manage members"
  on public.workspace_members for insert
  with check (
    exists (
      select 1 from public.workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('owner', 'admin')
    )
    or auth.uid() = user_id  -- allow self-insert (when creating workspace)
  );

create policy "Owners and admins can update members"
  on public.workspace_members for update
  using (
    exists (
      select 1 from public.workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('owner', 'admin')
    )
    or user_id = auth.uid()  -- members can edit own profile details
  );

create policy "Owners and admins can remove members"
  on public.workspace_members for delete
  using (
    exists (
      select 1 from public.workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id
        and wm.user_id = auth.uid()
        and wm.role in ('owner', 'admin')
    )
  );

-- ============================================================
-- EVENTS TABLE
-- ============================================================
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  name text not null,
  description text,
  event_date timestamptz,
  location text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.events enable row level security;

create policy "Members can view events"
  on public.events for select
  using (
    exists (select 1 from public.workspace_members where workspace_id = events.workspace_id and user_id = auth.uid())
  );

create policy "Members can manage events"
  on public.events for all
  using (
    exists (select 1 from public.workspace_members where workspace_id = events.workspace_id and user_id = auth.uid())
  );

-- ============================================================
-- SCRIPTS TABLE
-- ============================================================
create table public.scripts (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  title text not null,
  content text,
  status text not null default 'draft' check (status in ('draft', 'approved', 'published')),
  assigned_to uuid references auth.users(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.scripts enable row level security;

create policy "Members can view scripts"
  on public.scripts for select
  using (
    exists (select 1 from public.workspace_members where workspace_id = scripts.workspace_id and user_id = auth.uid())
  );

create policy "Members can manage scripts"
  on public.scripts for all
  using (
    exists (select 1 from public.workspace_members where workspace_id = scripts.workspace_id and user_id = auth.uid())
  );

-- ============================================================
-- VIDEOS TABLE
-- ============================================================
create table public.videos (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  title text not null,
  description text,
  file_url text,
  thumbnail_url text,
  file_size bigint,
  platforms text[] default '{}',
  status text not null default 'ready' check (status in ('uploading', 'ready', 'published', 'failed')),
  hashtags text,
  uploaded_by uuid references auth.users(id) on delete set null not null,
  event_id uuid references public.events(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.videos enable row level security;

create policy "Members can view videos"
  on public.videos for select
  using (
    exists (select 1 from public.workspace_members where workspace_id = videos.workspace_id and user_id = auth.uid())
  );

create policy "Members can manage videos"
  on public.videos for all
  using (
    exists (select 1 from public.workspace_members where workspace_id = videos.workspace_id and user_id = auth.uid())
  );

-- ============================================================
-- ACTIVITY LOGS TABLE
-- ============================================================
create table public.activity_logs (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null not null,
  action text not null,
  entity_type text not null,
  entity_id text,
  entity_name text,
  metadata jsonb,
  created_at timestamptz default now() not null
);

alter table public.activity_logs enable row level security;

create policy "Members can view activity logs"
  on public.activity_logs for select
  using (
    exists (select 1 from public.workspace_members where workspace_id = activity_logs.workspace_id and user_id = auth.uid())
  );

create policy "Members can insert activity logs"
  on public.activity_logs for insert
  with check (
    exists (select 1 from public.workspace_members where workspace_id = activity_logs.workspace_id and user_id = auth.uid())
  );

-- ============================================================
-- STORAGE BUCKET FOR VIDEOS
-- ============================================================
-- Run this separately or via Supabase dashboard:
-- insert into storage.buckets (id, name, public) values ('videos', 'videos', true);

-- create policy "Authenticated users can upload videos"
--   on storage.objects for insert
--   with check (bucket_id = 'videos' and auth.role() = 'authenticated');

-- create policy "Anyone can view videos"
--   on storage.objects for select
--   using (bucket_id = 'videos');

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
create index on public.workspace_members(workspace_id);
create index on public.workspace_members(user_id);
create index on public.scripts(workspace_id);
create index on public.scripts(status);
create index on public.videos(workspace_id);
create index on public.events(workspace_id);
create index on public.activity_logs(workspace_id);
create index on public.activity_logs(created_at desc);
