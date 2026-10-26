import Link from 'next/link';
import PricingButton from '@/components/pricing/PricingButton';

export default function PricingPage() {
  const plans = [
    {
      id: 'free',
      name: 'Audit Gratuit',
      price: '0',
      description: 'Évaluation rapide de votre conformité IA',
      features: [
        'Diagnostic IA en 10 minutes',
        'Rapport détaillé par email',
        'Évaluation des risques',
        'Recommandations basiques',
        'Accès limité au dashboard',
      ],
      cta: 'Commencer',
      href: '/audit',
      highlighted: false,
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '49',
      period: 'mois',
      description: 'Conformité IA essentiels pour PME',
      features: [
        'Tous les avantages de l\'audit gratuit',
        'Accès complet au dashboard',
        'Rapports mensuels',
        'Veille documentaire (mise à jour légale IA)',
        'Mise à jour des documents (2x/mois)',
        'Support email',
        'Export PDF des diagnostics',
      ],
      cta: 'Commencer l\'essai',
      highlighted: false,
      requireAuth: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '149',
      period: 'mois',
      description: 'Conformité IA complète avec support prioritaire',
      features: [
        'Tous les avantages du plan Basic',
        'Rapports illimités',
        'Mise à jour automatique continues des documents',
        'Support prioritaire (chat + téléphone)',
        'Audit présentiel annuel',
        'Export PDF/CSV + intégration API',
        'Formation équipe (2h/trimestre)',
        'Assistance juridique prioritaire',
      ],
      cta: 'Commencer l\'essai',
      highlighted: true,
      requireAuth: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Solveria</h1>
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            ← Retour
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Conformité IA à votre échelle
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins en matière de conformité IA
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-900/20 to-slate-800 border-blue-500 ring-2 ring-blue-500/50 transform md:scale-105'
                  : 'bg-slate-800 border-slate-700'
              } p-8`}
            >
              {plan.highlighted && (
                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Recommandé
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}€</span>
                {plan.period && <span className="text-slate-400 ml-2">/ {plan.period}</span>}
              </div>

              {/* CTA Button */}
              {plan.requireAuth ? (
                <PricingButton planId={plan.id} label={plan.cta} highlighted={plan.highlighted} />
              ) : (
                <Link
                  href={plan.href!}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors mb-6 ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              )}

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Questions fréquentes</h3>
          <div className="space-y-4">
            <details className="bg-slate-800 rounded-lg border border-slate-700 p-4 group cursor-pointer">
              <summary className="flex justify-between items-center text-white font-semibold">
                Puis-je annuler mon abonnement à tout moment ?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-slate-400 mt-4">
                Oui, vous pouvez annuler votre abonnement à tout moment. Vous conserverez l'accès jusqu'à la fin de votre période de facturation.
              </p>
            </details>

            <details className="bg-slate-800 rounded-lg border border-slate-700 p-4 group cursor-pointer">
              <summary className="flex justify-between items-center text-white font-semibold">
                Y a-t-il une période d'essai gratuit ?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-slate-400 mt-4">
                Nous proposons actuellement une période d'essai de 14 jours gratuits. Aucune carte bancaire requise pour démarrer.
              </p>
            </details>

            <details className="bg-slate-800 rounded-lg border border-slate-700 p-4 group cursor-pointer">
              <summary className="flex justify-between items-center text-white font-semibold">
                Comment fonctionnent les mises à jour de documents ?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-slate-400 mt-4">
                Nous surveillons constamment les changements législatifs en matière d'IA (RGPD, AI Act européen, etc.) et mettons à jour automatiquement votre documentation pour rester conforme.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>
            Besoin d'aide ? Contactez-nous à{' '}
            <a href="mailto:d.jale@yahoo.fr" className="text-blue-400 hover:text-blue-300">
              d.jale@yahoo.fr
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
