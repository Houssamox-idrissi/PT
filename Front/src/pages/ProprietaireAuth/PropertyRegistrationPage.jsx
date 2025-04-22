import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyRegistrationForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.title || !formData.location || !formData.pricePerNight) {
      setError("Please fill in all required fields");
      return;
    }
    
    console.log("Property registration data:", formData);
    // Simulate successful submission
    navigate("/proprietaire/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Property Registration Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Add Your Property</h2>
            <p className="text-amber-100 mt-2">List your space with Voyageur</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Beautiful Beachfront Villa"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Describe your property's features and amenities..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-stone-700 mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </div>

                {/* Price Per Night */}
                <div>
                  <label htmlFor="pricePerNight" className="block text-sm font-medium text-stone-700 mb-1">
                    Price Per Night (USD) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-stone-400">$</span>
                    </div>
                    <input
                      type="number"
                      id="pricePerNight"
                      name="pricePerNight"
                      value={formData.pricePerNight}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="pl-10 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="150.00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Info (simulated) */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Owner Information</h3>
                <p className="text-sm text-amber-700">
                  Property will be registered under your account: <span className="font-medium">owner@example.com</span>
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-stone-700">
                  I agree to the <a href="#" className="text-amber-600 hover:text-amber-500">terms and conditions</a> *
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Add Property
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Voyageur Properties
          </p>
        </div>
      </div>
    </div>
  );
}