import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If token exists and the user tries to access auth pages, redirect to /home
  if (token && ['/sign-in', '/sign-up', '/verify', '/'].some(path => url.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // If token doesn't exist, ensure protected routes are blocked
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next(); // Allow access if no redirection is needed
}

// Middleware path matching configuration
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
