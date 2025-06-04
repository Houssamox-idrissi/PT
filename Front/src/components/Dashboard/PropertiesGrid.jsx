import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { getLogements } from '../../services/logements/logementService';

export default function PropertiesGrid({ searchParams }) {
  const [allProperties, setAllProperties] = useState([]); 
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogement = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getLogements();
      if (data && Array.isArray(data)) {
        setAllProperties(data);
        applyFilters(data); 
      } else {
        setAllProperties([]);
        setFilteredProperties([]);
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error("Error fetching logements:", error);
      setError('Failed to load properties. Please try again later.');
      setAllProperties([]);
      setFilteredProperties([]);
    } finally {
      setIsLoading(false);
    }
  }

  const applyFilters = (properties) => {
    if (!searchParams || Object.keys(searchParams).length === 0) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(property => {
      if (searchParams.location) {
        const searchLocation = searchParams.location.toLowerCase();
        const propertyLocation = (
          (property.address.country || '') +
          (property.address.city || '')
        ).toLowerCase();

        if (!propertyLocation.includes(searchLocation)) {
          return false;
        }
      }

      if (searchParams.startDate && searchParams.endDate) {
        const startDate = new Date(searchParams.startDate);
        const endDate = new Date(searchParams.endDate);

        if (property.availableDates) {
          const availableStart = new Date(property.availableDates.start);
          const availableEnd = new Date(property.availableDates.end);

          if (startDate < availableStart || endDate > availableEnd) {
            return false;
          }
        }
      }

      if (searchParams.guests) {
        if (property.capacity < parseInt(searchParams.guests)) {
          return false;
        }
      }
      return true;
    });

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    fetchLogement();
  }, []); 

  useEffect(() => {
    if (allProperties.length > 0) {
      applyFilters(allProperties);
    }
  }, [searchParams]);

  return (
    <div className=" bg-[#fcfcfc] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-semibold text-[#222222]">
          Nos Propriétés Exclusives
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Des hébergements soigneusement sélectionnés pour votre voyage
        </p>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Recherche en cours...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchLogement}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Aucune propriété ne correspond à vos critères de recherche.</p>
          {allProperties.length > 0 && (
            <button
              onClick={() => setFilteredProperties(allProperties)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Afficher toutes les propriétés
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-full px-4 sm:px-">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}