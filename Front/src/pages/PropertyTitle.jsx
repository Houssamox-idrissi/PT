import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyTitle() {
  const [title, setTitle] = useState('');
  const maxLength = 32;

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setTitle(value);
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
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-full hover:bg-gray-50">
              Des questions ?
            </button>
            <button className="text-gray-900 hover:text-gray-700 font-medium px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300">
              Enregistrer et quitter
            </button>
          </div>
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
          <Link
            to="/property-description"
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              title.trim().length > 0
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