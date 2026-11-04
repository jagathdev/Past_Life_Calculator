import React, { useState, useEffect } from 'react';
import HeroContent from '../components/HeroContent/HeroContent';
import LeadForm from '../components/LeadForm/LeadForm';
import Features from '../components/Features/Features';
import ReportDetails from '../components/ReportDetails/ReportDetails';
import Pricing from '../components/Pricing/Pricing';
import Benefits from '../components/Benefits/Benefits';
import WelcomeContent from '../components/ReportDetails/WelcomeContent';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';

const HomePage = () => {
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem('past_life_report');
      localStorage.removeItem('past_life_user_details');
    } catch (_) { }
  }, []);

  return (
    <>
      <div className="relative z-10 max-w-[1250px] mx-auto p-6 md:p-8 w-full flex flex-col animate-fade-in">
        <header className="mb-4 md:mb-6">
          <img src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg" alt="AstroVed Logo" className="h-8 md:h-10 w-auto drop-shadow-lg" />
        </header>
        <div id="main-content" className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-8 items-center mt-2">
          {/* Hero text: placed second on mobile/tablet, first on desktop (laptop) */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <HeroContent onCtaClick={() => {
              const formSection = document.getElementById('lead-form-section');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }} />
          </div>
          {/* Image container: placed on top (order-1) on mobile & tablet, and right side (order-2) on laptop */}
          <div className="relative flex justify-center lg:justify-end items-center h-full w-full order-1 lg:order-2 py-4">
            {/* Responsive Circle Stage with Seamless Background Blending */}
            <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] aspect-square">
              {/* Soft Ambient Golden/Terracotta Aura Glow */}
              <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-[#C04921]/25 via-[#F59E0B]/20 to-transparent blur-3xl pointer-events-none animate-pulse-slow"></div>

              {/* Delicate Outer Orbital Celestial Ring */}
              <div
                className="absolute inset-[-6%] rounded-full border border-dashed border-[#C04921]/20 pointer-events-none animate-spin"
                style={{ animationDuration: '90s' }}
              ></div>

              {/* Faint Concentric Sacred Geometry Ring */}
              <div className="absolute inset-[-1%] rounded-full border border-[#F59E0B]/20 pointer-events-none"></div>

              {/* Seamlessly Feathered Masked Hero Image */}
              <div
                className="relative z-10 w-full h-full aspect-square rounded-full overflow-hidden animate-float-slow"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 46%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.4) 63%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 46%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.4) 63%, transparent 70%)'
                }}
              >
                <img
                  src="/radiant_real_human_hero.jpg"
                  alt="Vedic Past Life Meditation Seeker"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="lead-form-section" className="relative z-10 max-w-[1250px] mx-auto px-6 md:px-8 w-full flex justify-center mt-8 lg:mt-12 mb-4 lg:mb-6">
        <div className="w-full max-w-[440px] animate-fade-in-up">
          <LeadForm onReportReady={(data) => {
            setReportData(data);
            setShowReport(true);
            setTimeout(() => {
              const reportSection = document.getElementById('report-section');
              if (reportSection) {
                const y = reportSection.getBoundingClientRect().top + window.scrollY - 40;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 100);
          }} />
        </div>
      </div>

      {showReport && (
        <div id="report-section" className="relative z-10 w-full mt-12 animate-fade-in min-h-screen max-w-[1250px] mx-auto px-6 md:px-8">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10">
            <WelcomeContent reportData={reportData} />
          </div>
        </div>
      )}

      <Features />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-2 md:pt-4 pb-1 md:pb-2 w-full mt-2 md:mt-4">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
            <svg className="w-6 h-6 text-[#C04921]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.5C11.5 4.5 9 7 6.5 8C9 8.5 10.5 11 12 14C13.5 11 15 8.5 17.5 8C15 7 12.5 4.5 12 2.5Z" />
              <path d="M12 21.5C9.5 21.5 5 19 4 14C5.5 15.5 8 16 11 16C10 14 9.5 12 10.5 10.5C12.5 13 14.5 15.5 19 13.5C18 17 15 21.5 12 21.5Z" opacity="0.8" />
            </svg>
            <div className="w-12 h-[2px] bg-[#C04921]"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.15rem] text-dark-navy font-bold font-serif mb-3 drop-shadow-sm">What's Inside <span className="text-[#C04921]">Your Report</span></h2>
          <p className="text-gray-500 text-sm md:text-[15px] max-w-3xl mx-auto leading-relaxed md:whitespace-nowrap">A complete, personalised reading of your karmic story, broken down into 6 profound chapters.</p>
        </div>
        <div className="mb-12 md:mb-20">
          <ReportDetails />
        </div>
        <div className="flex justify-center mb-0">
          <Pricing />
        </div>
      </div>

      <Benefits />

      <Testimonials />
      <FAQ />

      {/* Final CTA Section */}
      <div className="w-full bg-transparent pb-20 md:pb-28 px-6 md:px-8">
        <div className="w-full max-w-[700px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] font-bold font-serif mb-3 leading-tight">
            Ready for the Full Story?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-[15px] mb-6 md:mb-8">
            Your free result is a glimpse. The full Past Life Report tells your whole karmic story.
          </p>
          <Pricing />
        </div>
      </div>
    </>
  );
};

export default HomePage;
