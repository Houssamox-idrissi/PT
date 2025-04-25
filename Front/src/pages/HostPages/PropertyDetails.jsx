import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyDetails() {
  const [details, setDetails] = useState({
    capacity: 1,
    bedrooms: 1,
    basePrice: ''
  });

  const handleIncrement = (field) => {
    const maxValues = {
      capacity: 10,
      bedrooms: 5,
    };
    
    setDetails(prev => ({
      ...prev,
      [field]: Math.min(prev[field] + 1, maxValues[field])
    }));
  };

  const handleDecrement = (field) => {
    setDetails(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - 1, 1)
    }));
  };


  const isValid = details.capacity > 0 && details.bedrooms > 0;

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
        <div className="max-w-3xl mx-auto px-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-[32px] font-medium text-gray-900">
                Donnez les informations principales<br />
                concernant votre logement
              </h1>
              <p className="mt-4 text-gray-500">
                Vous pourrez ajouter d'autres informations plus tard, comme les équipements disponibles.
              </p>
            </div>

            <div className="space-y-8 mt-8">
              {/* Capacity */}
              <div className="flex items-center justify-between py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Voyageurs</h2>
                  <p className="text-gray-500 text-sm mt-1">Capacité d'accueil</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement('capacity')}
                    className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center ${
                      details.capacity === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-gray-900'
                    }`}
                    disabled={details.capacity === 1}
                  >
                    <span className="sr-only">Réduire</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeWidth="2" d="M4 8h8" />
                    </svg>
                  </button>
                  <span className="w-12 text-center text-lg">{details.capacity}</span>
                  <button
                    onClick={() => handleIncrement('capacity')}
                    className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center ${
                      details.capacity === 10 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-gray-900'
                    }`}
                    disabled={details.capacity === 10}
                  >
                    <span className="sr-only">Augmenter</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeWidth="2" d="M8 4v8M4 8h8" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex items-center justify-between py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Chambres</h2>
                  <p className="text-gray-500 text-sm mt-1">Nombre de chambres</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrement('bedrooms')}
                    className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center ${
                      details.bedrooms === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-gray-900'
                    }`}
                    disabled={details.bedrooms === 1}
                  >
                    <span className="sr-only">Réduire</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeWidth="2" d="M4 8h8" />
                    </svg>
                  </button>
                  <span className="w-12 text-center text-lg">{details.bedrooms}</span>
                  <button
                    onClick={() => handleIncrement('bedrooms')}
                    className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center ${
                      details.bedrooms === 5 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-gray-900'
                    }`}
                    disabled={details.bedrooms === 5}
                  >
                    <span className="sr-only">Augmenter</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeWidth="2" d="M8 4v8M4 8h8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link
            to="/Structure"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link to="/Step-2"
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              isValid 
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            Suivant
          </Link>
        </div>
      </footer>
    </div>
  );
} 