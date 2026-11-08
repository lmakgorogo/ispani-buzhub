import React, { useEffect } from 'react';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = 'XXXXXXXXXX',
  format = 'auto',
  className = ''
}) => {
  useEffect(() => {
    try {
      // Check if adsbygoogle is available and push
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      }
    } catch (e) {
      // Suppress during development
    }
  }, []);

  return (
    <div className={`my-8 text-center overflow-hidden ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 font-mono">
        Advertisement
      </div>
      <div className="min-h-[90px] max-w-4xl mx-auto rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-2 flex items-center justify-center">
        {/* Google AdSense Responsive Ad Unit */}
        <ins
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
          Google AdSense Placement Area (MaruB Creations Partner)
        </span>
      </div>
    </div>
  );
};
