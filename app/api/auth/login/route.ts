import { z } from 'zod';
import { mockSignIn } from '@/lib/auth-mock';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // Sign in with mock auth (localStorage)
    // TODO: Replace with Supabase Auth when connection is fixed
    const { user, session } = mockSignIn(email, password);

    return Response.json({
      message: 'Connexion réussie',
      user,
      session,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: 'Données invalides' },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur';
    return Response.json(
      { message: errorMessage },
      { status: 401 }
    );
  }
}
