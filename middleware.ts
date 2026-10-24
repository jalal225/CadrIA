import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Get session from cookies (set by Supabase Auth)
  const { data: { session } } = await supabase.auth.getSession();

  // Protect /saas and /admin routes
  if ((request.nextUrl.pathname.startsWith('/saas') ||
       request.nextUrl.pathname.startsWith('/admin')) &&
      !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect /admin access to non-admins (TODO: implement admin check)
  // For now, allow all authenticated users to /admin
  // In production, check user.metadata.role === 'admin'

  return NextResponse.next();
}

export const config = {
  matcher: ['/saas/:path*', '/admin/:path*'],
};
