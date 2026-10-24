import { z } from 'zod';
import { sendDiagnosticEmail } from '@/lib/brevo';

const SendDiagnosticEmailSchema = z.object({
  email: z.string().email(),
  prenom: z.string().min(1),
  nom: z.string().min(1),
  secteur: z.string().min(1),
  score: z.number().min(0).max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, prenom, nom, secteur, score } = SendDiagnosticEmailSchema.parse(body);

    await sendDiagnosticEmail({
      email,
      prenom,
      nom,
      secteur,
      score,
    });

    return Response.json({
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { message: 'Invalid data' },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Error sending email';
    return Response.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
