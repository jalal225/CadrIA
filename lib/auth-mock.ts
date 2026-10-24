// Mock authentication using localStorage
// TODO: Replace with Supabase Auth when connection is fixed

const USERS_KEY = 'cadria_users';
const SESSION_KEY = 'cadria_session';

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

export function mockSignUp(email: string, password: string, prenom: string, nom: string) {
  // Get existing users from localStorage
  const usersJson = localStorage.getItem(USERS_KEY) || '{}';
  const users = JSON.parse(usersJson);

  // Check if user already exists
  if (users[email]) {
    throw new Error('Cet email est déjà utilisé');
  }

  // Create new user
  const userId = `user_${Date.now()}`;
  const user: User = { id: userId, email, prenom, nom };

  // Store user with password (NOT secure - mock only!)
  users[email] = { ...user, password };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { user };
}

export function mockSignIn(email: string, password: string) {
  const usersJson = localStorage.getItem(USERS_KEY) || '{}';
  const users = JSON.parse(usersJson);

  const userData = users[email];
  if (!userData || userData.password !== password) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Create session
  const accessToken = `token_${Date.now()}`;
  const user: User = {
    id: userData.id,
    email: userData.email,
    prenom: userData.prenom,
    nom: userData.nom,
  };

  const session: Session = { user, accessToken };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { user, session };
}

export function mockSignOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function mockGetSession() {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  if (!sessionJson) {
    return null;
  }
  return JSON.parse(sessionJson) as Session;
}

export function mockGetUser() {
  const session = mockGetSession();
  return session?.user || null;
}
