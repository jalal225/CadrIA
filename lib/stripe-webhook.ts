// Stripe webhook handling
// Store subscriptions in memory (will migrate to DB when Supabase is fixed)

interface Subscription {
  userId: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  status: 'active' | 'canceled' | 'past_due';
  createdAt: Date;
  expiresAt?: Date;
}

const subscriptions = new Map<string, Subscription>();

export function addSubscription(subscription: Subscription) {
  subscriptions.set(subscription.userId, subscription);
  return subscription;
}

export function getSubscription(userId: string) {
  return subscriptions.get(userId);
}

export function hasActiveSubscription(userId: string) {
  const sub = subscriptions.get(userId);
  if (!sub) return false;

  // Check if subscription is active and not expired
  if (sub.status !== 'active') return false;
  if (sub.expiresAt && new Date() > sub.expiresAt) return false;

  return true;
}

export function updateSubscriptionStatus(userId: string, status: string) {
  const sub = subscriptions.get(userId);
  if (sub) {
    sub.status = status as 'active' | 'canceled' | 'past_due';
  }
}
