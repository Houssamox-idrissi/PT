import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                className="h-12 w-auto" 
                src="/logo.png" 
                alt="Voyageur Logo"
              />
              <span className="ml-2 text-xl font-bold text-orange-500 hidden sm:block">Holi Square</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                Stays
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/properties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Properties</Link>
                <Link to="/properties?type=apartment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apartments</Link>
                <Link to="/properties?type=villa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Villas</Link>
                <Link to="/properties?type=cabin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cabins</Link>
              </div>
            </div>

            <Link to="/experiences" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
              Experiences
            </Link>

            <Link to="/destinations" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
              Destinations
            </Link>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                More
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</Link>
                <Link to="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</Link>
                <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</Link>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/host" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
              Become a Host
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                <div className="border-t border-gray-100"></div>
                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to="/properties" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Properties</Link>
            <Link to="/experiences" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Experiences</Link>
            <Link to="/destinations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Destinations</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Guest</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Register</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}