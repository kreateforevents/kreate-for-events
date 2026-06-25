'use client'

import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Plus, Video, Upload, Trash2, PlayCircle, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import EmptyState from '@/components/shared/EmptyState'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Avatar from '@/components/ui/Avatar'
import { createVideo, uploadVideoFile, publishVideo, deleteVideo } from '@/lib/services/videoService'
import { PLATFORMS } from '@/lib/utils/constants'
import { formatRelativeTime, formatDate } from '@/lib/utils/formatters'
import { formatFileSize, cn } from '@/lib/utils/helpers'

const statusColors: Record<string, string> = {
  uploading: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-blue-100 text-blue-700',
  published: 'bg-success-100 text-success-700',
  failed: 'bg-error-100 text-error-700',
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="h-3.5 w-3.5" />,
    youtube: <Youtube className="h-3.5 w-3.5" />,
    linkedin: <Linkedin className="h-3.5 w-3.5" />,
    x: <Twitter className="h-3.5 w-3.5" />,
  }
  return <>{icons[platform] ?? null}</>
}

const platformColors: Record<string, string> = {
  instagram: 'bg-pink-100 text-pink-700',
  youtube: 'bg-red-100 text-red-700',
  linkedin: 'bg-blue-100 text-blue-700',
  x: 'bg-neutral-100 text-neutral-700',
}

interface Video {
  id: string
  title: string
  description: string | null
  file_url: string | null
  file_size: number | null
  platforms: string[]
  status: string
  hashtags: string | null
  created_at: string
  profiles: { full_name: string | null; avatar_url: string | null } | null
}

interface VideosClientProps {
  workspaceId: string
  initialVideos: Video[]
  currentUserId: string
}

const emptyForm = { title: '', description: '', platforms: [] as string[], hashtags: '' }

export default function VideosClient({ workspaceId, initialVideos, currentUserId }: VideosClientProps) {
  const [videos, setVideos] = useState(initialVideos)
  const [showForm, setShowForm] = useState(false)
  const [deleting, setDeleting] = useState<Video | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const togglePlatform = (id: string) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(id) ? f.platforms.filter((p) => p !== id) : [...f.platforms, id],
    }))
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('video/')) { toast.error('Please select a video file'); return }
    setSelectedFile(file)
    if (!form.title) setForm((f) => ({ ...f, title: file.name.replace(/\.[^.]+$/, '') }))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (form.platforms.length === 0) { toast.error('Select at least one platform'); return }
    setIsSaving(true)
    setUploadProgress(10)
    try {
      const video = await createVideo(workspaceId, form as any, currentUserId) as any
      setUploadProgress(30)

      if (selectedFile) {
        setUploadProgress(50)
        await uploadVideoFile(video.id, selectedFile, workspaceId)
        setUploadProgress(90)
      }

      setVideos((prev) => [{ ...(video ?? {}), profiles: null } as Video, ...prev])
      setShowForm(false)
      setForm(emptyForm)
      setSelectedFile(null)
      setUploadProgress(0)
      toast.success('Video added!')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to add video')
      setUploadProgress(0)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async (video: Video) => {
    try {
      const updated = await publishVideo(video.id, workspaceId, currentUserId, video.title)
      setVideos((prev) => prev.map((v) => v.id === video.id ? { ...v, status: 'published' } : v))
      toast.success('Video published!')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to publish')
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setIsDeleting(true)
    try {
      await deleteVideo(deleting.id, workspaceId, currentUserId, deleting.title)
      setVideos((prev) => prev.filter((v) => v.id !== deleting.id))
      setDeleting(null)
      toast.success('Video deleted')
    } catch (error: any) {
      toast.error(error.message ?? 'Failed to delete')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Videos</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{videos.length} video{videos.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setSelectedFile(null); setShowForm(true) }}>
          <Plus className="h-4 w-4" /> Add Video
        </Button>
      </div>

      {videos.length === 0 ? (
        <EmptyState icon={Video} title="No videos yet" description="Upload your first video or link an existing one." action={{ label: 'Add Video', onClick: () => setShowForm(true) }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card key={video.id} className="flex flex-col">
              <div className="aspect-video bg-neutral-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                {video.file_url ? (
                  <video src={video.file_url} className="w-full h-full object-cover" />
                ) : (
                  <PlayCircle className="h-10 w-10 text-neutral-300" />
                )}
                <div className="absolute top-2 right-2">
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', statusColors[video.status] ?? 'bg-neutral-100 text-neutral-700')}>
                    {video.status}
                  </span>
                </div>
              </div>
              <Card.Body className="flex-1">
                <p className="font-medium text-neutral-900 truncate mb-1">{video.title}</p>
                {video.description && <p className="text-sm text-neutral-500 line-clamp-2 mb-2">{video.description}</p>}
                <div className="flex flex-wrap gap-1 mb-2">
                  {video.platforms.map((p) => (
                    <span key={p} className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold', platformColors[p] ?? 'bg-neutral-100 text-neutral-700')}>
                      <PlatformIcon platform={p} />
                      {p}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {video.profiles && <Avatar name={video.profiles.full_name ?? 'U'} src={video.profiles.avatar_url} size="sm" />}
                  <span className="text-xs text-neutral-400">{formatRelativeTime(video.created_at)}</span>
                  {video.file_size && <span className="text-xs text-neutral-400 ml-auto">{formatFileSize(video.file_size)}</span>}
                </div>
              </Card.Body>
              <Card.Footer className="justify-between">
                <Button variant="ghost" size="sm" className="text-error-500 hover:bg-error-50" onClick={() => setDeleting(video)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                {video.status === 'ready' && (
                  <Button size="sm" onClick={() => handlePublish(video)}>Publish</Button>
                )}
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}

      {/* Add Video Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Video" size="md">
        <ModalBody className="flex flex-col gap-4">
          <div
            className={cn('border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors', isDragging ? 'border-primary-400 bg-primary-50' : 'border-neutral-200 hover:border-neutral-400')}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
            {selectedFile ? (
              <div>
                <p className="text-sm font-medium text-neutral-900">{selectedFile.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{formatFileSize(selectedFile.size)}</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-neutral-600">Drop a video file here or click to browse</p>
                <p className="text-xs text-neutral-400 mt-1">Optional — you can also just save metadata</p>
              </div>
            )}
          </div>

          {isSaving && uploadProgress > 0 && (
            <div className="w-full bg-neutral-100 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}

          <Input label="Title" placeholder="Video title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <Textarea label="Description" placeholder="What is this video about?" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
          <Input label="Hashtags" placeholder="#eventmarketing #kreate" value={form.hashtags} onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))} />

          <div>
            <p className="text-sm font-semibold text-neutral-900 mb-2">Platforms</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={cn('px-3 py-1.5 rounded-full text-sm font-semibold border transition-all', form.platforms.includes(p.id) ? 'border-primary-600 bg-primary-600 text-white' : 'border-neutral-200 text-neutral-700 hover:border-primary-400')}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowForm(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} isLoading={isSaving}>Add Video</Button>
        </ModalFooter>
      </Modal>

      <ConfirmDialog isOpen={!!deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} title="Delete Video" description={`Delete "${deleting?.title}"? This cannot be undone.`} isLoading={isDeleting} />
    </div>
  )
}
