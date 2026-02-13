
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ArrowRight, AlertTriangle, CheckCircle2, Zap, HelpCircle, ChevronRight, AlertCircle, TrendingUp, Info, ShieldAlert, Cpu, Check, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { CONTACT_INFO, REAL_CASES_SYSTEMS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { Button } from './Button';

interface AuditOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const AuditOverlay: React.FC<AuditOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<typeof REAL_CASES_SYSTEMS[0] | null>(null);

  if (!isOpen) return null;

  const overlayData = content.overlays.services.find(s => s.id === 'network');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-white overflow-y-auto selection:bg-brand-teal selection:text-white"
    >
      {/* Header Fixed */}
      <div className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight">Kinva IT Expertise</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Section Intro */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white font-bold text-[10px] mb-6 uppercase tracking-[0.2em]"
          >
            Sérénité • Rentabilité • Croissance
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: overlayData?.subtitle || "" }} />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            L'informatique ne doit pas être un problème, mais un outil. Nous installons des systèmes qui travaillent pour vous, pas l'inverse.
          </p>
        </div>

        {/* GRILLE DE CARTES VISUELLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {REAL_CASES_SYSTEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCase(item)}
              className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden flex flex-col hover:border-brand-teal hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              {/* Card Image Header */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-slate-900 shadow-lg">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed italic mb-6">
                  "{item.scenario}"
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.15em]">Voir l'impact business</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-teal group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* COMPARATIF PATRON */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-24 shadow-2xl">
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-6">
                    Même pour les petites équipes (3+)
                 </div>
                 <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Vous n'êtes jamais trop petit pour être Pro.</h3>
                 <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Une seule panne peut bloquer votre chiffre d'affaires. À Madagascar, le danger (JIRAMA, vols, hacks) est réel dès le premier jour. On vous protège.
                 </p>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-slate-300 font-bold">
                       <Check className="w-5 h-5 text-brand-teal" /> On sécurise vos accès bancaires.
                    </li>
                    <li className="flex items-center gap-4 text-slate-300 font-bold">
                       <Check className="w-5 h-5 text-brand-teal" /> On sauvegarde vos contrats à vie.
                    </li>
                    <li className="flex items-center gap-4 text-slate-300 font-bold">
                       <Check className="w-5 h-5 text-brand-teal" /> On prépare votre croissance (3 -&gt; 100).
                    </li>
                 </ul>
              </div>
              <div className="relative hidden md:block">
                 <img 
                   src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Bureau pro" 
                   className="rounded-[2rem] shadow-2xl border border-white/10"
                 />
                 <div className="absolute -bottom-6 -right-6 bg-brand-teal p-8 rounded-3xl text-center shadow-xl">
                    <div className="text-4xl font-black text-white">100%</div>
                    <div className="text-[10px] font-bold text-white uppercase mt-1">Sérénité</div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA FINAL */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[3rem] p-10 md:p-16 text-center">
           <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Prêt à sortir du bricolage ?</h3>
           <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
             On vient auditer votre bureau gratuitement à Antananarivo. Pas de blabla, juste des solutions pour que votre business gagne de l'argent.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               onClick={() => { onClose(); onContactClick(); }}
               className="py-5 px-12 text-xl bg-slate-900 text-white shadow-xl hover:scale-105 rounded-2xl"
             >
                Réserver mon audit gratuit
                <ArrowRight className="ml-2 w-6 h-6" />
             </Button>
             <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="flex items-center justify-center px-10 py-5 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-900 hover:bg-slate-50 transition-all">
               Appeler un expert
             </a>
           </div>
        </div>

      </div>

      {/* MODAL POP-UP (SELECTED CASE) */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedCase(null)}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
             />

             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
             >
                {/* Modal Visual Side */}
                <div className="md:w-1/2 h-48 md:h-auto overflow-hidden relative">
                   <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                      <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                         <selectedCase.icon className="w-8 h-8 text-white" />
                      </div>
                   </div>
                </div>

                {/* Modal Content Side */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                   <div className="flex justify-between items-start mb-8">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{selectedCase.title}</h3>
                      <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                         <X className="w-6 h-6 text-slate-400" />
                      </button>
                   </div>

                   <div className="space-y-8">
                      <div className="bg-slate-50 p-6 rounded-3xl italic text-slate-600 font-medium border border-slate-100 text-sm md:text-base">
                         "{selectedCase.scenario}"
                      </div>

                      <div className="grid gap-6">
                         <div className="p-5 border-2 border-red-50 bg-red-50/30 rounded-2xl relative overflow-hidden">
                            <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-2">
                               <AlertTriangle className="w-4 h-4" /> Le Bricolage (Perte d'argent)
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                               {selectedCase.bricolage}
                            </p>
                         </div>
                         <div className="p-5 border-2 border-emerald-50 bg-emerald-50 rounded-2xl relative overflow-hidden">
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-2">
                               <CheckCircle2 className="w-4 h-4" /> Expertise Kinva (Résultat attendu)
                            </div>
                            <p className="text-sm text-slate-900 font-bold leading-relaxed">
                               {selectedCase.pro}
                            </p>
                         </div>
                      </div>

                      <div className="bg-slate-900 p-8 rounded-3xl text-white">
                         <div className="flex items-center gap-3 text-brand-teal font-black text-[10px] uppercase tracking-widest mb-2">
                            <TrendingUp className="w-4 h-4" /> Impact sur votre Rentabilité
                         </div>
                         <p className="text-base md:text-lg font-bold leading-relaxed">
                            {selectedCase.rentabilite}
                         </p>
                      </div>
                   </div>

                   <div className="mt-10 flex justify-center">
                      <Button 
                        onClick={() => { setSelectedCase(null); onClose(); onContactClick(); }}
                        className="w-full py-4 text-lg bg-brand-teal text-white shadow-xl shadow-brand-teal/20 rounded-2xl"
                      >
                         Régler ce problème
                         <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
