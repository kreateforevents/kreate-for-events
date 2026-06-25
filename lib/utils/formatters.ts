import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy')
}

export function formatDateTime(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy h:mm a')
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
}

export function formatEventDate(dateString: string): string {
  return format(parseISO(dateString), 'EEEE, MMMM d, yyyy')
}
