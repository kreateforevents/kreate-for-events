import { createClient } from '@/lib/supabase/client'
import type { MemberRole } from '@/types/database'

export async function getMembers(workspaceId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('workspace_members')
    .select('*, profiles(*)')
    .eq('workspace_id', workspaceId)
    .order('joined_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as any[]
}

export async function addMember(workspaceId: string, email: string, role: MemberRole, currentUserId: string) {
  const supabase = createClient()

  const { data: profile, error: profileError } = await (supabase as any)
    .from('profiles')
    .select('id, full_name, email')
    .eq('email', email)
    .single()

  if (profileError || !profile) {
    throw new Error('User not found. They must sign up first.')
  }

  const { data: existing } = await (supabase as any)
    .from('workspace_members')
    .select('id')
    .eq('workspace_id', workspaceId)
    .eq('user_id', profile.id)
    .single()

  if (existing) {
    throw new Error('This user is already a member of this workspace.')
  }

  const { data, error } = await (supabase as any)
    .from('workspace_members')
    .insert({ workspace_id: workspaceId, user_id: profile.id, role })
    .select('*, profiles(*)')
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: currentUserId,
    action: 'added_member',
    entity_type: 'member',
    entity_id: profile.id,
    entity_name: profile.full_name ?? email,
  })

  return data
}

export async function updateMemberRole(memberId: string, role: MemberRole, workspaceId: string, currentUserId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('workspace_members')
    .update({ role })
    .eq('id', memberId)
    .select('*, profiles(*)')
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: currentUserId,
    action: 'updated_member_role',
    entity_type: 'member',
    entity_id: memberId,
    entity_name: data?.profiles?.full_name ?? '',
  })

  return data
}

export async function updateMemberProfile(
  memberId: string,
  updates: {
    responsibilities?: string
    supplies?: string[]
    instagram_handle?: string
    youtube_handle?: string
    linkedin_handle?: string
    x_handle?: string
  }
) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('workspace_members')
    .update(updates)
    .eq('id', memberId)
    .select('*, profiles(*)')
    .single()

  if (error) throw error
  return data
}

export async function removeMember(memberId: string, workspaceId: string, currentUserId: string) {
  const supabase = createClient()

  const { data: member } = await (supabase as any)
    .from('workspace_members')
    .select('user_id, profiles(full_name)')
    .eq('id', memberId)
    .single()

  const { error } = await (supabase as any)
    .from('workspace_members')
    .delete()
    .eq('id', memberId)

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: currentUserId,
    action: 'removed_member',
    entity_type: 'member',
    entity_id: memberId,
    entity_name: member?.profiles?.full_name ?? '',
  })
}
