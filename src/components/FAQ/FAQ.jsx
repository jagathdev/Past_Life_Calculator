import React, { useState } from 'react';

const FAQItem = ({ question, answer, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`py-6 px-6 md:px-8 ${!isLast ? 'border-b border-[#C04921]/10' : ''}`}>
      <button
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold font-serif text-[#1a1a1a] text-lg md:text-[19px]">{question}</span>
        <div className={`text-[#C04921] transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-45' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Can past-life astrology reveal relationships from previous births?",
      answer: "Past-life astrology can offer karmic insights through your 5th house and its lord, highlighting themes related to family, siblings, and spouse"
    },
    {
      question: "How to calculate your past life?",
      answer: "Analyze your Rasi chart’s 5th house and its lord from the Ascendant to explore past-life karma and its influence on your present life."
    },
    {
      question: "Can astrology identify a karmic relationship between two people?",
      answer: "Karmic relationship astrology compares two birth charts to explore soul connections, past-life bonds, and karmic lessons in relationships."
    }
  ];

  return (
    <div className="relative pt-8 pb-20 md:pt-12 md:pb-24 w-full bg-transparent overflow-hidden">
      {/* Ambient Spiritual Aura for FAQ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[850px] h-[380px] bg-gradient-to-r from-[#D97706]/10 via-[#C04921]/12 to-transparent rounded-full blur-[110px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-8">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-[#C04921] uppercase mb-3">
            <span className="text-[#C04921] text-xs">✦</span>
            Clarifications
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] font-serif font-bold text-[#1a1a1a]">
            Past Life Calculator — FAQs
          </h2>
        </div>

        {/* FAQ Container with Glassmorphism */}
        <div className="bg-white/85 backdrop-blur-md border border-[#C04921]/15 rounded-[24px] shadow-[0_8px_32px_rgba(192,73,33,0.06)] overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isLast={index === faqs.length - 1}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;
