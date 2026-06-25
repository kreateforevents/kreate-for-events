'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Avatar from '@/components/ui/Avatar'
import { ChevronDown, LogOut, User, Settings } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  user: {
    email: string
    full_name?: string | null
    avatar_url?: string | null
  }
  title?: string
}

export default function Header({ user, title }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = user.full_name ?? user.email.split('@')[0]

  return (
    <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      <div>
        {title && <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>}
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
        >
          <Avatar name={displayName} src={user.avatar_url} size="sm" />
          <span className="font-medium hidden sm:block">{displayName}</span>
          <ChevronDown className="h-4 w-4 text-neutral-400" />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 py-1">
              <div className="px-3 py-2 border-b border-neutral-100">
                <p className="text-sm font-semibold text-neutral-900 truncate">{displayName}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
