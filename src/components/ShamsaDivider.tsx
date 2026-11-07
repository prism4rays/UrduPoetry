import React from 'react';

interface ShamsaDividerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'emerald' | 'subtle';
}

export const ShamsaDivider: React.FC<ShamsaDividerProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
}) => {
  const sizeMap = {
    sm: { container: 'h-6', icon: 'w-4 h-4', line: 'max-w-[40px]' },
    md: { container: 'h-9', icon: 'w-6 h-6', line: 'max-w-[70px]' },
    lg: { container: 'h-12', icon: 'w-8 h-8', line: 'max-w-[120px]' },
  };

  const colorMap = {
    gold: {
      line: 'bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent',
      petal: '#C5A059',
      core: '#D4AF37',
    },
    emerald: {
      line: 'bg-gradient-to-r from-transparent via-[#1B4D3E]/30 to-transparent',
      petal: '#1B4D3E',
      core: '#376757',
    },
    subtle: {
      line: 'bg-gradient-to-r from-transparent via-[#E2D9C8] to-transparent',
      petal: '#76777E',
      core: '#C5A059',
    },
  };

  const { container, icon, line } = sizeMap[size];
  const { line: lineClass, petal, core } = colorMap[variant];

  return (
    <div
      className={`flex items-center justify-center gap-3 w-full my-3 select-none pointer-events-none ${container} ${className}`}
      aria-hidden="true"
    >
      {/* Right filigree hairline */}
      <div className={`h-[1px] flex-1 ${line} ${lineClass}`} />

      {/* Mughal Shamsa Rosette Medallion */}
      <svg
        viewBox="0 0 48 48"
        className={`${icon} shrink-0 transition-transform hover:rotate-45 duration-700`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer 8-point star florets */}
        <path
          d="M24 2L28.5 13.5L40 9L35.5 20.5L46 24L35.5 27.5L40 39L28.5 34.5L24 46L19.5 34.5L8 39L12.5 27.5L2 24L12.5 20.5L8 9L19.5 13.5L24 2Z"
          stroke={petal}
          strokeWidth="1.2"
          fill={petal}
          fillOpacity="0.08"
        />
        {/* Inner interlaced floral diamond */}
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          transform="rotate(45 24 24)"
          stroke={petal}
          strokeWidth="0.9"
          strokeDasharray="2 1"
        />
        {/* Central ruby / gold jewel core */}
        <circle cx="24" cy="24" r="4.5" fill={core} />
        <circle cx="24" cy="24" r="2" fill="#FCF9F2" />
      </svg>

      {/* Left filigree hairline */}
      <div className={`h-[1px] flex-1 ${line} ${lineClass}`} />
    </div>
  );
};
