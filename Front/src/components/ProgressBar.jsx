import React from 'react';
import { useLocation } from 'react-router-dom';

const steps = [
  { path: '/PropertyType' },
  { path: '/PropertyDetails' },
  { path: '/Etape2' },
  { path: '/Property-Amenities' },
  { path: '/Property-Photos' },
  { path: '/Property-Title' },
  { path: '/Property-Description' },
  { path: '/Property-Location' },
  { path: '/Etape3' },
  { path: '/Property-Price' }
];

export default function ProgressBar() {
  const location = useLocation();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full bg-white">
      <div className="relative h-1 bg-gray-200">
        <div 
          className="absolute h-full bg-gray-700 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 