import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsClient from './SettingsClient'

export default async function SettingsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: workspace }, { data: membership }] = await Promise.all([
    (supabase as any).from('workspaces').select('*').eq('id', params.id).single(),
    (supabase as any).from('workspace_members').select('role').eq('workspace_id', params.id).eq('user_id', user.id).single(),
  ])

  if (!workspace) redirect('/dashboard')

  return (
    <SettingsClient
      workspace={workspace}
      currentUserId={user.id}
      currentUserRole={membership?.role ?? 'member'}
    />
  )
}
