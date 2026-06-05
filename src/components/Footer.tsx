import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
    <footer className="relative bg-bw-black text-bw-white pt-24 pb-12 overflow-hidden z-10 border-t border-bw-white/10">

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative">

        {/* Giant Logo Block */}
        <div className="mb-20">
          <span className="font-brutal text-[12vw] md:text-[10vw] font-black tracking-[0.1em] text-bw-white leading-none block">
            ANARCHY
          </span>
          <span className="font-brutal text-[12vw] md:text-[10vw] font-black tracking-[0.15em] text-bw-white/20 leading-none block -mt-2 md:-mt-4">
            ANTS
          </span>
        </div>

        {/* Oversized Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-bw-white/10">

          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-6">
              Contact
            </span>
            <a href="mailto:hello@anarchyants.com" className="font-brutal text-xl md:text-2xl font-black text-bw-white hover:text-bw-white/70 transition-colors duration-300 block mb-2 cursor-pointer">
              HELLO@ANARCHYANTS.COM
            </a>
            <span className="font-mono text-xs text-bw-gray tracking-wider">
              +33 1 42 00 00 00
            </span>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-6">
              Location
            </span>
            <span className="font-brutal text-lg md:text-xl font-black text-bw-white block mb-1">
              PARIS, FRANCE
            </span>
            <span className="font-mono text-xs text-bw-gray tracking-wider block">
              8 Rue de la Paix
            </span>
            <span className="font-mono text-xs text-bw-gray tracking-wider block">
              75002 Paris
            </span>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[10px] tracking-[0.3em] font-bold text-bw-gray uppercase block mb-6">
              Paris Time
            </span>
            <span className="font-brutal text-4xl md:text-5xl font-black text-bw-white tracking-widest tabular-nums block">
              {parisTime || '20:45:00'}
            </span>
            <span className="font-mono text-xs text-bw-gray tracking-wider block mt-2">
              UTC+2 — France
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <span className="text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase">
              &copy; {new Date().getFullYear()} ANARCHY ANTS
            </span>
            <span className="text-[10px] tracking-[0.2em] text-bw-white/30">
              All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={() => handleNavClick('atelier')} className="group flex items-center gap-1 text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase hover:text-bw-white transition-colors duration-300 cursor-pointer">
              Work
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button onClick={() => handleNavClick('services')} className="group flex items-center gap-1 text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase hover:text-bw-white transition-colors duration-300 cursor-pointer">
              Services
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button onClick={() => handleNavClick('manifest')} className="group flex items-center gap-1 text-[10px] tracking-[0.2em] font-bold text-bw-gray uppercase hover:text-bw-white transition-colors duration-300 cursor-pointer">
              Philosophy
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
