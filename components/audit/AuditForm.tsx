'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const Section3Schema = z.object({
  donnees_sensibles: z.array(z.string()).min(0),
});

const Section4Schema = z.object({
  secteur: z.string().min(1, 'Secteur requis'),
});

const Section5Schema = z.object({
  consentement_rapport: z.literal(true, {
    errorMap: () => ({ message: 'Requis' }),
  }),
  consentement_email: z.literal(true, {
    errorMap: () => ({ message: 'Requis' }),
  }),
  consentement_cgu: z.literal(true, {
    errorMap: () => ({ message: 'Requis' }),
  }),
  consentement_confidentialite: z.literal(true, {
    errorMap: () => ({ message: 'Requis' }),
  }),
  consentement_info: z.boolean().default(false),
});

type Section1FormData = z.infer<typeof Section1Schema>;
type Section2FormData = z.infer<typeof Section2Schema>;
type Section3FormData = z.infer<typeof Section3Schema>;
type Section4FormData = z.infer<typeof Section4Schema>;
type Section5FormData = z.infer<typeof Section5Schema>;

interface AuditFormState {
  section1?: Section1FormData;
  section2?: Section2FormData;
  section3?: Section3FormData;
  section4?: Section4FormData;
  section5?: Section5FormData;
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

const DONNEES_SENSIBLES_OPTIONS = [
  { id: 'clients', label: 'Données de clients / prospects (noms, emails, téléphones)' },
  { id: 'employes', label: 'Données d\'employés / RH (salaires, contrats, performances)' },
  { id: 'financieres', label: 'Données financières / comptabilité' },
  { id: 'medicales', label: 'Données médicales / santé' },
  { id: 'juridiques', label: 'Données juridiques / contrats' },
  { id: 'biometriques', label: 'Données biométriques' },
  { id: 'aucune', label: 'Aucune donnée sensible' },
  { id: 'pas_sais', label: 'Je ne sais pas / incertain' },
];

const SECTEUR_OPTIONS = [
  'Restaurant / Café / Hôtellerie',
  'Cabinet professionnel (avocat, CPA, médecin, architecte)',
  'Commerce / Retail / E-commerce',
  'Services (coiffure, nettoyage, plomberie, etc.)',
  'Santé / Bien-être / Pharmacie',
  'Éducation / Formation',
  'Industrie / Fabrication',
  'SaaS / Logiciels / Tech',
  'Média / Communication / Contenu',
  'Autre',
];

export default function AuditForm() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<AuditFormState>({});
  const [section2Selected, setSection2Selected] = useState<string[]>([]);
  const [section3Selected, setSection3Selected] = useState<string[]>([]);
  const [section4Selected, setSection4Selected] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [section5Consents, setSection5Consents] = useState({
    consentement_rapport: false,
    consentement_email: false,
    consentement_cgu: false,
    consentement_confidentialite: false,
    consentement_info: false,
  });

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

  const handleSection3Continue = () => {
    // Validate and save section 3
    const validatedData = Section3Schema.parse({ donnees_sensibles: section3Selected });
    setFormData((prev) => ({
      ...prev,
      section3: validatedData,
    }));
    setCurrentSection(4);
  };

