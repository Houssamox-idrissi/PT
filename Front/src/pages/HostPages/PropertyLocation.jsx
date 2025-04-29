import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyLocation() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  
  const [address, setAddress] = useState({
    street: propertyData.address?.street || '',
    city: propertyData.address?.city || '',
    state: propertyData.address?.state || '',
    country: propertyData.address?.country || '',
    postalCode: propertyData.address?.postalCode || '',
    latitude: propertyData.address?.latitude || '',
    longitude: propertyData.address?.longitude || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
    updatePropertyData({
      address: {
        ...address,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Property-Publish');
  };

  const isFormValid = () => {
    return address.street && 
           address.city && 
           address.state && 
           address.country && 
           address.postalCode;
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
                Où se trouve votre logement ?
              </h1>
              <p className="text-gray-600 text-lg">
                Votre adresse exacte ne sera pas partagée avant la réservation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Street Address */}
              <div className="space-y-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Numéro et nom de la rue"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Nom de la ville"
                  required
                />
              </div>

              {/* State/Region */}
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  Région
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Nom de la région"
                  required
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Nom du pays"
                  required
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-2">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Code postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                  placeholder="Code postal"
                  required
                />
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={address.latitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                    placeholder="Ex: 31.7917"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={address.longitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-lg"
                    placeholder="Ex: -7.0926"
                  />
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Les coordonnées exactes seront communiquées au voyageur après la confirmation de la réservation.
                </p>
              </div>
            </form>
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
              isFormValid()
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
          >
            Suivant
          </button>
        </div>
      </footer>
    </div>
  );
} 