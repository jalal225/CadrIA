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

    // TODO: Save user profile to profiles table when Supabase connection is fixed
    // const { error: dbError } = await supabase.from('profiles').insert([{
    //   id: data.user?.id,
    //   prenom,
    //   nom,
    //   email,
    // }]);

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

    return Response.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
