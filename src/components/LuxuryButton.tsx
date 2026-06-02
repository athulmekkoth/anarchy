import React from 'react';
import { motion } from 'framer-motion';

interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'plain';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  if (variant === 'plain') {
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover="hover"
        whileTap="tap"
        className={`group relative text-xs tracking-[0.25em] uppercase font-bold text-white transition-all duration-300 flex items-center gap-2 cursor-pointer ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        } ${className}`}
      >
        <span className="relative z-10 flex items-center gap-1.5 font-bold">
          {children}
          <motion.span
            variants={{ hover: { x: 5 }, tap: { scale: 0.95 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-block"
          >
            →
          </motion.span>
        </span>
        <motion.span
          className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-white origin-left"
          initial={{ scaleX: 0 }}
          variants={{ hover: { scaleX: 1 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.button>
    );
  }

  if (variant === 'outline') {
    return (
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover="hover"
        whileTap="tap"
        className={`relative px-8 py-3.5 bg-transparent text-[11px] tracking-[0.3em] uppercase font-bold text-white border-2 border-white transition-all duration-300 cursor-pointer ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        } ${className}`}
      >
        <motion.span
          className="absolute inset-0 bg-white z-0 origin-bottom"
          initial={{ scaleY: 0 }}
          variants={{ hover: { scaleY: 1 } }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-bw-red">
          {children}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      className={`group relative px-9 py-4 bg-white text-bw-red font-bold text-[11px] tracking-[0.3em] uppercase overflow-hidden cursor-pointer ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${className}`}
      variants={{
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent z-0"
        initial={{ x: '-100%' }}
        variants={{ hover: { x: '100%' } }}
        transition={{ repeat: Infinity, repeatDelay: 1, duration: 1.2, ease: 'linear' }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <motion.span variants={{ hover: { x: 3 } }} className="inline-block">
          →
        </motion.span>
      </span>
    </motion.button>
  );
};
