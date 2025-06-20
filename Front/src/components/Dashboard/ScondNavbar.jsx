import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from "react-router-dom";
import UserDropdown from './UserDropdown';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

                        {/* Navigation Links - Always visible on desktop */}
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
                                Activités
                            </NavLink>

                            <Link to="/AgenceRegistration" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                                Devenir une agence
                            </Link>
                            <UserDropdown />
                        </div>

                        {/* Mobile menu button */}
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
        </div>
    );
}