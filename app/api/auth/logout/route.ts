import { mockSignOut } from '@/lib/auth-mock';

export async function POST() {
  try {
    // Sign out with mock auth (localStorage)
    // TODO: Replace with Supabase Auth when connection is fixed
    mockSignOut();

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
