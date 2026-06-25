import { createClient } from '@/lib/supabase/client'
import type { Video } from '@/types/database'
import type { VideoFormData } from '@/lib/utils/validators'

export async function getVideos(workspaceId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('videos')
    .select('*, profiles!videos_uploaded_by_fkey(id, full_name, email, avatar_url)')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as any[]
}

export async function getVideo(videoId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('videos')
    .select('*, profiles!videos_uploaded_by_fkey(id, full_name, email, avatar_url)')
    .eq('id', videoId)
    .single()

  if (error) throw error
  return data
}

export async function createVideo(workspaceId: string, formData: VideoFormData, userId: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('videos')
    .insert({
      workspace_id: workspaceId,
      title: formData.title,
      description: formData.description,
      platforms: formData.platforms,
      hashtags: formData.hashtags,
      event_id: formData.event_id || null,
      uploaded_by: userId,
      status: 'ready',
    })
    .select()
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'uploaded',
    entity_type: 'video',
    entity_id: data.id,
    entity_name: data.title,
  })

  return data as Video
}

export async function uploadVideoFile(videoId: string, file: File, workspaceId: string) {
  const supabase = createClient()
  const filePath = `${workspaceId}/${videoId}/${file.name}`

  const { error: uploadError } = await (supabase as any).storage
    .from('videos')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data: urlData } = (supabase as any).storage.from('videos').getPublicUrl(filePath)

  const { error: updateError } = await (supabase as any)
    .from('videos')
    .update({
      file_url: urlData.publicUrl,
      file_size: file.size,
      status: 'ready',
      updated_at: new Date().toISOString(),
    })
    .eq('id', videoId)

  if (updateError) throw updateError
  return urlData.publicUrl as string
}

export async function publishVideo(videoId: string, workspaceId: string, userId: string, videoTitle: string) {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('videos')
    .update({ status: 'published', updated_at: new Date().toISOString() })
    .eq('id', videoId)
    .select()
    .single()

  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'published',
    entity_type: 'video',
    entity_id: videoId,
    entity_name: videoTitle,
  })

  return data as Video
}

export async function deleteVideo(videoId: string, workspaceId: string, userId: string, videoTitle: string) {
  const supabase = createClient()
  const { error } = await (supabase as any).from('videos').delete().eq('id', videoId)
  if (error) throw error

  await (supabase as any).from('activity_logs').insert({
    workspace_id: workspaceId,
    user_id: userId,
    action: 'deleted',
    entity_type: 'video',
    entity_id: videoId,
    entity_name: videoTitle,
  })
}
