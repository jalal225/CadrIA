export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white">Politique de confidentialité</h1>
          <p className="text-slate-400 mt-2">Solveria - Protection de vos données personnelles</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300">
              <p>
                Solveria respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
              <p className="mt-3">
                Cette politique s'applique à tous les services fournis par Solveria, y compris notre plateforme de diagnostic IA et notre dashboard.
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Quelles données collectons-nous ?</h2>
            <div className="space-y-4 text-slate-300">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-semibold mb-2">1.1 Données fournies directement</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Prénom et nom</li>
                  <li>Email</li>
                  <li>Téléphone (optionnel)</li>
                  <li>Entreprise / Organisation</li>
                  <li>Fonction / Titre</li>
                  <li>Effectif de l'entreprise</li>
                  <li>Secteur d'activité</li>
                  <li>Réponses au diagnostic IA</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-semibold mb-2">1.2 Données techniques</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages visitées et temps passé</li>
                  <li>Références (source d'arrivée)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Comment utilisons-nous vos données ?</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Générer votre diagnostic de conformité IA</li>
                <li>Envoyer votre rapport par email</li>
                <li>Vous contacter si vous acceptez les communications</li>
                <li>Améliorer nos services et recommandations</li>
                <li>Analyser les tendances de conformité IA (données anonymisées)</li>
                <li>Respecter les obligations légales</li>
              </ul>
            </div>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Base légale du traitement</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong className="text-white">Consentement</strong> : Via le formulaire de diagnostic</li>
                <li><strong className="text-white">Intérêt légitime</strong> : Amélioration du service</li>
                <li><strong className="text-white">Obligations légales</strong> : Conservation des données</li>
              </ul>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Partage de vos données</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Nous ne partageons pas vos données personnelles avec des tiers, sauf :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>À nos prestataires techniques (hébergement, email) sous contrat de confidentialité</li>
                <li>Si la loi nous y oblige (police, autorités)</li>
                <li>Avec votre consentement explicite</li>
              </ul>
              <p className="mt-3">
                Vos données ne sont jamais vendues à des tiers commerciaux.
              </p>
            </div>
          </section>

          {/* Conservation des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Durée de conservation</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <div className="space-y-2 text-sm">
                <p><strong className="text-white">Données de diagnostic :</strong> 24 mois (ou selon obligations légales)</p>
                <p><strong className="text-white">Données de contact :</strong> Jusqu'à désabonnement</p>
                <p><strong className="text-white">Cookies/données techniques :</strong> 13 mois maximum</p>
              </div>
              <p className="mt-3">
                Vous pouvez demander la suppression de vos données à tout moment.
              </p>
            </div>
          </section>

          {/* Droits RGPD */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Vos droits RGPD</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong className="text-white">Droit d'accès</strong> : Obtenir une copie de vos données</li>
                <li><strong className="text-white">Droit de rectification</strong> : Corriger vos informations</li>
                <li><strong className="text-white">Droit à l'oubli</strong> : Demander la suppression de vos données</li>
                <li><strong className="text-white">Droit à la portabilité</strong> : Recevoir vos données dans un format standard</li>
                <li><strong className="text-white">Droit d'opposition</strong> : Refuser certains traitements</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, écrivez-nous à : <span className="text-blue-400">d.jale@yahoo.fr</span>
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Sécurité des données</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Nous mettons en place des mesures de sécurité pour protéger vos données :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Chiffrement en transit (HTTPS/TLS)</li>
                <li>Bases de données sécurisées</li>
                <li>Accès restreint aux données</li>
                <li>Conformité avec les standards de sécurité</li>
              </ul>
              <p className="mt-3">
                Cependant, aucune transmission sur Internet ne peut être garantie 100% sécurisée.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Solveria utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Analyser l'utilisation du site (Google Analytics)</li>
                <li>Améliorer votre expérience utilisateur</li>
                <li>Mémoriser vos préférences</li>
              </ul>
              <p className="mt-3">
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Contact DPO */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Nous contacter</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300">
              <p>
                Pour toute question concernant cette politique ou vos données :
              </p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Email :</strong> d.jale@yahoo.fr</p>
              </div>
              <p className="mt-4 text-sm">
                Vous avez également le droit de déposer une plainte auprès de votre autorité de protection des données (ex: CNIL en France).
              </p>
            </div>
          </section>

          {/* Last updated */}
          <div className="text-center text-slate-500 text-sm border-t border-slate-700 pt-6 mt-8">
            <p>Dernière mise à jour : 24 octobre 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
