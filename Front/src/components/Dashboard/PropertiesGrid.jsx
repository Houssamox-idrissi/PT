import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const sampleProperties = [
  {
    id: 1,
    title: 'Luxury Riad with Pool',
    location: 'Islande',
    dates: '10-15 mai',
    pricePerNight: 715,
    rating: '4,94',
    image: '/test.png'
  },
  {
    id: 2,
    title: 'Desert View Villa',
    location: 'Vestnes, Norvège',
    dates: '2-7 mai',
    pricePerNight: 632,
    rating: '5,0',
    image: '/test.png'
  },
  {
    id: 3,
    title: 'Traditional House',
    location: 'Enontekiö, Finlande',
    dates: '1-6 oct.',
    pricePerNight: 593,
    rating: '4,96',
    image: '/test.png'
  },
  {
    id: 4,
    title: 'Modern Retreat',
    location: 'Molde, Norvège',
    dates: '1-6 mai',
    pricePerNight: 569,
    rating: '4,97',
    image: '/test.png'
  },
  {
    id: 5,
    title: 'Cozy Cabin',
    location: 'Blåmolia, Norvège',
    dates: '1-6 mai',
    pricePerNight: 486,
    rating: '4,86',
    image: '/test.png'
  }
];

export default function PropertiesGrid({ searchParams }) {
  const [properties, setProperties] = useState(sampleProperties);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams) {
      setIsLoading(true);
      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        const filteredProperties = sampleProperties.filter(property => {
          // Filter by location if provided
          if (searchParams.location && !property.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
            return false;
          }
          // Filter by date range if provided
          if (searchParams.startDate && searchParams.endDate) {
            // Add date filtering logic here
            return true;
          }
          // Filter by guests if provided
          if (searchParams.guests && property.bedrooms < searchParams.guests) {
            return false;
          }
          return true;
        });
        setProperties(filteredProperties);
        setIsLoading(false);
      }, 1000);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      ) : properties.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Aucune propriété ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}