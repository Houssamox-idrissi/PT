import { useState, useEffect, useRef } from 'react';
import { FiUser, FiLogIn, FiHome, FiHelpCircle, FiGlobe, FiStar, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      {/* User button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-all duration-200 group"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center text-white">
          <FiUser className="h-4 w-4" />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
          {/* Not logged in state */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700">Welcome to Holi Square</h3>
            <p className="text-xs text-gray-500">Sign in for personalized experiences</p>
          </div>

          <div className="py-1">
            <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FiLogIn className="mr-3 text-orange-500" />
              <span>Login as Voyageur</span>
            </button>
            <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FiHome className="mr-3 text-orange-500" />
              <span>Become a Host</span>
            </button>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Additional options */}
          <div className="py-1">
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FiHelpCircle className="mr-3 text-gray-500" />
              <span>Help Center</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FiGlobe className="mr-3 text-gray-500" />
              <span>Language & Currency</span>
            </button>
          </div>

          {/* Logged in state (hidden by default) */}
          {/* <div className="py-1">
            <div className="px-4 py-3 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center text-white mr-3">
                <FiUser className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium">John Doe</h4>
                <p className="text-xs text-gray-500">Verified Host</p>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiUser className="mr-3" />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiStar className="mr-3" />
              <span>My Reviews</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiHeart className="mr-3" />
              <span>Wishlists</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiHome className="mr-3" />
              <span>Host Dashboard</span>
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiSettings className="mr-3" />
              <span>Account Settings</span>
            </button>
            <div className="border-t border-gray-100"></div>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FiLogOut className="mr-3" />
              <span>Logout</span>
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}