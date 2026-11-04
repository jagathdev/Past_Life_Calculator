import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Maya',
      location: 'Rishikesh',
      initial: 'M',
      text: "It explained patterns I'd repeated my whole life. Reading my Ketu story was profound."
    },
    {
      name: 'Arjun',
      location: 'Varanasi',
      initial: 'A',
      text: "The karmic relationships section gave me so much peace about a difficult bond."
    },
    {
      name: 'Leela',
      location: 'Mysuru',
      initial: 'L',
      text: "Deep, respectful and genuinely insightful. Not what I expected - far better."
    }
  ];

  return (
    <div className="relative w-full pt-6 md:pt-10 pb-8 md:pb-12 bg-transparent overflow-hidden">
      {/* Ambient Spiritual Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] h-[300px] bg-gradient-to-r from-[#C04921]/10 via-[#F59E0B]/10 to-transparent rounded-full blur-[90px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-[#C04921] uppercase mb-2">
            <span className="text-[#C04921] text-xs">✦</span>
            Real Seeker Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.1rem] text-[#1a1a1a] font-bold font-serif leading-tight">
            Loved by Seekers <span className="text-[#C04921] italic">Like You</span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-black/[0.06] hover:border-[#C04921]/35 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(192,73,33,0.12)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C04921] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Header Row: Avatar + Info + Stars */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C04921]/20 to-[#C04921]/5 text-[#C04921] flex items-center justify-center font-bold text-sm shrink-0 ring-1 ring-[#C04921]/25 shadow-xs">
                      {item.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#1a1a1a] font-bold text-base leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-gray-400 text-xs font-medium flex items-center gap-1.5 mt-0.5">
                        <svg className="w-3 h-3 text-[#C04921]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-1 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[#2d2d2d] text-sm sm:text-[14.5px] leading-relaxed font-sans m-0 italic">
                  "{item.text}"
                </p>
              </div>

              {/* Verified Pill Footer */}
              <div className="mt-5 pt-3.5 border-t border-black/[0.05] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#C04921] font-semibold">
                  <svg className="w-3.5 h-3.5 text-[#C04921]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Verified Seeker
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
