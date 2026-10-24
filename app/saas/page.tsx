'use client';

import { useState } from 'react';
import Link from 'next/link';

type TabType = 'resultats' | 'compte' | 'historique' | 'actions';

export default function SaasPage() {
  const [activeTab, setActiveTab] = useState<TabType>('resultats');

  const tabs = [
    { id: 'resultats', label: 'Résultats du diagnostic', icon: '📊' },
    { id: 'compte', label: 'Mon compte', icon: '👤' },
    { id: 'historique', label: 'Historique', icon: '📋' },
    { id: 'actions', label: 'Actions recommandées', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">CadrIA</h1>
            <p className="text-slate-400 text-sm">Dashboard de conformité IA</p>
          </div>
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Résultats du diagnostic */}
            {activeTab === 'resultats' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Résultats de votre diagnostic
                </h2>
                <div className="space-y-6">
                  {/* Score global */}
                  <div className="bg-slate-900 rounded p-4">
                    <p className="text-slate-400 text-sm mb-2">Score de conformité IA</p>
                    <p className="text-4xl font-bold text-blue-400">75%</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Votre organisation respecte 75% des bonnes pratiques
                    </p>
                  </div>

                  {/* Risques */}
                  <div className="bg-slate-900 rounded p-4">
                    <h3 className="text-white font-semibold mb-4">Risques identifiés</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-xl">⚠️</span>
                        <div>
                          <p className="text-white font-medium">Transparence insuffisante</p>
                          <p className="text-slate-400 text-sm">Vous n'informez pas vos utilisateurs de l'usage de l'IA</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">⚡</span>
                        <div>
                          <p className="text-white font-medium">Données sensibles à risque</p>
                          <p className="text-slate-400 text-sm">Vous traitez des données clients via des outils IA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points forts */}
                  <div className="bg-slate-900 rounded p-4">
                    <h3 className="text-white font-semibold mb-4">Points forts</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <p className="text-slate-300">Vous avez établi une charte interne d'usage IA</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <p className="text-slate-300">Votre équipe a reçu une formation sur l'IA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mon compte */}
            {activeTab === 'compte' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Mon compte</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Email</p>
                    <p className="text-white font-medium">user@example.com</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Entreprise</p>
                    <p className="text-white font-medium">Ma Startup</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Secteur</p>
                    <p className="text-white font-medium">SaaS / Logiciels / Tech</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Effectif</p>
                    <p className="text-white font-medium">6-10 personnes</p>
                  </div>
                </div>
              </div>
            )}

            {/* Historique */}
            {activeTab === 'historique' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Historique des audits</h2>
                <p className="text-slate-400">Aucun audit précédent. Vous pouvez refaire un diagnostic à tout moment.</p>
              </div>
            )}

            {/* Actions recommandées */}
            {activeTab === 'actions' && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Actions recommandées</h2>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded p-4 border-l-4 border-blue-500">
                    <p className="text-white font-medium">1. Mettre à jour votre politique de confidentialité</p>
                    <p className="text-slate-400 text-sm mt-1">Mentionner explicitement l'usage des outils IA</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4 border-l-4 border-blue-500">
                    <p className="text-white font-medium">2. Revoir les contrats avec vos fournisseurs IA</p>
                    <p className="text-slate-400 text-sm mt-1">Ajouter des clauses de conformité RGPD/IA</p>
                  </div>
                  <div className="bg-slate-900 rounded p-4 border-l-4 border-blue-500">
                    <p className="text-white font-medium">3. Audit présentiel recommandé</p>
                    <p className="text-slate-400 text-sm mt-1">Analyser en détail votre infrastructure IA</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Statut</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Diagnostic</p>
                  <p className="text-green-400 font-medium">✓ Complété</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Rapport</p>
                  <p className="text-blue-400 font-medium">📧 En attente d'email</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Besoin d'un audit approfondi ?</h3>
              <p className="text-slate-300 text-sm mb-4">
                Contactez notre équipe pour un diagnostic présentiel
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Demander un audit
              </button>
            </div>

            {/* Refaire audit */}
            <Link
              href="/audit"
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
            >
              Refaire un diagnostic
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
