'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import { createClient } from '@/lib/supabase/client'

interface ProfileClientProps {
  user: {
    id: string
    email: string
    full_name?: string | null
    avatar_url?: string | null
  }
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const [fullName, setFullName] = useState(user.full_name ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleSaveProfile = async () => {
    if (!fullName.trim()) { toast.error('Full name is required'); return }
    setIsSaving(true)
    try {
      const supabase = createClient()
      await (supabase as any).from('profiles').upsert({ id: user.id, email: user.email, full_name: fullName, updated_at: new Date().toISOString() })
      await supabase.auth.updateUser({ data: { full_name: fullName } })
      toast.success('Profile updated')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return }
    setIsChangingPassword(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      toast.success('Password updated')
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const displayName = user.full_name ?? user.email.split('@')[0]

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Profile</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage your account settings</p>
      </div>

      <Card>
        <Card.Header><h2 className="font-semibold text-neutral-900">Personal Information</h2></Card.Header>
        <Card.Body className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={displayName} src={user.avatar_url} size="lg" />
            <div>
              <p className="font-semibold text-neutral-900">{displayName}</p>
              <p className="text-sm text-neutral-500">{user.email}</p>
            </div>
          </div>
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input label="Email address" value={user.email} disabled helper="Email cannot be changed" />
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleSaveProfile} isLoading={isSaving}>Save Changes</Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header><h2 className="font-semibold text-neutral-900">Change Password</h2></Card.Header>
        <Card.Body className="flex flex-col gap-4">
          <Input label="New Password" type="password" showPasswordToggle value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" helper="Minimum 6 characters" />
          <Input label="Confirm New Password" type="password" showPasswordToggle value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleChangePassword} isLoading={isChangingPassword}>Update Password</Button>
        </Card.Footer>
      </Card>
    </div>
  )
}
