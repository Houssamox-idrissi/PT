import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

export default function BecomeHost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="px-12 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-black">
            <img src="/logo.png" alt="Holi Square" className="h-14" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="inline-block px-4 py-2 bg-orange-50 rounded-full">
                  <p className="text-orange-600 font-medium">Première étape</p>
                </div>
                <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 leading-[1.1]">
                  Créez votre espace<br />sur Holi Square
                </h1>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                Commencez par nous décrire votre bien immobilier. Indiquez s'il s'agit d'un appartement complet,
                d'une maison entière ou d'une chambre privée. Précisez le nombre de
                personnes que vous pouvez accueillir confortablement. Ces informations nous aideront à mieux
                présenter votre offre aux voyageurs.
              </p>

              <div className="pt-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Type de votre logement</span>
                  </li>
                
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Capacité d'accueil</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="hidden lg:block">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-xs">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  loop
                >
                  <source
                    src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
                    type="video/mp4"
                  />
                  Votre navigateur ne prend pas en charge la lecture de vidéos.
                </video>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Progress */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
        <ProgressBar />
        <div className="max-w-7xl mx-auto px-12">
          <div className="h-20 flex items-center justify-between">
            <Link
              to="/BecomeHost"
              className="text-gray-900 font-medium text-base hover:underline"
            >
              Retour
            </Link>
            <Link
              to="/Structure"
              className="bg-orange-600 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-orange-700 transition-colors"
            >
              Suivant
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 