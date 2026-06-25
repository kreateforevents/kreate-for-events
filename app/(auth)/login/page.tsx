'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, LoginFormData } from '@/lib/utils/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      toast.success('Welcome back!')
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <Card.Body className="p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Sign in</h2>
        <p className="text-sm text-neutral-500 mb-6">Welcome back to your workspace</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            showPasswordToggle
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign in
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </Card.Body>
    </Card>
  )
}
