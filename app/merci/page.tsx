'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MerciPage() {
  useEffect(() => {
    // Auto-redirect to home after 10 seconds (optional)
    const timer = setTimeout(() => {
      // Could redirect here: window.location.href = '/';
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            Merci !
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            Votre audit IA a été reçu avec succès
          </p>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              Un rapport détaillé de votre diagnostic de conformité IA vous sera envoyé par email dans les 24 heures.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              Ce rapport inclura une analyse de vos risques IA, des recommandations personnalisées, et les prochaines étapes pour assurer votre conformité.
            </p>
          </div>

          <p className="text-slate-400 mb-8">
            Information et aide à la mise en œuvre
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/audit"
            className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Faire un autre diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
