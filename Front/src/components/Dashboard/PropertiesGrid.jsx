import PropertyCard from './PropertyCard';

const sampleProperties = [
  {
    id: 1,
    title: 'Luxury Riad with Pool',
    location: 'Marrakech, Maroc',
    dates: '20–25 avr.',
    pricePerNight: 1361,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'

  },
  {
    id: 2,
    title: 'Desert View Villa',
    location: 'Marrakech, Maroc',
    dates: '25–30 avr.',
    pricePerNight: 596,
    bedrooms: 4,
    bathrooms: 3,
    image: '/dd.jpeg'
  },
  {
    id: 3,
    title: 'Traditional Medina House',
    location: 'Marrakech, Maroc',
    dates: '21–26 avr.',
    pricePerNight: 586,
    bedrooms: 2,
    bathrooms: 2,
    image: '/dd.jpeg'
  },
  {
    id: 4,
    title: 'Modern Atlas Retreat',
    location: 'Marrakech, Maroc',
    dates: '15–20 mai',
    pricePerNight: 532,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'
  },
  {
    id: 5,
    title: 'Luxury Riad with Pool',
    location: 'Marrakech, Maroc',
    dates: '20–25 avr.',
    pricePerNight: 1361,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'

  },
  {
    id: 6,
    title: 'Desert View Villa',
    location: 'Marrakech, Maroc',
    dates: '25–30 avr.',
    pricePerNight: 596,
    bedrooms: 4,
    bathrooms: 3,
    image: '/dd.jpeg'
  },
  {
    id: 7,
    title: 'Traditional Medina House',
    location: 'Marrakech, Maroc',
    dates: '21–26 avr.',
    pricePerNight: 586,
    bedrooms: 2,
    bathrooms: 2,
    image: '/dd.jpeg'
  },
  {
    id: 8,
    title: 'Modern Atlas Retreat',
    location: 'Marrakech, Maroc',
    dates: '15–20 mai',
    pricePerNight: 532,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'
  },

  {
    id: 9,
    title: 'Luxury Riad with Pool',
    location: 'Marrakech, Maroc',
    dates: '20–25 avr.',
    pricePerNight: 1361,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'

  },
  {
    id: 10,
    title: 'Desert View Villa',
    location: 'Marrakech, Maroc',
    dates: '25–30 avr.',
    pricePerNight: 596,
    bedrooms: 4,
    bathrooms: 3,
    image: '/dd.jpeg'
  },
  {
    id: 11,
    title: 'Traditional Medina House',
    location: 'Marrakech, Maroc',
    dates: '21–26 avr.',
    pricePerNight: 586,
    bedrooms: 2,
    bathrooms: 2,
    image: '/dd.jpeg'
  },
  {
    id: 12,
    title: 'Modern Atlas Retreat',
    location: 'Marrakech, Maroc',
    dates: '15–20 mai',
    pricePerNight: 532,
    bedrooms: 3,
    bathrooms: 2,
    image: '/dd.jpeg'
  }
];

export default function PropertiesGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos Propriétés Exclusives
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Des hébergements soigneusement sélectionnés pour votre voyage
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {sampleProperties.map(property => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-sm font-medium">
                <span className="text-orange-600">{property.distance}</span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 font-medium">4.92</span>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                {property.dates && (
                  <p className="mb-1">{property.dates}</p>
                )}
                {property.showMap ? (
                  <button className="text-blue-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Afficher la carte
                  </button>
                ) : (
                  <p className="text-gray-400">{property.distance}</p>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{property.pricePerNight} €</span>
                  <span className="text-gray-500"> par nuit</span>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-pink-600 transition-colors">
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="inline-block border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md text-base font-medium">
          Voir plus de propriétés
        </button>
      </div>
    </div>
  );
}