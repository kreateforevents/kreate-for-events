import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VideosClient from './VideosClient'

export default async function VideosPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: videos } = await (supabase as any)
    .from('videos')
    .select('*, profiles!videos_uploaded_by_fkey(id, full_name, email, avatar_url)')
    .eq('workspace_id', params.id)
    .order('created_at', { ascending: false })

  return (
    <VideosClient
      workspaceId={params.id}
      initialVideos={videos ?? []}
      currentUserId={user.id}
    />
  )
}
