
import React, { useState, useEffect } from 'react';
import { DetailedServiceData } from '../types';
import { Button } from './Button';
import { Check, ArrowRight, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  data: DetailedServiceData;
  reverse?: boolean;
  onCtaClick?: () => void;
}

const getTechIcon = (name: string) => {
  // Helper functions for icon sources
  const devIcon = (slug: string, version: string = 'original') => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${version}.svg`;
  const simpleIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

  const map: Record<string, string> = {
    // --- WEB & CODE ---
    "React": devIcon('react'),
    "Next.js": devIcon('nextjs'),
    "Tailwind": devIcon('tailwindcss', 'plain'), // Plain is better for colored bg sometimes, or original
    "Tailwind CSS": devIcon('tailwindcss', 'plain'),
    "Node.js": devIcon('nodejs'),
    "Supabase": devIcon('supabase'),
    "Shopify": simpleIcon('shopify'),
    "HTML5": devIcon('html5'),
    "CSS3": devIcon('css3'),
    "PHP": devIcon('php'),
    "Laravel": devIcon('laravel', 'plain'), // Laravel plain is red (colored)
    "WordPress": devIcon('wordpress', 'plain'),
    "WooCommerce": devIcon('woocommerce', 'plain'), // plain is purple
    "JavaScript": devIcon('javascript'),
    "TypeScript": devIcon('typescript'),
    "Figma": devIcon('figma'),
    
    // --- SYSTEMS & INFRA ---
    "Linux": devIcon('linux'),
    "Windows": simpleIcon('windows'),
    "Windows Server": simpleIcon('windows'),
    "Windows 11": simpleIcon('windows'),
    "MacOS": simpleIcon('apple'),
    "Apple": simpleIcon('apple'),
    "Android": devIcon('android'),
    "iOS": simpleIcon('ios'),
    "Docker": devIcon('docker'),
    "Cisco": simpleIcon('cisco'),
    "Mikrotik": simpleIcon('mikrotik'),
    "Ubiquiti": simpleIcon('ubiquiti'),
    "Fortinet": simpleIcon('fortinet'),
    "Synology": simpleIcon('synology'),
    "Starlink": simpleIcon('spacex'), 
    
    // --- AI & DATA ---
    "Python": devIcon('python'),
    "TensorFlow": devIcon('tensorflow'),
    "OpenAI": simpleIcon('openai'),
    "ChatGPT": simpleIcon('openai'),
    "Meta Llama": simpleIcon('meta'),
    "n8n": simpleIcon('n8n'),
    "Pandas": devIcon('pandas'),
    "Scikit-learn": devIcon('scikitlearn'),
    "Hugging Face": simpleIcon('huggingface'),
    
    // --- TOOLS & OFFICE ---
    "Trello": devIcon('trello', 'plain'),
    "Slack": devIcon('slack'),
    "Notion": simpleIcon('notion'),
    "Google Workspace": simpleIcon('google'),
    "Office 365": simpleIcon('microsoftoffice'),
    "Excel": simpleIcon('microsoftexcel'),
    "PowerPoint": simpleIcon('microsoftpowerpoint'),
    "Zoom": simpleIcon('zoom')
  };
  
  // Try to find exact match
  if (map[name]) return map[name];
  
  // Fallback for some common variations
  const lower = name.toLowerCase();
  if (lower.includes('windows')) return simpleIcon('windows');
  if (lower.includes('mac')) return simpleIcon('apple');
  if (lower.includes('android')) return devIcon('android');
  
  return null;
}

const ServiceCarousel = ({ gallery }: { gallery: { title: string; image: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (!gallery || gallery.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    if (!gallery || gallery.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Auto-play
  useEffect(() => {
    if (!gallery || gallery.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, gallery]);

  // Safeguard against empty gallery
  if (!gallery || gallery.length === 0) {
    return (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
        <div className="text-white/20 font-bold uppercase tracking-widest">Kinva Systems</div>
      </div>
    );
  }

  // Ensure currentIndex is valid
  const currentImage = gallery[currentIndex]?.image || "";
  const currentTitle = gallery[currentIndex]?.title || "";

  return (
    <div className="relative w-full h-full group overflow-hidden bg-slate-900">
      {/* Slides */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${currentImage})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
        </motion.div>
      </AnimatePresence>

      {/* Caption Floating */}
      <div className="absolute bottom-12 left-12 z-20 max-w-md hidden md:block">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            {gallery.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 shadow-sm ${idx === currentIndex ? 'w-12 bg-white' : 'w-3 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
        <motion.div
           key={`caption-${currentIndex}`}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
            <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
              {currentTitle}
            </h3>
        </motion.div>
      </div>

      {/* Controls */}
      {gallery.length > 1 && (
        <div className="absolute right-8 bottom-8 flex gap-3 z-30">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export const DetailedServiceSection: React.FC<Props> = ({ data, reverse = false, onCtaClick }) => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCtaClick) {
        onCtaClick();
    } else {
        const contact = document.querySelector('#contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  // Safeguard
  if (!data) return null;

  return (
    <section 
      id={data.id} 
      className="relative w-full h-screen snap-start flex flex-col lg:flex-row bg-white overflow-hidden flex-shrink-0"
    >
      {/* --- Content Side --- */}
      <div className={`
        flex-1 relative flex flex-col justify-center 
        px-6 sm:px-12 lg:px-20 xl:px-24 py-12 lg:py-0
        z-10 h-full overflow-y-auto lg:overflow-visible
        ${data.themeColor}
        ${reverse ? 'lg:order-2' : 'lg:order-1'}
      `}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-2xl mx-auto lg:mx-0 my-auto"
        >
          <div className="flex items-center gap-4 mb-6 lg:mb-8 pt-20 lg:pt-0">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal shadow-sm">
              <data.icon className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <span className="text-xs lg:text-sm font-extrabold text-slate-400 tracking-[0.2em] uppercase">
              {data.title ? data.title.split('·')[0] : "Service"}
            </span>
          </div>
          
          <div 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 lg:mb-6 leading-[1.15] tracking-tight [&>span]:font-extrabold"
            dangerouslySetInnerHTML={{ __html: data.subtitle || "" }}
          />
          
          <div 
            className="text-base lg:text-lg text-slate-600 mb-8 lg:mb-10 leading-relaxed [&>strong]:font-bold [&>strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: data.description || "" }}
          />

          <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
            {data.features && data.features.slice(0, 5).map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="flex items-start gap-4 group"
              >
                <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-slate-700 font-medium text-sm lg:text-base">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* --- TECH STACK (UPDATED WITH ICONS) --- */}
          {data.techStack && data.techStack.length > 0 && (
             <div className="mb-8 lg:mb-10">
                <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                   <Cpu className="w-3 h-3" /> Stack Technique
                </div>
                <div className="flex flex-wrap gap-2">
                   {data.techStack.map((tech, idx) => {
                      const iconUrl = getTechIcon(tech);
                      return (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-mono text-xs font-bold hover:bg-slate-200 hover:border-slate-300 transition-all cursor-default flex items-center gap-2 group shadow-sm">
                           {iconUrl ? (
                             <img src={iconUrl} alt={tech} className="w-4 h-4 object-contain group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100" />
                           ) : null}
                           {tech}
                        </span>
                      );
                   })}
                </div>
             </div>
          )}

          {data.benefit && (
             <div className="bg-white/50 border-l-4 border-brand-teal p-4 lg:p-5 mb-8 lg:mb-10 text-slate-700 font-medium italic rounded-r-lg text-sm lg:text-base">
              "{data.benefit}"
            </div>
          )}

          <div className="pb-20 lg:pb-0">
            <Button onClick={handleCtaClick} variant="outline" className="py-3 px-6 lg:py-4 lg:px-8 text-base lg:text-lg border-slate-300 text-slate-900 hover:border-brand-teal hover:bg-brand-teal hover:text-white group">
              {data.ctaText || "En savoir plus"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* --- Visual Side (Full Bleed) --- */}
      <div className={`
        flex-1 h-[30vh] lg:h-full relative overflow-hidden bg-slate-100 hidden lg:block
        ${reverse ? 'lg:order-1' : 'lg:order-2'}
      `}>
        <ServiceCarousel gallery={data.gallery || []} />
      </div>
    </section>
  );
};
