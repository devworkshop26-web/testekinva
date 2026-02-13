import React from 'react';
import { useLanguage } from '../LanguageContext';

export const WhyUs: React.FC = () => {
  const { content } = useLanguage();
  const { about } = content;

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 bg-white snap-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {about.whyUsTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {about.whyUsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.whyUsPoints.map((point, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <point.icon className="w-8 h-8 text-slate-900 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">{point.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};