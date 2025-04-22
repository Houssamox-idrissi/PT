import React from 'react';
import { Link } from 'react-router-dom';

export default function BecomeHost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-black">
            <img src="/logo.png" alt="Holi Square" className="h-8" />
          </Link>
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Des questions ?
            </button>
            <button className="text-gray-900 hover:text-gray-700 font-medium text-sm">
              Enregistrer et quitter
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600 text-lg">Étape 1</p>
                <h1 className="text-[32px] sm:text-[44px] font-medium text-gray-900 leading-[1.1]">
                  Parlez-nous de<br />votre logement
                </h1>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                Au cours de cette étape, nous allons vous demander quel type de logement vous proposez et si les voyageurs pourront le réserver dans son intégralité ou si vous ne louez qu'une chambre. Nous vous demanderons ensuite d'indiquer son emplacement et sa capacité d'accueil.
              </p>
            </div>

            {/* Right Column - Illustration */}
            <div className="hidden lg:block">
              <img 
                src="/images/host/step1-illustration.png" 
                alt="Illustration d'un logement" 
                className="w-full max-w-lg"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link
            to="/host"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link
            to="/host/step2"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-gray-800 transition-colors"
          >
            Suivant
          </Link>
        </div>
      </footer>
    </div>
  );
} 