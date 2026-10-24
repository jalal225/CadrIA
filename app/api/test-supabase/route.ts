import { supabase } from '@/lib/db';

export async function GET() {
  try {
    // Test connection - try to get session
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return Response.json({
        status: 'error',
        message: error.message,
      }, { status: 500 });
    }

    return Response.json({
      status: 'success',
      message: 'Supabase connection working',
      session: data,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({
      status: 'error',
      message: errorMessage,
    }, { status: 500 });
  }
}
