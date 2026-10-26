import { z } from 'zod';
import Stripe from 'stripe';
import { supabase } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const CheckoutSchema = z.object({
  planId: z.enum(['free', 'basic', 'premium']),
});

const PLAN_PRICES = {
  free: 0,
  basic: 4900, // 49€ in cents
  premium: 14900, // 149€ in cents
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planId } = CheckoutSchema.parse(body);

    // Only paid plans require payment
    if (planId === 'free') {
      return Response.json(
        { message: 'Plan invalide pour le paiement' },
        { status: 400 }
      );
    }

    // Check if user is authenticated (mock session from header)
    const sessionHeader = request.headers.get('X-Session');
    if (!sessionHeader) {
      return Response.json({ requireAuth: true });
    }

    let user;
    try {
      const sessionData = JSON.parse(sessionHeader);
      user = sessionData.user || { id: sessionData.id, email: sessionData.email };
    } catch {
      return Response.json({ requireAuth: true });
    }

    // Create Stripe checkout session
    const planNames = {
      basic: 'Solveria Basic - Abonnement mensuel',
      premium: 'Solveria Premium - Abonnement mensuel',
    };

    const planDescriptions = {
      basic: 'Conformité IA essentiels pour PME',
      premium: 'Conformité IA complète avec support prioritaire',
    };

    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: planNames[planId as keyof typeof planNames],
              description: planDescriptions[planId as keyof typeof planDescriptions],
            },
            unit_amount: PLAN_PRICES[planId as keyof typeof PLAN_PRICES],
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
