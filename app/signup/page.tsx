import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CadrIA</h1>
          <p className="text-slate-400">Créer un compte</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <SignupForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Déjà inscrit ?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full text-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Se connecter
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-400 text-xs">
          <p>
            En créant un compte, vous acceptez nos{' '}
            <Link href="/mentions-legales" className="text-blue-400 hover:text-blue-300">
              conditions d'utilisation
            </Link>
            {' '}et notre{' '}
            <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
