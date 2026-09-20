import React, { useEffect, useRef } from 'react';
import { Sparkles, Info } from 'lucide-react';

interface AdSenseUnitProps {
  slotId?: string;
  client?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'leaderboard';
  responsive?: boolean;
  className?: string;
  label?: string;
  demoTitle?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slotId = '1234567890',
  client = 'ca-pub-9204859182740192',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Sponsored Content',
  demoTitle,
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only attempt push if window.adsbygoogle is active in production
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        // Silently catch ad blockers or duplicate pushes
      }
    }
  }, []);

  return (
    <div className={`my-8 rounded-2xl bg-[#070B14]/80 border border-slate-800/80 p-4 transition-all ${className}`}>
      {/* Google AdSense Compliant Label */}
      <div className="flex items-center justify-between gap-2 pb-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
        <span>{label}</span>
        <span className="flex items-center gap-1 text-slate-600">
          <span>Google AdSense Ready</span>
          <Info className="w-3 h-3" />
        </span>
      </div>

      {/* Ad Area with strict min-height to prevent Layout Shifts (CLS 0.000) */}
      <div 
        ref={adRef}
        className="min-h-[100px] flex flex-col items-center justify-center rounded-xl bg-slate-900/40 border border-dashed border-slate-800 p-4 text-center overflow-hidden"
      >
        <div className="max-w-md space-y-1.5 py-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Responsive Ad Slot #{slotId}</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {demoTitle || 'Cordevia Digital Enterprise Search & Media Growth Retainers'}
          </p>
          <p className="text-[11px] text-slate-500">
            AdSense slot configured with clean margin boundaries, automated responsive width, and zero CLS impact.
          </p>
        </div>
      </div>
    </div>
  );
};
