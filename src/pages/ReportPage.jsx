import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeContent from '../components/ReportDetails/WelcomeContent';

const ReportPage = ({ embedded = false }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sections = [
    "Welcome"
  ];

  return (
    <div className={`relative z-10 w-full ${embedded ? 'h-[800px]' : 'h-screen'} flex flex-col md:flex-row animate-fade-in overflow-hidden text-[#1a1a1a]`}>

      {/* Sidebar Re-open Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-6 left-6 z-30 w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex items-center justify-center text-blue-600 hover:bg-gray-50 transition-colors animate-fade-in"
          title="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-[85%] max-w-[260px] md:max-w-none md:w-[220px] absolute md:relative bg-white h-full flex flex-col shadow-[5px_0_15px_rgba(0,0,0,0.2)] z-40 flex-shrink-0 animate-fade-in">

          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[#0b1b3d] font-bold text-[10px] tracking-wider uppercase">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              REPORT INDEX
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="w-5 h-5 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors cursor-pointer" title="Close Sidebar">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
            {sections.map((title, index) => {
              const num = index + 1;
              const isActive = activeSection === num;
              return (
                <button
                  key={num}
                  onClick={() => setActiveSection(num)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-[11px] font-semibold transition-all ${isActive
                      ? 'bg-gradient-to-r from-[#F26C4F] to-[#F7931E] text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${isActive ? 'border-white/50 text-white' : 'border-gray-200 text-gray-400'
                    }`}>
                    {num}
                  </div>
                  {title}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          {!embedded && (
            <div className="p-3 border-t border-gray-100 bg-white">
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-1.5 bg-[#F26C4F] text-white py-2.5 rounded-md font-bold text-[10px] tracking-wide hover:bg-[#E55B3E] transition-colors shadow-md"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                ENTER DIFFERENT DETAILS
              </button>
            </div>
          )}

        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-full p-4 md:p-8 lg:p-12 overflow-y-auto relative transition-all duration-300">
        
        {/* Document Container */}
        <div className="w-full max-w-[1000px] mx-auto min-h-full bg-[#FAF8F2] rounded-3xl shadow-2xl p-6 md:p-10 lg:p-16 relative">

          {/* Document Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-10 relative">
            <img src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg" alt="AstroVed Logo" className="h-8 object-contain filter drop-shadow-sm" />

            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span className="text-xs font-bold text-gray-600 tracking-[0.2em] uppercase">{sections[activeSection - 1]}</span>
            </div>

            {/* Empty div for flex spacing */}
            <div className="w-24"></div>
          </div>

          {/* Document Body */}
          {activeSection === 1 ? (
            <WelcomeContent />
          ) : (
            <div className="prose max-w-none text-[#1a1a1a]">
              <h1 className="text-xl md:text-2xl font-serif text-center mb-4">{sections[activeSection - 1]}</h1>
              <p className="text-xs sm:text-sm text-gray-600 text-center max-w-xl mx-auto">
                Your detailed past life karma reading for this chapter will be displayed here. The report dynamically updates based on the sidebar selection.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ReportPage;
