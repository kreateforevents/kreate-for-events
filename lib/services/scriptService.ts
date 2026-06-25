import { createClient } from '@/lib/supabase/client'
import type { Script } from '@/types/database'
import type { ScriptFormData } from '@/lib/utils/validators'

export async function getScripts(workspaceId: string, status?: string) {
  const supabase = createClient()
  let query = (supabase as any)
    .from('scripts')
    .select('*, profiles!scripts_assigned_to_fkey(id, full_name, email, avatar_url)')
    .eq('workspace_id', workspaceId)
    .order('updated_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as any[]
}

export async function getScript(scriptId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('scripts')
    .select('*, profiles!scripts_assigned_to_fkey(id, full_name, email, avatar_url)')
    .eq('id', scriptId)
    .single()

  if (error) throw error
  return data
}

export async function createScript(workspaceId: string, formData: ScriptFormData, userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('scripts')
    .insert({
      workspace_id: workspaceId,
      title: formData.title,
      content: formData.content,
      status: formData.status,
      assigned_to: formData.assigned_to || null,
      event_id: formData.event_id || null,
      created_by: userId,
    })
    .select()
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'created',
    entity_type: 'script',
    entity_id: data.id,
    entity_name: data.title,
  })

  return data as Script
}

export async function updateScript(scriptId: string, workspaceId: string, formData: ScriptFormData, userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('scripts')
    .update({
      title: formData.title,
      content: formData.content,
      status: formData.status,
      assigned_to: formData.assigned_to || null,
      event_id: formData.event_id || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', scriptId)
    .select()
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'updated',
    entity_type: 'script',
    entity_id: data.id,
    entity_name: data.title,
  })

  return data as Script
}

export async function deleteScript(scriptId: string, workspaceId: string, userId: string, scriptTitle: string) {
  const supabase = createClient()
  const { error } = await (supabase as any).from('scripts').delete().eq('id', scriptId)
  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'deleted',
    entity_type: 'script',
    entity_id: scriptId,
    entity_name: scriptTitle,
  })
}
