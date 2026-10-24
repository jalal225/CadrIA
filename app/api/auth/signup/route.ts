import { z } from 'zod';
import { supabase } from '@/lib/db';

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

    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          prenom,
          nom,
        },
      },
    });

    if (error) {
      return Response.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Create user profile in profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            prenom,
            nom,
            email,
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't block signup if profile creation fails
      }
    }

    return Response.json({
      message: 'Inscription réussie',
      user: data.user,
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
