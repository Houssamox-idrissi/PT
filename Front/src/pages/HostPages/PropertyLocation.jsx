import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function PropertyLocation() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([31.7917, -7.0926], 6);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Create marker
      markerRef.current = L.marker([31.7917, -7.0926], { draggable: true })
        .addTo(mapInstanceRef.current);

      // Handle marker drag
      markerRef.current.on('dragend', async () => {
        const position = markerRef.current.getLatLng();
        setLocation(position);
        const results = await provider.search({ query: `${position.lat}, ${position.lng}` });
        if (results.length > 0) {
          setAddress(results[0].label);
        }
      });

      // Handle map click
      mapInstanceRef.current.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setLocation({ lat, lng });
        const results = await provider.search({ query: `${lat}, ${lng}` });
        if (results.length > 0) {
          setAddress(results[0].label);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSearch = async () => {
    if (address.trim()) {
      const results = await provider.search({ query: address });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddressSelect = (result) => {
    setAddress(result.label);
    setSearchResults([]);
    setLocation({ lat: result.y, lng: result.x });
    
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng([result.y, result.x]);
      mapInstanceRef.current.setView([result.y, result.x], 16);
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
        <div className="max-w-5xl mx-auto px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-[32px] font-semibold text-gray-900">
                Où se situe votre logement ?
              </h1>
              <p className="text-gray-600 text-lg">
                Votre adresse ne sera partagée qu'avec les voyageurs ayant une réservation confirmée.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* Address Search */}
              <div className="relative">
                <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-gray-900 transition-colors">
                  <div className="pl-4 pr-2 py-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value.length > 2) {
                        handleSearch();
                      } else {
                        setSearchResults([]);
                      }
                    }}
                    placeholder="Entrez votre adresse"
                    className="flex-1 px-2 py-3 text-lg focus:outline-none"
                  />
                  {address && (
                    <button
                      onClick={() => {
                        setAddress('');
                        setSearchResults([]);
                      }}
                      className="px-4 py-3 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-96 overflow-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddressSelect(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <p className="font-medium text-gray-900">{result.label}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                <div ref={mapRef} className="absolute inset-0" />
              </div>

              {location && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Les coordonnées exactes seront communiquées au voyageur après la confirmation de la réservation.
                  </p>
                </div>
              )}
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
            to="/property-title"
            className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
              location
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