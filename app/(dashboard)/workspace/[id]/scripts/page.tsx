import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ScriptsClient from './ScriptsClient'

export default async function ScriptsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const sb = supabase as any
  const [{ data: scripts }, { data: members }] = await Promise.all([
    sb
      .from('scripts')
      .select('*, profiles!scripts_assigned_to_fkey(id, full_name, email, avatar_url)')
      .eq('workspace_id', params.id)
      .order('updated_at', { ascending: false }),
    sb
      .from('workspace_members')
      .select('profiles(id, full_name, email)')
      .eq('workspace_id', params.id),
  ])

  const memberProfiles = (members ?? []).map((m: any) => m.profiles).filter(Boolean)

  return (
    <ScriptsClient
      workspaceId={params.id}
      initialScripts={scripts ?? []}
      members={memberProfiles}
      currentUserId={user.id}
    />
  )
}
