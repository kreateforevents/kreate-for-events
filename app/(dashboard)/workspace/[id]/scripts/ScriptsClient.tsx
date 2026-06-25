'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, FileText, Search, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/shared/EmptyState'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Avatar from '@/components/ui/Avatar'
import { createScript, updateScript, deleteScript } from '@/lib/services/scriptService'
import { SCRIPT_STATUSES } from '@/lib/utils/constants'
import { formatRelativeTime } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/helpers'

const statusBadge: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-700',
  approved: 'bg-blue-100 text-blue-700',
  published: 'bg-success-100 text-success-700',
}

interface Script {
  id: string
  title: string
  content: string | null
  status: 'draft' | 'approved' | 'published'
  assigned_to: string | null
  updated_at: string
  created_at: string
  profiles: { id: string; full_name: string | null; avatar_url: string | null } | null
}

interface MemberProfile {
  id: string
  full_name: string | null
  email: string
}

interface ScriptsClientProps {
  workspaceId: string
  initialScripts: Script[]
  members: MemberProfile[]
  currentUserId: string
}

const emptyForm = { title: '', content: '', status: 'draft' as 'draft' | 'approved' | 'published', assigned_to: '', event_id: '' }

export default function ScriptsClient({ workspaceId, initialScripts, members, currentUserId }: ScriptsClientProps) {
  const [scripts, setScripts] = useState(initialScripts)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Script | null>(null)
  const [deleting, setDeleting] = useState<Script | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const filtered = scripts.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || s.status === statusFilter
    return matchSearch && matchStatus
  })

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (s: Script) => {
    setForm({ title: s.title, content: s.content ?? '', status: s.status, assigned_to: s.assigned_to ?? '', event_id: '' })
    setEditing(s)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setIsSaving(true)
    try {
      if (editing) {
        const updated = await updateScript(editing.id, workspaceId, form as any, currentUserId) as any
        setScripts((prev) => prev.map((s) => s.id === editing.id ? { ...s, ...(updated ?? {}), profiles: members.find((m) => m.id === updated?.assigned_to) ?? null } : s))
        toast.success('Script updated')
      } else {
        const created = await createScript(workspaceId, form as any, currentUserId) as any
        const profile = members.find((m) => m.id === created?.assigned_to)
        setScripts((prev) => [{ ...(created ?? {}), profiles: profile ?? null } as Script, ...prev])
        toast.success('Script created')
      }
      setShowForm(false)
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to save script')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setIsDeleting(true)
    try {
      await deleteScript(deleting.id, workspaceId, currentUserId, deleting.title)
      setScripts((prev) => prev.filter((s) => s.id !== deleting.id))
      setDeleting(null)
      toast.success('Script deleted')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to delete script')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Scripts</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{scripts.length} script{scripts.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> New Script</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            className="w-full h-10 pl-9 pr-3 text-sm border border-neutral-200 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          options={[{ value: '', label: 'All statuses' }, ...SCRIPT_STATUSES.map((s) => ({ value: s.id, label: s.label }))]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-40"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No scripts found" description={search || statusFilter ? 'Try clearing your filters.' : 'Create your first script to get started.'} action={!search && !statusFilter ? { label: 'New Script', onClick: openCreate } : undefined} />
      ) : (
        <Card>
          <div className="divide-y divide-neutral-100">
            {filtered.map((script) => (
              <div key={script.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-neutral-900 truncate">{script.title}</p>
                    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', statusBadge[script.status])}>
                      {script.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {script.profiles && (
                      <div className="flex items-center gap-1.5">
                        <Avatar name={script.profiles.full_name ?? 'U'} src={script.profiles.avatar_url} size="sm" />
                        <span className="text-xs text-neutral-500">{script.profiles.full_name}</span>
                      </div>
                    )}
                    <span className="text-xs text-neutral-400">Updated {formatRelativeTime(script.updated_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(script)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-error-500 hover:bg-error-50" onClick={() => setDeleting(script)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Script Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Script' : 'New Script'} size="lg">
        <ModalBody className="flex flex-col gap-4">
          <Input label="Title" placeholder="Script title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Status"
              options={SCRIPT_STATUSES.map((s) => ({ value: s.id, label: s.label }))}
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
            />
            <Select
              label="Assign To"
              options={[{ value: '', label: 'Unassigned' }, ...members.map((m) => ({ value: m.id, label: m.full_name ?? m.email }))]}
              value={form.assigned_to}
              onChange={(e) => setForm((f) => ({ ...f, assigned_to: e.target.value }))}
            />
          </div>
          <Textarea
            label="Content"
            placeholder="Write your script here..."
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={12}
            className="font-mono text-sm"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowForm(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} isLoading={isSaving}>{editing ? 'Save Changes' : 'Create Script'}</Button>
        </ModalFooter>
      </Modal>

      <ConfirmDialog isOpen={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} title="Delete Script" description={`Delete "${deleting?.title}"? This cannot be undone.`} isLoading={isDeleting} />
    </div>
  )
}
