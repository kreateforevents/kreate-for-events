export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          owner_id?: string
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          id: string
          workspace_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          responsibilities: string | null
          supplies: string[] | null
          instagram_handle: string | null
          youtube_handle: string | null
          linkedin_handle: string | null
          x_handle: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          responsibilities?: string | null
          supplies?: string[] | null
          instagram_handle?: string | null
          youtube_handle?: string | null
          linkedin_handle?: string | null
          x_handle?: string | null
          joined_at?: string
        }
        Update: {
          role?: 'owner' | 'admin' | 'member'
          responsibilities?: string | null
          supplies?: string[] | null
          instagram_handle?: string | null
          youtube_handle?: string | null
          linkedin_handle?: string | null
          x_handle?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          workspace_id: string
          name: string
          description: string | null
          event_date: string | null
          location: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          description?: string | null
          event_date?: string | null
          location?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          event_date?: string | null
          location?: string | null
          updated_at?: string
        }
      }
      scripts: {
        Row: {
          id: string
          workspace_id: string
          title: string
          content: string | null
          status: 'draft' | 'approved' | 'published'
          assigned_to: string | null
          event_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          title: string
          content?: string | null
          status?: 'draft' | 'approved' | 'published'
          assigned_to?: string | null
          event_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string | null
          status?: 'draft' | 'approved' | 'published'
          assigned_to?: string | null
          event_id?: string | null
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          workspace_id: string
          title: string
          description: string | null
          file_url: string | null
          thumbnail_url: string | null
          file_size: number | null
          platforms: string[]
          status: 'uploading' | 'ready' | 'published' | 'failed'
          hashtags: string | null
          uploaded_by: string
          event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          title: string
          description?: string | null
          file_url?: string | null
          thumbnail_url?: string | null
          file_size?: number | null
          platforms?: string[]
          status?: 'uploading' | 'ready' | 'published' | 'failed'
          hashtags?: string | null
          uploaded_by: string
          event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          file_url?: string | null
          thumbnail_url?: string | null
          platforms?: string[]
          status?: 'uploading' | 'ready' | 'published' | 'failed'
          hashtags?: string | null
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          workspace_id: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string | null
          entity_name: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          user_id: string
          action: string
          entity_type: string
          entity_id?: string | null
          entity_name?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: never
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Workspace = Tables<'workspaces'>
export type WorkspaceMember = Tables<'workspace_members'>
export type Profile = Tables<'profiles'>
export type Event = Tables<'events'>
export type Script = Tables<'scripts'>
export type Video = Tables<'videos'>
export type ActivityLog = Tables<'activity_logs'>

export type MemberRole = 'owner' | 'admin' | 'member'
export type ScriptStatus = 'draft' | 'approved' | 'published'
export type VideoStatus = 'uploading' | 'ready' | 'published' | 'failed'
export type Platform = 'instagram' | 'youtube' | 'linkedin' | 'x'

export interface WorkspaceMemberWithProfile extends WorkspaceMember {
  profiles: Profile
}

export interface ScriptWithAssignee extends Script {
  profiles: Profile | null
}

export interface VideoWithUploader extends Video {
  profiles: Profile
}
