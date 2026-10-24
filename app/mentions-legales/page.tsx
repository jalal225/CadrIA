export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white">Mentions légales</h1>
          <p className="text-slate-400 mt-2">CadrIA - Conformité IA pour TPE-PME</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-8">
          {/* Informations légales */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Informations légales</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-3 text-slate-300">
              <p><strong className="text-white">Nom du service :</strong> CadrIA</p>
              <p><strong className="text-white">Statut :</strong> Service en ligne de diagnostic et audit de conformité IA</p>
              <p><strong className="text-white">Responsable :</strong> Jalal Seferdjeli</p>
              <p><strong className="text-white">Email :</strong> d.jale@yahoo.fr</p>
              <p><strong className="text-white">Siège social :</strong> France</p>
            </div>
          </section>

          {/* Conditions d'utilisation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Conditions d'utilisation</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                En accédant et en utilisant CadrIA, vous acceptez de respecter l'intégralité de ces conditions d'utilisation.
              </p>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-semibold mb-2">2.1 Utilisation acceptable</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Vous devez fournir des informations exactes et à jour</li>
                  <li>Vous êtes responsable de la confidentialité de vos données</li>
                  <li>Vous acceptez de ne pas utiliser le service à des fins illégales</li>
                  <li>Vous acceptez de ne pas violer les droits d'autrui</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Propriété intellectuelle</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Tous les contenus du site CadrIA (textes, images, logos, structures, codes, etc.) sont protégés par les droits d'auteur et autres droits de propriété intellectuelle.
              </p>
              <p>
                Vous ne pouvez pas reproduire, modifier, distribuer ou exploiter ces contenus sans autorisation explicite.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation de responsabilité</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                <strong className="text-white">Important :</strong> Les diagnostics et recommandations fournis par CadrIA sont des <strong>informations et aides à la mise en œuvre</strong>, et non des conseils juridiques.
              </p>
              <p>
                CadrIA ne peut être tenu responsable :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Des erreurs ou imprécisions dans les diagnostics</li>
                <li>Des pertes ou dommages résultant de l'utilisation du service</li>
                <li>Des interruptions ou dysfonctionnements techniques</li>
                <li>De la non-conformité aux lois applicables</li>
              </ul>
              <p>
                Pour des conseils juridiques spécifiques, consultez un expert en conformité ou un avocat.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Données personnelles</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                Les données personnelles que vous fournissez (email, entreprise, etc.) sont traitées conformément à notre <a href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline">politique de confidentialité</a>.
              </p>
              <p>
                Nous nous engageons à protéger vos données et à respecter le RGPD.
              </p>
            </div>
          </section>

          {/* Liens externes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Liens externes</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300 space-y-3">
              <p>
                CadrIA ne peut être tenu responsable des contenus de sites externes vers lesquels nous créons des liens.
              </p>
              <p>
                L'accès à ces sites se fait sous votre propre responsabilité.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-slate-300">
              <p>
                Pour toute question concernant ces mentions légales, veuillez nous contacter à :
              </p>
              <p className="mt-3 font-semibold text-white">
                📧 d.jale@yahoo.fr
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