  const handleSection4Continue = () => {
    // Validate and save section 4
    const validatedData = Section4Schema.parse({ secteur: section4Selected });
    setFormData((prev) => ({
      ...prev,
      section4: validatedData,
    }));
    setCurrentSection(5);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Validate section 5
      const validatedSection5 = Section5Schema.parse(section5Consents);

      // Combine all data
      const completeFormData = {
        ...formData.section1,
        ...formData.section2,
        ...formData.section3,
        ...formData.section4,
        ...validatedSection5,
        timestamp: new Date().toISOString(),
      };

      // Send to API
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeFormData),
      });

      if (response.ok) {
        // Send email with diagnostic report
        try {
          const emailResponse = await fetch('/api/email/send-diagnostic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.section1?.email,
              prenom: formData.section1?.prenom,
              nom: formData.section1?.nom,
              secteur: formData.section4?.secteur,
              score: 75, // TODO: Calculate actual score based on responses
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send email');
            // Don't block user - email failure is not critical
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }

        // Success - redirect to merci page
        console.log('Diagnostic submitted successfully');
        router.push('/merci');
      } else {
        console.error('Failed to submit diagnostic');
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Validation or submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
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

  const toggleDonnee = (donneeId: string) => {
    setSection3Selected((prev) =>
      prev.includes(donneeId)
        ? prev.filter((id) => id !== donneeId)
        : [...prev, donneeId]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Étape {currentSection} sur 5</span>
          <span>{Math.round((currentSection / 5) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentSection / 5) * 100}%` }}
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

        {/* SECTION 3: Données Sensibles */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Manipulez-vous des données sensibles ?
            </h2>
            <p className="text-slate-400 mb-6">
              Cochez tous les types de données sensibles que vous traitez via l'IA
            </p>

            <div className="space-y-3">
              {DONNEES_SENSIBLES_OPTIONS.map((option) => (
                <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section3Selected.includes(option.id)}
                    onChange={() => toggleDonnee(option.id)}
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
                onClick={handleSection3Continue}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4: Secteur d'Activité */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Votre secteur d'activité
            </h2>

            <div>
              <select
                value={section4Selected}
                onChange={(e) => setSection4Selected(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              >
                <option value="">-- Sélectionner un secteur --</option>
                {SECTEUR_OPTIONS.map((secteur) => (
                  <option key={secteur} value={secteur}>
                    {secteur}
                  </option>
                ))}
              </select>
              {!section4Selected && (
                <p className="text-slate-400 text-sm mt-2">
                  Sélectionnez votre secteur pour continuer
                </p>
              )}
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
                onClick={handleSection4Continue}
                disabled={!section4Selected}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* SECTION 5: Consentements */}
        {currentSection === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Consentements et conditions
            </h2>

            <div className="space-y-4">
              {/* Consentement rapport */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={section5Consents.consentement_rapport}
                  onChange={(e) =>
                    setSection5Consents((prev) => ({
                      ...prev,
                      consentement_rapport: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 mt-1 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-white">
                  Je veux recevoir le rapport de diagnostic <span className="text-red-400">*</span>
                </span>
              </label>

              {/* Consentement email */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={section5Consents.consentement_email}
                  onChange={(e) =>
                    setSection5Consents((prev) => ({
                      ...prev,
                      consentement_email: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 mt-1 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-white">
                  CadrIA peut utiliser mon email pour m'envoyer le rapport et des informations
                  <span className="text-red-400">*</span>
                </span>
              </label>

              {/* Consentement CGU */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={section5Consents.consentement_cgu}
                  onChange={(e) =>
                    setSection5Consents((prev) => ({
                      ...prev,
                      consentement_cgu: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 mt-1 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-white">
                  J'accepte les{' '}
                  <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                    conditions d'utilisation
                  </a>
                  <span className="text-red-400">*</span>
                </span>
              </label>

              {/* Consentement confidentialité */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={section5Consents.consentement_confidentialite}
                  onChange={(e) =>
                    setSection5Consents((prev) => ({
                      ...prev,
                      consentement_confidentialite: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 mt-1 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-white">
                  J'ai lu et accepté la{' '}
                  <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                    politique de confidentialité
                  </a>
                  <span className="text-red-400">*</span>
                </span>
              </label>

              {/* Consentement infos optionnel */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={section5Consents.consentement_info}
                  onChange={(e) =>
                    setSection5Consents((prev) => ({
                      ...prev,
                      consentement_info: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 mt-1 rounded bg-slate-700 border border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-slate-300">
                  J'accepte de recevoir occasionnellement des informations de CadrIA
                </span>
              </label>
            </div>

            <p className="text-slate-400 text-sm">
              <span className="text-red-400">*</span> Champs obligatoires
            </p>

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
                onClick={handleFinalSubmit}
                disabled={
                  !section5Consents.consentement_rapport ||
                  !section5Consents.consentement_email ||
                  !section5Consents.consentement_cgu ||
                  !section5Consents.consentement_confidentialite ||
                  isSubmitting
                }
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Envoi...' : 'ENVOYER MON DIAGNOSTIC →'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
