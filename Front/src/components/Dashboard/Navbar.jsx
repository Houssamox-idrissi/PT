import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import UserDropdown from './UserDropdown';
import SearchBar from './SearchBar';

export default function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isNowScrolled = window.scrollY >= 30;
      setScrolled(prevScrolled => {
        if (prevScrolled !== isNowScrolled) {
          return isNowScrolled;
        }
        return prevScrolled;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className={`${scrolled ? 'h-16' : 'h-24'} transition-all duration-300`}></div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className={`bg-[#fafafa] transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}>
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className={`transition-all duration-300 ${scrolled ? 'h-8' : 'h-12'}`}
                    src="/logo.png"
                    alt="Logo"
                  />
                  <span className={`ml-2 font-bold text-orange-500 hidden sm:block transition-all duration-300 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
                    Square Holi
                  </span>
                </Link>
              </div>

              {scrolled && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
                  <SearchBar onSearch={onSearch} scrolled={scrolled} />
                </div>
              )}

              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link to="/AgenceRegistration" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                  Devenir une agence
                </Link>
                <UserDropdown />
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                >
                  {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Accueil</Link>
                <Link to="/stays" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Séjours</Link>
                <Link to="/experiences" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Expériences</Link>
                <Link to="/destinations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Destinations</Link>
                <Link to="/host" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Devenir hôte</Link>
              </div>
            </div>
          )}

          {!scrolled && <SearchBar onSearch={onSearch} scrolled={scrolled} />}
        </nav>
      </div>
    </>
  );
}
