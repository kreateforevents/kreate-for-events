import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export default function Loader({ size = 'md', className, text }: LoaderProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizes[size])} />
      {text && <p className="text-sm text-neutral-500">{text}</p>}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader size="lg" text="Loading..." />
    </div>
  )
}
