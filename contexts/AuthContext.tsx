'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { User, UserRole } from '@/types/roles'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasRole: (role: UserRole) => boolean
  hasAnyRole: (roles: UserRole[]) => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users - Replace with actual authentication logic
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'editor@example.com',
    name: 'Editor User',
    role: 'editor',
  },
  {
    id: '3',
    email: 'viewer@example.com',
    name: 'Viewer User',
    role: 'viewer',
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage (client-side state)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        
        // Sync cookie if missing (for middleware)
        if (!Cookies.get('userRole')) {
          Cookies.set('userRole', parsedUser.role, { 
            expires: 7,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
          })
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
        Cookies.remove('userRole')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - Replace with actual authentication API call
    const foundUser = DEMO_USERS.find((u) => u.email === email)
    
    if (foundUser) {
      // In real app, verify password here
      setUser(foundUser)
      
      // Store in localStorage (full user object for client)
      localStorage.setItem('user', JSON.stringify(foundUser))
      
      // Store in cookie (role for middleware/server)
      Cookies.set('userRole', foundUser.role, { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      })
      
      // Store user ID for API calls
      Cookies.set('userId', foundUser.id, { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      })
      
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    Cookies.remove('userRole')
    Cookies.remove('userId')
  }

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false
    return user.role === role
  }

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, hasRole, hasAnyRole, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

