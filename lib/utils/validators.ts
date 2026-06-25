import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required').max(255, 'Name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
})

export const memberSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['owner', 'admin', 'member']),
})

export const scriptSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().optional(),
  status: z.enum(['draft', 'approved', 'published']),
  assigned_to: z.string().optional(),
  event_id: z.string().optional(),
})

export const videoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().optional(),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  hashtags: z.string().optional(),
  event_id: z.string().optional(),
})

export const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required').max(255, 'Name is too long'),
  description: z.string().optional(),
  event_date: z.string().optional(),
  location: z.string().optional(),
})

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
})

export const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type WorkspaceFormData = z.infer<typeof workspaceSchema>
export type MemberFormData = z.infer<typeof memberSchema>
export type ScriptFormData = z.infer<typeof scriptSchema>
export type VideoFormData = z.infer<typeof videoSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type PasswordFormData = z.infer<typeof passwordSchema>
