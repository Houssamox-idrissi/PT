import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  // Add fallbacks for missing data
  if (!property) return null;

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        {property.imagesBase64?.[0] ? (
          <img
            src={`data:image/jpeg;base64,${property.imagesBase64[0]}`}
            alt={property.title || 'Property image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
  className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform duration-200 bg-transparent"
  onClick={e => {
    e.stopPropagation();
    // Add your favorite toggle logic here
  }}
>
  <FiHeart 
    className="w-5 h-5" 
    fill="#3d3b38" 
    stroke="white" 
    strokeWidth="1.5"
  />
</button>
        {/* Image Navigation Dots */}
        {property.imagesBase64?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.imagesBase64.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {property.title || 'No title available'}
            </h3>
            <p className="text-gray-500">{property.address.country || 'Location not specified'}, {property.address.city}</p>
          </div>
          {property.rating && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-900 font-medium">{property.rating}</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          <span className="text-lg font-semibold text-gray-900">
            {property.pricePerNight ? `${property.pricePerNight} ` : 'Price not available'}
          </span>
          {property.pricePerNight && <span className="text-gray-500"> par nuit</span>}
        </div>
      </div>
    </div>
  );
}