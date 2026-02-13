
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, TrendingUp, CheckCircle2, ExternalLink, Presentation, MousePointerClick, Briefcase, LayoutTemplate, Trello, Slack, FileCheck, Coins, Clock, Target, Calendar, List, ArrowRight, Users, Keyboard, Palette, Facebook, Headphones } from 'lucide-react';
import { TRAINING_SOLUTIONS, TRAINING_FEATURES, TRAINING_PORTFOLIO_EXAMPLES, FMFP_INFO } from '../constants';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';
import { TrainingCourse } from '../types';

interface TrainingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const TrainingOverlay: React.FC<TrainingOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);

  if (!isOpen) return null;

  // Find the translated text for this overlay from the context
  const overlayData = content.overlays.services.find(s => s.id === 'training');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-white overflow-y-auto"
    >
      {/* Header / Nav */}
      <div className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden md:block">Formation & Montée en Compétences</span>
          <span className="font-bold text-slate-900 md:hidden">Formation</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Intro */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-coral/10 text-brand-coral font-bold text-sm mb-6"
          >
            Capital Humain & Productivité
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.subtitle : "Formation & Outils" }}
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.description : "Description..." }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Scenario A : La Stack Moderne */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-coral/5 rounded-full blur-3xl pointer-events-none"></div>
               <div>
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <LayoutTemplate className="w-8 h-8 text-brand-coral" />
                    <h3 className="text-2xl font-bold text-slate-900">Les Outils Modernes</h3>
                 </div>
                 <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                   Arrêtez de tout gérer par email ou sur papier. Passez aux outils qui font gagner du temps.
                 </p>
                 <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-bold flex items-center gap-2 shadow-sm">
                       Notion (Savoir)
                    </span>
                    <span className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-bold flex items-center gap-2 shadow-sm">
                       Trello / Jira (Tâches)
                    </span>
                    <span className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-bold flex items-center gap-2 shadow-sm">
                       Slack / Teams (Parler)
                    </span>
                 </div>
                 <p className="text-sm text-slate-500 italic">
                   * Nous installons ces outils et formons vos équipes à les utiliser efficacement.
                 </p>
               </div>
            </motion.div>

            {/* Scenario B : Stratégie (Dirigeants) */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-coral/10 rounded-full blur-2xl pointer-events-none"></div>
               <div>
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Briefcase className="w-8 h-8 text-brand-coral" />
                    <h3 className="text-2xl font-bold">Vision pour Décideurs</h3>
                 </div>
                 <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                   Pour les Seniors et Directeurs qui ne veulent pas être en retard sur la révolution IA.
                 </p>
                 <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-brand-coral rounded-full"></div>
                      Comprendre l'impact stratégique de l'IA
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-brand-coral rounded-full"></div>
                      Identifier les risques et opportunités
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-brand-coral rounded-full"></div>
                      Piloter la transformation digitale
                    </li>
                 </ul>
               </div>
            </motion.div>
        </div>

        {/* --- FINANCEMENT FMFP --- */}
        <motion.div 
           initial={{ scale: 0.95, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           className="bg-amber-50 border border-amber-100 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden"
        >
           <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
           
           <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="flex-shrink-0">
                 <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4 md:mb-0 shadow-sm border border-amber-200">
                    <Coins className="w-10 h-10" />
                 </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                 <h3 className="text-2xl md:text-3xl font-extrabold text-amber-900 mb-3">
                    {FMFP_INFO.title}
                 </h3>
                 <p className="text-amber-800/80 text-lg leading-relaxed mb-6 max-w-3xl">
                    {FMFP_INFO.description}
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {FMFP_INFO.benefits.map((benefit, idx) => (
                       <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-amber-900 font-bold text-sm shadow-sm border border-amber-100">
                          <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          {benefit}
                       </div>
                    ))}
                 </div>
              </div>
              <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-auto">
                 <Button 
                   disabled
                   className="bg-slate-300 text-slate-500 border-none shadow-none cursor-not-allowed hover:bg-slate-300"
                 >
                   Bientôt disponible
                   <Clock className="ml-2 w-5 h-5" />
                 </Button>
              </div>
           </div>
        </motion.div>

        {/* --- SOLUTIONS GRID (CATALOGUE INTERACTIF) --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Catalogue de Formation</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">Cliquez sur un cours pour voir le programme détaillé.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {TRAINING_SOLUTIONS.map((sol, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedCourse(sol)}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-coral/30 hover:-translate-y-1 transition-all group flex flex-col cursor-pointer relative"
                >
                   <div className="w-12 h-12 rounded-xl bg-brand-coral/5 text-brand-coral flex items-center justify-center mb-4 group-hover:bg-brand-coral group-hover:text-white transition-colors">
                      <sol.icon className="w-6 h-6" />
                   </div>
                   <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-coral transition-colors">{sol.title}</h4>
                   <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{sol.description}</p>
                   
                   {/* Mini Badges */}
                   <div className="flex gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {sol.duration}</span>
                      <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {sol.level}</span>
                   </div>

                   <div className="flex flex-wrap gap-2 mt-auto">
                      {sol.tags.map((tag, tIdx) => (
                         <span key={tIdx} className="px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100 group-hover:bg-brand-coral/10 group-hover:text-brand-coral transition-colors">
                            {tag}
                         </span>
                      ))}
                   </div>
                   
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-brand-coral" />
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

         {/* --- COURSE DETAIL MODAL --- */}
         <AnimatePresence>
            {selectedCourse && (
               <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setSelectedCourse(null)}
                     className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  />

                  {/* Modal Card */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
                  >
                     <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-14 h-14 rounded-2xl bg-brand-coral text-white flex items-center justify-center shadow-lg shadow-brand-coral/20">
                              <selectedCourse.icon className="w-7 h-7" />
                           </div>
                           <button onClick={() => setSelectedCourse(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                              <X className="w-6 h-6" />
                           </button>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{selectedCourse.title}</h3>
                        <p className="text-slate-600 text-lg leading-snug">{selectedCourse.description}</p>
                        
                        <div className="flex flex-wrap gap-4 mt-6">
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                              <Clock className="w-4 h-4 text-brand-coral" />
                              {selectedCourse.duration}
                           </div>
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                              <Target className="w-4 h-4 text-brand-coral" />
                              {selectedCourse.level}
                           </div>
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                              <Users className="w-4 h-4 text-brand-coral" />
                              {selectedCourse.targetAudience || "Tous publics"}
                           </div>
                        </div>
                     </div>

                     <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                           <List className="w-4 h-4" /> Programme (Syllabus)
                        </h4>
                        
                        <div className="space-y-6">
                           {selectedCourse.syllabus ? (
                              selectedCourse.syllabus.map((module, idx) => (
                                 <div key={idx} className="relative pl-6 border-l-2 border-slate-100 last:border-0 pb-2">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-50 border-2 border-brand-coral"></div>
                                    <h5 className="font-bold text-lg text-slate-900 mb-3 leading-none">{module.title}</h5>
                                    <ul className="space-y-2">
                                       {module.topics.map((topic, tIdx) => (
                                          <li key={tIdx} className="flex items-start gap-2 text-slate-600 text-sm">
                                             <CheckCircle2 className="w-4 h-4 text-brand-coral/50 shrink-0 mt-0.5" />
                                             <span className="leading-relaxed">{topic}</span>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              ))
                           ) : (
                              <p className="text-slate-500 italic">Programme détaillé disponible sur demande.</p>
                           )}
                        </div>
                     </div>

                     <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setSelectedCourse(null)}>Fermer</Button>
                        <Button 
                           onClick={() => { setSelectedCourse(null); onClose(); onContactClick(); }}
                           className="bg-brand-coral text-white hover:bg-brand-coral/90 shadow-lg shadow-brand-coral/20"
                        >
                           Demander un devis
                           <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         {/* --- PORTFOLIO EXAMPLES --- */}
         <div className="mb-24">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse"></span>
                Success Stories
             </div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Ils ont franchi le pas</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">De la mise à niveau des équipes à la vision des dirigeants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {TRAINING_PORTFOLIO_EXAMPLES.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                   <div className="relative overflow-hidden rounded-2xl mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 z-10 transition-colors duration-300"></div>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        {project.category}
                      </div>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-coral transition-colors flex items-center gap-2">
                     {project.title}
                     <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </h4>
                   <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                   </p>
                </motion.div>
             ))}
          </div>
        </div>


        {/* --- FEATURES HIGHLIGHTS --- */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 mb-16">
           <div className="max-w-4xl mx-auto">
             <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Une pédagogie adaptée</h3>
             
             <div className="grid md:grid-cols-2 gap-10">
                {TRAINING_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white shadow-sm text-brand-coral flex items-center justify-center border border-slate-100">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{feat.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">{feat.description}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-6 text-lg">Ne laissez personne sur le bord de la route.</p>
          <Button 
            onClick={() => { onClose(); onContactClick(); }}
            className="py-4 px-10 text-lg bg-brand-coral text-white shadow-xl shadow-brand-coral/30 hover:bg-brand-coral/90"
          >
            Établir un plan de formation
            <Presentation className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
};
