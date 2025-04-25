import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyPublish() {
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
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="inline-block px-4 py-2 bg-orange-50 rounded-full">
                  <p className="text-orange-600 font-medium">Étape 3</p>
                </div>
                <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 leading-[1.1]">
                  Terminez et publiez
                </h1>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                Enfin, vous définissez votre
                tarification et publiez votre annonce.
              </p>
            </div>

            {/* Right Column - Video */}
            <div className="hidden lg:block">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden">
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
                    src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high"
                    type="video/mp4"
                  />
                  Votre navigateur ne prend pas en charge la lecture de vidéos.
                </video>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link
            to="/property-description"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link
            to="/property-settings"
            className="bg-orange-600 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-orange-700 transition-colors"
          >
            Continuer
          </Link>
        </div>
      </footer>
    </div>
  );
} 