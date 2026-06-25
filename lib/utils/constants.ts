export const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: 'bg-pink-100 text-pink-700' },
  { id: 'youtube', label: 'YouTube', color: 'bg-red-100 text-red-700' },
  { id: 'linkedin', label: 'LinkedIn', color: 'bg-blue-100 text-blue-700' },
  { id: 'x', label: 'X (Twitter)', color: 'bg-neutral-100 text-neutral-700' },
] as const

export const ROLES = [
  { id: 'owner', label: 'Owner' },
  { id: 'admin', label: 'Admin' },
  { id: 'member', label: 'Member' },
] as const

export const SCRIPT_STATUSES = [
  { id: 'draft', label: 'Draft', color: 'bg-neutral-100 text-neutral-700' },
  { id: 'approved', label: 'Approved', color: 'bg-blue-100 text-blue-700' },
  { id: 'published', label: 'Published', color: 'bg-green-100 text-green-700' },
] as const

export const VIDEO_STATUSES = [
  { id: 'uploading', label: 'Uploading', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'ready', label: 'Ready', color: 'bg-blue-100 text-blue-700' },
  { id: 'published', label: 'Published', color: 'bg-green-100 text-green-700' },
  { id: 'failed', label: 'Failed', color: 'bg-red-100 text-red-700' },
] as const

export const ROLE_COLORS: Record<string, string> = {
  owner: 'bg-primary-100 text-primary-700',
  admin: 'bg-secondary-100 text-secondary-700',
  member: 'bg-neutral-100 text-neutral-700',
}
