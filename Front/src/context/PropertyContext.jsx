import React, { createContext, useContext, useState, useCallback } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState({});

  const updatePropertyData = useCallback((newData) => {
    setPropertyData(prev => {
      const updated = {
        ...prev,
        ...newData
      };
      localStorage.setItem('propertyData', JSON.stringify(updated));
      return updated;
    });
  }, []);

  React.useEffect(() => {
    const savedData = localStorage.getItem('propertyData');
    if (savedData) {
      setPropertyData(JSON.parse(savedData));
    }
  }, []);

  return (
    <PropertyContext.Provider value={{ propertyData, updatePropertyData}}>
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