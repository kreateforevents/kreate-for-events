import Image from 'next/image'
import { cn } from '@/lib/utils/helpers'
import { getInitials } from '@/lib/utils/helpers'

interface AvatarProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

export default function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden flex-shrink-0', sizes[size], className)}>
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-600 text-white font-semibold flex items-center justify-center flex-shrink-0',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
