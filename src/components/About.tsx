import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { Button } from './Button';

export const About: React.FC = () => {
  const { content } = useLanguage();
  const { about } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleOpenChatbot = () => {
    window.dispatchEvent(new Event('open-chatbot'));
  };

  return (
    <section id="about" className="h-screen bg-slate-50 snap-start overflow-hidden relative flex-shrink-0 flex flex-col justify-center">
      
      <div className="w-full h-full max-w-[1600px] mx-auto lg:grid lg:grid-cols-2 overflow-y-auto lg:overflow-hidden">
        
        {/* === LEFT COLUMN: IDENTITY & VALUES === */}
        <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center h-full overflow-y-auto no-scrollbar lg:border-r lg:border-slate-200">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
                {about.badge}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              {about.title}
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              {about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-12 border-b border-slate-200 pb-8">
              {about.stats.map((stat, idx) => (
                <div key={idx} className="border-l-4 border-brand-teal pl-4">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Why Us Grid (Compact) */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{about.whyUsTitle}</h3>
              <p className="text-sm text-slate-500 mb-6">{about.whyUsSubtitle}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.whyUsPoints.map((point, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors">
                        <point.icon className="w-4 h-4 text-slate-900 group-hover:text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{point.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* === RIGHT COLUMN: VISUAL & FAQ === */}
        <div className="bg-white p-6 sm:p-10 lg:p-16 h-full overflow-y-auto no-scrollbar flex flex-col justify-center">
           <div className="max-w-2xl mx-auto lg:mx-0 w-full">
              
              {/* FAQ Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{about.faqTitle}</h3>
                <div className="space-y-3">
                  {about.faqQuestions.map((item, index) => (
                    <div 
                      key={index}
                      className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 transition-all duration-300 hover:shadow-sm"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                      >
                        <span className={`text-sm font-bold ${openIndex === index ? 'text-brand-teal' : 'text-slate-900'}`}>
                          {item.question}
                        </span>
                        <span className={`p-1 rounded-full transition-colors ${openIndex === index ? 'bg-brand-teal text-white' : 'bg-white text-slate-400'}`}>
                          {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chatbot CTA */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200"
              >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0 animate-pulse">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{about.faqCta}</h4>
                      <p className="text-slate-400 text-sm">{about.faqCtaSub}</p>
                    </div>
                </div>
                <Button onClick={handleOpenChatbot} className="bg-white text-slate-900 hover:bg-slate-100 whitespace-nowrap w-full sm:w-auto">
                  Discuter avec Rabe IA
                </Button>
              </motion.div>

           </div>
        </div>

      </div>
    </section>
  );
};