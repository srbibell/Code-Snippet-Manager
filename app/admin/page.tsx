'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, Users, Settings, BarChart } from 'lucide-react'

function AdminContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome, <span className="font-semibold">{user?.name}</span>! This page is only accessible to admins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Users</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">1,234</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total users</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold">Admins</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">12</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Admin users</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold">Settings</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">24</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Config options</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold">Analytics</h3>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">98%</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Uptime</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Admin Features</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Manage all users and their roles</li>
            <li>Access all content and settings</li>
            <li>System configuration and maintenance</li>
            <li>View analytics and reports</li>
            <li>Manage permissions and access control</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminContent />
    </ProtectedRoute>
  )
}

