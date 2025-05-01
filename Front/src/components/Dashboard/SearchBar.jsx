import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/calendar.css';

export default function SearchBar({ onSearch, scrolled }) {
  const [activeField, setActiveField] = useState(null);
  const [where, setWhere] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [guests, setGuests] = useState(1);
  const containerRef = useRef(null);

  // Toggle field activation
  const toggleField = (field) => {
    if (activeField === field) {
      setActiveField(null);
      setShowCalendar(false);
    } else {
      setActiveField(field);
      setShowCalendar(field === 'when');
    }
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setActiveField(null);
  };

  // Handle guest count changes
  const handleGuestChange = (amount) => {
    const newValue = guests + amount;
    if (newValue >= 1 && newValue <= 10) {
      setGuests(newValue);
    }
  };

  // Format date display
  const formatDate = () => {
    if (!selectedDate) return 'Sélectionner une date';
    return selectedDate.toLocaleDateString('fr', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Close all dropdowns when clicking outside
  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setActiveField(null);
      setShowCalendar(false);
    }
  };

  // Add click outside listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearch = () => {
    setIsSearching(true);
    // Create search parameters object
    const searchParams = {
      location: where,
      date: selectedDate ? selectedDate.toISOString() : null,
      guests: guests
    };

    // Call the parent component's onSearch function
    if (onSearch) {
      onSearch(searchParams);
    }
    setIsSearching(false);
  };

  // Custom header for the date picker with month/year navigation
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
        type="button"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <h2 className="text-lg font-semibold">
        {date.toLocaleString('fr', { month: 'long', year: 'numeric' })}
      </h2>

      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
        type="button"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className={`flex justify-center items-center transition-all duration-300 ${scrolled ? 'py-0' : 'py-4'}`}>
      <div className={`w-full transition-all duration-300 ${scrolled ? 'scale-100' : 'max-w-3xl scale-100'}`}>
        <div className="relative" ref={containerRef}>
          {/* Main search container */}
          <div className={`bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center">
              {/* Where */}
              <div
                className={`search-field flex-1 w-full ${scrolled ? 'p-2' : 'p-4'} border-b md:border-b-0 md:border-r border-gray-200 transition-all duration-200 ${activeField === 'where' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleField('where')}
              >
                <div className="flex items-center">
                  <FiMapPin className={`text-gray-500 mr-2 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`} />
                  <div className="w-full">
                    <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
                      Destination
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        className={`text-left w-full bg-transparent border-none outline-none placeholder-gray-400 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-sm'}`}
                        placeholder="Rechercher une destination"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {activeField === 'where' ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* When */}
              <div
                className={`search-field flex-1 w-full ${scrolled ? 'p-2' : 'p-4'} border-b md:border-b-0 md:border-r border-gray-200 transition-all duration-200 ${activeField === 'when' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleField('when')}
              >
                <div className="flex items-center">
                  <FiCalendar className={`text-gray-500 mr-2 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`} />
                  <div className="w-full">
                    <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
                      Quand ?
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-gray-800 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-sm'}`}>
                        {formatDate()}
                      </span>
                      {activeField === 'when' ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Who */}
              <div
                className={`search-field flex-1 w-full ${scrolled ? 'p-2' : 'p-4'} transition-all duration-200 ${activeField === 'who' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleField('who')}
              >
                <div className="flex items-center">
                  <FiUsers className={`text-gray-500 mr-2 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`} />
                  <div className="w-full">
                    <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
                      Voyageurs
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-gray-800 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-sm'}`}>
                        {guests} voyageur{guests > 1 ? 's' : ''}
                      </span>
                      {activeField === 'who' ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className={`${scrolled ? 'p-1' : 'p-2'}`}>
                <button
                  onClick={handleSearch}
                  className={`${scrolled ? 'p-2' : 'p-3'} bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white hover:from-orange-600 hover:to-pink-600 transition-all duration-200 flex items-center`}
                >
                  <FiSearch size={scrolled ? 16 : 20} />
                  <span className=""></span>
                </button>
              </div>
            </div>
          </div>

          {/* Date Picker Dropdown */}
          {showCalendar && activeField === 'when' && (
            <div className="absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                locale={fr}
                renderCustomHeader={CustomHeader}
                calendarClassName="custom-calendar"
                showMonthYearDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          )}

          {/* Guests Dropdown */}
          {activeField === 'who' && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">Voyageurs</div>
                  <div className="text-sm text-gray-500">Nombre de voyageurs</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGuestChange(-1);
                    }}
                    className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center ${
                      guests === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
                    }`}
                    disabled={guests === 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{guests}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGuestChange(1);
                    }}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

