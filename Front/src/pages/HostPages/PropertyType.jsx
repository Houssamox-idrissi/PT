import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyIcons } from '../../components/PropertyIcons';

export default function PropertyType() {
  const [selectedType, setSelectedType] = useState(null);

  const propertyTypes = [
    { id: 'maison', label: 'Maison' },
    { id: 'appartement', label: 'Appartement' },
    { id: 'villa', label: 'Villa' },
    { id: 'riad', label: 'Riad' },
    { id: 'chambre-privee', label: 'Chambre privée' },
    { id: 'studio-independant', label: 'Studio indépendant' },
    { id: 'hotel', label: 'Hôtel' },
    { id: 'autres', label: 'Autres' }
  ];

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
        <div className="max-w-5xl mx-auto px-12">
          <h1 className="text-[32px] font-medium text-gray-900 mb-12 text-center">
            Parmi les propositions suivantes, laquelle<br />
            décrit le mieux votre logement ?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all hover:border-gray-900 hover:shadow-md ${
                  selectedType === type.id 
                    ? 'border-gray-900 shadow-md bg-gray-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`mb-4 text-gray-700 ${
                  selectedType === type.id ? 'text-gray-900' : ''
                }`}>
                  {PropertyIcons[type.id]}
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {type.label}
                  {type.id === 'autres' && (
                    <div className="mt-1 text-sm font-normal text-gray-500">
                      Lofts, duplex, habitations atypiques
                    </div>
                  )}
                </div>
                {type.id === 'hotel' && (
                  <div className="mt-1 text-sm text-gray-500">
                    Partenariats éventuels
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
         <div className='mt-8'></div>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link
            to="/About-your-place"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link to="/PropertyDetails"
                      className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              selectedType 
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedType}
          >
            Suivant
          </Link>
        </div>
      </footer>
    </div>
  );
} 