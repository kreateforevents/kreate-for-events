'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Copy, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { updateWorkspace, deleteWorkspace } from '@/lib/services/workspaceService'

interface Workspace {
  id: string
  name: string
  description: string | null
}

interface SettingsClientProps {
  workspace: Workspace
  currentUserId: string
  currentUserRole: string
}

export default function SettingsClient({ workspace, currentUserId, currentUserRole }: SettingsClientProps) {
  const router = useRouter()
  const isOwner = currentUserRole === 'owner'
  const [name, setName] = useState(workspace.name)
  const [description, setDescription] = useState(workspace.description ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSave = async () => {
    if (!name.trim()) { toast.error('Name is required'); return }
    setIsSaving(true)
    try {
      await updateWorkspace(workspace.id, { name, description }, currentUserId)
      toast.success('Settings saved')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteWorkspace(workspace.id, currentUserId)
      toast.success('Workspace deleted')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to delete workspace')
      setIsDeleting(false)
    }
  }

  const copyId = () => {
    navigator.clipboard.writeText(workspace.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Workspace Settings</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage your workspace configuration</p>
      </div>

      {/* General */}
      <Card>
        <Card.Header><h2 className="font-semibold text-neutral-900">General</h2></Card.Header>
        <Card.Body className="flex flex-col gap-4">
          <Input label="Workspace Name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isOwner} />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} disabled={!isOwner} />
          <div>
            <label className="text-sm font-semibold text-neutral-900 block mb-1.5">Workspace ID</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-neutral-600 font-mono truncate">{workspace.id}</code>
              <Button variant="secondary" size="sm" onClick={copyId}>
                {copied ? <Check className="h-4 w-4 text-success-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </Card.Body>
        {isOwner && (
          <Card.Footer>
            <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
          </Card.Footer>
        )}
      </Card>

      {/* Danger Zone */}
      {isOwner && (
        <Card className="border-error-200">
          <Card.Header><h2 className="font-semibold text-error-700">Danger Zone</h2></Card.Header>
          <Card.Body>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">Delete this workspace</p>
                <p className="text-sm text-neutral-500 mt-0.5">Permanently delete all data. This cannot be undone.</p>
              </div>
              <Button variant="danger" onClick={() => setShowDelete(true)}>Delete Workspace</Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Workspace"
        description={`Are you sure you want to delete "${workspace.name}"? All members, scripts, videos, and events will be permanently deleted.`}
        isLoading={isDeleting}
      />
    </div>
  )
}
