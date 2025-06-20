export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Contenu principal du pied de page */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Colonne de la marque */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="Logo Holi Square" 
                className="h-14 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-white">Holi Square</span>
            </div>
            <p className="text-gray-400 mb-6">
              Redéfinir les expériences de voyage grâce à des hébergements d'exception à travers le monde.
            </p>
            <div className="flex space-x-4">
              {/* Réseaux sociaux */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                {/* Facebook Icon */}
                {/* ... */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                {/* Instagram Icon */}
                {/* ... */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                {/* Twitter Icon */}
                {/* ... */}
              </a>
            </div>
          </div>

          {/* Colonnes de navigation */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* Explorer */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Explorer
                </h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Expériences</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides de voyage</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Offres saisonnières</a></li>
                </ul>
              </div>

              {/* Héberger */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Héberger
                </h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Devenir hôte</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ressources pour hôtes</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Normes de sécurité</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Forum de la communauté</a></li>
                </ul>
              </div>

              {/* Assistance */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Assistance
                </h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Informations de sécurité</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Options d'annulation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Signaler un problème</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section légale */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Holi Square, Inc. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Politique de confidentialité</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Conditions d'utilisation</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Politique des cookies</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Plan du site</a>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            <p>Holi Square est une marque déposée de Holi Square, Inc. Toutes les autres marques sont la propriété de leurs détenteurs respectifs.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
