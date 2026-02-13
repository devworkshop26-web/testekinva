import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export const Approach: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { content } = useLanguage();
  const { approach } = content;

  return (
    <section id="approach" className="h-screen flex flex-col justify-center py-24 bg-slate-950 text-white overflow-hidden snap-start relative flex-shrink-0">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 h-full flex flex-col justify-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            {approach.badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
          >
            {approach.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400"
          >
            {approach.subtitle}
          </motion.p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          
          {/* Desktop Connecting Line (Moved to top for hanging effect) */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[2px] bg-slate-800 rounded-full overflow-hidden z-0">
             {/* Animated Progress Line */}
             <motion.div 
               className="h-full bg-gradient-to-r from-brand-teal via-brand-purple to-brand-coral"
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
             ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {approach.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group z-10"
                onMouseEnter={() => setActiveStep(step.number)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Desktop Dot on Line */}
                 <div className={`
                  hidden lg:block absolute top-[28px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300
                  ${activeStep === step.number ? 'bg-white border-white scale-150 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-slate-950 border-slate-600'}
                `}></div>

                {/* Step Card */}
                <div 
                  className={`
                    relative p-8 rounded-3xl border transition-all duration-500 h-full flex flex-col mt-0 lg:mt-16
                    ${activeStep === step.number 
                        ? 'bg-slate-800/90 border-slate-600 -translate-y-2 shadow-2xl shadow-slate-900/50' 
                        : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/60'}
                  `}
                >
                  {/* Header: Number Left, Icon Right (Button style on right) */}
                  <div className="flex items-center justify-between mb-6">
                     <span className={`
                      text-5xl font-black font-sans transition-colors duration-300 select-none
                      ${activeStep === step.number ? 'text-white opacity-20' : 'text-slate-800 opacity-40'}
                    `}>
                      0{step.number}
                    </span>

                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500
                      ${activeStep === step.number ? 'bg-white text-slate-900 rotate-6 scale-110 shadow-lg shadow-white/10' : 'bg-slate-800 text-slate-500'}
                    `}>
                      <step.icon className={`w-7 h-7 ${activeStep === step.number ? 'text-slate-900' : step.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-4 transition-colors ${activeStep === step.number ? 'text-white' : 'text-slate-200'}`}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};