
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { language, setLanguage, content } = useLanguage();

  // Define which sections have dark backgrounds (requiring white text)
  const darkSections = ['home', 'approach'];
  const isDarkSection = darkSections.includes(activeSection);

  const textColorClass = isDarkSection ? 'text-white' : 'text-slate-900';
  const hoverBgClass = isDarkSection ? 'hover:bg-white/10' : 'hover:bg-slate-100';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (!href) return;
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string | undefined) => {
    e.preventDefault();
    if (href) scrollToSection(href);
  };
  
  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const home = document.getElementById('home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#home" 
              className="flex-shrink-0 flex items-center cursor-pointer z-50 group"
              onClick={handleLogoClick}
            >
              {isScrolled ? <Logo /> : <Logo lightMode={isDarkSection} />}
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {content.nav.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${
                    isScrolled 
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' 
                      : `${textColorClass} hover:text-opacity-80 ${hoverBgClass}`
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className={`ml-2 px-3 py-2 rounded-full font-bold text-xs flex items-center gap-1 transition-all ${
                   isScrolled 
                      ? 'text-slate-600 hover:bg-slate-100' 
                      : `${textColorClass} hover:bg-white/10`
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 z-50">
               <button
                onClick={toggleLanguage}
                className={`font-bold text-xs flex items-center gap-1 ${
                   isScrolled || isOpen || !isDarkSection
                      ? 'text-slate-900' 
                      : 'text-white'
                }`}
              >
                {language === 'fr' ? 'EN' : 'FR'}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 ${
                  isScrolled || isOpen || !isDarkSection
                    ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}
        >
          <div className="flex flex-col pt-24 px-6 h-full overflow-y-auto pb-10">
            <div className="space-y-2">
              {content.nav.links.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block p-5 text-3xl font-bold text-slate-900 hover:text-brand-teal transition-colors border-b border-slate-100 active:bg-slate-50 rounded-xl"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="mt-auto pt-8">
              <p className="text-center text-slate-400 text-sm mt-6">
                Antananarivo, Madagascar
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
