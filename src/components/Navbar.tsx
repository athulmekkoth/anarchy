import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeView: 'home' | 'services';
  setActiveView: (view: 'home' | 'services') => void;
  onScrollToEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, onScrollToEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'services') => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEstimatorClick = () => {
    setIsMobileMenuOpen(false);
    if (activeView !== 'services') {
      setActiveView('services');
      setTimeout(() => {
        onScrollToEstimator();
      }, 150);
    } else {
      onScrollToEstimator();
    }
  };

  const menuItems = [
    { label: 'Work', view: 'home' as const, action: () => handleNavClick('home') },
    { label: 'Services', view: 'services' as const, action: () => handleNavClick('services') },
    { label: 'Contact', view: 'services' as const, action: handleEstimatorClick },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out border-b ${
          isScrolled
            ? 'py-4 glass-white border-bw-white/5'
            : 'py-8 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start cursor-pointer group text-left"
          >
            <span className="font-brutal text-2xl md:text-3xl font-black tracking-[0.15em] text-bw-white group-hover:text-bw-white/80 transition-colors duration-500">
              ANARCHY
            </span>
            <span className="text-[8px] font-extrabold tracking-[0.45em] text-bw-white/60 uppercase group-hover:text-bw-white transition-colors duration-500 -mt-0.5">
              ANTS
            </span>
          </motion.button>

          <nav className="hidden md:flex items-center gap-10">
            {menuItems.map((item, idx) => {
              const isItemActive =
                (item.label === 'Work' && activeView === 'home') ||
                (item.label !== 'Work' && activeView === 'services');

              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className={`relative py-1 text-[11px] tracking-[0.3em] font-semibold uppercase transition-colors duration-500 hover:text-bw-white cursor-pointer ${
                    isItemActive ? 'text-bw-white' : 'text-bw-white/60'
                  }`}
                >
                  {item.label}
                  {isItemActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-bw-white"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] font-bold text-white bg-bw-offwhite border border-white/20 px-3 py-1 rounded-full uppercase">
              <span className="w-1.5 h-1.5 bg-bw-red rounded-full" />
              <span>Creative Collective</span>
            </span>
            <div className="h-4 w-[1px] bg-bw-gray-light" />
            <span className="text-[10px] tracking-[0.2em] font-medium text-bw-gray italic">
              Paris, France
            </span>
          </div> */}

          <div className="flex md:hidden items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-bw-white/20 bg-bw-white text-bw-red hover:bg-bw-offwhite transition-colors duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bw-card text-bw-white flex flex-col justify-center px-12 md:hidden"
          >
            <div className="absolute top-6 left-6">
              <span className="font-brutal text-2xl font-black tracking-[0.15em] text-bw-white">ANARCHY</span>
            </div>

            <nav className="flex flex-col gap-10 relative z-10">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, type: 'spring', stiffness: 200 }}
                  onClick={item.action}
                  className={`font-brutal text-4xl text-left font-black tracking-wide transition-all duration-300 ${
                    activeView === item.view ? 'text-bw-white bg-bw-white/10 -mx-4 px-4 py-2' : 'text-bw-white/60 hover:text-bw-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-12 right-12 flex flex-col gap-4 border-t border-bw-white/10 pt-8"
            >
              <span className="text-[10px] tracking-[0.25em] font-bold text-bw-white uppercase">ANARCHY ANTS</span>
              <span className="text-xs text-bw-white/40 tracking-wider">Paris, France</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
