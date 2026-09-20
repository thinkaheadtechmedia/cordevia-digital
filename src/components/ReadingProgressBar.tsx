import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  showIndicator?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  containerRef,
  showIndicator = true,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current;

    const handleScroll = () => {
      if (target) {
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight - target.clientHeight;
        if (scrollHeight > 0) {
          const currentProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
          setProgress(currentProgress);
        }
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const currentProgress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
          setProgress(currentProgress);
        }
      }
    };

    if (target) {
      target.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => target.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  return (
    <div className="sticky top-0 left-0 right-0 z-40 w-full pointer-events-none">
      {/* Background track */}
      <div className="w-full h-1.5 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800/80">
        {/* Animated fill */}
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating progress pill */}
      {showIndicator && progress > 2 && (
        <div className="absolute right-4 top-2 pointer-events-none animate-fadeIn">
          <div className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 shadow-md backdrop-blur-md">
            {Math.round(progress)}% read
          </div>
        </div>
      )}
    </div>
  );
};
