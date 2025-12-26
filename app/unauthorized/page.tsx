'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ShieldX } from 'lucide-react'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 max-w-md">
        <ShieldX className="w-16 h-16 mx-auto text-red-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You don't have permission to access this page.
        </p>
        {user && (
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
            Your role: <span className="font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">{user.role}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

