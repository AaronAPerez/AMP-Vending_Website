// middleware.ts 
import { AuthService } from '@/lib/services/authService';
import { NextRequest, NextResponse } from 'next/server';


/**
 * Next.js Middleware for Admin Route Protection
 * Build Process: Implements server-side route protection with automatic redirects
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply middleware only to admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      // Redirect to dashboard if already authenticated
      const user = await AuthService.getCurrentAdmin();
      if (user) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check authentication for all other admin routes
    const user = await AuthService.getCurrentAdmin();
    
    if (!user) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check specific permissions for sensitive routes
    if (pathname.startsWith('/admin/business-profile')) {
      const hasPermission = user.permissions.some(p => 
        p.resource === 'business_profile' && p.actions.includes('write')
      );
      
      if (!hasPermission) {
        return NextResponse.redirect(new URL('/admin?error=insufficient_permissions', request.url));
      }
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};