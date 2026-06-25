import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MembersClient from './MembersClient'

export default async function MembersPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await (supabase as any)
    .from('workspace_members')
    .select('role')
    .eq('workspace_id', params.id)
    .eq('user_id', user.id)
    .single()

  const { data: members } = await (supabase as any)
    .from('workspace_members')
    .select('*, profiles(*)')
    .eq('workspace_id', params.id)
    .order('joined_at', { ascending: true })

  return (
    <MembersClient
      workspaceId={params.id}
      initialMembers={members ?? []}
      currentUserId={user.id}
      currentUserRole={membership?.role ?? 'member'}
    />
  )
}
