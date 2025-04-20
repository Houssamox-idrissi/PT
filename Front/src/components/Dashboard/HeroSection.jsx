export default function HeroSection() {
    return (
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/hh.jpg"
            alt="Beautiful travel destination"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Stay
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Discover unique accommodations around the world with Voyageur
          </p>
          <div className="mt-10">
            <div className="relative max-w-md">
              <input
                type="text"
                className="block w-full text-white rounded-md border-transparent py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring"
                placeholder="Search destinations..."
              />
              <button className="absolute right-1.5 top-1.5 bg-black  text-white py-2 px-4 rounded-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }