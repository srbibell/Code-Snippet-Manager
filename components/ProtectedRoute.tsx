'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/roles'
import { hasRole as checkRole } from '@/types/roles'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  requiredRoles?: UserRole[]
  redirectTo?: string
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredRoles,
  redirectTo = '/login',
  fallback,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && !checkRole(user.role, requiredRole)) {
        router.push('/unauthorized')
        return
      }

      if (requiredRoles && !requiredRoles.includes(user.role)) {
        router.push('/unauthorized')
        return
      }
    }
  }, [user, isLoading, requiredRole, requiredRoles, router, redirectTo])

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-600 dark:text-slate-400">Loading...</div>
        </div>
      )
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && !checkRole(user.role, requiredRole)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600">Access Denied</div>
        </div>
      )
    )
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600">Access Denied</div>
        </div>
      )
    )
  }

  return <>{children}</>
}

