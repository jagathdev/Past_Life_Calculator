import React from 'react';

const HeroContent = ({ onCtaClick }) => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up font-sans">
      <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#C04921] uppercase w-fit mt-4">
        <span className="text-[#C04921] text-lg leading-none mb-1">•</span>
        PAST LIFE & KARMA
      </div>

      <h1 className="text-2xl sm:text-[1.75rem] md:text-[2.1rem] lg:text-[2.55rem] xl:text-[2.85rem] font-serif font-bold leading-[1.2] text-[#1a1a1a] tracking-normal m-0">
        What karma did <span className="text-[#C04921]">you</span> carry<br /> into this life?
      </h1>

      <p className="text-sm sm:text-[15px] md:text-base text-[#4a4a4a] max-w-[92%] leading-relaxed mt-1.5">
        Your 5th house and its lord reveal the karmic patterns carried from past births. Discover your past-life karma and the lessons reflected in your birth chart - free, in seconds.
      </p>

      {/* Feature Highlight Pills */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs md:text-[13px] font-medium text-gray-700 mt-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#C04921]/30 hover:shadow-[0_4px_12px_rgba(192,73,33,0.08)] hover:-translate-y-0.5 transition-all duration-200">
          <span className="w-4 h-4 rounded-full bg-[#C04921]/10 text-[#C04921] flex items-center justify-center flex-shrink-0">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-semibold text-[#1a1a1a]">5th House & Its Lord</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#C04921]/30 hover:shadow-[0_4px_12px_rgba(192,73,33,0.08)] hover:-translate-y-0.5 transition-all duration-200">
          <span className="w-4 h-4 rounded-full bg-[#C04921]/10 text-[#C04921] flex items-center justify-center flex-shrink-0">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-semibold text-[#1a1a1a]">Your past-life theme</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#C04921]/20 shadow-[0_2px_8px_rgba(192,73,33,0.04)] hover:border-[#C04921]/40 hover:shadow-[0_4px_12px_rgba(192,73,33,0.1)] hover:-translate-y-0.5 transition-all duration-200">
          <span className="w-4 h-4 rounded-full bg-[#C04921] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="font-bold text-[#C04921]">Free, instant result</span>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-start">
        <button
          type="button"
          onClick={onCtaClick}
          className="bg-[#C04921] hover:bg-[#a63d1a] text-white border-none rounded-md px-6 py-3.5 text-base font-semibold cursor-pointer transition-all w-full sm:w-auto text-center inline-block"
        >
          <span className="flex items-center justify-center gap-2">
            Reveal My Past-Life Karma
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </button>
      </div>

      {/* Cosmic Karmic Decoder Strip */}
      <div className="mt-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-2 bg-gradient-to-r from-white/90 via-[#FAF8F2]/90 to-white/90 backdrop-blur-md border border-black/5 rounded-2xl shadow-[0_4px_24px_rgba(192,73,33,0.06)]">
          {/* Card 1: READS */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.04] hover:border-[#C04921]/40 hover:shadow-[0_4px_16px_rgba(192,73,33,0.1)] transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C04921]/10 text-[#C04921] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C04921] animate-pulse"></span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#C04921]">Reads</span>
              </div>
              <span className="font-serif font-bold text-sm md:text-[15px] text-[#1a1a1a] tracking-tight block truncate mt-0.5">
                5th House
              </span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="hidden sm:flex text-[#C04921]/60 items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Card 2: REVEALS */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.04] hover:border-[#C04921]/40 hover:shadow-[0_4px_16px_rgba(192,73,33,0.1)] transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C04921]/10 text-[#C04921] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" fill="currentColor" fillOpacity="0.1" />
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C04921]"></span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#C04921]">Reveals</span>
              </div>
              <span className="font-serif font-bold text-sm md:text-[15px] text-[#1a1a1a] tracking-tight block truncate mt-0.5">
                Past-life theme
              </span>
            </div>
          </div>

          {/* Flow Connector */}
          <div className="hidden sm:flex text-[#C04921]/60 items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Card 3: SHOWS */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.04] hover:border-[#C04921]/40 hover:shadow-[0_4px_16px_rgba(192,73,33,0.1)] transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C04921]/10 text-[#C04921] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C04921]"></span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#C04921]">Shows</span>
              </div>
              <span className="font-serif font-bold text-sm md:text-[15px] text-[#1a1a1a] tracking-tight block truncate mt-0.5">
                Soul's direction
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
