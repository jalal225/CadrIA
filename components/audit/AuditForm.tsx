'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Section1Schema = z.object({
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  fonction: z.string().optional(),
  effectif: z.enum([
    '1_person',
    '2_5',
    '6_10',
    '11_50',
    '51_100',
    '100_plus',
  ]),
});

const Section2Schema = z.object({
  outils_ia: z.array(z.string()).min(0),
});

type Section1FormData = z.infer<typeof Section1Schema>;
type Section2FormData = z.infer<typeof Section2Schema>;

interface AuditFormState {
  section1?: Section1FormData;
  section2?: Section2FormData;
  // TODO: Add other sections
}

const OUTILS_IA_OPTIONS = [
  { id: 'chatgpt', label: 'ChatGPT (OpenAI)' },
  { id: 'claude', label: 'Claude (Anthropic)' },
  { id: 'midjourney', label: 'Midjourney (génération d\'images)' },
  { id: 'make', label: 'Make.com (automatisation)' },
  { id: 'n8n', label: 'n8n (automatisation)' },
  { id: 'zapier', label: 'Zapier (automatisation)' },
  { id: 'autre', label: 'Autre plateforme IA' },
  { id: 'api_custom', label: 'API/Code custom IA' },
  { id: 'aucun', label: 'Aucun outil IA (encore)' },
  { id: 'pas_sais', label: 'Je ne sais pas' },
];

export default function AuditForm() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<AuditFormState>({});
  const [section2Selected, setSection2Selected] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Section1FormData>({
    resolver: zodResolver(Section1Schema),
    defaultValues: formData.section1,
  });

  const onSubmit = (data: Section1FormData) => {
    // Save section 1 data and move to next section
    setFormData((prev) => ({
      ...prev,
      section1: data,
    }));
    setCurrentSection(2);
  };

  const handleSection2Continue = () => {
    // Validate and save section 2
    const validatedData = Section2Schema.parse({ outils_ia: section2Selected });
    setFormData((prev) => ({
      ...prev,
      section2: validatedData,
    }));
    setCurrentSection(3);
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const toggleTool = (toolId: string) => {
    setSection2Selected((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Étape {currentSection} sur 7</span>
          <span>{Math.round((currentSection / 7) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentSection / 7) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* SECTION 1: Infos Personnelles */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Vos informations personnelles
            </h2>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Prénom *
              </label>
              <input
                type="text"
                placeholder="Jean"
                {...register('prenom')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
              {errors.prenom && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.prenom.message}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nom *
              </label>
              <input
                type="text"
                placeholder="Dupont"
                {...register('nom')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
              {errors.nom && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.nom.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="jean@example.com"
                {...register('email')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                {...register('telephone')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Entreprise / Organisation
              </label>
              <input
                type="text"
                placeholder="Ma Startup"
                {...register('entreprise')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Fonction */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Votre fonction / Titre
              </label>
              <input
                type="text"
                placeholder="Fondateur / Directeur"
                {...register('fonction')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Effectif */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Effectif de l'entreprise *
              </label>
              <select
                {...register('effectif')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              >
                <option value="">-- Sélectionner --</option>
                <option value="1_person">1 personne (indépendant)</option>
                <option value="2_5">2-5 personnes</option>
                <option value="6_10">6-10 personnes</option>
                <option value="11_50">11-50 personnes</option>
                <option value="51_100">51-100 personnes</option>
                <option value="100_plus">+100 personnes</option>
              </select>
              {errors.effectif && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.effectif.message}
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentSection === 1}
                className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                ← Retour
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: Outils IA */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quels outils IA utilisez-vous régulièrement ?
            </h2>
            <p className="text-slate-400 mb-6">
              Cochez tous les outils que vous utilisez
            </p>

            <div className="space-y-3">
              {OUTILS_IA_OPTIONS.map((option) => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section2Selected.includes(option.id)}
                    onChange={() => toggleTool(option.id)}
                    className="w-5 h-5 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={handleSection2Continue}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
