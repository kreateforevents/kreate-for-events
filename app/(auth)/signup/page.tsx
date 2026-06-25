'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { signupSchema, SignupFormData } from '@/lib/utils/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName },
        },
      })
      if (error) throw error

      if (authData.user) {
        await (supabase as any).from('profiles').upsert({
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName,
        })
      }

      toast.success('Account created! Please check your email to verify.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <Card.Body className="p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Create account</h2>
        <p className="text-sm text-neutral-500 mb-6">Start collaborating with your team</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            placeholder="Harry Styles"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
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
            helper="Minimum 6 characters"
            {...register('password')}
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            showPasswordToggle
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Create account
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </Card.Body>
    </Card>
  )
}
