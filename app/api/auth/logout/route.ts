import { supabase } from '@/lib/db';

export async function POST() {
  try {
    await supabase.auth.signOut();

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
