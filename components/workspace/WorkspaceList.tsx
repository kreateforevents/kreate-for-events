'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Plus, Briefcase } from 'lucide-react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/shared/EmptyState'
import WorkspaceCard from './WorkspaceCard'
import WorkspaceFormModal from './WorkspaceFormModal'
import { createWorkspace, deleteWorkspace } from '@/lib/services/workspaceService'

interface Workspace {
  id: string
  name: string
  description: string | null
  owner_id: string
  created_at: string
  role: string
}

interface WorkspaceListProps {
  workspaces: Workspace[]
  userId: string
}

export default function WorkspaceList({ workspaces: initial, userId }: WorkspaceListProps) {
  const [workspaces, setWorkspaces] = useState(initial)
  const [showCreate, setShowCreate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleCreate = async (data: { name: string; description?: string }) => {
    setIsCreating(true)
    try {
      const ws = await createWorkspace(data, userId) as any
      setWorkspaces((prev) => [{ ...(ws ?? {}), role: 'owner' }, ...prev])
      setShowCreate(false)
      toast.success('Workspace created!')
      router.push(`/workspace/${ws.id}`)
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to create workspace')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId, userId)
      setWorkspaces((prev) => prev.filter((w) => w.id !== workspaceId))
      toast.success('Workspace deleted')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to delete workspace')
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" />
          New Workspace
        </Button>
      </div>

      {workspaces.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No workspaces yet"
          description="Create your first workspace to start organizing your event marketing team."
          action={{ label: 'Create Workspace', onClick: () => setShowCreate(true) }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              workspace={ws}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <WorkspaceFormModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  )
}
