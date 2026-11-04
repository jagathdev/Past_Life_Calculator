import React from 'react';

const CosmicCanvasBackground = () => {
  // Delicate starlight sparkles across the canvas
  const sparkles = [
    { top: '8%', left: '12%', size: 14, delay: '0s', dur: '3.2s', color: '#F59E0B' },
    { top: '15%', right: '16%', size: 16, delay: '1.2s', dur: '4s', color: '#C04921' },
    { top: '24%', left: '25%', size: 11, delay: '0.6s', dur: '2.8s', color: '#D97706' },
    { top: '34%', right: '10%', size: 15, delay: '2s', dur: '3.6s', color: '#F59E0B' },
    { top: '45%', left: '8%', size: 18, delay: '1.5s', dur: '4.5s', color: '#C04921' },
    { top: '54%', right: '22%', size: 13, delay: '0.4s', dur: '3.1s', color: '#F59E0B' },
    { top: '65%', left: '16%', size: 16, delay: '2.4s', dur: '3.8s', color: '#D97706' },
    { top: '74%', right: '14%', size: 15, delay: '1s', dur: '3.4s', color: '#C04921' },
    { top: '84%', left: '12%', size: 18, delay: '1.8s', dur: '4.2s', color: '#F59E0B' },
    { top: '92%', right: '18%', size: 13, delay: '2.6s', dur: '3.2s', color: '#D97706' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Keyframes for Round Rotating Circular Animations */}
      <style>{`
        @keyframes roundSpinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes roundSpinCounter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes roundOrbitRing1 {
          0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }

        @keyframes roundOrbitRing2 {
          0% { transform: rotate(0deg) translateX(190px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(190px) rotate(360deg); }
        }

        @keyframes sparkTwinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.65) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.35) rotate(45deg);
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 16px rgba(192, 73, 33, 0.6));
          }
        }
      `}</style>

      {/* 1. Deep Celestial Multi-Tone Gradient Base */}
      <div className="absolute inset-0 bg-[#ECE5D9] bg-celestial-canvas"></div>

      {/* 2. Sacred Constellation Grid Lines */}
      <div
        className="absolute inset-0 celestial-grid-overlay opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 25%, transparent 85%)'
        }}
      ></div>

      {/* 3. Ambient Smooth Breathing Prana Light Waves */}
      <div className="absolute -top-[10%] -left-[10%] w-[65vw] max-w-[700px] h-[65vw] max-h-[700px] rounded-full bg-gradient-to-br from-[#D97706]/15 via-[#C04921]/12 to-transparent blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-[25%] -right-[15%] w-[60vw] max-w-[750px] h-[60vw] max-h-[750px] rounded-full bg-gradient-to-bl from-[#C04921]/18 via-[#F59E0B]/14 to-transparent blur-[130px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-[60%] -left-[15%] w-[60vw] max-w-[700px] h-[60vw] max-h-[700px] rounded-full bg-gradient-to-tr from-[#F59E0B]/14 via-[#C04921]/10 to-transparent blur-[140px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute -bottom-[10%] right-[10%] w-[65vw] max-w-[800px] h-[65vw] max-h-[800px] rounded-full bg-gradient-to-tl from-[#C04921]/15 via-[#D97706]/12 to-transparent blur-[130px] animate-pulse-slow"></div>

      {/* 4. GRAND ROTATING CIRCULAR CELESTIAL WHEEL (Round Animation - Top Right) */}
      <div
        className="absolute top-[-5%] right-[-8%] sm:right-[-4%] w-[600px] sm:w-[800px] lg:w-[1000px] h-[600px] sm:h-[800px] lg:h-[1000px] pointer-events-none select-none text-[#C04921]"
        style={{
          animation: 'roundSpinClockwise 130s linear infinite',
          opacity: 0.08
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Concentric Circular Rings */}
          <circle cx="200" cy="200" r="192" strokeWidth="1.2" strokeDasharray="3 4" />
          <circle cx="200" cy="200" r="182" strokeWidth="1.6" />
          <circle cx="200" cy="200" r="162" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="200" cy="200" r="140" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="115" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="90" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="65" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="200" cy="200" r="40" strokeWidth="1.4" />
          <circle cx="200" cy="200" r="16" fill="currentColor" fillOpacity="0.12" strokeWidth="1" />
          <circle cx="200" cy="200" r="4" fill="currentColor" />

          {/* 16 Radial Circular Petal Arcs (Flower of Life Sacred Circular Pattern) */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x = 200 + 90 * Math.cos(angle);
            const y = 200 + 90 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="65"
                strokeWidth="0.7"
                strokeOpacity="0.75"
              />
            );
          })}

          {/* 12 Circular Nodes on Orbit */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 200 + 162 * Math.cos(angle);
            const y = 200 + 162 * Math.sin(angle);
            return (
              <circle
                key={`node-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="currentColor"
              />
            );
          })}
        </svg>
      </div>

      {/* 5. SECOND COUNTER-ROTATING ROUND MANDALA (Round Animation - Bottom Left) */}
      <div
        className="absolute top-[52%] left-[-10%] sm:left-[-5%] w-[500px] sm:w-[680px] lg:w-[820px] h-[500px] sm:h-[680px] lg:h-[820px] pointer-events-none select-none text-[#D97706]"
        style={{
          animation: 'roundSpinCounter 150s linear infinite',
          opacity: 0.075
        }}
      >
        <svg viewBox="0 0 350 350" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Concentric Circles */}
          <circle cx="175" cy="175" r="165" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="175" cy="175" r="150" strokeWidth="1.5" />
          <circle cx="175" cy="175" r="125" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="175" cy="175" r="98" strokeWidth="1.2" />
          <circle cx="175" cy="175" r="68" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="175" cy="175" r="42" strokeWidth="1.4" />
          <circle cx="175" cy="175" r="15" fill="currentColor" fillOpacity="0.1" />
          <circle cx="175" cy="175" r="3.5" fill="currentColor" />

          {/* 12 Intersecting Circular Rings */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 175 + 68 * Math.cos(angle);
            const y = 175 + 68 * Math.sin(angle);
            return (
              <circle
                key={`sub-${i}`}
                cx={x}
                cy={y}
                r="50"
                strokeWidth="0.65"
                strokeOpacity="0.7"
              />
            );
          })}
        </svg>
      </div>

      {/* 6. ORBITING CIRCULAR PRANA LIGHT NODES (Round Orbit Motion) */}
      <div
        className="absolute top-[28%] right-[18%] w-10 h-10 pointer-events-none"
        style={{ animation: 'roundOrbitRing1 45s linear infinite' }}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]/60 blur-[1px] shadow-[0_0_12px_rgba(245,158,11,0.9)]"></div>
      </div>

      <div
        className="absolute top-[68%] left-[22%] w-10 h-10 pointer-events-none"
        style={{ animation: 'roundOrbitRing2 55s linear infinite' }}
      >
        <div className="w-3 h-3 rounded-full bg-[#C04921]/60 blur-[1px] shadow-[0_0_12px_rgba(192,73,33,0.8)]"></div>
      </div>

      {/* 7. Extra Sparkling Starlight */}
      {sparkles.map((s, idx) => (
        <div
          key={`sparkle-${idx}`}
          className="absolute pointer-events-none select-none"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            color: s.color,
            animation: `sparkTwinkle ${s.dur} ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CosmicCanvasBackground;


