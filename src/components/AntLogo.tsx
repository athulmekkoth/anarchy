import React from 'react';

interface AntLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const AntLogo: React.FC<AntLogoProps> = ({
  className = '',
  size = 320,
  color = '#dc143c',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Antenna */}
      <path
        d="M100 32 L85 12 L68 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="66" cy="6" r="4" fill={color} />

      {/* Right Antenna */}
      <path
        d="M100 32 L115 12 L132 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="134" cy="6" r="4" fill={color} />

      {/* Head */}
      <ellipse cx="100" cy="52" rx="22" ry="18" stroke={color} strokeWidth="3" fill="none" />

      {/* Eyes */}
      <ellipse cx="90" cy="48" rx="5" ry="6" fill={color} />
      <ellipse cx="110" cy="48" rx="5" ry="6" fill={color} />

      {/* Mandibles */}
      <path
        d="M88 66 L80 76 L88 72 M112 66 L120 76 L112 72"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Neck/Petiole */}
      <rect x="94" y="68" width="12" height="10" rx="2" fill={color} />

      {/* Thorax */}
      <ellipse cx="100" cy="94" rx="28" ry="20" stroke={color} strokeWidth="3" fill="none" />

      {/* Thorax segment line */}
      <line x1="80" y1="90" x2="120" y2="90" stroke={color} strokeWidth="1.5" />

      {/* Waist connector */}
      <rect x="96" y="112" width="8" height="8" rx="2" fill={color} />

      {/* Abdomen */}
      <ellipse cx="100" cy="144" rx="34" ry="28" stroke={color} strokeWidth="3" fill="none" />

      {/* Abdomen segments */}
      <path d="M72 134 Q100 130 128 134" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M70 148 Q100 144 130 148" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M76 160 Q100 156 124 160" stroke={color} strokeWidth="1.5" fill="none" />

      {/* Legs - Left */}
      <path d="M78 82 L52 68 L36 72" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 94 L48 96 L32 104" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M78 106 L52 118 L38 128" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Legs - Right */}
      <path d="M122 82 L148 68 L164 72" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M126 94 L152 96 L168 104" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M122 106 L148 118 L162 128" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Stinger */}
      <path d="M100 172 L100 186" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polygon points="100,192 95,184 105,184" fill={color} />
    </svg>
  );
};
