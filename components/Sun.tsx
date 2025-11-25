import React from 'react';

export const Sun: React.FC = () => {
  return (
    <div className="absolute top-10 right-10 z-10 opacity-90 pointer-events-none mix-blend-screen">
      <div className="relative w-24 h-24 md:w-40 md:h-40">
        {/* Core */}
        <div className="absolute inset-0 bg-greek-gold rounded-full shadow-[0_0_60px_rgba(241,196,15,0.8)] z-10" />
        
        {/* Rays */}
        <div className="absolute inset-[-20%] w-[140%] h-[140%] animate-spin-slow z-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-2 bg-greek-gold/60 rounded-full origin-center"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};