'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { workspaceSchema, WorkspaceFormData } from '@/lib/utils/validators'

interface WorkspaceFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: WorkspaceFormData) => Promise<void>
  isLoading?: boolean
  defaultValues?: WorkspaceFormData
  title?: string
}

export default function WorkspaceFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  defaultValues,
  title = 'Create Workspace',
}: WorkspaceFormModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues,
  })

  useEffect(() => {
    if (isOpen) reset(defaultValues ?? { name: '', description: '' })
  }, [isOpen, defaultValues, reset])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody className="flex flex-col gap-4">
          <Input
            label="Workspace Name"
            placeholder="My Event Team"
            error={errors.name?.message}
            {...register('name')}
          />
          <Textarea
            label="Description"
            placeholder="What is this workspace for?"
            error={errors.description?.message}
            rows={3}
            {...register('description')}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {title === 'Create Workspace' ? 'Create' : 'Save Changes'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
