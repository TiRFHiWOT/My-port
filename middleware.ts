import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token') || '';

  console.log("Middleware: Token found:", token);

  if (!token && url.pathname.startsWith('/admin')) {
    console.log("Middleware: Redirecting to /login because no token was found");
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (token && url.pathname === '/login') {
    console.log("Middleware: Token found, redirecting to /admin");
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
