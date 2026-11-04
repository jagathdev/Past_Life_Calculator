import React from 'react';

const ReportDetails = () => {
  const items = [
    {
      num: '1',
      title: 'Your Past-Life Story',
      desc: 'The life and role your soul carried before this one.'
    },
    {
      num: '2',
      title: <>Karmic Debts <span className="font-sans">&</span> Patterns</>,
      desc: 'What you came to resolve, and why patterns repeat.'
    },
    {
      num: '3',
      title: 'Relationships Carried Over',
      desc: 'The souls and bonds that travelled with you.'
    },
    {
      num: '4',
      title: "Your Soul's Purpose Now",
      desc: 'Where the Rahu-Ketu axis points your growth this life.'
    },
    {
      num: '5',
      title: <>Karmic Blocks <span className="font-sans">&</span> Releases</>,
      desc: 'What holds you back, and how the karma clears.'
    },
    {
      num: '6',
      title: 'Remedies to Clear Karma',
      desc: 'Practical upayas and mantras for liberation.'
    }
  ];

  return (
    <div className="w-full relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-black/[0.06] hover:border-[#C04921]/35 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(192,73,33,0.1)] overflow-hidden cursor-default flex items-center min-h-[110px]"
          >
            {/* Subtle accent bar on hover */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C04921] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></div>

            <div className="flex gap-4 sm:gap-5 relative z-10 items-center w-full">
              {/* Number Circle Badge (1, 2, 3...) */}
              <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-serif font-bold text-lg sm:text-xl bg-[#C04921]/10 text-[#C04921] group-hover:bg-[#C04921] group-hover:text-white transition-all duration-300 shadow-2xs">
                {item.num}
              </div>

              {/* Text Content */}
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold font-serif text-[15.5px] sm:text-[16.5px] leading-snug mb-1 text-dark-navy group-hover:text-[#C04921] transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed font-sans m-0">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDetails;
