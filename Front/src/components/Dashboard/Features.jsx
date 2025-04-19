export default function Features() {
    const features = [
      {
        name: 'Verified Properties',
        description: 'All listings are carefully vetted to ensure quality',
        icon: '✅'
      },
      {
        name: '24/7 Support',
        description: 'Our team is always available to assist you',
        icon: '📞'
      },
      {
        name: 'Easy Booking',
        description: 'Simple and secure booking process',
        icon: '📅'
      }
    ];
  
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Voyageur
            </h2>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto text-xl">
                    {feature.icon}
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }