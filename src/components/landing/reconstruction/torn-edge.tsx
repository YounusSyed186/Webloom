import React from 'react';

export function TornPaperEdge({ className = '', fill = '#FAF6EE' }: { className?: string; fill?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="w-full h-4 sm:h-6 block"
        style={{ fill }}
      >
        <path d="M0,0 Q30,12 60,6 T120,10 T180,4 T240,14 T300,5 T360,11 T420,3 T480,12 T540,6 T600,14 T660,4 T720,12 T780,6 T840,13 T900,5 T960,11 T1020,4 T1080,14 T1140,6 T1200,10 L1200,24 L0,24 Z" />
      </svg>
    </div>
  );
}

