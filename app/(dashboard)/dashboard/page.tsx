import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import WorkspaceList from '@/components/workspace/WorkspaceList'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: memberships } = await (supabase as any)
    .from('workspace_members')
    .select('role, workspaces(*)')
    .eq('user_id', user.id)
    .order('joined_at', { ascending: false })

  const workspaces = ((memberships ?? []) as any[])
    .map((m: any) => ({ ...m.workspaces, role: m.role }))
    .filter(Boolean)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">My Workspaces</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your event marketing teams</p>
      </div>
      <WorkspaceList workspaces={workspaces} userId={user.id} />
    </div>
  )
}
