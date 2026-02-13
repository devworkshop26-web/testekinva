
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DetailedServiceSection } from './components/DetailedServiceSection';
import { Approach } from './components/Approach';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AuditOverlay } from './components/AuditOverlay';
import { WebOverlay } from './components/WebOverlay';
import { AiOverlay } from './components/AiOverlay';
import { TrainingOverlay } from './components/TrainingOverlay';
import { Chatbot } from './components/Chatbot';
import { AdminDashboard } from './components/AdminDashboard';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Create a wrapper component to consume the context
const MainContent: React.FC = () => {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isWebOpen, setIsWebOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const { content } = useLanguage();

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section, footer');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleServiceCtaClick = (serviceId: string) => {
    if (serviceId === 'network') {
      setIsAuditOpen(true);
    } else if (serviceId === 'web') {
      setIsWebOpen(true);
    } else if (serviceId === 'ai') {
      setIsAiOpen(true);
    } else if (serviceId === 'training') {
      // setIsTrainingOpen(true); // DISABLED
    } else if (serviceId === 'overview') {
      // For the global overview slide, scroll to the services overview section
      const element = document.querySelector('#expertise');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = () => {
    setTimeout(() => {
        const element = document.querySelector('#contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory font-sans text-slate-900 relative no-scrollbar">
      <Navbar activeSection={activeSection} />
      
      <main>
        {/* Passed handler to Hero for dynamic button clicks */}
        <Hero onOpenService={handleServiceCtaClick} />
        
        {/* Detailed Service Sections */}
        {content.overlays.services.map((service, index) => (
          <DetailedServiceSection 
            key={service.id} 
            data={service} 
            reverse={index % 2 !== 0} 
            onCtaClick={() => handleServiceCtaClick(service.id)}
          />
        ))}

        <Approach />
        
        {/* Consolidated About Section (Includes Why Us & FAQ) */}
        <About />

      </main>

      <Contact onOpenAdmin={() => setIsAdminOpen(true)} />
      
      <Chatbot />

      {/* Full Screen Overlays */}
      <AnimatePresence>
        {isAuditOpen && (
          <AuditOverlay 
            isOpen={isAuditOpen} 
            onClose={() => setIsAuditOpen(false)} 
            onContactClick={scrollToContact}
          />
        )}
        {isWebOpen && (
          <WebOverlay 
            isOpen={isWebOpen} 
            onClose={() => setIsWebOpen(false)} 
            onContactClick={scrollToContact}
          />
        )}
        {isAiOpen && (
          <AiOverlay 
            isOpen={isAiOpen} 
            onClose={() => setIsAiOpen(false)} 
            onContactClick={scrollToContact}
          />
        )}
        {/* 
        {isTrainingOpen && (
          <TrainingOverlay 
            isOpen={isTrainingOpen} 
            onClose={() => setIsTrainingOpen(false)} 
            onContactClick={scrollToContact}
          />
        )}
        */}
        {isAdminOpen && (
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;
