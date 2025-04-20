import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

const FrenchDatePicker = ({ onDatesSelected, isActive, setActiveField }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const pickerRef = useRef(null);

  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      onDatesSelected(update[0], update[1]);
      // Optional: auto-close after selecting both dates
      setActiveField(null);
    }
  };

  const formatDisplayText = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
    }
    return "Ajouter des dates";
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, setActiveField]);

  return (
    <div className="w-full relative" ref={pickerRef}>
      <button
        className="text-left w-full text-sm font-medium text-gray-700"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setActiveField('when');
        }}
      >
        {formatDisplayText()}
      </button>

      {isActive && (
        <div className="absolute left-0 z-50 mt-2 bg-white shadow-xl rounded-lg p-4 border border-gray-200">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            monthsShown={2}
            inline
            locale="fr"
            minDate={new Date()}
            calendarStartDay={1}
          />
        </div>
      )}
    </div>
  );
};

export default FrenchDatePicker;
