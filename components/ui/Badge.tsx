import { cn } from '@/lib/utils/helpers'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'
}

const variants = {
  default: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-100 text-success-700',
  error: 'bg-error-100 text-error-700',
  warning: 'bg-warning-100 text-warning-700',
  info: 'bg-info-100 text-info-700',
}

export default function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
