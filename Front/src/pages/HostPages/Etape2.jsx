import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyPhotos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="px-12 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-black">
            <img src="/logo.png" alt="Holi Square" className="h-14" />
          </Link>
          <div className="flex items-center gap-6">
          </div>
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
                  <p className="text-orange-600 font-medium">Étape 2</p>
                </div>
                <h1 className="text-[40px] sm:text-[48px] font-semibold text-gray-900 leading-[1.1]">
                  Faites sortir votre<br />
                  annonce du lot
                </h1>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                Mettez en valeur votre bien avec des photos de qualité et une description détaillée. 
                Ajoutez les équipements disponibles et créez une annonce qui se démarque.
              </p>

              <div className="pt-4">
                <ul className="space-y-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900">Photos attrayantes</h3>
                      <p className="text-gray-600">Ajoutez au moins 5 photos de qualité montrant les différents espaces</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900">Description complète</h3>
                      <p className="text-gray-600">Rédigez un titre accrocheur et une description détaillée</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-900">Équipements disponibles</h3>
                      <p className="text-gray-600">Listez tous les équipements et services offerts aux voyageurs</p>
                    </div>
                  </li>
                </ul>
              </div>
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
                    src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high"
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
            to="/PropertyDetails"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link
            to="/property-amenities"
            className="bg-orange-600 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-orange-700 transition-colors"
          >
            Continuer
          </Link>
        </div>
      </footer>
    </div>
  );
} 