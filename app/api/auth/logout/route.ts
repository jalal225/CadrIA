import { supabase } from '@/lib/db';

export async function POST() {
  try {
    // Sign out with Supabase Auth
    const { error } = await supabase.auth.signOut();

    if (error) {
      return Response.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    return Response.json(
      { message: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}
