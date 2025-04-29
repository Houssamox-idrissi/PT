import React, { createContext, useContext, useState, useCallback } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState({
    type: '',
    capacity: '',
    nombreOfChambres: '',
    equipement: [],
    // photos: [],
    title: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      latitude: 0,
      longitude: 0
    },
    pricePerNight: 0
  });

  const updatePropertyData = useCallback((newData) => {
    setPropertyData(prev => {
      const updated = {
        ...prev,
        ...newData
      };
      // Store in localStorage for persistence
      localStorage.setItem('propertyData', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Load saved data on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('propertyData');
    if (savedData) {
      setPropertyData(JSON.parse(savedData));
    }
  }, []);

  const submitProperty = async () => {
    try {
      const response = await fetch('http://192.168.1.111:8080/api/logements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit property');
      }
      
      const data = await response.json();
      // Clear saved data after successful submission
      localStorage.removeItem('propertyData');
      return data;
    } catch (error) {
      console.error('Error submitting property:', error);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{ propertyData, updatePropertyData, submitProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}; 