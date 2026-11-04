import React from 'react';
import { createPortal } from 'react-dom';

const LoadingOverlay = () => {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F2]/95 backdrop-blur-sm">
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-t-2 border-b-2 border-[#C04921] rounded-full animate-[spin_2s_linear_infinite]"></div>
        
        {/* Inner reverse rotating ring */}
        <div className="absolute w-16 h-16 border-r-2 border-l-2 border-[#C04921]/60 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        
        {/* Center symbol */}
        <div className="absolute text-[#C04921] text-2xl font-serif">ॐ</div>
      </div>
      
      <h2 className="text-2xl font-bold font-serif text-[#1a1a1a] uppercase tracking-[0.2em] mb-2 animate-pulse">
        Unveiling Karma
      </h2>
      
      <p className="text-[#C04921] text-sm tracking-widest font-light animate-pulse" style={{ animationDelay: '0.5s' }}>
        Consulting the Akashic Records...
      </p>
    </div>,
    document.body
  );
};

export default LoadingOverlay;
