'use client';

import { useState } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';

interface Diagnostic {
  id: string;
  email: string;
  entreprise: string;
  secteur: string;
  score: number;
  date: string;
  status: 'complété' | 'en attente' | 'contact pris';
}

const MOCK_DIAGNOSTICS: Diagnostic[] = [
  {
    id: '1',
    email: 'd.jale@yahoo.fr',
    entreprise: 'Ma Startup',
    secteur: 'SaaS / Logiciels / Tech',
    score: 75,
    date: '2024-10-24',
    status: 'complété',
  },
  {
    id: '2',
    email: 'contact@cabinet-legal.fr',
    entreprise: 'Cabinet Juridique XYZ',
    secteur: 'Cabinet professionnel',
    score: 62,
    date: '2024-10-23',
    status: 'complété',
  },
  {
    id: '3',
    email: 'info@ecommerce.fr',
    entreprise: 'E-commerce Store',
    secteur: 'Commerce / Retail',
    score: 58,
    date: '2024-10-22',
    status: 'en attente',
  },
  {
    id: '4',
    email: 'admin@clinique.fr',
    entreprise: 'Clinique Santé Plus',
    secteur: 'Santé / Bien-être',
    score: 81,
    date: '2024-10-21',
    status: 'contact pris',
  },
];

export default function AdminPage() {
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic | null>(null);

  const filteredDiagnostics = MOCK_DIAGNOSTICS.filter((d) =>
    d.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'complété': 'bg-green-500/20 text-green-400',
      'en attente': 'bg-yellow-500/20 text-yellow-400',
      'contact pris': 'bg-blue-500/20 text-blue-400',
    };
    return colors[status as keyof typeof colors] || colors['en attente'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">CadrIA Admin</h1>
            <p className="text-slate-400 text-sm">Gestion des diagnostics</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/saas"
              className="text-slate-300 hover:text-white transition-colors"
            >
              ← Mon dashboard
            </Link>
            <div className="w-px h-6 bg-slate-700"></div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Total diagnostics</p>
            <p className="text-3xl font-bold text-white">{MOCK_DIAGNOSTICS.length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Complétés</p>
            <p className="text-3xl font-bold text-green-400">
              {MOCK_DIAGNOSTICS.filter((d) => d.status === 'complété').length}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">En attente</p>
            <p className="text-3xl font-bold text-yellow-400">
              {MOCK_DIAGNOSTICS.filter((d) => d.status === 'en attente').length}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Score moyen</p>
            <p className="text-3xl font-bold text-blue-400">
              {Math.round(
                MOCK_DIAGNOSTICS.reduce((sum, d) => sum + d.score, 0) /
                  MOCK_DIAGNOSTICS.length
              )}%
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher par email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entreprise</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Secteur</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredDiagnostics.map((diagnostic) => (
                <tr key={diagnostic.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-medium">{diagnostic.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{diagnostic.entreprise}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{diagnostic.secteur}</td>
                  <td className={`px-6 py-4 text-sm font-semibold ${getScoreColor(diagnostic.score)}`}>
                    {diagnostic.score}%
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(diagnostic.status)}`}>
                      {diagnostic.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{diagnostic.date}</td>
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    <button
                      onClick={() => setSelectedDiagnostic(diagnostic)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                    >
                      Voir
                    </button>
                    <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors">
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDiagnostics.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            Aucun diagnostic trouvé
          </div>
        )}

        {/* Detail Modal */}
        {selectedDiagnostic && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-2xl w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedDiagnostic.email}</h2>
                  <p className="text-slate-400">{selectedDiagnostic.entreprise}</p>
                </div>
                <button
                  onClick={() => setSelectedDiagnostic(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Score de conformité</p>
                  <p className={`text-3xl font-bold ${getScoreColor(selectedDiagnostic.score)}`}>
                    {selectedDiagnostic.score}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Secteur</p>
                  <p className="text-white font-medium">{selectedDiagnostic.secteur}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedDiagnostic.status)}`}>
                    {selectedDiagnostic.status}
                  </span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Date</p>
                  <p className="text-white font-medium">{selectedDiagnostic.date}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Exporter PDF
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Contacter
                </button>
                <button
                  onClick={() => setSelectedDiagnostic(null)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
