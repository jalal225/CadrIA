import { addSubscription, updateSubscriptionStatus } from '@/lib/stripe-webhook';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return Response.json(
        { message: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return Response.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;

        if (!userId) {
          console.error('No userId in session metadata');
          return Response.json({ received: true });
        }

        // Create subscription record
        addSubscription({
          userId,
          stripeSessionId: session.id,
          stripeCustomerId: session.customer as string,
          status: 'active',
          createdAt: new Date(),
        });

        console.log(`Subscription created for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        // Find user by customer ID (simplified - in production, use DB)
        // For now, we'd need to store the mapping somewhere
        console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription cancelled: ${subscription.id}`);
        // Mark subscription as inactive
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json(
      { message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
