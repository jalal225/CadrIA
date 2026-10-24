'use client';

import { useAuth } from './useAuth';

export function usePremium() {
  const { session } = useAuth();

  // TODO: Check subscription status from server when Supabase is fixed
  // For now, mock subscription check
  const isPremium = session ? !!localStorage.getItem(`premium_${session.user.id}`) : false;

  const setPremium = (premium: boolean) => {
    if (session) {
      if (premium) {
        localStorage.setItem(`premium_${session.user.id}`, 'true');
      } else {
        localStorage.removeItem(`premium_${session.user.id}`);
      }
    }
  };

  return { isPremium, setPremium, user: session?.user };
}
