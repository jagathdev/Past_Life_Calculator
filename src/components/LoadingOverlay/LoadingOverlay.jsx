import React from 'react';
import { createPortal } from 'react-dom';

const LoadingOverlay = () => {
  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-label="Calculating your Vedic past life karma"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF8F2]/90 backdrop-blur-md px-4 sm:px-6 py-8 overflow-y-auto select-none"
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#C04921]/15 via-[#F59E0B]/15 to-transparent blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Centered Modal / Floating Card for Perfect Responsive Alignment */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(192,73,33,0.12)] border border-[#C04921]/15 flex flex-col items-center text-center">

        {/* Sacred Astrology Spinner */}
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-5 sm:mb-6">
          {/* Outer rotating dashed ring */}
          <div className="absolute inset-0 border-2 border-[#C04921] border-t-transparent border-b-transparent rounded-full animate-[spin_2.5s_linear_infinite]"></div>

          {/* Inner reverse rotating ring */}
          <div className="absolute inset-2 sm:inset-2.5 border-2 border-dashed border-[#F59E0B]/70 rounded-full animate-[spin_3.5s_linear_infinite_reverse]"></div>

          {/* Central Sacred Vedic Om symbol */}
          <div className="text-[#C04921] text-2xl sm:text-3xl font-serif select-none transform transition-transform">
            ॐ
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1e293b] tracking-[0.15em] uppercase mb-2">
          Unveiling Karma
        </h2>

        {/* Dynamic Sub-text */}
        <p className="text-[#C04921] text-xs sm:text-[13px] font-medium tracking-wide leading-relaxed max-w-[280px]">
          Consulting the Akashic records & planetary positions...
        </p>

        {/* Elegant Animated Progress Bar */}
        <div className="w-full max-w-[200px] h-1.5 bg-gray-100 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#C04921] via-[#F59E0B] to-[#C04921] rounded-full animate-indeterminate"></div>
        </div>

        <span className="text-[10.5px] text-gray-400 mt-3 font-sans">
          This usually takes a few seconds
        </span>
      </div>
    </div>,
    document.body
  );
};

export default LoadingOverlay;
