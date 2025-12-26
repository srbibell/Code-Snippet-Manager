import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their required roles
const protectedRoutes: Record<string, string[]> = {
  '/admin': ['admin'],
  '/editor': ['admin', 'editor'],
  '/dashboard': ['admin', 'editor', 'viewer'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const routeConfig = Object.entries(protectedRoutes).find(([route]) =>
    pathname.startsWith(route)
  )

  if (routeConfig) {
    const [, allowedRoles] = routeConfig
    const userRole = request.cookies.get('userRole')?.value

    // If no role cookie, redirect to login
    if (!userRole) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user has required role
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

