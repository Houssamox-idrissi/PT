import PropertyCard from './PropertyCard';

const sampleProperties = [
  {
    id: 1,
    title: 'Luxury Beachfront Villa',
    location: 'Bali, Indonesia',
    pricePerNight: 250,
    bedrooms: 3,
    bathrooms: 2,
    image: '/property-1.jpg'
  },
  {
    id: 2,
    title: 'Modern Downtown Apartment',
    location: 'Paris, France',
    pricePerNight: 180,
    bedrooms: 2,
    bathrooms: 1,
    image: '/property-2.jpg'
  },
  {
    id: 3,
    title: 'Mountain View Cabin',
    location: 'Aspen, USA',
    pricePerNight: 150,
    bedrooms: 2,
    bathrooms: 1,
    image: '/property-3.jpg'
  },
  {
    id: 4,
    title: 'Historic City Loft',
    location: 'Rome, Italy',
    pricePerNight: 200,
    bedrooms: 1,
    bathrooms: 1,
    image: '/property-4.jpg'
  }
];

export default function PropertiesGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Featured Properties
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
          Handpicked accommodations for your next adventure
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {sampleProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        {/* <Link 
          to="/properties"
          className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-base font-medium"
        >
          View All Properties
        </Link> */}
      </div>
    </div>
  );
}