import { z } from 'zod';
import Stripe from 'stripe';
import { supabase } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const CheckoutSchema = z.object({
  planId: z.enum(['free', 'premium']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId } = CheckoutSchema.parse(body);

    // Only premium requires payment
    if (planId !== 'premium') {
      return Response.json(
        { message: 'Plan invalide pour le paiement' },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return Response.json({ requireAuth: true });
    }

    const user = session.user;

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'CadrIA Premium - Abonnement mensuel',
              description: 'Accès complet au dashboard, rapports illimités, veille documentaire',
            },
            unit_amount: 9900, // 99€ en cents
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/saas?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
      metadata: {
        userId: user.id,
        planId,
      },
    });

    // TODO: Store pending subscription in DB when Supabase connection is fixed
    // const { error } = await supabase.from('subscriptions').insert([{
    //   user_id: user.id,
    //   stripe_session_id: checkoutSession.id,
    //   status: 'pending',
    // }]);

    return Response.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { message: 'Données invalides' },
        { status: 400 }
      );
    }

    return Response.json(
      { message: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
