import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiMenu, FiX } from 'react-icons/fi';
import { NavLink} from "react-router-dom";
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between h-22 items-center transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'}`}>
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
                  src="/logo.png"
                  alt="Logo"
                />
                <span className={`ml-2 font-bold text-orange-500 hidden sm:block transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                  Holi Square
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 text-xl font-medium rounded-md transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                Logements
              </NavLink>

              <NavLink
                to="/destinations"
                className={({ isActive }) =>
                  `px-3 py-2 text-xl font-medium rounded-md transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                Destinations
              </NavLink>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link to="/HostLogin" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                Become a Host
              </Link>
            <UserDropdown></UserDropdown>

            </div>

            {/* Mobile menu button */}
            
          </div>
        </div>

        {/* Search Bar - Now part of the navbar */}
        <div className={`max-w-4xl mx-auto px-4 transition-all duration-500 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto pb-4'}`}>
          <div className="relative">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-center">
                {/* Where */}
                <div
                  className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-200 transition-all duration-200 ${activeField === 'where' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveField('where')}
                >
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-2" />
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Where</div>
                      <button className="text-left w-full text-sm font-medium text-gray-700">
                        Search destinations
                      </button>
                    </div>
                  </div>
                </div>

                {/* When */}
                <div
                  className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-200 transition-all duration-200 ${activeField === 'when' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveField('when')}
                >
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">When</div>
                      <button className="text-left w-full text-sm font-medium text-gray-700">
                        Any week
                      </button>
                    </div>
                  </div>
                </div>

                {/* Who */}
                <div
                  className={`flex-1 w-full p-4 transition-all duration-200 ${activeField === 'who' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveField('who')}
                >
                  <div className="flex items-center">
                    <FiUsers className="text-gray-400 mr-2" />
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Who</div>
                      <button className="text-left w-full text-sm font-medium text-gray-700">
                        Add guests
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="p-2">
                  <button className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                    <FiSearch className="h-5 w-5" />
                    <span className="ml-2 hidden md:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating active indicator */}
            {activeField && (
              <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-300 ${activeField === 'where' ? 'left-0 w-1/3' :
                  activeField === 'when' ? 'left-1/3 w-1/3' :
                    'left-2/3 w-1/3'
                }`}></div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
              <Link to="/stays" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Stays</Link>
              <Link to="/experiences" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Experiences</Link>
              <Link to="/destinations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Destinations</Link>
              <Link to="/host" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Become a Host</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Floating search bar that appears when scrolled */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center p-2">
            <button
              className="flex-1 flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-l-full transition-colors"
              onClick={() => setActiveField('where')}
            >
              <FiMapPin className="text-gray-400 mr-2" />
              <span>Where to?</span>
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <button
              className="flex-1 p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setActiveField('when')}
            >
              Any week
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <button
              className="flex-1 p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setActiveField('who')}
            >
              Add guests
            </button>
            <button className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-md ml-2">
              <FiSearch className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}