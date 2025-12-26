export type UserRole = 'admin' | 'editor' | 'viewer' | 'guest'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface RolePermissions {
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  canCreate: boolean
  canManageUsers: boolean
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canCreate: true,
    canManageUsers: true,
  },
  editor: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canCreate: true,
    canManageUsers: false,
  },
  viewer: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canManageUsers: false,
  },
  guest: {
    canView: false,
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canManageUsers: false,
  },
}

export const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  editor: 3,
  viewer: 2,
  guest: 1,
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function hasPermission(
  userRole: UserRole,
  permission: keyof RolePermissions
): boolean {
  return rolePermissions[userRole][permission]
}

