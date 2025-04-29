import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyAmenities() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  const [selectedAmenities, setSelectedAmenities] = useState(new Set(propertyData.equipement || []));

  const amenities = [
    {
      id: 'wifi',
      name: 'Wi-Fi',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
    },
    {
      id: 'pool',
      name: 'Piscine',
      subtitle: 'Privée ou partagée',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3m18 0V6c0 1.66-4.03 3-9 3s-9-1.34-9-3v6m18 0v6c0 1.66-4.03 3-9 3s-9-1.34-9-3v-6" />
        </svg>
      ),
    },
    {
      id: 'parking',
      name: 'Parking',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'ac',
      name: 'Climatisation',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'kitchen',
      name: 'Cuisine équipée',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 3v4a1 1 0 01-1 1H8a1 1 0 01-1-1V3m8 10v8m-8-8v8m0-8h8m-8 0H4m12 0h4" />
        </svg>
      ),
    },
    {
      id: 'tv',
      name: 'Smart TV',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'washer',
      name: 'Machine à laver',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 0v14M20 5v14m-7-7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'outdoor',
      name: 'Espace extérieur',
      subtitle: 'Jardin, terrasse, patio',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      id: 'bbq',
      name: 'Barbecue',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m6-3v3M6 3v3m-3 3h18M6 12h.01M12 12h.01M18 12h.01M6 16h.01M12 16h.01M18 16h.01M6 20h12" />
        </svg>
      ),
    },
    {
      id: 'private-access',
      name: 'Accès indépendant',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'view',
      name: 'Vue',
      subtitle: 'Mer ou campagne',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: 'services',
      name: 'Services inclus',
      subtitle: 'Ménage, linge, etc.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  const toggleAmenity = (id) => {
    const newSelected = new Set(selectedAmenities);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAmenities(newSelected);
    updatePropertyData({ equipement: Array.from(newSelected) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Property-Photos');
  };

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
        <div className="max-w-3xl mx-auto px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-orange-50 rounded-full">
                <p className="text-orange-600 font-medium">Étape 3</p>
              </div>
              <h1 className="text-[32px] font-semibold text-gray-900">
                Indiquez aux voyageurs quels sont les équipements de votre logement
              </h1>
              <p className="text-gray-600 text-lg">
                Sélectionnez les équipements et caractéristiques disponibles dans votre logement.
                Vous pourrez en ajouter d'autres plus tard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all hover:border-gray-900 ${selectedAmenities.has(amenity.id)
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200'
                  }`}
                >
                  <div className="text-gray-700">{amenity.icon}</div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{amenity.name}</h3>
                    {amenity.subtitle && (
                      <p className="text-sm text-gray-500">{amenity.subtitle}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className='mt-8' ></div>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link
            to="/Step-2"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <button
            onClick={handleSubmit}
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${selectedAmenities.size > 0
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={selectedAmenities.size === 0}
          >
            Continuer
          </button>
        </div>
      </footer>
    </div>
  );
} 