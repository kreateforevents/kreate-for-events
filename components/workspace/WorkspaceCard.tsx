'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, ArrowRight, Briefcase } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { formatRelativeTime } from '@/lib/utils/formatters'

interface WorkspaceCardProps {
  workspace: {
    id: string
    name: string
    description: string | null
    created_at: string
    role: string
  }
  onDelete: (id: string) => void
}

export default function WorkspaceCard({ workspace, onDelete }: WorkspaceCardProps) {
  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(workspace.id)
    setIsDeleting(false)
    setShowDelete(false)
  }

  return (
    <>
      <Card hoverable className="flex flex-col">
        <Card.Body className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary-600" />
            </div>
            <Badge variant={workspace.role === 'owner' ? 'primary' : 'default'}>
              {workspace.role}
            </Badge>
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">{workspace.name}</h3>
          {workspace.description && (
            <p className="text-sm text-neutral-500 line-clamp-2">{workspace.description}</p>
          )}
          <p className="text-xs text-neutral-400 mt-3">
            Created {formatRelativeTime(workspace.created_at)}
          </p>
        </Card.Body>
        <Card.Footer className="justify-between">
          {workspace.role === 'owner' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); setShowDelete(true) }}
              className="text-error-500 hover:text-error-600 hover:bg-error-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => router.push(`/workspace/${workspace.id}`)}
            className="ml-auto"
          >
            Open
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card.Footer>
      </Card>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Workspace"
        description={`Are you sure you want to delete "${workspace.name}"? This will permanently delete all members, scripts, and videos.`}
        isLoading={isDeleting}
      />
    </>
  )
}
