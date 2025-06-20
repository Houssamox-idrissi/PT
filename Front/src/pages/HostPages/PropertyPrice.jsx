import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import ProgressBar from '../../components/ProgressBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export default function PropertyPrice() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  const [basePrice, setBasePrice] = useState(propertyData.pricePerNight || 330);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const serviceFee = Math.round(basePrice * 0.142);
  const totalPrice = basePrice + serviceFee;
  const hostEarnings = Math.round(basePrice * 0.97);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [createdProperty, setCreatedProperty] = useState(null);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '' || parseInt(value) === 0) {
      setBasePrice(0);
      updatePropertyData({ pricePerNight: 0 });
    } else {
      setBasePrice(parseInt(value));
      updatePropertyData({ pricePerNight: parseInt(value) });
    }
  };

  const handleEditClick = () => {
    const input = document.getElementById('price-input');
    input.focus();
    input.setSelectionRange(0, String(basePrice).length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!basePrice || isSubmitting) return;

    const requiredFields = [
      { field: propertyData.type, message: 'Le type de propriété est requis' },
      { field: propertyData.capacity, message: 'La capacité est requise' },
      { field: propertyData.nombreOfChambres, message: 'Le nombre de chambres est requis' },
      { field: propertyData.title, message: 'Le titre est requis' },
      { field: propertyData.description, message: 'La description est requise' },
      { field: propertyData.address.street, message: 'L\'adresse est requise' },
      { field: propertyData.address.city, message: 'La ville est requise' },
      { field: propertyData.address.country, message: 'Le pays est requis' }
    ];

    const missingField = requiredFields.find(field => !field.field);
    if (missingField) {
      setError(missingField.message);
      return;
    }

    const validTypes = ['Maison', 'Appartement', 'Villa', 'Riad', 'Chambre privée', 'Studio indépendant', 'Hôtel', 'Autres'];
    if (!validTypes.includes(propertyData.type)) {
      setError('Le type de propriété n\'est pas valide. Veuillez choisir parmi: ' + validTypes.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (!propertyData.title || !propertyData.description || !propertyData.type ||
        !propertyData.capacity || !propertyData.nombreOfChambres || !basePrice) {
        setError('Tous les champs obligatoires doivent être remplis');
        return;
      }

      if (!propertyData.address || !propertyData.address.street || !propertyData.address.city ||
        !propertyData.address.country) {
        setError('L\'adresse complète est requise');
        return;
      }

      let processedImages = [];
      if (Array.isArray(propertyData.imagesBase64)) {
        processedImages = propertyData.imagesBase64.map((img, index) => {
          if (typeof img === 'string') {
            const base64Match = img.match(/^data:image\/[a-z]+;base64,(.+)$/);
            const base64Content = base64Match ? base64Match[1] : img;
            if (!base64Content || base64Content.trim() === '') {
              throw new Error(`Image ${index + 1} is empty or invalid`);
            }
            try {
              atob(base64Content);
            } catch (e) {
              throw new Error(`Image ${index + 1} is not a valid base64 string`);
            }
            return base64Content;
          }
          return null;
        }).filter(Boolean);
      }

      const capacity = Number(propertyData.capacity);
      const nombreOfChambres = Number(propertyData.nombreOfChambres);
      const pricePerNight = Number(basePrice);

      if (isNaN(capacity) || capacity <= 0) {
        setError('La capacité doit être un nombre positif');
        return;
      }

      if (isNaN(nombreOfChambres) || nombreOfChambres <= 0) {
        setError('Le nombre de chambres doit être un nombre positif');
        return;
      }

      if (isNaN(pricePerNight) || pricePerNight <= 0) {
        setError('Le prix par nuit doit être un nombre positif');
        return;
      }

      const propertyToSubmit = {
        title: propertyData.title.trim(),
        address: {
          street: propertyData.address.street.trim(),
          city: propertyData.address.city.trim(),
          state: propertyData.address.state ? propertyData.address.state.trim() : '',
          country: propertyData.address.country.trim(),
          postalCode: propertyData.address.postalCode ? propertyData.address.postalCode.trim() : '',
          latitude: Number(propertyData.address.latitude) || 0,
          longitude: Number(propertyData.address.longitude) || 0
        },
        type: propertyData.type.trim(),
        capacity: capacity,
        description: propertyData.description.trim(),
        nombreOfChambres: nombreOfChambres,
        pricePerNight: pricePerNight,
        equipement: Array.isArray(propertyData.equipement) ? propertyData.equipement.map(e => e.trim()).filter(Boolean) : [],
        imagesBase64: processedImages
      };

      if (processedImages.length === 0) {
        setError('Au moins une image est requise');
        return;
      }

      const allowedTypes = ['Maison', 'Appartement', 'Villa', 'Riad', 'Chambre privée', 'Studio indépendant', 'Hôtel', 'Autres'];
      if (!allowedTypes.includes(propertyToSubmit.type)) {
        setError(`Le type de propriété doit être l'un des suivants: ${allowedTypes.join(', ')}`);
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      };

      const response = await api.post('/api/logements', propertyToSubmit, config);

      if (response.status === 201 || response.status === 200) {
        setCreatedProperty(response.data); // Stockez les données de la réponse
        setShowSuccessAlert(true); // Affichez l'alerte
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }

    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          setError(`Erreur du serveur: ${errorMessage}`);
        } else {
          setError(`Erreur du serveur: ${errorData}`);
        }
      } else if (error.code === 'ERR_NETWORK') {
        setError('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
      } else if (error.code === 'ERR_BAD_REQUEST') {
        setError('Format de données invalide. Veuillez vérifier les informations saisies.');
      } else {
        setError(`Erreur: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl p-8 max-w-md w-full animate-pop-in shadow-xl">
            <div className="flex flex-col items-center text-center">
              {/* Icône de succès */}
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              {/* Titre et message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Logement créé avec succès !</h3>
              <p className="text-gray-600 mb-6">
                Votre logement "{createdProperty?.title}" a été enregistré dans notre système.
              </p>

              {/* Détails supplémentaires */}
              <div className="w-full bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{createdProperty?.type}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Capacité:</span>
                  <span className="font-medium">{createdProperty?.capacity} personnes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix/nuit:</span>
                  <span className="font-medium text-orange-500">{createdProperty?.pricePerNight}DH</span>
                </div>
              </div>

              {/* Bouton de confirmation */}
              <button
                onClick={() => navigate('/Logements')}
                className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}



      <div className="min-h-screen bg-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
          <div className="px-12 py-6 flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" className="text-black">
              <img src="/logo.png" alt="Holi Square" className="h-14" />
            </Link>
          </div>
        </header>

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

        <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
          <ProgressBar />
          <div className="max-w-7xl mx-auto px-12">
            <div className="h-20 flex items-center justify-between">
              <Link
                to="/Property-Publish"
                className="text-gray-900 font-medium text-base hover:underline"
              >
                Retour
              </Link>
              <button
                onClick={handleSubmit}
                disabled={!basePrice || isSubmitting}
                className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${basePrice && !isSubmitting
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? 'Publication...' : 'Publier l\'annonce'}
              </button>
            </div>
          </div>
        </footer>

        {error && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  )
}