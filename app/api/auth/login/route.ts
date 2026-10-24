import { z } from 'zod';
import { supabase } from '@/lib/db';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Response.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // TODO: Store session in secure HTTP-only cookie when Supabase connection is fixed
    // This would typically be done via middleware or a custom session handler

    return Response.json({
      message: 'Connexion réussie',
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: 'Données invalides' },
        { status: 400 }
      );
    }

    return Response.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
