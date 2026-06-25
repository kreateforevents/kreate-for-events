'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/helpers'
import {
  LayoutDashboard,
  Users,
  FileText,
  Video,
  Calendar,
  Activity,
  Settings,
  Zap,
} from 'lucide-react'

interface SidebarProps {
  workspaceId?: string
}

export default function Sidebar({ workspaceId }: SidebarProps) {
  const pathname = usePathname()

  const dashboardLinks = [
    { href: '/dashboard', label: 'Workspaces', icon: LayoutDashboard },
  ]

  const workspaceLinks = workspaceId
    ? [
        { href: `/workspace/${workspaceId}`, label: 'Overview', icon: LayoutDashboard },
        { href: `/workspace/${workspaceId}/members`, label: 'Members', icon: Users },
        { href: `/workspace/${workspaceId}/scripts`, label: 'Scripts', icon: FileText },
        { href: `/workspace/${workspaceId}/videos`, label: 'Videos', icon: Video },
        { href: `/workspace/${workspaceId}/events`, label: 'Events', icon: Calendar },
        { href: `/workspace/${workspaceId}/activity`, label: 'Activity', icon: Activity },
        { href: `/workspace/${workspaceId}/settings`, label: 'Settings', icon: Settings },
      ]
    : []

  const links = workspaceId ? workspaceLinks : dashboardLinks

  return (
    <aside className="w-60 h-full bg-white border-r border-neutral-200 flex flex-col">
      <div className="p-4 border-b border-neutral-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-neutral-900 text-lg">Kreate</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        {!workspaceId && (
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
        )}
        {workspaceId && (
          <div className="mb-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              ← All Workspaces
            </Link>
          </div>
        )}
        <ul className="space-y-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <link.icon className="h-4 w-4 flex-shrink-0" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
