export default function Testimonials() {
    const testimonials = [
      {
        id: 1,
        quote: "Voyageur made finding the perfect vacation rental so easy!",
        author: "Sarah Johnson",
        role: "Frequent Traveler"
      },
      {
        id: 2,
        quote: "The properties listed are exactly as described. Will definitely use again!",
        author: "Michael Chen",
        role: "Business Traveler"
      }
    ];
  
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Guests Say
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-base text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }