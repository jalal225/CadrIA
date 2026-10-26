# Solveria — SaaS Conformité IA

## Qu'est-ce que c'est

**Solveria** : plateforme SaaS d'audit et conformité IA pour PME/ETI francophones.
- **Audit gratuit** : diagnostic en ligne (15 min) sur RGPD/IA Act/Omnibus
- **Abonnement premium** : rapport détaillé + veille réglementaire + recommandations
- **Modèle** : inspiré de conformityia.fr, mais entièrement propriétaire

## État du projet

| Phase | Dates | État | Livrables |
|-------|-------|------|-----------|
| **1** | 23-30 oct | ✅ Fait | 5 pages statiques, design system, composants |
| **2** | 31 oct-6 nov | ✅ Fait | Diagnostic form interactif, SaaS pricing, Calendly |
| **3** | 7-13 nov | ⚙️ ~90% | Balance 3D, animations, Lighthouse 90+ |
| **4** | 14-20 nov | ⏳ À venir | Vercel deploy, domaine, analytics |
| **5** | 21 nov-7 jan | ⏳ À venir | Stripe live, Brevo transactionnels, Notion |

## Stack

- **Frontend** : Next.js 16, React 19, TypeScript, Tailwind 4.0, Framer Motion
- **Auth** : Supabase Auth + localStorage (client) + Map en mémoire (server)
- **Database** : Supabase (profiles, subscriptions, audits tables avec RLS)
- **Email** : Brevo (diagnostic reports) — **problématique : aucun email reçu hier**
- **Paiement** : Stripe (à configurer — clés manquantes)
- **Déploiement** : Vercel (prévu Phase 4)

## Architecture: Claude (80%) vs Dev Backend (20%)

**Claude Code** : pages, formulaires, animations, dashboard UI, tests, validation
**Dev Backend** : NextAuth, API routes, Supabase, Stripe, Brevo, DB schema, sécurité

## Au démarrage

`/prime` se lance au début de chaque session. Il lit `STATUS.md` pour le reste à faire.

**À relire à chaque fois** :
- [Feuille de route globale](/Users/seferdjeli/Desktop/Solveria_Feuille_Route_Globale.html) — timeline, jalons, responsabilités
- `.env.local` — clés Supabase, Brevo (vérifier aucune clé Stripe)
- `migrations/001_initial_schema.sql` — schéma BD, RLS policies

**À surveiller** :
- **Brevo** : API de diagnostic email — vérifier logs API, tester webhooks
- **Stripe** : docs pricing, taux de conversion (changements pricing API)
- **RGPD/IA Act** : nouvelles lignes directrices (Commission Européenne, CNIL)

**À faire aussi au démarrage** :
- ⚠️ **PRICING FIXÉ** : Deux plans payants — **49€/mois** et **149€/mois** (à implémenter avant Vercel, Phase 4)

## Contacts & Resources

- **Repo** : https://github.com/jalal225/cadria (8 commits ahead of main)
- **Dev local** : `npm run dev` → localhost:3000
- **Conformityia ref** : https://conformityia.fr (modèle pricing + contenu)
