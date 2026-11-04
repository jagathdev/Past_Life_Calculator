import React, { useState, useEffect } from 'react';
import Pricing from '../Pricing/Pricing';

const WelcomeContent = ({ reportData: propReportData, soulDirection: propSoulDirection, isLoading = false }) => {
  const [internalReport, setInternalReport] = useState(() => {
    if (propReportData) return propReportData;
    try {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem('past_life_report_data') || localStorage.getItem('past_life_report_data');
        if (saved) return JSON.parse(saved);
      }
    } catch {
      // Ignore storage errors
    }
    return null;
  });

  // Sync prop changes whenever user submits form
  useEffect(() => {
    if (propReportData) {
      setInternalReport(propReportData);
      try {
        sessionStorage.setItem('past_life_report_data', JSON.stringify(propReportData));
      } catch {
        // Ignore storage errors
      }
    }
  }, [propReportData]);

  const activeReport = propReportData || internalReport;

  // Real-time API fields strictly from activeReport
  const soulDirection = activeReport?.soul_direction || propSoulDirection || null;
  const soulMastery = activeReport?.soul_mastery || null;
  const fifthHouse = activeReport?.fifth_house || null;

  // Real-time API fields strictly from activeReport (No hardcoded fallback data)
  const spiritualGrowth = activeReport?.spiritual_growth || null;

  // Real-time Karma fields strictly from activeReport
  const karma = activeReport?.karma || null;
  const karmaContent = karma?.content || (typeof karma === 'string' ? karma : null);
  const karmaTitle = karma?.title || "Past-Life Karma";

  const dashaData = activeReport?.dasha || null;
  const currentDasha = dashaData?.current_dasha || dashaData || null;
  const mahadasha = currentDasha?.mahadasha || null;
  const antardasha = currentDasha?.antardasha || null;
  const pratyantar = currentDasha?.pratyantar || null;
  const nextAntardasha = currentDasha?.next_antardasha || currentDasha?.nextAntardasha || null;

  const dominantTheme = "Your dominant past-life theme: The Ruler — past-life authority and duty, now learning surrender."

  // Helper mappings for charts
  const planetAbbr = {
    Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
    Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke'
  };

  const ascSignNum = activeReport?.chart?.ascendant?.sign_number;

  // Get planets in a given house number
  const getHouseInfo = (houseNum) => {
    const houseData = activeReport?.chart?.houses?.[String(houseNum)];
    if (houseData) {
      const planetList = (houseData.planets || []).map(p => planetAbbr[p] || p.slice(0, 2));
      return {
        signNum: houseData.sign_number,
        planets: planetList.join(' '),
        planetList
      };
    }
    const computedSignNum = ascSignNum ? (((ascSignNum - 1 + houseNum - 1) % 12) + 1) : '';
    return { signNum: computedSignNum, planets: '', planetList: [] };
  };

  const renderPlanets = (houseInfo, highlightColor = false) => {
    const list = houseInfo.planetList || (houseInfo.planets ? houseInfo.planets.split(' ').filter(Boolean) : []);
    if (!list.length) {
      return null;
    }
    if (list.length > 2) {
      const chunks = [];
      for (let i = 0; i < list.length; i += 2) {
        chunks.push(list.slice(i, i + 2).join(' '));
      }
      return (
        <span className={`inline-flex flex-col items-center leading-tight ${highlightColor ? 'text-[#C04921]' : 'text-gray-600'}`}>
          {chunks.map((chunk, idx) => (
            <span key={idx}>{chunk}</span>
          ))}
        </span>
      );
    }
    return (
      <span className={highlightColor ? 'text-[#C04921]' : 'text-gray-600'}>
        {list.join(' ')}
      </span>
    );
  };

  // South Indian signs in traditional order
  const southSigns = [
    { name: 'PISCES', signNum: 12 },
    { name: 'ARIES', signNum: 1 },
    { name: 'TAURUS', signNum: 2 },
    { name: 'GEMINI', signNum: 3 },
    { name: 'AQUARIUS', signNum: 11 },
    { name: 'CANCER', signNum: 4 },
    { name: 'CAPRICORN', signNum: 10 },
    { name: 'LEO', signNum: 5 },
    { name: 'SAGITTARIUS', signNum: 9 },
    { name: 'SCORPIO', signNum: 8 },
    { name: 'LIBRA', signNum: 7 },
    { name: 'VIRGO', signNum: 6 }
  ];

  const getSignPlanets = (signNum) => {
    const planetsInSign = [];
    if (activeReport?.chart?.planets) {
      Object.entries(activeReport.chart.planets).forEach(([pName, pData]) => {
        if (pData.sign_number === signNum) {
          planetsInSign.push(planetAbbr[pName] || pName.slice(0, 2));
        }
      });
    }
    return planetsInSign.join(' ');
  };

  const getHouseFromSign = (signNum) => {
    if (!ascSignNum) return '';
    return ((signNum - ascSignNum + 12) % 12) + 1;
  };

  const renderSouthBox = (s) => {
    const h = getHouseFromSign(s.signNum);
    const isKarma = h === 5;
    const isAsc = h === 1;
    const p = getSignPlanets(s.signNum);
    return (
      <div
        key={s.name}
        style={isKarma ? { outline: '2px solid #C04921', outlineOffset: '-2px' } : {}}
        className={`border border-black/5 p-1 relative flex flex-col justify-between ${isKarma ? 'bg-[#C04921]/15 z-10' : isAsc ? 'bg-[#C04921]/5' : ''
          }`}
      >
        <div>
          <div className="flex items-center justify-between leading-none mb-0.5">
            <span className={`font-bold ${isKarma ? 'text-[#C04921]' : isAsc ? 'text-[#C04921]' : 'text-dark-navy'}`}>
              {h}
            </span>
            {isAsc && (
              <span className="text-[6.5px] font-extrabold text-[#C04921] uppercase tracking-wider bg-[#C04921]/15 px-1 py-0.5 rounded leading-none">
                ASC
              </span>
            )}
          </div>
          <div className="text-[7px] text-gray-500 leading-tight">{s.name}</div>
        </div>
        {p && (
          <div className={`font-bold text-[9.5px] leading-tight ${isKarma ? 'text-[#C04921]' : 'text-gray-700'}`}>
            {p}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 border-3 border-[#C04921] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-base font-serif font-bold text-dark-navy">Generating Real-Time Vedic Past Life Reading...</h3>
        <p className="text-xs text-gray-500 mt-1">Connecting directly to planetary calculation engine</p>
      </div>
    );
  }

  if (!activeReport) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        <div className="w-full py-10 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-black/5 p-6 sm:p-8 shadow-sm mb-6">
          <div className="w-12 h-12 rounded-full bg-[#C04921]/10 flex items-center justify-center text-[#C04921] mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-dark-navy mb-2">No Birth Details Found</h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mb-5 leading-relaxed">
            Please submit your birth date, time, and location in the form to generate your live Vedic past life karma and chart reading.
          </p>
          <a
            href="/"
            className="bg-[#C04921] hover:bg-[#a63d1a] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer no-underline"
          >
            Enter Birth Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Pricing Component always rendered so users and currency testers see the live dynamic price */}
        <Pricing />
      </div>
    );
  }

  return (
    <div className="w-full text-dark-navy animate-fade-in relative">

      {/* 1. Document Header */}
      <div className="flex items-start gap-3.5 mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#C04921]/15 border border-[#C04921]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C04921]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <div>
          {(activeReport?.soul_direction?.label || activeReport?.soul_mastery?.label || activeReport?.fifth_house?.label) && (
            <div className="text-[9.5px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {activeReport?.soul_direction?.label || activeReport?.soul_mastery?.label || activeReport?.fifth_house?.label}
            </div>
          )}
          <h1 className="text-xl sm:text-2xl md:text-[24px] font-serif font-bold text-dark-navy m-0 leading-snug">
            Here's the Karma You Carried Into This Life
          </h1>
        </div>
      </div>

      <div className="w-full h-px bg-black/5 mb-6"></div>

      {/* CTA Block */}
      <div className="bg-gradient-to-br from-white to-[#FAF8F2] border border-gray-100 rounded-2xl p-5 sm:p-7 md:p-8 text-center flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(192,73,33,0.04)] relative overflow-hidden mb-8">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>

        <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-dark-navy mb-2 relative z-10">
          This Is Just a Glimpse. <span className="text-[#C04921]">See Your Whole Karmic Story.</span>
        </h2>
        <p className="text-gray-600 max-w-xl text-xs sm:text-[13px] leading-relaxed mb-5 relative z-10">
          Your free result reveals the theme. The full Past Life Report decodes your karmic debts, the relationships carried over, why patterns repeat, and the remedies to clear them.
        </p>

        <a
          href="https://www.astroved.com/Customized-Reports-Karmic-Astrology-Report-Past-Life-Influence-Report--P399.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden bg-[#C04921] text-white border-none rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-[13.5px] font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(192,73,33,0.2)] z-10 group hover:bg-[#a63d1a] inline-flex items-center justify-center no-underline"
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5 drop-shadow-sm">
            Get My Past Life Report
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </a>
      </div>

      {/* 2. Birth Chart Component */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm border border-black/5 mb-6 relative">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h2 className="text-base sm:text-[17px] font-bold text-dark-navy">Your birth chart</h2>
            <p className="text-gray-500 text-xs sm:text-[12.5px] mb-6">Highlighted houses & planets are what this reading focuses on.</p>
          </div>
          {activeReport?.chart?.ascendant?.sign && (
            <span className="px-2.5 py-1 rounded-md bg-[#C04921]/10 text-[#C04921] font-bold text-[10px] uppercase tracking-wider">
              {activeReport.chart.ascendant.sign} Ascendant
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* North Indian Chart */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">North Indian Chart</span>
            <div className="w-full max-w-[260px] aspect-square relative border border-black/10 overflow-hidden text-xs">
              {/* Grid Lines */}
              <svg className="absolute inset-0 w-full h-full text-dark-navy/20" stroke="currentColor" strokeWidth="1">
                <line x1="0" y1="0" x2="100%" y2="100%" />
                <line x1="100%" y1="0" x2="0" y2="100%" />
                <line x1="50%" y1="0" x2="100%" y2="50%" />
                <line x1="100%" y1="50%" x2="50%" y2="100%" />
                <line x1="50%" y1="100%" x2="0" y2="50%" />
                <line x1="0" y1="50%" x2="50%" y2="0" />
              </svg>

              {/* Highlight 5th House Triangle */}
              <svg className="absolute inset-0 w-full h-full text-[#C04921]/15 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,50 25,75 0,100" />
              </svg>
              <svg className="absolute inset-0 w-full h-full text-[#C04921]" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,50 25,75 0,100" fill="none" />
              </svg>

              {/* House 1: Top Center Diamond (Ascendant / Lagna) */}
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px] font-bold text-gray-500 leading-none">{getHouseInfo(1).signNum}</span>
                  <span className="text-[6.5px] font-extrabold text-[#C04921] uppercase tracking-wider bg-[#C04921]/15 px-1 py-0.5 rounded leading-none">ASC</span>
                </div>
                <span className="text-[10.5px] font-bold leading-tight">{renderPlanets(getHouseInfo(1), true)}</span>
              </div>

              {/* House 2: Top Left Triangle */}
              <div className="absolute top-[10%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(2).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(2))}</span>
              </div>

              {/* House 3: Left Top Triangle */}
              <div className="absolute top-[25%] left-[8.3%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(3).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(3))}</span>
              </div>

              {/* House 4: Left Diamond */}
              <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center max-w-[80px]">
                <span className="text-[10px] font-bold text-gray-500 leading-none mb-0.5">{getHouseInfo(4).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(4))}</span>
              </div>

              {/* House 5: Bottom Left Triangle (Highlighted Karma House) */}
              <div className="absolute top-[75%] left-[8.3%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-[#C04921] leading-none mb-0.5">{getHouseInfo(5).signNum}</span>
                <span className="text-[10.5px] font-bold leading-tight">{renderPlanets(getHouseInfo(5), true)}</span>
              </div>

              {/* House 6: Bottom Left Triangle */}
              <div className="absolute top-[90%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(6).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(6))}</span>
              </div>

              {/* House 7: Bottom Center Diamond */}
              <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-500 leading-none mb-0.5">{getHouseInfo(7).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(7))}</span>
              </div>

              {/* House 8: Bottom Right Triangle */}
              <div className="absolute top-[90%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(8).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(8))}</span>
              </div>

              {/* House 9: Right Bottom Triangle */}
              <div className="absolute top-[75%] left-[91.7%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(9).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(9))}</span>
              </div>

              {/* House 10: Right Diamond */}
              <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center max-w-[80px]">
                <span className="text-[10px] font-bold text-gray-500 leading-none mb-0.5">{getHouseInfo(10).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(10))}</span>
              </div>

              {/* House 11: Right Top Triangle */}
              <div className="absolute top-[25%] left-[91.7%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(11).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(11))}</span>
              </div>

              {/* House 12: Top Right Triangle */}
              <div className="absolute top-[10%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                <span className="text-[9.5px] text-gray-400 leading-none mb-0.5">{getHouseInfo(12).signNum}</span>
                <span className="text-[10px] font-bold leading-tight">{renderPlanets(getHouseInfo(12))}</span>
              </div>
            </div>
          </div>

          {/* South Indian Chart */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">South Indian Chart</span>
            <div className="w-full max-w-[260px] aspect-square border border-black/10 grid grid-cols-4 grid-rows-4 text-[9px] relative">
              {/* Row 1 */}
              {[southSigns[0], southSigns[1], southSigns[2], southSigns[3]].map(renderSouthBox)}

              {/* Row 2 */}
              {renderSouthBox(southSigns[4])}
              <div className="col-span-2 row-span-2 flex items-center justify-center text-gray-400 font-serif text-base border border-black/5">D1</div>
              {renderSouthBox(southSigns[5])}

              {/* Row 3 */}
              {renderSouthBox(southSigns[6])}
              {renderSouthBox(southSigns[7])}

              {/* Row 4 */}
              {[southSigns[8], southSigns[9], southSigns[10], southSigns[11]].map(renderSouthBox)}
            </div>
          </div>
        </div>

        {/* 3. Dasha Timeline */}
        {(mahadasha || antardasha || pratyantar || nextAntardasha) && (
          <div className="mt-8">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Your Current Planetary Period · Vimshottari Dasha</div>
            <div className="flex flex-wrap gap-3 sm:gap-4">

              {mahadasha && (
                <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 min-w-[130px] flex-1 shadow-sm">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Mahadasha</div>
                  <div className="font-bold text-dark-navy text-xl sm:text-2xl mb-1 font-serif">{mahadasha.planet}</div>
                  {(mahadasha.start || mahadasha.end) && (
                    <div className="text-xs text-gray-500 font-normal leading-tight">
                      {mahadasha.start && mahadasha.end ? `${mahadasha.start} - ${mahadasha.end}` : (mahadasha.start || mahadasha.end)}
                    </div>
                  )}
                </div>
              )}

              {antardasha && (
                <div className="bg-[#C04921]/10 border border-[#C04921]/30 rounded-2xl p-4 sm:p-5 min-w-[130px] flex-1 shadow-sm">
                  <div className="text-[10px] font-bold text-[#C04921] uppercase tracking-wider mb-1.5">Antardasha</div>
                  <div className="font-bold text-[#C04921] text-xl sm:text-2xl mb-1 font-serif">{antardasha.planet}</div>
                  {(antardasha.start || antardasha.end) && (
                    <div className="text-xs text-[#C04921]/80 font-normal leading-tight">
                      {antardasha.start && antardasha.end ? `${antardasha.start} - ${antardasha.end}` : (antardasha.start || antardasha.end)}
                    </div>
                  )}
                </div>
              )}

              {pratyantar && (
                <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 min-w-[130px] flex-1 shadow-sm">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Pratyantar</div>
                  <div className="font-bold text-dark-navy text-xl sm:text-2xl mb-1 font-serif">{pratyantar.planet}</div>
                  {(pratyantar.start || pratyantar.end) && (
                    <div className="text-xs text-gray-500 font-normal leading-tight">
                      {pratyantar.start && pratyantar.end ? `${pratyantar.start} - ${pratyantar.end}` : (pratyantar.start || pratyantar.end)}
                    </div>
                  )}
                </div>
              )}

              {nextAntardasha && (
                <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-4 sm:p-5 min-w-[130px] flex-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Next Antardasha</div>
                  <div className="font-bold text-dark-navy text-xl sm:text-2xl mb-1 font-serif">{nextAntardasha.planet}</div>
                  {(nextAntardasha.start || nextAntardasha.end) && (
                    <div className="text-xs text-gray-500 font-normal leading-tight">
                      {nextAntardasha.start && nextAntardasha.end ? `${nextAntardasha.start} - ${nextAntardasha.end}` : (nextAntardasha.start || nextAntardasha.end)}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* 4. Metrics & Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-5">

        {/* 1. Past-Life Karma Card (Real-Time from API) */}
        {karmaContent && (
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-black/5 flex flex-col">
            <div className="border-b border-black/[0.06] pb-1 mb-1.5">
              <h3 className="font-bold text-dark-navy text-sm sm:text-base font-serif leading-tight">
                {karmaTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed">
              {karmaContent}
            </p>
          </div>
        )}

        {/* 2. Spiritual Growth Card (Dynamic from API) */}
        {spiritualGrowth?.content && (
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-black/5 flex flex-col">
            <div className="border-b border-black/[0.06] pb-1 mb-1.5">
              <h3 className="font-bold text-dark-navy text-sm sm:text-base font-serif leading-tight">
                {spiritualGrowth?.title || "Spiritual Growth"}
              </h3>
            </div>
            <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed">
              {spiritualGrowth?.content}
            </p>
          </div>
        )}

        {/* 3. Soul Mastery Card (Real-Time from API) */}
        {soulMastery && (
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-black/5 flex flex-col">
            <div className="border-b border-black/[0.06] pb-1 mb-1.5">
              {(soulMastery.label || soulMastery.badge) && (
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  {soulMastery.label && (
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                      {soulMastery.label}
                    </span>
                  )}
                  {soulMastery.badge && (
                    <div className="bg-[#C04921]/15 text-[#C04921] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5">
                      {soulMastery.badge}
                    </div>
                  )}
                </div>
              )}
              {soulMastery.title && (
                <h3 className="text-sm sm:text-base font-bold font-serif text-dark-navy leading-tight">
                  {soulMastery.title}
                </h3>
              )}
            </div>
            <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed">
              {soulMastery.content || soulMastery.statement}
            </p>
          </div>
        )}

        {/* 4. 5th House Card (Real-Time from API) */}
        {fifthHouse && (
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-black/5 flex flex-col">
            <div className="border-b border-black/[0.06] pb-1 mb-1.5">
              {(fifthHouse.label || fifthHouse.badge) && (
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  {fifthHouse.label && (
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                      {fifthHouse.label}
                    </span>
                  )}
                  {fifthHouse.badge && (
                    <div className="bg-[#C04921]/15 text-[#C04921] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {fifthHouse.badge}
                    </div>
                  )}
                </div>
              )}
              {fifthHouse.title && (
                <h3 className="text-sm sm:text-base font-bold font-serif text-dark-navy leading-tight">
                  {fifthHouse.title}
                </h3>
              )}
            </div>
            <p className="text-xs sm:text-[12.5px] text-gray-600 leading-relaxed">
              {fifthHouse.content || fifthHouse.statement}
            </p>
          </div>
        )}

      </div>

      {/* 5. Dominant Theme Banner (Rendered dynamically if provided by API) */}
      {dominantTheme && (
        <div className="bg-[#C04921]/15 text-[#C04921] text-xs sm:text-[13px] font-medium p-3.5 sm:p-4 rounded-xl mb-5 border border-[#C04921]/10">
          {dominantTheme}
        </div>
      )}

      {/* Soul's Direction Card (Real-Time from API) */}
      {soulDirection?.content && (
        <div className="bg-white border border-black/[0.08] rounded-2xl p-5 sm:p-6 mb-8 text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C04921]"></div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider ">
              {soulDirection.label || soulDirection.title || "Your Soul's Direction"}
            </span>
          </div>
          <p className="text-xs sm:text-[14px] font-medium leading-relaxed m-0 text-[#1a1a1a]">
            {soulDirection.content}
          </p>
        </div>
      )}

      {/* Pricing Component below Soul's Direction */}
      <Pricing />

    </div>
  );
};

export default WelcomeContent;
