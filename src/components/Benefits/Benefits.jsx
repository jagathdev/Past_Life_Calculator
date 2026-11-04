import React from 'react';

const Benefits = () => {
  const cards = [
    {
      num: '01',
      title: 'Soul insight',
      desc: 'See the past-life mastery you carry instinctively.',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'Pattern clarity',
      desc: 'Understand why certain themes keep returning.',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'Your direction',
      desc: 'Know where your soul is meant to grow this life.',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'Karmic remedies',
      desc: 'Simple upayas to release and heal old karma.',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17V5a2 2 0 0 0-2-2H4" />
          <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v14a2 2 0 0 0 2 2h2" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full pt-0 md:pt-2 pb-10 md:pb-16 bg-transparent">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C04921] uppercase">
              ✦ Your Journey ✦
            </span>
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] text-[#1a1a1a] font-bold font-serif leading-tight">
            What You'll <span className="text-[#C04921] italic font-light">Walk Away With</span>
          </h2>
        </div>

        {/* 4 Separate Standalone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl p-7 sm:p-8 flex flex-col items-center text-center border border-[#C04921]/15 hover:border-[#C04921]/40 shadow-[0_8px_30px_rgba(192,73,33,0.05)] hover:shadow-[0_20px_40px_rgba(192,73,33,0.12)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle Ambient Watermark Number */}
              <div className="absolute top-2 right-4 text-6xl font-serif font-bold text-[#C04921]/[0.05] select-none pointer-events-none group-hover:text-[#C04921]/[0.1] transition-colors duration-300">
                {card.num}
              </div>

              {/* Glowing Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C04921] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Terracotta/Gold Icon Badge */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#C04921]/10 flex items-center justify-center text-[#C04921] mb-5 group-hover:scale-110 group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 shadow-sm">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="relative z-10 text-lg sm:text-xl font-bold font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C04921] transition-colors duration-300">
                {card.title}
              </h3>

              {/* Accent Micro Divider */}
              <div className="relative z-10 w-8 h-[2px] bg-[#C04921]/30 mb-3 transition-all duration-300 group-hover:w-12 group-hover:bg-[#C04921]"></div>

              {/* Description */}
              <p className="relative z-10 text-sm text-gray-600 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Benefits;
