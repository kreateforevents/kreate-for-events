'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/helpers'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, showPasswordToggle, type, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-neutral-900"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'block w-full h-10 px-3 text-sm border border-neutral-200 rounded-md bg-white text-neutral-900 placeholder:text-neutral-400',
              'transition-all duration-200',
              'focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600',
              'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
              error && 'border-error-500 focus:border-error-600 focus:ring-error-600',
              showPasswordToggle && 'pr-10',
              className
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-error-600">{error}</p>}
        {helper && !error && <p className="text-xs text-neutral-500">{helper}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
