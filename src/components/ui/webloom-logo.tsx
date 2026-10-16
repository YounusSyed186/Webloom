import React from 'react';

export function WebloomFlowerLogo({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <defs>
        <linearGradient id="webloomPetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* 8-petal symmetrical geometric bloom matching Webloom branding */}
      <circle cx="12" cy="6.2" r="3.2" fill="url(#webloomPetal)" />
      <circle cx="12" cy="17.8" r="3.2" fill="url(#webloomPetal)" />
      <circle cx="6.2" cy="12" r="3.2" fill="url(#webloomPetal)" />
      <circle cx="17.8" cy="12" r="3.2" fill="url(#webloomPetal)" />
      <circle cx="7.9" cy="7.9" r="3.1" fill="url(#webloomPetal)" fillOpacity="0.9" />
      <circle cx="16.1" cy="16.1" r="3.1" fill="url(#webloomPetal)" fillOpacity="0.9" />
      <circle cx="7.9" cy="16.1" r="3.1" fill="url(#webloomPetal)" fillOpacity="0.9" />
      <circle cx="16.1" cy="7.9" r="3.1" fill="url(#webloomPetal)" fillOpacity="0.9" />
      <circle cx="12" cy="12" r="2.4" fill="#DDD6FE" />
    </svg>
  );
}
