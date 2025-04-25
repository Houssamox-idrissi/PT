import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyLocation() {
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Load Google Maps Script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    // Initialize map centered on Morocco
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 31.7917, lng: -7.0926 },
      zoom: 6,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Initialize the autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('address-input'),
      { 
        componentRestrictions: { country: 'MA' },
        fields: ['address_components', 'geometry', 'name'],
      }
    );

    // Create marker
    const marker = new window.google.maps.Marker({
      map,
      draggable: true,
    });

    markerRef.current = marker;

    // Handle place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        map.setCenter(place.geometry.location);
        map.setZoom(17);
        marker.setPosition(place.geometry.location);
        setShowMap(true);
      }
    });

    // Handle marker drag
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      setLocation({
        lat: position.lat(),
        lng: position.lng(),
      });
      reverseGeocode(position);
    });

    // Handle map click
    map.addListener('click', (e) => {
      marker.setPosition(e.latLng);
      setLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      reverseGeocode(e.latLng);
    });
  };

  const reverseGeocode = async (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setSearchResults([]);
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
                    id="address-input"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Entrez votre adresse"
                    className="flex-1 px-2 py-3 text-lg focus:outline-none"
                  />
                  {address && (
                    <button
                      onClick={() => setAddress('')}
                      className="px-4 py-3 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddressSelect(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">{result}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                <div ref={mapRef} className="absolute inset-0" />
                {!showMap && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <p className="text-gray-500">Recherchez une adresse pour afficher la carte</p>
                    </div>
                  </div>
                )}
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