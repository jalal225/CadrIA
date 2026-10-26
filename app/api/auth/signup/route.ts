import { z } from 'zod';

const SignupSchema = z.object({
  prenom: z.string().min(1),
  nom: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

// MOCK AUTH — Supabase DNS unreachable, using mock for testing
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prenom, nom, email, password } = SignupSchema.parse(body);

    const mockUserId = `mock-user-${Date.now()}`;
    const mockSession = {
      access_token: `mock-token-${Date.now()}`,
      refresh_token: `mock-refresh-${Date.now()}`,
    };

    return Response.json({
      message: 'Inscription réussie',
      user: {
        id: mockUserId,
        email,
        user_metadata: { prenom, nom },
      },
      session: mockSession,
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
