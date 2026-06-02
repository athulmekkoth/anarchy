import React, { useState, useEffect } from 'react';

interface FooterProps {
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  const [parisTime, setParisTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setParisTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <footer className="relative bg-bw-card text-white pt-20 pb-10 overflow-hidden z-10">
      
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-16 border-b border-white/10">
          
          <div className="flex flex-col items-start">
            <span className="font-display text-4xl font-black tracking-[0.25em] text-white">ANARCHY</span>
            <span className="text-[8px] font-semibold tracking-[0.7em] text-white/30 uppercase mt-1">
              ANTS
            </span>
            <p className="mt-6 text-sm text-white/40 leading-relaxed font-normal max-w-sm">
              Designing digital masterpieces and architectural boutique spaces for the world's finest brands.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-white/30 uppercase">Paris Time</span>
            <span className="font-display text-3xl font-light text-white tracking-widest tabular-nums">
              {parisTime || '20:45:00'}
            </span>
            <span className="text-[9px] tracking-wider text-white/40 italic">UTC+2 -- France</span>
          </div>

        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-wider text-white/30 font-light">
          <div>
            &copy; {new Date().getFullYear()} ANARCHY ANTS. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavClick('atelier')} className="hover:text-white transition-colors duration-300 cursor-pointer">Work</button>
            <button onClick={() => handleNavClick('services')} className="hover:text-white transition-colors duration-300 cursor-pointer">Services</button>
            <button onClick={() => handleNavClick('manifest')} className="hover:text-white transition-colors duration-300 cursor-pointer">Philosophy</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
