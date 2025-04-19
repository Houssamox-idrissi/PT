import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          className="w-full h-full object-cover" 
          src={property.image} 
          alt={property.title}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          ${property.pricePerNight}/night
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2">{property.bedrooms} beds</span>
          <span className="mr-2">•</span>
          <span>{property.bathrooms} baths</span>
        </div>
        <Link 
          to={`/properties/${property.id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}