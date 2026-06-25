import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: workspace } = await (supabase as any)
    .from('workspaces')
    .select('id, name')
    .eq('id', params.id)
    .single()

  if (!workspace) notFound()

  const { data: membership } = await (supabase as any)
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!membership) redirect('/dashboard')

  const { data: profile } = await (supabase as any)
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  const userData = {
    email: user.email ?? '',
    full_name: profile?.full_name,
    avatar_url: profile?.avatar_url,
  }

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <Sidebar workspaceId={params.id} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header user={userData} title={workspace.name} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
