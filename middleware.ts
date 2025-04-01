import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const isAuthenticated = request.cookies.has('auth_token');
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    return NextResponse.next();
  }