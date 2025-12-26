'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, User, Calendar } from 'lucide-react'

function DashboardContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome, <span className="font-semibold">{user?.name}</span>! This page is accessible to all authenticated users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Views</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">12,345</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total views</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold">Profile</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{user?.role}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your role</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold">Activity</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">89</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">This month</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Your Permissions</h2>
          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <p>Role: <span className="font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">{user?.role}</span></p>
            <p>You can view content and access your dashboard.</p>
            {user?.role === 'admin' && (
              <p className="text-green-600">You have full administrative access.</p>
            )}
            {user?.role === 'editor' && (
              <p className="text-blue-600">You can create, edit, and delete content.</p>
            )}
            {user?.role === 'viewer' && (
              <p className="text-slate-600">You have read-only access.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'editor', 'viewer']}>
      <DashboardContent />
    </ProtectedRoute>
  )
}

