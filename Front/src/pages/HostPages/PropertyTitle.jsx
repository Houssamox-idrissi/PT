import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyTitle() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  const [title, setTitle] = useState(propertyData.title || '');
  const maxLength = 32;

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setTitle(value);
      updatePropertyData({ title: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length > 0) {
      navigate('/Property-Description');
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
                À présent, donnez un titre à votre annonce (type : appartement)
              </h1>
              <p className="text-gray-600 text-lg">
                Les titres courts sont généralement les plus efficaces. Ne vous inquiétez
                pas, vous pourrez toujours le modifier plus tard.
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <textarea
                  value={title}
                  onChange={handleTitleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 resize-none text-lg"
                  placeholder="Exemple : Appartement lumineux avec vue sur la mer"
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {title.length}/{maxLength}
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
            to="/property-photos"
            className="text-gray-900 font-medium text-base hover:underline"
          >
            Retour
          </Link>
          <button
            onClick={handleSubmit}
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              title.trim().length > 0
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={title.trim().length === 0}
          >
            Suivant
          </button>
        </div>
      </footer>
    </div>
  );
} 