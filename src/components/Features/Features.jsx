import React from 'react';

const Features = () => {
  return (
    <div className="w-full relative z-10 pt-8 md:pt-12 pb-0 md:pb-2 mt-4">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
            <svg className="w-6 h-6 text-[#C04921]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.5C11.5 4.5 9 7 6.5 8C9 8.5 10.5 11 12 14C13.5 11 15 8.5 17.5 8C15 7 12.5 4.5 12 2.5Z" />
              <path d="M12 21.5C9.5 21.5 5 19 4 14C5.5 15.5 8 16 11 16C10 14 9.5 12 10.5 10.5C12.5 13 14.5 15.5 19 13.5C18 17 15 21.5 12 21.5Z" opacity="0.8"/>
            </svg>
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] text-dark-navy font-bold font-serif mb-3 drop-shadow-sm">
            Why <span className="text-[#C04921]">AstroVed</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Trusted by thousands for deep, respectful, hand-prepared karma readings.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">

          {/* Card 1: Read by real astrologers */}
          <div 
            className="group relative bg-gradient-to-b from-white via-white to-[#FAF8F2]/60 rounded-2xl border border-black/[0.06] hover:border-[#C04921]/30 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(192,73,33,0.1)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Watermark Glyph in Background */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#C04921]/[0.02] group-hover:bg-[#C04921]/[0.06] transition-all duration-500 pointer-events-none flex items-center justify-center">
              <svg className="w-18 h-18 text-[#C04921]/15 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10" strokeDasharray="2 3" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            </div>

            <div>
              {/* Top Row: Icon + Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C04921]/15 to-[#C04921]/5 border border-[#C04921]/20 text-[#C04921] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 shadow-sm">
                  {/* Astrologer / Guru Wisdom Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.15" />
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                    <path d="M12 2v2m0 8v2M8 4l1.5 1.5M16 4l-1.5 1.5" />
                    <circle cx="12" cy="8" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#C04921] bg-[#C04921]/10 px-2 py-0.5 rounded-full">
                  100% Human
                </span>
              </div>

              {/* Title & Underline */}
              <h3 className="text-base sm:text-[17px] font-bold font-serif text-dark-navy mb-2 group-hover:text-[#C04921] transition-colors duration-200">
                Read by real astrologers
              </h3>
              <div className="w-6 group-hover:w-12 transition-all duration-300 h-[2px] bg-[#C04921] rounded-full mb-3"></div>

              {/* Description */}
              <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed font-sans">
                Your report is meticulously interpreted by expert Vedic astrologers, not auto-generated text or generic templates.
              </p>
            </div>

            {/* Bottom Benefit Pill */}
            <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center gap-2 text-[11px] font-semibold text-gray-500 group-hover:text-[#C04921] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C04921]"></span>
              <span>Hand-prepared with care</span>
            </div>
          </div>

          {/* Card 2: Classical Vedic method */}
          <div 
            className="group relative bg-gradient-to-b from-white via-white to-[#FAF8F2]/60 rounded-2xl border border-black/[0.06] hover:border-[#C04921]/30 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(192,73,33,0.1)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Watermark Glyph in Background */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#C04921]/[0.02] group-hover:bg-[#C04921]/[0.06] transition-all duration-500 pointer-events-none flex items-center justify-center">
              <svg className="w-18 h-18 text-[#C04921]/15 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <polygon points="12 2 22 12 12 22 2 12" />
                <rect x="6" y="6" width="12" height="12" />
              </svg>
            </div>

            <div>
              {/* Top Row: Icon + Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C04921]/15 to-[#C04921]/5 border border-[#C04921]/20 text-[#C04921] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 shadow-sm">
                  {/* Authentic Vedic Birth Chart (Kundali) Mandala */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.1" />
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <line x1="21" y1="3" x2="3" y2="21" />
                    <polygon points="12 3 21 12 12 21 3 12" fill="currentColor" fillOpacity="0.12" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#C04921] bg-[#C04921]/10 px-2 py-0.5 rounded-full">
                  Ancient Parashara
                </span>
              </div>

              {/* Title & Underline */}
              <h3 className="text-base sm:text-[17px] font-bold font-serif text-dark-navy mb-2 group-hover:text-[#C04921] transition-colors duration-200">
                Classical Vedic method
              </h3>
              <div className="w-6 group-hover:w-12 transition-all duration-300 h-[2px] bg-[#C04921] rounded-full mb-3"></div>

              {/* Description */}
              <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed font-sans">
                Rooted strictly in sacred scriptures: Ketu's karmic placement, the 12th house of liberation, Atmakaraka, and the Rahu-Ketu soul axis.
              </p>
            </div>

            {/* Bottom Benefit Pill */}
            <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center gap-2 text-[11px] font-semibold text-gray-500 group-hover:text-[#C04921] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C04921]"></span>
              <span>Authentic Vedic Jyotish</span>
            </div>
          </div>

          {/* Card 3: Private & secure */}
          <div 
            className="group relative bg-gradient-to-b from-white via-white to-[#FAF8F2]/60 rounded-2xl border border-black/[0.06] hover:border-[#C04921]/30 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(192,73,33,0.1)] hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Watermark Glyph in Background */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#C04921]/[0.02] group-hover:bg-[#C04921]/[0.06] transition-all duration-500 pointer-events-none flex items-center justify-center">
              <svg className="w-18 h-18 text-[#C04921]/15 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              </svg>
            </div>

            <div>
              {/* Top Row: Icon + Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C04921]/15 to-[#C04921]/5 border border-[#C04921]/20 text-[#C04921] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 shadow-sm">
                  {/* Secure Shield Lock Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" fill="currentColor" fillOpacity="0.1" />
                    <rect x="9" y="11" width="6" height="5" rx="1.5" />
                    <path d="M10 11V9a2 2 0 1 1 4 0v2" />
                    <circle cx="12" cy="13.5" r="0.75" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#C04921] bg-[#C04921]/10 px-2 py-0.5 rounded-full">
                  256-Bit Encrypted
                </span>
              </div>

              {/* Title & Underline */}
              <h3 className="text-base sm:text-[17px] font-bold font-serif text-dark-navy mb-2 group-hover:text-[#C04921] transition-colors duration-200">
                Private <span className="font-sans font-medium">&</span> secure
              </h3>
              <div className="w-6 group-hover:w-12 transition-all duration-300 h-[2px] bg-[#C04921] rounded-full mb-3"></div>

              {/* Description */}
              <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed font-sans">
                Your birth details and personal questions are used strictly for your sacred calculation and are never shared or sold.
              </p>
            </div>

            {/* Bottom Benefit Pill */}
            <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center gap-2 text-[11px] font-semibold text-gray-500 group-hover:text-[#C04921] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C04921]"></span>
              <span>100% Confidential Guarantee</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Features;
