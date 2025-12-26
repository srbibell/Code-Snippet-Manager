'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Edit, FileText, Trash2, Plus } from 'lucide-react'

function EditorContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Editor Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome, <span className="font-semibold">{user?.name}</span>! This page is accessible to editors and admins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Content</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">456</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total articles</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Edit className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold">Drafts</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">23</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pending edits</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Editor Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Create Content</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Create and publish new articles</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <Edit className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Edit Content</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Modify existing articles</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Delete Content</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Remove articles when needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">View All</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Access all content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <ProtectedRoute requiredRoles={['admin', 'editor']}>
      <EditorContent />
    </ProtectedRoute>
  )
}

