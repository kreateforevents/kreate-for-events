import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/types/database'
import type { EventFormData } from '@/lib/utils/validators'

export async function getEvents(workspaceId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('events')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('event_date', { ascending: true })

  if (error) throw error
  return (data ?? []) as Event[]
}

export async function createEvent(workspaceId: string, formData: EventFormData, userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('events')
    .insert({
      workspace_id: workspaceId,
      name: formData.name,
      description: formData.description,
      event_date: formData.event_date || null,
      location: formData.location,
      created_by: userId,
    })
    .select()
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'created',
    entity_type: 'event',
    entity_id: data.id,
    entity_name: data.name,
  })

  return data as Event
}

export async function updateEvent(eventId: string, workspaceId: string, formData: EventFormData, _userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('events')
    .update({
      name: formData.name,
      description: formData.description,
      event_date: formData.event_date || null,
      location: formData.location,
      updated_at: new Date().toISOString(),
    })
    .eq('id', eventId)
    .select()
    .single()

  if (error) throw error
  return data as Event
}

export async function deleteEvent(eventId: string, workspaceId: string, userId: string, eventName: string) {
  const supabase = createClient()
  const { error } = await (supabase as any).from('events').delete().eq('id', eventId)
  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'deleted',
    entity_type: 'event',
    entity_id: eventId,
    entity_name: eventName,
  })
}
