'use client';

import AuditForm from '@/components/audit/AuditForm';

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Audit IA Gratuit
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Évaluez votre conformité IA en 10 minutes
          </p>
          <p className="text-slate-400 leading-relaxed">
            Répondez à nos questions pour découvrir les points forts et les axes d'amélioration
            de votre utilisation de l'IA. Diagnostic complet, sans engagement.
          </p>
        </div>

        <AuditForm />

        <p className="text-center text-slate-500 text-sm mt-8">
          Information et aide à la mise en œuvre
        </p>
      </div>
    </div>
  );
}
