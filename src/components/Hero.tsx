
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
    onOpenService: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { content } = useLanguage();
  const slides = content.hero.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 12000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToId = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrimaryClick = () => {
     // Use the ID from the slide to determine which service overlay to open
     const currentId = slides[currentIndex].id;
     onOpenService(currentId);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-slate-900 snap-start flex-shrink-0">
      
      {/* 1. Full Screen Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
             <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentIndex].img})` }}
             />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none"></div>

      {/* 3. Content Layer */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
         
         <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between w-full h-full pb-20 pt-32 lg:pt-0">
            
            {/* Text Content */}
            <motion.div 
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  {content.hero.location}
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                  {slides[currentIndex].title}
                </h1>
                
                {/* Updated to render HTML for styling (colors/bold) */}
                <div 
                  className="text-lg md:text-2xl text-slate-200 mb-6 leading-relaxed font-medium max-w-2xl drop-shadow-md [&>span]:font-bold"
                  dangerouslySetInnerHTML={{ __html: slides[currentIndex].subtitle }}
                />

                {/* Added Description */}
                <p className="text-base text-slate-400 mb-10 leading-relaxed max-w-xl font-medium">
                  {slides[currentIndex].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handlePrimaryClick} 
                    className="h-14 px-8 text-base shadow-xl shadow-black/20 rounded-full bg-accent text-white hover:bg-accent-dark border-none"
                  >
                    {slides[currentIndex].ctaText || content.hero.cta_primary}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => scrollToId(`#${slides[currentIndex].id}`)} 
                    className="h-14 px-8 text-base border-white/40 text-white hover:bg-white/10 hover:border-white bg-transparent rounded-full backdrop-blur-sm"
                  >
                    {content.hero.cta_secondary}
                  </Button>
                </div>
            </motion.div>

            {/* Indicators */}
            <div className="hidden lg:flex flex-col gap-4 items-end justify-center h-full pr-4">
               {slides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`group cursor-pointer flex items-center gap-4 transition-all duration-300 ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4 hover:translate-x-2 hover:opacity-70'}`}
                  >
                     <div className="text-right">
                        <div className="text-white font-bold text-sm drop-shadow-md">{slide.id.toUpperCase()}</div>
                        {/* We don't render subtitle in indicator anymore as it contains HTML */}
                     </div>
                     <div className={`w-1.5 h-12 rounded-full transition-all duration-500 shadow-lg ${index === currentIndex ? 'bg-accent h-20' : 'bg-white'}`}></div>
                  </div>
               ))}
            </div>
         </div>

         {/* Mobile Indicators */}
         <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-2 pb-4 z-30">
            {slides.map((slide, index) => (
              <button 
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                  index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/70'
                }`}
              />
            ))}
         </div>

      </div>
    </section>
  );
};
