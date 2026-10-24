// Mock authentication using in-memory storage
// TODO: Replace with Supabase Auth when connection is fixed

interface User {
  id: string;
  email: string;
  prenom: string;
  nom: string;
}

interface Session {
  user: User;
  accessToken: string;
}

// In-memory storage (server-side only)
const mockUsers = new Map<string, { user: User; password: string }>();

export function mockSignUp(email: string, password: string, prenom: string, nom: string) {
  // Check if user already exists
  if (mockUsers.has(email)) {
    throw new Error('Cet email est déjà utilisé');
  }

  // Create new user
  const userId = `user_${Date.now()}`;
  const user: User = { id: userId, email, prenom, nom };

  // Store user with password (NOT secure - mock only!)
  mockUsers.set(email, { user, password });

  return { user };
}

export function mockSignIn(email: string, password: string) {
  const userData = mockUsers.get(email);
  if (!userData || userData.password !== password) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Create session
  const accessToken = `token_${Date.now()}`;
  const user = userData.user;
  const session: Session = { user, accessToken };

  return { user, session };
}

export function mockSignOut() {
  // For mock, just return success (session is client-side only)
}

export function mockGetSession(sessionData?: string) {
  if (!sessionData) {
    return null;
  }
  try {
    return JSON.parse(sessionData) as Session;
  } catch {
    return null;
  }
}

export function mockGetUser(sessionData?: string) {
  const session = mockGetSession(sessionData);
  return session?.user || null;
}
