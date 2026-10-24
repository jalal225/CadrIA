import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // TODO: Implement server-side session verification when Supabase is reconnected
  // For now, session is verified client-side via useProtectedRoute hook
  // This middleware is disabled until we can reliably check sessions on the server

  return NextResponse.next();
}

export const config = {
  matcher: ['/saas/:path*', '/admin/:path*'],
};
