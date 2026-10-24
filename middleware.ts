import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check session in cookies (set by client-side auth)
  const sessionCookie = request.cookies.get('cadria_session')?.value;

  // Protect /saas and /admin routes
  if ((request.nextUrl.pathname.startsWith('/saas') ||
       request.nextUrl.pathname.startsWith('/admin')) &&
      !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // TODO: Implement admin role check when profiles table is available
  // For now, allow all authenticated users to /admin

  return NextResponse.next();
}

export const config = {
  matcher: ['/saas/:path*', '/admin/:path*'],
};
