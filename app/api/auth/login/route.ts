import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// MOCK AUTH — Supabase DNS unreachable, using mock for testing
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    const mockUserId = `mock-user-${Date.now()}`;
    const mockSession = {
      access_token: `mock-token-${Date.now()}`,
      refresh_token: `mock-refresh-${Date.now()}`,
    };

    return Response.json({
      message: 'Connexion réussie',
      user: {
        id: mockUserId,
        email,
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
      { status: 401 }
    );
  }
}
