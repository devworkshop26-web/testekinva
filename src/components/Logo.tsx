import React from 'react';

export const Logo: React.FC<{ className?: string, lightMode?: boolean }> = ({ className = "", lightMode = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-extrabold text-2xl sm:text-3xl tracking-tight ${lightMode ? 'text-white' : 'text-slate-900'}`}>
        Kinva
      </span>
      <div className="flex gap-1 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
      </div>
    </div>
  );
};