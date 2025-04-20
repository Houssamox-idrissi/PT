import { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';

export default function SearchBar() {
  const [activeField, setActiveField] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-[200px] px-4">
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Main search container */}
          <div className="bg-white rounded-full shadow-2xs border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              {/* Where */}
              <div 
                className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-100 transition-all duration-200 ${activeField === 'where' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
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
                className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-100 transition-all duration-200 ${activeField === 'when' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
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

          {/* Floating active indicator (extra creative touch) */}
          {activeField && (
            <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-300 ${
              activeField === 'where' ? 'left-0 w-1/3' : 
              activeField === 'when' ? 'left-1/3 w-1/3' : 
              'left-2/3 w-1/3'
            }`}></div>
          )}
        </div>

        {/* Optional: Recent searches dropdown that appears when clicking "Where" */}
        {activeField === 'where' && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto border border-gray-100 animate-fadeIn">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent searches</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center">
                <FiMapPin className="mr-2 text-orange-400" />
                Paris, France
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center">
                <FiMapPin className="mr-2 text-orange-400" />
                Tokyo, Japan
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center">
                <FiMapPin className="mr-2 text-orange-400" />
                New York, USA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}