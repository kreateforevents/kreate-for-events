'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/helpers'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helper?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-semibold text-neutral-900">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'block w-full px-3 py-2 text-sm border border-neutral-200 rounded-md bg-white text-neutral-900 placeholder:text-neutral-400',
            'transition-all duration-200 resize-y min-h-[100px]',
            'focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600',
            'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
            error && 'border-error-500 focus:border-error-600 focus:ring-error-600',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-error-600">{error}</p>}
        {helper && !error && <p className="text-xs text-neutral-500">{helper}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
