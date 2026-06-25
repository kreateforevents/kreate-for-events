import { createClient } from '@/lib/supabase/client'

export async function getActivityLogs(workspaceId: string, limit = 20) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('activity_logs')
    .select('*, profiles!activity_logs_user_id_fkey(id, full_name, email, avatar_url)')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as any[]
}

export async function getRecentActivity(workspaceId: string) {
  return getActivityLogs(workspaceId, 10)
}
