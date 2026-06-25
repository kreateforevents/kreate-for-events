import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EventsClient from './EventsClient'

export default async function EventsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('workspace_id', params.id)
    .order('event_date', { ascending: true })

  return <EventsClient workspaceId={params.id} initialEvents={events ?? []} currentUserId={user.id} />
}
