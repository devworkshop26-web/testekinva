
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const ServicesOverview: React.FC = () => {
  const { content } = useLanguage();
  const { services_overview } = content;

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="expertise" className="min-h-screen flex flex-col justify-center py-20 bg-slate-50 snap-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-xl text-slate-600 leading-relaxed">
              {services_overview.subtitle}
            </p>
          </div>
          
          <a 
            href="#contact" 
            onClick={(e) => scrollToId(e, '#contact')}
            className="hidden md:flex items-center font-bold text-slate-900 hover:text-accent transition-colors pb-2 border-b-2 border-slate-900 hover:border-accent"
          >
            {services_overview.cta} <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Updated grid for 3 items (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services_overview.poles.map((pole, index) => (
            <motion.a
              key={pole.id}
              href={`#${pole.id}`}
              onClick={(e) => scrollToId(e, `#${pole.id}`)}
              className="group flex flex-col justify-between p-8 bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 ease-out border border-slate-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center mb-8 transition-colors duration-300">
                  <pole.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pole.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-8">
                  {pole.shortDescription}
                </p>
              </div>

              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:text-accent group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a 
             href="#contact" 
             onClick={(e) => scrollToId(e, '#contact')}
             className="inline-flex items-center font-bold text-slate-900 hover:text-accent transition-colors pb-2 border-b-2 border-slate-900 hover:border-accent"
            >
            {services_overview.cta} <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
