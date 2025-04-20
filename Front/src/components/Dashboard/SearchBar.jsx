import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';

export default function SearchBar() {
  const [activeField, setActiveField] = useState(null);
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('Any week');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Current activeField:', activeField);
    console.log('Current where value:', where);
    console.log('Current when value:', when);
    console.log('Current guests value:', guests);
  }, [activeField, where, when, guests]);

  const handleGuestChange = (amount) => {
    try {
      const newValue = guests + amount;
      if (newValue >= 1 && newValue <= 10) {
        setGuests(newValue);
      }
    } catch (err) {
      console.error('Error in handleGuestChange:', err);
      setError('Failed to update guest count');
    }
  };

  const handleFieldClick = (field) => {
    try {
      console.log(`Clicked on ${field} field`);
      setActiveField(field);
    } catch (err) {
      console.error('Error in handleFieldClick:', err);
      setError('Failed to activate field');
    }
  };

  const handleOptionSelect = (field, value) => {
    try {
      console.log(`Selected ${value} for ${field}`);
      if (field === 'where') {
        setWhere(value);
      } else if (field === 'when') {
        setWhen(value);
      }
      setActiveField(null);
    } catch (err) {
      console.error('Error in handleOptionSelect:', err);
      setError('Failed to select option');
    }
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button onClick={() => setError(null)} className="absolute top-0 right-0 px-4 py-3">
          ×
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[200px] px-4">
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Main search container */}
          <div className="bg-white rounded-full shadow border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              {/* Where */}
              <div 
                className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-100 transition-all duration-200 ${activeField === 'where' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => handleFieldClick('where')}
                data-testid="where-field"
              >
                <div className="flex items-center">
                  <FiMapPin className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Where</div>
                    <input
                      type="text"
                      className="text-left w-full text-sm font-medium text-gray-700 bg-transparent border-none outline-none"
                      placeholder="Search destinations"
                      value={where}
                      onChange={(e) => setWhere(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
              
              {/* When */}
              <div 
                className={`flex-1 w-full p-4 border-b md:border-b-0 md:border-r border-gray-100 transition-all duration-200 ${activeField === 'when' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => handleFieldClick('when')}
                data-testid="when-field"
              >
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">When</div>
                    <input
                      type="text"
                      className="text-left w-full text-sm font-medium text-gray-700 bg-transparent border-none outline-none"
                      placeholder="Any week"
                      value={when}
                      onChange={(e) => setWhen(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
              
              {/* Who */}
              <div 
                className={`flex-1 w-full p-4 transition-all duration-200 ${activeField === 'who' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => handleFieldClick('who')}
                data-testid="who-field"
              >
                <div className="flex items-center">
                  <FiUsers className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Who</div>
                    <input
                      type="text"
                      className="text-left w-full text-sm font-medium text-gray-700 bg-transparent border-none outline-none"
                      placeholder="Add guests"
                      value={`${guests} guest${guests !== 1 ? 's' : ''}`}
                      readOnly
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
              
              {/* Search Button */}
              <div className="p-2">
                <button 
                  className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={() => console.log('Search clicked with:', { where, when, guests })}
                >
                  <FiSearch className="h-5 w-5" />
                  <span className="ml-2 hidden md:inline">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating active indicator */}
          {activeField && (
            <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-300 ${
              activeField === 'where' ? 'left-0 w-1/3' : 
              activeField === 'when' ? 'left-1/3 w-1/3' : 
              'left-2/3 w-1/3'
            }`}></div>
          )}
        </div>

        {/* Where dropdown */}
        {activeField === 'where' && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto border border-gray-100 animate-fadeIn">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent searches</h3>
            <div className="space-y-2">
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center"
                onClick={() => handleOptionSelect('where', 'Paris, France')}
              >
                <FiMapPin className="mr-2 text-orange-400" />
                Paris, France
              </button>
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center"
                onClick={() => handleOptionSelect('where', 'Tokyo, Japan')}
              >
                <FiMapPin className="mr-2 text-orange-400" />
                Tokyo, Japan
              </button>
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center"
                onClick={() => handleOptionSelect('where', 'New York, USA')}
              >
                <FiMapPin className="mr-2 text-orange-400" />
                New York, USA
              </button>
            </div>
          </div>
        )}

        {/* When dropdown */}
        {activeField === 'when' && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto border border-gray-100 animate-fadeIn">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Select dates</h3>
            <div className="space-y-2">
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700"
                onClick={() => handleOptionSelect('when', 'This weekend')}
              >
                This weekend
              </button>
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700"
                onClick={() => handleOptionSelect('when', 'Next week')}
              >
                Next week
              </button>
              <button 
                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm font-medium text-gray-700"
                onClick={() => handleOptionSelect('when', 'Next month')}
              >
                Next month
              </button>
            </div>
          </div>
        )}

        {/* Who dropdown */}
        {activeField === 'who' && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto border border-gray-100 animate-fadeIn">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Number of guests</h3>
            <div className="flex items-center justify-between">
              <button 
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handleGuestChange(-1)}
                disabled={guests <= 1}
              >
                -
              </button>
              <span className="text-lg font-medium">{guests} guest{guests !== 1 ? 's' : ''}</span>
              <button 
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handleGuestChange(1)}
                disabled={guests >= 10}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}