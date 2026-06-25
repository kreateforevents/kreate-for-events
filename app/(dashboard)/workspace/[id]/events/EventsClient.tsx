'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Calendar, MapPin, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import EmptyState from '@/components/shared/EmptyState'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { createEvent, updateEvent, deleteEvent } from '@/lib/services/eventService'
import { formatEventDate, formatRelativeTime } from '@/lib/utils/formatters'

interface Event {
  id: string
  name: string
  description: string | null
  event_date: string | null
  location: string | null
  created_at: string
}

interface EventsClientProps {
  workspaceId: string
  initialEvents: Event[]
  currentUserId: string
}

const emptyForm = { name: '', description: '', event_date: '', location: '' }

export default function EventsClient({ workspaceId, initialEvents, currentUserId }: EventsClientProps) {
  const [events, setEvents] = useState(initialEvents)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [deleting, setDeleting] = useState<Event | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (e: Event) => {
    setForm({ name: e.name, description: e.description ?? '', event_date: e.event_date?.slice(0, 10) ?? '', location: e.location ?? '' })
    setEditing(e); setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Event name is required'); return }
    setIsSaving(true)
    try {
      if (editing) {
        const updated = await updateEvent(editing.id, workspaceId, form as any, currentUserId) as any
        setEvents((prev) => prev.map((e) => e.id === editing.id ? { ...e, ...(updated ?? {}) } : e))
        toast.success('Event updated')
      } else {
        const created = await createEvent(workspaceId, form as any, currentUserId)
        setEvents((prev) => [created as Event, ...prev])
        toast.success('Event created')
      }
      setShowForm(false)
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to save event')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setIsDeleting(true)
    try {
      await deleteEvent(deleting.id, workspaceId, currentUserId, deleting.name)
      setEvents((prev) => prev.filter((e) => e.id !== deleting.id))
      setDeleting(null)
      toast.success('Event deleted')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to delete event')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Events</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{events.length} event{events.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> New Event</Button>
      </div>

      {events.length === 0 ? (
        <EmptyState icon={Calendar} title="No events yet" description="Create your first event to organize your content around it." action={{ label: 'New Event', onClick: openCreate }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <Card.Body className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(event)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-error-500 hover:bg-error-50" onClick={() => setDeleting(event)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{event.name}</h3>
                {event.description && <p className="text-sm text-neutral-500 line-clamp-2 mb-2">{event.description}</p>}
                {event.event_date && (
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                    {formatEventDate(event.event_date)}
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    {event.location}
                  </div>
                )}
                <p className="text-xs text-neutral-400 mt-3">Created {formatRelativeTime(event.created_at)}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Event' : 'New Event'} size="md">
        <ModalBody className="flex flex-col gap-4">
          <Input label="Event Name" placeholder="Product Launch Party" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Textarea label="Description" placeholder="What is this event about?" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" value={form.event_date} onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))} />
            <Input label="Location" placeholder="City or Venue" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowForm(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} isLoading={isSaving}>{editing ? 'Save Changes' : 'Create Event'}</Button>
        </ModalFooter>
      </Modal>

      <ConfirmDialog isOpen={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} title="Delete Event" description={`Delete "${deleting?.name}"?`} isLoading={isDeleting} />
    </div>
  )
}
