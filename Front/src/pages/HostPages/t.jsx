import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const steps = [
  { path: '/Structure', label: 'Type' },
  { path: '/PropertyDetails', label: 'Détails' },
  { path: '/Step-2', label: 'Capacité' },
  { path: '/equipement', label: 'Équipement' },
  { path: '/Property-Photos', label: 'Photos' },
  { path: '/Property-Title', label: 'Titre' },
  { path: '/Property-Description', label: 'Description' },
  { path: '/Property-Location', label: 'Localisation' },
  { path: '/Property-Publish', label: 'Vérification' },
  { path: '/Property-Price', label: 'Prix' }
];

export default function ProgressBar() {
  const location = useLocation();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);
  const [progress, setProgress] = useState(() => {
    // Initialize with current progress
    return ((currentIndex + 1) / steps.length) * 100;
  });

  useEffect(() => {
    // Save current progress and animate to new position
    const targetProgress = ((currentIndex + 1) / steps.length) * 100;
    setProgress(targetProgress);
    localStorage.setItem('propertyProgress', currentIndex.toString());
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {/* Step indicators container */}
      <div className="absolute top-[-24px] w-full px-12">
        <div className="relative max-w-7xl mx-auto flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <div 
                key={step.path}
                className="absolute transform -translate-y-1/2"
                style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
              >
                
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50" />
      
      {/* Main progress container */}
      <div className="relative h-1.5 w-full bg-gray-100 overflow-hidden">
        {/* Animated progress bar with gradient */}
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-600 ease-in-out transform origin-left"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #F97316 0%, #FB923C 100%)',
            boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)',
            willChange: 'width, transform'
          }}
        >
          {/* Inner glow effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          />
        </div>
        
        {/* Moving shine effect */}
        <div 
          className="absolute top-0 left-0 h-full w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
          style={{ 
            transform: `translateX(${progress - 50}%)`,
            transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
} 