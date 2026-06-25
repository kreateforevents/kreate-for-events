import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import { formatDateTime } from '@/lib/utils/formatters'
import { Activity } from 'lucide-react'

const actionLabels: Record<string, string> = {
  created: 'Created',
  updated: 'Updated',
  deleted: 'Deleted',
  published: 'Published',
  uploaded: 'Uploaded',
  added_member: 'Added member',
  removed_member: 'Removed member',
  updated_member_role: 'Updated role of',
}

const entityColors: Record<string, string> = {
  workspace: 'bg-blue-100 text-blue-700',
  script: 'bg-purple-100 text-purple-700',
  video: 'bg-pink-100 text-pink-700',
  event: 'bg-orange-100 text-orange-700',
  member: 'bg-green-100 text-green-700',
}

export default async function ActivityPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: logs } = await (supabase as any)
    .from('activity_logs')
    .select('*, profiles!activity_logs_user_id_fkey(full_name, email, avatar_url)')
    .eq('workspace_id', params.id)
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Activity Log</h1>
        <p className="text-sm text-neutral-500 mt-0.5">All actions in this workspace</p>
      </div>

      {(logs ?? []).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">No activity yet</h3>
          <p className="text-sm text-neutral-500 mt-1">Activity will appear here as your team works.</p>
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-neutral-100">
            {(logs ?? []).map((log: any) => (
              <div key={log.id} className="flex items-start gap-4 px-6 py-4">
                <Avatar name={log.profiles?.full_name ?? log.profiles?.email ?? 'U'} src={log.profiles?.avatar_url} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-neutral-900">{log.profiles?.full_name ?? log.profiles?.email ?? 'Unknown'}</span>
                    <span className="text-neutral-500 text-sm">{actionLabels[log.action] ?? log.action}</span>
                    {log.entity_name && <span className="font-medium text-neutral-700 text-sm">{log.entity_name}</span>}
                    {log.entity_type && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${entityColors[log.entity_type] ?? 'bg-neutral-100 text-neutral-700'}`}>
                        {log.entity_type}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{formatDateTime(log.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
