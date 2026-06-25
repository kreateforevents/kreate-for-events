import { cn } from '@/lib/utils/helpers'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

function Card({ className, hoverable, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-lg shadow-sm',
        hoverable && 'cursor-pointer transition-shadow duration-200 hover:shadow-md',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-neutral-200', className)}
      {...props}
    />
  )
}

function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-4', className)} {...props} />
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-neutral-200 flex justify-end gap-3', className)}
      {...props}
    />
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
