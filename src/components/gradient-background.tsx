import React from 'react';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = {
  children: React.ReactNode;
  showGrid?: boolean;
  className?: string;
};

export function GradientBackground({
  children,
  showGrid = false,
  className,
}: GradientBackgroundProps) {
  return (
    <div className={cn('relative min-h-dvh w-full overflow-hidden bg-slate-950', className)}>

      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-slate-950 to-slate-950" />

      {showGrid && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
