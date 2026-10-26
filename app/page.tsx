import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Solveria</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          Votre IA, installée et en règle
        </h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Évaluez la conformité IA de votre entreprise en 10 minutes et recevez un diagnostic détaillé
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Link
            href="/audit"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Audit IA Gratuit
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Voir les plans
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16 border-t border-b border-slate-700">
          <div>
            <p className="text-3xl font-bold text-blue-400">500+</p>
            <p className="text-slate-400">Entreprises auditées</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">10 min</p>
            <p className="text-slate-400">Diagnostic rapide</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">24h</p>
            <p className="text-slate-400">Rapport détaillé par email</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Ce que vous allez apprendre
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-2xl mb-2">🔍</p>
            <h4 className="text-white font-semibold mb-2">Conformité IA</h4>
            <p className="text-slate-400 text-sm">
              Vérifiez si votre usage de l'IA respecte le RGPD et la future loi IA européenne
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-2xl mb-2">⚡</p>
            <h4 className="text-white font-semibold mb-2">Risques identifiés</h4>
            <p className="text-slate-400 text-sm">
              Découvrez les points faibles et les données à risque dans votre infrastructure
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-2xl mb-2">✅</p>
            <h4 className="text-white font-semibold mb-2">Plan d'action</h4>
            <p className="text-slate-400 text-sm">
              Recevez des recommandations concrètes et priorisées pour vous mettre en conformité
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p className="mb-4">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            {' '} · {' '}
            <Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link>
          </p>
          <p>© 2024 Solveria. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
