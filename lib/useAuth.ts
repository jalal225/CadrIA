'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Session {
  user: {
    id: string;
    email: string;
    prenom: string;
    nom: string;
  };
  accessToken: string;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for session
    const sessionJson = localStorage.getItem('session');
    if (sessionJson) {
      try {
        setSession(JSON.parse(sessionJson));
      } catch {
        localStorage.removeItem('session');
      }
    }
    setIsLoading(false);
  }, []);

  return { session, isLoading };
}

export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session && (pathname.startsWith('/saas') || pathname.startsWith('/admin'))) {
      router.push('/login');
    }
  }, [session, isLoading, pathname, router]);

  return { session, isLoading };
}
