import { z } from 'zod';
import { mockSignUp } from '@/lib/auth-mock';

const SignupSchema = z.object({
  prenom: z.string().min(1),
  nom: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prenom, nom, email, password } = SignupSchema.parse(body);

    // Sign up with mock auth (localStorage)
    // TODO: Replace with Supabase Auth when connection is fixed
    const { user } = mockSignUp(email, password, prenom, nom);

    return Response.json({
      message: 'Inscription réussie',
      user,
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
      { status: 400 }
    );
  }
}
