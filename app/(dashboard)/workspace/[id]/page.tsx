import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, FileText, Video, Calendar, Activity, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import { formatRelativeTime } from '@/lib/utils/formatters'

export default async function WorkspaceOverviewPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const sb = supabase as any
  const [
    { count: memberCount },
    { count: scriptCount },
    { count: videoCount },
    { count: eventCount },
    { data: recentActivity },
    { data: members },
  ] = await Promise.all([
    sb.from('workspace_members').select('*', { count: 'exact', head: true }).eq('workspace_id', params.id),
    sb.from('scripts').select('*', { count: 'exact', head: true }).eq('workspace_id', params.id),
    sb.from('videos').select('*', { count: 'exact', head: true }).eq('workspace_id', params.id),
    sb.from('events').select('*', { count: 'exact', head: true }).eq('workspace_id', params.id),
    sb.from('activity_logs').select('*, profiles!activity_logs_user_id_fkey(full_name, avatar_url)').eq('workspace_id', params.id).order('created_at', { ascending: false }).limit(8),
    sb.from('workspace_members').select('role, profiles(full_name, avatar_url, email)').eq('workspace_id', params.id).limit(5),
  ])

  const stats = [
    { label: 'Members', value: memberCount ?? 0, icon: Users, href: `/workspace/${params.id}/members`, color: 'text-blue-600 bg-blue-50' },
    { label: 'Scripts', value: scriptCount ?? 0, icon: FileText, href: `/workspace/${params.id}/scripts`, color: 'text-purple-600 bg-purple-50' },
    { label: 'Videos', value: videoCount ?? 0, icon: Video, href: `/workspace/${params.id}/videos`, color: 'text-pink-600 bg-pink-50' },
    { label: 'Events', value: eventCount ?? 0, icon: Calendar, href: `/workspace/${params.id}/events`, color: 'text-orange-600 bg-orange-50' },
  ]

  const actionLabels: Record<string, string> = {
    created: 'Created',
    updated: 'Updated',
    deleted: 'Deleted',
    published: 'Published',
    uploaded: 'Uploaded',
    added_member: 'Added member',
    removed_member: 'Removed member',
    updated_member_role: 'Updated role of',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card hoverable className="p-0">
              <Card.Body className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-500">{stat.label}</p>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <Card.Header className="flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Recent Activity</h2>
            <Link href={`/workspace/${params.id}/activity`} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            {(recentActivity ?? []).length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">No activity yet</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {(recentActivity ?? []).map((log: any) => (
                  <li key={log.id} className="flex items-start gap-3 px-6 py-3">
                    <Avatar name={log.profiles?.full_name ?? 'U'} src={log.profiles?.avatar_url} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-700">
                        <span className="font-medium">{log.profiles?.full_name ?? 'Someone'}</span>
                        {' '}{actionLabels[log.action] ?? log.action}{' '}
                        {log.entity_name && <span className="font-medium">{log.entity_name}</span>}
                      </p>
                      <p className="text-xs text-neutral-400">{formatRelativeTime(log.created_at)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card.Body>
        </Card>

        {/* Team Members */}
        <Card>
          <Card.Header className="flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Team Members</h2>
            <Link href={`/workspace/${params.id}/members`} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            {(members ?? []).length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">No members yet</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {(members ?? []).map((m: any) => (
                  <li key={m.profiles?.email} className="flex items-center gap-3 px-6 py-3">
                    <Avatar name={m.profiles?.full_name ?? 'U'} src={m.profiles?.avatar_url} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">{m.profiles?.full_name}</p>
                      <p className="text-xs text-neutral-500 truncate">{m.profiles?.email}</p>
                    </div>
                    <Badge variant={m.role === 'owner' ? 'primary' : 'default'}>{m.role}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: `/workspace/${params.id}/scripts`, label: 'Create Script', icon: FileText },
          { href: `/workspace/${params.id}/videos`, label: 'Upload Video', icon: Video },
          { href: `/workspace/${params.id}/members`, label: 'Add Member', icon: Users },
          { href: `/workspace/${params.id}/events`, label: 'New Event', icon: Calendar },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card hoverable className="p-0">
              <Card.Body className="flex flex-col items-center gap-2 py-5 text-center">
                <link.icon className="h-5 w-5 text-primary-600" />
                <span className="text-xs font-semibold text-neutral-700">{link.label}</span>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
