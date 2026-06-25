import { createClient } from '@/lib/supabase/client'
import type { Workspace } from '@/types/database'
import type { WorkspaceFormData } from '@/lib/utils/validators'

export async function getWorkspaces(userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('workspace_members')
    .select('workspaces(*)')
    .eq('user_id', userId)
    .order('joined_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((item: any) => item.workspaces).filter(Boolean) as Workspace[]
}

export async function getWorkspace(workspaceId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single()

  if (error) throw error
  return data as Workspace
}

export async function createWorkspace(data: WorkspaceFormData, userId: string) {
  const supabase = createClient()

  const { data: workspace, error: wsError } = await (supabase as any)
    .from('workspaces')
    .insert({ name: data.name, description: data.description, owner_id: userId })
    .select()
    .single()

  if (wsError) throw wsError

  const { error: memberError } = await (supabase as any)
    .from('workspace_members')
    .insert({ workspace_id: workspace.id, user_id: userId, role: 'owner' })

  if (memberError) throw memberError

  await logActivity(workspace.id, userId, 'created', 'workspace', workspace.id, workspace.name)

  return workspace as Workspace
}

export async function updateWorkspace(workspaceId: string, data: WorkspaceFormData, userId: string) {
  const supabase = createClient()
  const { data: workspace, error } = await (supabase as any)
    .from('workspaces')
    .update({ name: data.name, description: data.description, updated_at: new Date().toISOString() })
    .eq('id', workspaceId)
    .select()
    .single()

  if (error) throw error
  await logActivity(workspaceId, userId, 'updated', 'workspace', workspaceId, workspace.name)
  return workspace as Workspace
}

export async function deleteWorkspace(workspaceId: string, _userId: string) {
  const supabase = createClient()
  const { error } = await (supabase as any)
    .from('workspaces')
    .delete()
    .eq('id', workspaceId)

  if (error) throw error
}

export async function getWorkspaceStats(workspaceId: string) {
  const supabase = createClient()
  const [membersResult, scriptsResult, videosResult, eventsResult] = await Promise.all([
    (supabase as any).from('workspace_members').select('id', { count: 'exact' }).eq('workspace_id', workspaceId),
    (supabase as any).from('scripts').select('id', { count: 'exact' }).eq('workspace_id', workspaceId),
    (supabase as any).from('videos').select('id', { count: 'exact' }).eq('workspace_id', workspaceId),
    (supabase as any).from('events').select('id', { count: 'exact' }).eq('workspace_id', workspaceId),
  ])

  return {
    memberCount: membersResult.count ?? 0,
    scriptCount: scriptsResult.count ?? 0,
    videoCount: videosResult.count ?? 0,
    eventCount: eventsResult.count ?? 0,
  }
}

async function logActivity(
  workspaceId: string,
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  entityName: string
) {
  const supabase = createClient()
  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    entity_name: entityName,
  })
}
