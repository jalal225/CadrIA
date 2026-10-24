import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

const DiagnosticSchema = z.object({
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  fonction: z.string().optional(),
  effectif: z.enum([
    '1_person',
    '2_5',
    '6_10',
    '11_50',
    '51_100',
    '100_plus',
  ]),
  outils_ia: z.array(z.string()).default([]),
  donnees_sensibles: z.array(z.string()).default([]),
  secteur: z.string().min(1, 'Secteur requis'),
  consentement_rapport: z.literal(true),
  consentement_email: z.literal(true),
  consentement_cgu: z.literal(true),
  consentement_confidentialite: z.literal(true),
  consentement_info: z.boolean().default(false),
  timestamp: z.string().datetime(),
});

type DiagnosticData = z.infer<typeof DiagnosticSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validatedData: DiagnosticData = DiagnosticSchema.parse(body);

    // Save to Supabase audits table
    const { error } = await supabase.from('audits').insert([
      {
        email: validatedData.email,
        prenom: validatedData.prenom,
        nom: validatedData.nom,
        secteur: validatedData.secteur,
        outils_ia: validatedData.outils_ia,
        donnees_sensibles: validatedData.donnees_sensibles,
        score: 75, // TODO: Calculate actual score
        status: 'completed',
      },
    ]);

    if (error) {
      console.error('Error saving audit:', error);
      // Don't block submission if DB save fails
    }

    console.log('Diagnostic saved:', {
      email: validatedData.email,
      secteur: validatedData.secteur,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Diagnostic reçu avec succès. Vous recevrez un rapport par email.',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Erreur serveur',
      },
      { status: 500 }
    );
  }
}
