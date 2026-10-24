import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: 'Missing env vars',
          supabaseUrl: supabaseUrl ? '✓ Present' : '✗ Missing',
          serviceRoleKey: serviceRoleKey ? '✓ Present' : '✗ Missing',
        },
        { status: 500 }
      );
    }

    // Try to create Supabase client
    const supabase = getServerSupabase();

    // Try a simple query
    const { data, error } = await supabase
      .from('diagnostics')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase connection failed',
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Supabase connection works!',
        supabaseUrl: supabaseUrl.substring(0, 30) + '...',
        diagnosticsTableAccessible: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Test failed',
        error: String(error),
      },
      { status: 500 }
    );
  }
}
