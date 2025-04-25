import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyDescription() {
  const [description, setDescription] = useState('');
  const maxLength = 500;

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setDescription(value);
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
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-[32px] font-semibold text-gray-900">
                Créez votre description
              </h1>
              <p className="text-gray-600 text-lg">
                Racontez ce qui rend votre logement unique.
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Décrivez l'ambiance de votre logement, les points d'intérêt à proximité, et ce qui rend votre espace spécial..."
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {description.length}/{maxLength}
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
            to="/Property-Description"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <Link
            to="/Property-Publish"
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              description.trim().length > 0
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Suivant
          </Link>
        </div>
      </footer>
    </div>
  );
} 