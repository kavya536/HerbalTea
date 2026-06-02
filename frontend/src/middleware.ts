import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define protected paths
  const isProtectedPath = pathname.startsWith('/checkout') && !pathname.startsWith('/checkout/success');

  // If path is protected and no token is present, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    // Remember original destination
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in, prevent accessing login/signup
  const isAuthPath = pathname.startsWith('/login') || pathname.startsWith('/signup');
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Map the middleware paths
export const config = {
  matcher: ['/checkout', '/login', '/signup'],
};
