import { LucideIcon } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-neutral-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-neutral-500 mb-6 max-w-sm">{description}</p>}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
