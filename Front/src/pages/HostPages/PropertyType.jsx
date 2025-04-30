import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropertyIcons } from '../../components/PropertyIcons';
import { useProperty } from '../../context/PropertyContext';
import ProgressBar from '../../components/ProgressBar';

export default function PropertyType() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  const [selectedType, setSelectedType] = useState(propertyData.type || '');

  // Update selectedType when propertyData.type changes
  useEffect(() => {
    if (propertyData.type) {
      setSelectedType(propertyData.type);
    }
  }, [propertyData.type]);

  const propertyTypes = [
    { id: 'Maison', label: 'Maison' },
    { id: 'Appartement', label: 'Appartement' },
    { id: 'Villa', label: 'Villa' },
    { id: 'Riad', label: 'Riad' },
    { id: 'Chambre privée', label: 'Chambre privée' },
    { id: 'Studio indépendant', label: 'Studio indépendant' },
    { id: 'Hôtel', label: 'Hôtel' },
    { id: 'Autres', label: 'Autres' }
  ];

  const handleTypeSelect = (type) => {
    console.log('Selected type:', type);
    setSelectedType(type);
    // Update context immediately
    updatePropertyData({ type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedType) {
      // One final update to ensure type is saved
      updatePropertyData({ type: selectedType });
      // Add a small delay to ensure the context is updated before navigation
      setTimeout(() => {
        navigate('/PropertyDetails');
      }, 100);
    }
  };

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
      <main className="pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-12">
          <h1 className="text-[32px] font-medium text-gray-900 mb-12 text-center">
            Parmi les propositions suivantes, laquelle<br />
            décrit le mieux votre logement ?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all hover:border-gray-900 hover:shadow-md ${selectedType === type.id
                    ? 'border-gray-900 shadow-md bg-gray-50'
                    : 'border-gray-200'
                  }`}
              >
                <div className={`mb-4 text-gray-700 ${selectedType === type.id ? 'text-gray-900' : ''
                  }`}>
                  {PropertyIcons[type.id]}
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {type.label}
                  {type.id === 'Autres' && (
                    <div className="mt-1 text-sm font-normal text-gray-500">
                      Lofts, duplex, habitations atypiques
                    </div>
                  )}
                </div>
                {type.id === 'Hôtel' && (
                  <div className="mt-1 text-sm text-gray-500">
                    Partenariats éventuels
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer with Progress */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
        <ProgressBar />
        <div className="max-w-7xl mx-auto px-12">
          <div className="h-20 flex items-center justify-between">
            <Link
              to="/About-your-place"
              className="text-gray-900 font-medium hover:underline"
            >
              Retour
            </Link>
            <button
              onClick={handleSubmit}
              className={`h-12 px-8 rounded-xl font-medium transition-colors ${
                selectedType
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedType}
            >
              Suivant
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
} 