import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Button } from './Button';

export const FAQ: React.FC = () => {
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
    <section id="faq" className="min-h-screen flex flex-col justify-center py-24 bg-white snap-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {about.faqTitle}
          </h2>
          <p className="text-xl text-slate-600">
            {about.faqSubtitle}
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {about.faqQuestions.map((item, index) => (
            <div 
              key={index}
              className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold ${openIndex === index ? 'text-brand-teal' : 'text-slate-900'}`}>
                  {item.question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-brand-teal text-white' : 'bg-white text-slate-400'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA for Chatbot */}
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0 animate-pulse">
                 <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-white font-bold text-lg">{about.faqCta}</h4>
                 <p className="text-slate-400 text-sm">{about.faqCtaSub}</p>
              </div>
           </div>
           <Button onClick={handleOpenChatbot} className="bg-white text-slate-900 hover:bg-slate-100 whitespace-nowrap">
             Discuter avec Rakoto
           </Button>
        </div>

      </div>
    </section>
  );
};