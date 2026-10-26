# STATUS — Solveria

_Tenu à jour par `/prime`. Vous pouvez l'éditer à la main quand vous voulez._

## En cours

- **Phase 4 — Soft Launch prep** : Vercel deploy, custom domain, analytics
- **Supabase connectivity** : déboguer après deploy sur Vercel (DNS/network issue local)

## À faire

**Phase 3 (finish) — Priority 🔴**
1. Déboguer Brevo — test email end-to-end (vérifier clé API, console logs, HTML template)
2. Atteindre Lighthouse 90+ (performance, accessibility, best practices)
3. Tests responsive complets

**Phase 4 — Soft Launch (nov 14-20)**
1. ✅ Mettre à jour pricing : 49€/mois (Basic) + 149€/mois (Premium) — **DONE (27 oct)**
2. Déployer preview Vercel (vercel.com project setup + env vars)
3. Domaine custom (registrar TBD)
4. Analytics setup (Vercel Analytics ou Plausible)
5. Déboguer Supabase (DNS/network issue)

**Phase 5 — Hard Launch (nov 21-7 jan)**
1. Paiements live + test avec vraies cartes
2. Notion API integration (audit results archiving)
3. Brevo transactionnels (receipts, account confirmations)
4. Formation/onboarding content

## Fait

- ✅ Phase 1 (oct 23-30) : 5 pages statiques, design system, composants
- ✅ Phase 2 (oct 31-nov 6) : diagnostic form, SaaS pricing, auth (signup/login/logout)
- ✅ Supabase migration (profiles, subscriptions, audits tables + RLS)
- ✅ Auth routes (signup/login/logout) avec session localStorage
- ✅ Diagnostic API (/api/diagnostic) sauvegarde en Supabase
- ✅ Route Brevo email (/api/email/send-diagnostic) — **FONCTIONNE** (sender validation fixée 25 oct 15h30)
- ✅ Route Stripe checkout + webhook (/api/stripe/checkout, /api/webhooks/stripe) — **TESTÉ & FONCTIONNE (26 oct)** — webhook reçu avec succès
- ✅ Pages principales (/, /login, /signup, /audit, /pricing, /saas, /admin, mentions-legales, confidentialite)

---

**Dernière update** : 25 oct 2026, démarrage Phase 3 finalization + Phase 4 prep
