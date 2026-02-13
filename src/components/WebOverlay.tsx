
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Layout, Pizza, Calculator, Check, Minus, Star, ExternalLink, Cpu, FileText, Send, Building, Store, Briefcase, GraduationCap, Globe, Database, Users, Coins, BarChart3, Lock } from 'lucide-react';
import { WEB_SOLUTIONS, WEB_FEATURES, WEB_PORTFOLIO_EXAMPLES } from '../constants';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface WebOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const WebOverlay: React.FC<WebOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  
  // CONSULTATIVE CONFIGURATOR STATE
  const [industry, setIndustry] = useState('');
  const [scale, setScale] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [saasFeatures, setSaasFeatures] = useState<string[]>([]);
  const [vision, setVision] = useState('');

  const toggleFeature = (feat: string) => {
    setFeatures(prev => prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]);
  };

  const toggleSaas = (feat: string) => {
    setSaasFeatures(prev => prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]);
  };

  // Handle Project Request
  const handleSendRequest = () => {
      const summary = `
PROJET WEB & SAAS SUR MESURE
----------------------------
1. ACTIVITÉ : ${industry || 'Non spécifiée'}
2. ENVERGURE : ${scale || 'À définir'}

3. FONCTIONNALITÉS WEB :
${features.length > 0 ? features.map(f => `- ${f}`).join('\n') : '- Standard'}

4. MODULES SAAS (LOGICIEL MÉTIER) :
${saasFeatures.length > 0 ? saasFeatures.map(f => `- ${f}`).join('\n') : '- Aucun module SaaS demandé'}

5. VISION & BESOINS SPÉCIFIQUES :
${vision || 'Pas de détails supplémentaires.'}
----------------------------
Budget indicatif : À partir de 59 000 Ar (selon complexité).
`;

      const projectDetails = {
          subject: `Demande Web : ${industry || 'Nouveau Projet'}`,
          message: `Bonjour, voici la configuration de mon projet idéal :\n${summary}\nMerci de me recontacter pour un devis précis.`
      };

      // Dispatch event for Contact component
      const event = new CustomEvent('prefill-contact', { detail: projectDetails });
      window.dispatchEvent(event);

      onClose();
      onContactClick();
  };


  if (!isOpen) return null;

  const overlayData = content.overlays.services.find(s => s.id === 'web');

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
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden md:block">Web, Apps & E-commerce</span>
          <span className="font-bold text-slate-900 md:hidden">Web & Apps</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Intro */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-sm mb-6"
          >
            Digitalisez votre activité dès aujourd'hui
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.subtitle : "Sites Web & Applications Métiers" }}
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.description : "Nous créons des outils digitaux..." }}
          />
        </div>

        {/* --- SECTION CHOQUE : PIZZA VS BUSINESS --- */}
        <div className="mb-32">
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
                
                {/* Visual Side (Pizza) */}
                <div className="lg:w-1/2 relative min-h-[450px]">
                    <img 
                        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Pizza pepperoni" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    
                    {/* Badge Prix */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-full shadow-2xl transform rotate-[-5deg]">
                             <div className="flex flex-col items-center gap-2">
                                 <Pizza className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
                                 <div className="flex flex-col items-center leading-none">
                                    <span className="text-white text-6xl font-black tracking-tighter drop-shadow-md">59k</span>
                                    <span className="text-slate-200 text-sm font-bold uppercase tracking-wide mt-1">/ mois</span>
                                 </div>
                                 <span className="text-white font-bold uppercase tracking-widest text-sm mt-2">Pizza + Coca</span>
                             </div>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-8 w-full text-center px-8">
                        <p className="text-slate-200 font-bold text-xl">"C'est le prix d'un déjeuner éphémère."</p>
                    </div>
                </div>

                {/* Text Side (Business) */}
                <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Layout className="w-64 h-64 text-brand-purple" />
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-none">
                            Mettez-vous en ligne.<br/>
                            <span className="text-brand-purple">Oubliez la pizza.</span>
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Pour le prix d'un fast-food, offrez à votre entreprise une visibilité <strong>24h/24 et 7j/7</strong>. Nos offres de démarrage commencent à 59 000 Ar. C'est l'investissement le plus rentable de Madagascar.
                        </p>
                        
                        <div className="space-y-5 mb-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center shrink-0 shadow-lg shadow-brand-purple/20">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Votre image est unique</div>
                                    <div className="text-slate-400 text-sm">Nous ne faisons pas de "copier-coller".</div>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => { document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-white text-slate-900 hover:bg-brand-purple hover:text-white border-none py-5 px-8 text-lg w-full md:w-auto justify-center font-bold shadow-xl">
                            Créer mon offre sur mesure
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- PHILOSOPHY SECTION --- */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi pas un "Pack Standard" ?</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Parce que <span className="font-bold text-slate-900">vous n'êtes pas standard</span>. 
                Trop souvent, les solutions web classiques vous imposent leurs limites et vous figent dans un système qui ne vous ressemble pas.
                <br/><br/>
                Chez Kinva, nous refusons cette rigidité. Nous croyons que votre site web ou votre application doit s'adapter à votre réalité terrain, et non l'inverse. 
                Que vous soyez un hôtel, une ONG ou un grossiste, nous construisons l'outil qui sert *votre* vision.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-bold text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                Technologie Adaptative
            </div>
        </div>

        {/* --- THE CONFIGURATOR (FORM) --- */}
        <div id="configurator" className="bg-white border border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,#fff_0,transparent_50%)]"></div>
                <h3 className="text-3xl font-black mb-4 relative z-10">Configurez votre Solution Idéale</h3>
                <p className="text-slate-400 max-w-2xl mx-auto relative z-10">
                    Répondez à ces quelques questions. C'est comme un pré-entretien. Nous analyserons vos besoins pour vous proposer un devis juste, à partir de 59 000 Ar.
                </p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
                
                {/* 1. INDUSTRY */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">1</div>
                        <h4 className="text-xl font-bold text-slate-900">Quelle est votre activité ?</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Hôtellerie / Tourisme', 'Commerce / Boutique', 'ONG / Association', 'Éducation / École', 'Entreprise / Services', 'Santé / Clinique', 'Immobilier', 'Autre'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setIndustry(item)}
                                className={`p-4 rounded-xl border text-sm font-bold transition-all text-center ${industry === item ? 'bg-brand-purple text-white border-brand-purple shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-purple/50'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. SCALE */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">2</div>
                        <h4 className="text-xl font-bold text-slate-900">Quelle est l'envergure du projet ?</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => setScale('Vitrine Simple')} className={`p-4 rounded-xl border text-left transition-all ${scale === 'Vitrine Simple' ? 'border-brand-purple bg-purple-50 ring-1 ring-brand-purple' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <div className="font-bold text-slate-900 mb-1">Site Vitrine (Essentiel)</div>
                            <div className="text-xs text-slate-500">1 à 5 pages. Pour être visible.</div>
                        </button>
                        <button onClick={() => setScale('Site Complet')} className={`p-4 rounded-xl border text-left transition-all ${scale === 'Site Complet' ? 'border-brand-purple bg-purple-50 ring-1 ring-brand-purple' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <div className="font-bold text-slate-900 mb-1">Site Complet / E-commerce</div>
                            <div className="text-xs text-slate-500">Catalogue, Blog, Vente en ligne.</div>
                        </button>
                        <button onClick={() => setScale('App Sur Mesure')} className={`p-4 rounded-xl border text-left transition-all ${scale === 'App Sur Mesure' ? 'border-brand-purple bg-purple-50 ring-1 ring-brand-purple' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <div className="font-bold text-slate-900 mb-1">Application Métier (SaaS)</div>
                            <div className="text-xs text-slate-500">Outil de gestion interne complexe.</div>
                        </button>
                    </div>
                </div>

                {/* 3. FEATURES */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">3</div>
                        <h4 className="text-xl font-bold text-slate-900">Fonctionnalités Web Clés</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {['Paiement MVola/Orange', 'Réservation en ligne', 'Blog / Actualités', 'Multilingue (FR/EN)', 'Chatbot IA', 'Formulaire Avancé', 'Galerie Photo Pro', 'Espace Membre'].map((feat) => (
                            <button
                                key={feat}
                                onClick={() => toggleFeature(feat)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${features.includes(feat) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}`}
                            >
                                {features.includes(feat) && <Check className="w-3 h-3 inline-block mr-2" />}
                                {feat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. SAAS EXPLANATION & SELECTION */}
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded mb-4 uppercase tracking-wider">Option Power User</div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Besoin d'un SaaS ?</h4>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                <strong>SaaS = Software as a Service.</strong> <br/>
                                C'est plus qu'un site web. C'est un logiciel de gestion accessible sur internet (comme Gmail ou Facebook) pour gérer votre entreprise.
                            </p>
                            <p className="text-xs text-slate-500 italic">Exemple : Un hôtel utilise un SaaS pour voir le planning des chambres et facturer les clients.</p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => toggleSaas('CRM / Clients')} className={`p-4 bg-white rounded-xl border text-left hover:shadow-md transition-all ${saasFeatures.includes('CRM / Clients') ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}>
                                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1"><Users className="w-4 h-4 text-blue-500" /> CRM / Clients</div>
                                <div className="text-xs text-slate-500">Gérer vos contacts et leads.</div>
                            </button>
                            <button onClick={() => toggleSaas('Finance / Facture')} className={`p-4 bg-white rounded-xl border text-left hover:shadow-md transition-all ${saasFeatures.includes('Finance / Facture') ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}>
                                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1"><Coins className="w-4 h-4 text-blue-500" /> Finance</div>
                                <div className="text-xs text-slate-500">Factures, Devis, Caisse.</div>
                            </button>
                            <button onClick={() => toggleSaas('Stocks / Logistique')} className={`p-4 bg-white rounded-xl border text-left hover:shadow-md transition-all ${saasFeatures.includes('Stocks / Logistique') ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}>
                                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1"><Database className="w-4 h-4 text-blue-500" /> Stocks</div>
                                <div className="text-xs text-slate-500">Entrées, sorties, inventaire.</div>
                            </button>
                            <button onClick={() => toggleSaas('RH / Paie')} className={`p-4 bg-white rounded-xl border text-left hover:shadow-md transition-all ${saasFeatures.includes('RH / Paie') ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}>
                                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1"><Users className="w-4 h-4 text-blue-500" /> RH & Paie</div>
                                <div className="text-xs text-slate-500">Salaires, congés, pointage.</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 5. OPEN TEXT */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">5</div>
                        <h4 className="text-xl font-bold text-slate-900">Racontez-nous votre vision</h4>
                    </div>
                    <textarea 
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none text-slate-700 min-h-[150px] resize-none"
                        placeholder="Décrivez votre projet avec vos mots. Qu'est-ce qui vous frustre aujourd'hui ? Que voulez-vous automatiser ? Plus vous nous en dites, plus le devis sera précis."
                    ></textarea>
                </div>

                {/* SUBMIT */}
                <div className="pt-8 border-t border-slate-100 flex flex-col items-center">
                    <Button 
                        onClick={handleSendRequest} 
                        className="py-5 px-12 text-lg bg-brand-purple text-white shadow-2xl shadow-brand-purple/30 hover:scale-105 rounded-2xl w-full md:w-auto justify-center"
                    >
                        Envoyer ma configuration au studio
                        <Send className="ml-3 w-5 h-5" />
                    </Button>
                    <p className="text-slate-400 text-sm mt-4">
                        Réponse sous 24h ouvrées. Devis gratuit et sans engagement.
                    </p>
                </div>

            </div>
        </div>

      </div>
    </motion.div>
  );
};
