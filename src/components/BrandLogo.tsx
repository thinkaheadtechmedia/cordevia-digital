import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Monogram Symbol */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow ${iconSizes[size]}`}>
        <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle tech background grid pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:6px_6px]" />
          
          {/* Custom Stylized Monogram CD Icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-5 h-5 text-cyan-400 stroke-[2.2] fill-none relative z-10" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Outer C-arc */}
            <path d="M12 3a9 9 0 1 0 9 9h-3.5a5.5 5.5 0 1 1-5.5-5.5V3z" className="text-cyan-400" />
            {/* Inner dynamic D / media arrow */}
            <polygon points="12,8 18,12 12,16" className="fill-teal-400 text-teal-400" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-white ${titleSizes[size]}`}>
            Cordevia<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Digital</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Media-Tech Agency
          </span>
        )}
      </div>
    </div>
  );
};
