import { Zap } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-3">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Kreate for Events</h1>
        <p className="text-sm text-neutral-500 mt-1">Team collaboration for event marketing</p>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
