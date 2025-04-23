import React from 'react';
import { Link } from 'react-router-dom';

export default function BecomeHost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="px-8 py-6 flex justify-between items-center">
          <Link to="/" className="text-black">
            <img src="/logo.png" alt="Holi Square" className="h-13" />
          </Link>
          <Link to="/" className="text-gray-900 hover:text-gray-700 font-medium text-base">
            Quitter
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left Column */}
            <div className="space-y-16">
              <h1 className="text-[48px] font-medium text-gray-900 leading-[1.1]">
                Devenez hôte sur<br />
                Holi Square en 3 étapes
              </h1>

              {/* Steps */}
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium text-lg">
                    1
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      Décrivez votre espace
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Partagez les détails essentiels de votre logement : localisation, capacité d'accueil, et équipements disponibles.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium text-lg">
                    2
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      Créez une annonce attractive
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Mettez en valeur votre logement avec des photos de qualité, un titre accrocheur et une description détaillée.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium text-lg">
                    3
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      Lancez votre activité
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Définissez vos tarifs, configurez votre calendrier et publiez votre annonce pour commencer à recevoir des réservations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        <div className='mt-8' ></div>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-end">
          <Link
            to="/About-your-place"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-orange-700 transition-colors"
          >
            Commencer
          </Link>
        </div>
      </footer>
    </div>
  );
} 