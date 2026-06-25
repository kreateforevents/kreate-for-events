'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EmptyState from '@/components/shared/EmptyState'
import { addMember, removeMember, updateMemberRole, updateMemberProfile } from '@/lib/services/memberService'
import { ROLES, ROLE_COLORS } from '@/lib/utils/constants'
import { formatDate } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/helpers'

interface Member {
  id: string
  user_id: string
  role: string
  joined_at: string
  responsibilities: string | null
  instagram_handle: string | null
  youtube_handle: string | null
  linkedin_handle: string | null
  x_handle: string | null
  supplies: string[] | null
  profiles: {
    id: string
    full_name: string | null
    email: string
    avatar_url: string | null
  }
}

interface MembersClientProps {
  workspaceId: string
  initialMembers: Member[]
  currentUserId: string
  currentUserRole: string
}

export default function MembersClient({ workspaceId, initialMembers, currentUserId, currentUserRole }: MembersClientProps) {
  const [members, setMembers] = useState(initialMembers)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState<Member | null>(null)
  const [showRemove, setShowRemove] = useState<Member | null>(null)
  const [addEmail, setAddEmail] = useState('')
  const [addRole, setAddRole] = useState<'owner' | 'admin' | 'member'>('member')
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin'

  const handleAdd = async () => {
    if (!addEmail.trim()) return
    setIsAdding(true)
    try {
      const newMember = await addMember(workspaceId, addEmail.trim(), addRole, currentUserId)
      setMembers((prev) => [...prev, newMember as any])
      setShowAdd(false)
      setAddEmail('')
      setAddRole('member')
      toast.success('Member added!')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to add member')
    } finally {
      setIsAdding(false)
    }
  }

  const handleRoleChange = async (memberId: string, role: string) => {
    try {
      await updateMemberRole(memberId, role as any, workspaceId, currentUserId)
      setMembers((prev) => prev.map((m) => m.id === memberId ? { ...m, role } : m))
      toast.success('Role updated')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to update role')
    }
  }

  const handleRemove = async () => {
    if (!showRemove) return
    setIsRemoving(true)
    try {
      await removeMember(showRemove.id, workspaceId, currentUserId)
      setMembers((prev) => prev.filter((m) => m.id !== showRemove.id))
      setShowRemove(null)
      toast.success('Member removed')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to remove member')
    } finally {
      setIsRemoving(false)
    }
  }

  const [editForm, setEditForm] = useState({ responsibilities: '', instagram_handle: '', youtube_handle: '', linkedin_handle: '', x_handle: '' })

  const openEdit = (member: Member) => {
    setEditForm({
      responsibilities: member.responsibilities ?? '',
      instagram_handle: member.instagram_handle ?? '',
      youtube_handle: member.youtube_handle ?? '',
      linkedin_handle: member.linkedin_handle ?? '',
      x_handle: member.x_handle ?? '',
    })
    setShowEdit(member)
  }

  const handleSaveEdit = async () => {
    if (!showEdit) return
    setIsSaving(true)
    try {
      await updateMemberProfile(showEdit.id, editForm)
      setMembers((prev) => prev.map((m) => m.id === showEdit.id ? { ...m, ...editForm } : m))
      setShowEdit(null)
      toast.success('Profile updated')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Team Members</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        {canManage && (
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" /> Add Member
          </Button>
        )}
      </div>

      {members.length === 0 ? (
        <EmptyState icon={Users} title="No members yet" description="Add team members by their email address." action={canManage ? { label: 'Add Member', onClick: () => setShowAdd(true) } : undefined} />
      ) : (
        <Card>
          <div className="divide-y divide-neutral-100">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-4 px-6 py-4">
                <Avatar name={member.profiles?.full_name ?? 'U'} src={member.profiles?.avatar_url} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{member.profiles?.full_name ?? 'Unknown'}</p>
                  <p className="text-sm text-neutral-500 truncate">{member.profiles?.email}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Joined {formatDate(member.joined_at)}</p>
                </div>
                <div className="flex items-center gap-3">
                  {canManage && member.user_id !== currentUserId ? (
                    <Select
                      options={ROLES.map((r) => ({ value: r.id, label: r.label }))}
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="w-32"
                    />
                  ) : (
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', ROLE_COLORS[member.role] ?? 'bg-neutral-100 text-neutral-700')}>
                      {member.role}
                    </span>
                  )}
                  <Button variant="secondary" size="sm" onClick={() => openEdit(member)}>Edit</Button>
                  {canManage && member.user_id !== currentUserId && (
                    <Button variant="ghost" size="sm" className="text-error-500 hover:text-error-600 hover:bg-error-50" onClick={() => setShowRemove(member)}>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Member Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Team Member" size="sm">
        <ModalBody className="flex flex-col gap-4">
          <Input label="Email address" type="email" placeholder="teammate@example.com" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} />
          <Select label="Role" options={ROLES.map((r) => ({ value: r.id, label: r.label }))} value={addRole} onChange={(e) => setAddRole(e.target.value as any)} />
          <p className="text-xs text-neutral-500">The user must already have a Kreate account.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowAdd(false)} disabled={isAdding}>Cancel</Button>
          <Button onClick={handleAdd} isLoading={isAdding}>Add Member</Button>
        </ModalFooter>
      </Modal>

      {/* Edit Member Modal */}
      <Modal isOpen={!!showEdit} onClose={() => setShowEdit(null)} title="Member Details" size="md">
        <ModalBody className="flex flex-col gap-4">
          {showEdit && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                <Avatar name={showEdit.profiles?.full_name ?? 'U'} src={showEdit.profiles?.avatar_url} size="md" />
                <div>
                  <p className="font-semibold text-neutral-900">{showEdit.profiles?.full_name}</p>
                  <p className="text-sm text-neutral-500">{showEdit.profiles?.email}</p>
                </div>
              </div>
              <Textarea label="Responsibilities" placeholder="What does this person do?" value={editForm.responsibilities} onChange={(e) => setEditForm((f) => ({ ...f, responsibilities: e.target.value }))} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Instagram" placeholder="@handle" value={editForm.instagram_handle} onChange={(e) => setEditForm((f) => ({ ...f, instagram_handle: e.target.value }))} />
                <Input label="YouTube" placeholder="@handle" value={editForm.youtube_handle} onChange={(e) => setEditForm((f) => ({ ...f, youtube_handle: e.target.value }))} />
                <Input label="LinkedIn" placeholder="username" value={editForm.linkedin_handle} onChange={(e) => setEditForm((f) => ({ ...f, linkedin_handle: e.target.value }))} />
                <Input label="X (Twitter)" placeholder="@handle" value={editForm.x_handle} onChange={(e) => setEditForm((f) => ({ ...f, x_handle: e.target.value }))} />
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowEdit(null)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSaveEdit} isLoading={isSaving}>Save Changes</Button>
        </ModalFooter>
      </Modal>

      {/* Remove Confirm */}
      <ConfirmDialog
        isOpen={!!showRemove}
        onClose={() => setShowRemove(null)}
        onConfirm={handleRemove}
        title="Remove Member"
        description={`Remove ${showRemove?.profiles?.full_name ?? 'this member'} from the workspace?`}
        confirmLabel="Remove"
        isLoading={isRemoving}
      />
    </div>
  )
}
