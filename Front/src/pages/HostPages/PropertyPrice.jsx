import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyPrice() {
  const [basePrice, setBasePrice] = useState(330);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const serviceFee = Math.round(basePrice * 0.142); // 14.2% service fee
  const totalPrice = basePrice + serviceFee;
  const hostEarnings = Math.round(basePrice * 0.97); // Host keeps 97%

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '' || parseInt(value) === 0) {
      setBasePrice(0);
    } else {
      setBasePrice(parseInt(value));
    }
  };

  const handleEditClick = () => {
    const input = document.getElementById('price-input');
    input.focus();
    input.setSelectionRange(0, String(basePrice).length);
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
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-[32px] font-semibold text-gray-900">
                À présent, fixez votre prix
              </h1>
              <p className="text-gray-600 text-lg">
                Vous pouvez le modifier à tout moment.
              </p>
            </div>

            <div className="space-y-8">
              {/* Price Input */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex items-center">
                  <span className="text-[96px] font-semibold">MAD</span>
                  <input
                    id="price-input"
                    type="text"
                    value={basePrice}
                    onChange={handlePriceChange}
                    className="text-[96px] font-semibold w-[300px] focus:outline-none text-center"
                  />
                  <button
                    onClick={handleEditClick}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="max-w-lg mx-auto w-full">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full flex items-center justify-between text-gray-600 hover:text-gray-900 py-4 px-6 rounded-t-xl border-2 border-gray-200"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Prix à payer par le voyageur (hors taxes) MAD{totalPrice}
                  </span>
                  <svg className={`w-5 h-5 transform transition-transform ${showBreakdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showBreakdown && (
                  <div className="border-2 border-t-0 border-gray-200 rounded-b-xl p-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Prix de base</span>
                      <span>MAD{basePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de service voyageur</span>
                      <span>MAD{serviceFee}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between font-medium">
                      <span>Prix à payer par le voyageur (hors taxes)</span>
                      <span>MAD{totalPrice}</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                  <span>Vous gagnez</span>
                  <span className="font-medium">MAD{hostEarnings}</span>
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium underline">
                    En savoir plus sur la tarification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className='mt-8'></div>

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
            to="/property-publish"
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              basePrice > 0
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Créer une annonce
          </Link>
        </div>
      </footer>
    </div>
  );
} 