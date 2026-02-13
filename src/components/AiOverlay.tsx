
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Facebook, Moon, Coffee, Zap, ArrowRight, TrendingUp, Coins, AlertOctagon, 
  Calendar, FileText, Users, Activity, CheckCircle2, Send, Smartphone, Laptop, 
  ShoppingBag, Home, Quote, Sparkles, Infinity as InfinityIcon, BarChart3, 
  PieChart, Target, Search, AlertTriangle, Scale, Rocket, BrainCircuit, 
  Workflow, Database, Cloud, Lightbulb, MessageSquare, GraduationCap, 
  HeartPulse, Truck, ShieldCheck, Microscope, Volume2, Globe, Link, 
  Share2, Mail, FileJson, Layers, Cpu, MessageCircle, Bell, UserCheck, Bot,
  MousePointerClick, History, Wand2, XCircle, Timer, Skull
} from 'lucide-react';
import { Button } from './Button';

interface AiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

type DemoType = 'chat' | 'process';
type DeviceType = 'mobile' | 'desktop';

interface DemoStep {
  type: 'user' | 'bot' | 'system';
  text: string;
  delay: number;
}

interface UseCase {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: any;
  story: string; 
  pain: string;
  solution: string;
  gain: string;
  demoType: DemoType;
  device: DeviceType;
  demoScenario: DemoStep[];
}

// --- 8 SCÉNARIOS OPÉRATIONNELS ---
const OPERATIONAL_CASES: UseCase[] = [
  {
    id: 'facebook',
    title: "Vente Facebook",
    subtitle: "Vendez pendant que vous dormez.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Facebook,
    story: "Vos clients sur Facebook n'attendent pas. S'ils commentent 'Prix' à 23h et que vous répondez à 8h, ils ont déjà acheté ailleurs. Votre IA répond en 2 secondes, gère la variante (taille/couleur) et envoie le lien MVola.",
    pain: "Perte de 60% des leads nocturnes.",
    solution: "Agent de vente conversationnel 24/7.",
    gain: "Capture immédiate de chaque intention d'achat.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Bjr, prix de la chaussure rouge ?", delay: 500 },
      { type: 'bot', text: "Bonjour ! C'est 145.000 Ar. Dispo en T38, 40 et 42. On vous livre demain ?", delay: 1200 },
      { type: 'user', text: "Oui T40 à Itaosy", delay: 2500 },
      { type: 'bot', text: "Parfait. Livraison : 5.000 Ar. Total : 150.000 Ar. Voici le code de paiement...", delay: 3500 }
    ]
  },
  {
    id: 'facture',
    title: "Relance Client Pro",
    subtitle: "Recouvrement sans friction.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: FileText,
    story: "Relancer un client qui n'a pas payé est gênant pour vos employés. L'IA le fait avec une politesse absolue et une régularité mathématique. Elle détecte les promesses de virement dans les emails et met à jour votre comptabilité seule.",
    pain: "Trésorerie bloquée par oubli ou timidité.",
    solution: "Automatisation du cycle de relance par email/SMS.",
    gain: "Réduction des délais de paiement de 45%.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Scan factures impayées > 30 jours...", delay: 500 },
      { type: 'bot', text: "Relance #2 générée pour 'Client X' (Ton : Ferme mais pro)", delay: 1500 },
      { type: 'system', text: "Email envoyé avec copie du relevé.", delay: 2500 }
    ]
  },
  {
    id: 'school',
    title: "Secrétariat École",
    subtitle: "Zéro queue à l'inscription.",
    image: "https://images.unsplash.com/photo-1523050338691-11e997e446c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: GraduationCap,
    story: "En période d'inscription, votre secrétariat est débordé par 500 parents posant les 10 mêmes questions. L'IA répond sur WhatsApp, vérifie si le dossier est complet et fixe le RDV final pour la signature.",
    pain: "Saturation administrative totale.",
    solution: "Agent d'accueil et pré-inscription scolaire.",
    gain: "Staff libéré pour l'accueil physique qualitatif.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Quels sont les frais pour la classe de 6ème ?", delay: 500 },
      { type: 'bot', text: "Pour la 6ème : Droit 200k Ar, Écolage 85k Ar/mois. Voulez-vous la liste des fournitures ?", delay: 1500 },
      { type: 'user', text: "Oui svp", delay: 2500 },
      { type: 'bot', text: "La voici (PDF). Je peux aussi pré-remplir votre fiche si vous me donnez le nom de l'élève.", delay: 3500 }
    ]
  },
  {
    id: 'ngo',
    title: "Reporting ONG",
    subtitle: "Du terrain au rapport final.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: HeartPulse,
    story: "Vos agents de terrain envoient des notes vocales ou des photos. L'IA compile ces données éparses, les traduit, les met en forme selon les normes des bailleurs internationaux et génère un rapport de 10 pages en 5 minutes.",
    pain: "2 jours de rédaction manuelle par projet.",
    solution: "Synthèse de données terrain multi-sources.",
    gain: "Rapports livrés 10x plus vite, sans erreur.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Réception de 12 notes vocales (Brousse)...", delay: 500 },
      { type: 'system', text: "Transcription Malgache > Français terminée.", delay: 1500 },
      { type: 'bot', text: "Rédaction du chapitre 'Impact Sanitaire' en cours...", delay: 2500 }
    ]
  },
  {
    id: 'logistics',
    title: "Logistique & Stock",
    subtitle: "L'inventaire par la voix.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Truck,
    story: "Fini les mains sales sur les tableurs. Vos magasiniers parlent simplement à leur téléphone : 'J'ai sorti 10 sacs de ciment'. L'IA met à jour le stock, alerte si le seuil critique est atteint et prépare le bon de commande fournisseur.",
    pain: "Écarts de stock fréquents, ressaisie pénible.",
    solution: "Interface vocale intelligente de gestion de flux.",
    gain: "Précision de stock de 99.9% en temps réel.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Sortie de 4 pneus 17 pouces pour le camion 02.", delay: 500 },
      { type: 'bot', text: "Noté. Stock restant : 2. Attention, c'est sous le seuil d'alerte (5). Commander ?", delay: 1500 },
      { type: 'user', text: "Oui, commande 10 chez le fournisseur habituel.", delay: 3000 }
    ]
  },
  {
    id: 'medical',
    title: "Pré-Triage Médical",
    subtitle: "Orientez avant l'arrivée.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Microscope,
    story: "Dans votre clinique, les patients appellent pour tout. L'IA évalue l'urgence sur WhatsApp (Toux ? Fièvre ? Douleur ?), conseille les premiers gestes et prend RDV avec le bon spécialiste.",
    pain: "Ligne téléphonique saturée, urgences noyées.",
    solution: "Agent d'orientation médicale assistée.",
    gain: "Optimisation de l'agenda des médecins de 30%.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Mon fils a 39 de fièvre depuis ce matin.", delay: 500 },
      { type: 'bot', text: "Je note. A-t-il des taches rouges ou du mal à respirer ?", delay: 1500 },
      { type: 'user', text: "Non, juste la fièvre.", delay: 2500 },
      { type: 'bot', text: "Dr. Rabe est libre à 14h. Voulez-vous confirmer ?", delay: 3500 }
    ]
  },
  {
    id: 'hotel-plus',
    title: "Conciergerie Hôtel",
    subtitle: "Un majordome dans chaque poche.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Moon,
    story: "Vos clients veulent une serviette à 22h ou le menu du petit-déjeuner. Au lieu de saturer la réception, ils scannent un QR Code. L'IA gère la demande et alerte directement l'étage concerné.",
    pain: "Réceptionniste débordé par des demandes triviales.",
    solution: "Majordome digital multi-services.",
    gain: "Satisfaction client augmentée, staff plus calme.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Peut-on avoir 2 bouteilles d'eau en chambre 204 ?", delay: 500 },
      { type: 'bot', text: "Bien sûr ! Un agent de chambre arrive dans 5 minutes. Autre chose ?", delay: 1200 },
      { type: 'user', text: "Le code wifi svp ?", delay: 2500 },
      { type: 'bot', text: "Le code est : PARADISE2024. Profitez bien ! ✨", delay: 3500 }
    ]
  },
  {
    id: 'it-support',
    title: "Support Technique",
    subtitle: "Réparez sans technicien.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Zap,
    story: "Vos employés perdent du temps car ils ne savent pas comment connecter l'imprimante ou changer un mot de passe. L'IA interne connaît tous vos manuels et les guide pas à pas avec des captures d'écran.",
    pain: "DSI harcelée pour des problèmes mineurs.",
    solution: "Base de connaissance active et interactive.",
    gain: "Disponibilité des outils IT augmentée de 50%.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Le scanner ne marche plus.", delay: 500 },
      { type: 'bot', text: "Vérifiez d'abord si le voyant bleu clignote. Est-ce le cas ?", delay: 1500 },
      { type: 'user', text: "Oui, il clignote.", delay: 2500 },
      { type: 'bot', text: "Appuyez sur 'Reset' pendant 3 sec. Ça devrait refonctionner.", delay: 3500 }
    ]
  }
];

// --- 4 SCÉNARIOS DÉCISIONNELS ---
const DECISION_CASES: UseCase[] = [
  {
    id: 'fraud',
    title: "Détection de Fraude",
    subtitle: "Protégez votre Cash.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: ShieldCheck,
    story: "L'IA analyse des milliers de transactions MVola/Orange Money. Elle repère instantanément les comportements suspects (doubles paiements, montants anormaux) et bloque la transaction avant que l'argent ne disparaisse.",
    pain: "Vols internes ou externes difficiles à tracer.",
    solution: "Algorithme de surveillance financière temps réel.",
    gain: "Sécurisation totale de votre trésorerie mobile.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse des flux financiers (Dernières 24h)...", delay: 500 },
      { type: 'system', text: "Alerte : 5 tentatives de retrait identiques sur le point de vente 04.", delay: 2000 },
      { type: 'bot', text: "Action : Blocage préventif du compte agent. Alerte Direction envoyée.", delay: 3500 }
    ]
  },
  {
    id: 'forecast',
    title: "Prévision de Demande",
    subtitle: "Zéro rupture, zéro gaspillage.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BarChart3,
    story: "Commander 1000 unités quand on va en vendre 2000, c'est un manque à gagner. Faire l'inverse, c'est de l'argent qui dort. L'IA prédit vos besoins en croisant météo, jours fériés et historique.",
    pain: "Stocks morts ou ruptures de stock fréquentes.",
    solution: "Modèle de prédiction de ventes.",
    gain: "Rotation de stock accélérée de 25%.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Calcul tendances saisonnières + Données météo...", delay: 500 },
      { type: 'bot', text: "Pic de demande prévu le 15. Recommandation : +20% sur la boisson X.", delay: 2500 }
    ]
  },
  {
    id: 'reputation',
    title: "Analyse de Réputation",
    subtitle: "Écoutez ce qu'on dit de vous.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: MessageSquare,
    story: "Qu'est-ce qu'on dit de votre hôtel ou marque sur les groupes Facebook ? L'IA scanne le web malgache, résume le sentiment général et vous alerte uniquement s'il y a un 'Bad Buzz' naissant.",
    pain: "Impossibilité de tout lire manuellement.",
    solution: "Monitoring de sentiment social media.",
    gain: "Réactivité de crise en moins de 30 minutes.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Scan mentions 'Marque Kinva' sur Facebook...", delay: 500 },
      { type: 'system', text: "Sentiment détecté : 85% Positif / 15% Neutre.", delay: 1500 },
      { type: 'bot', text: "Rapport hebdo prêt : Les clients adorent le nouveau design.", delay: 3000 }
    ]
  },
  {
    id: 'pricing',
    title: "Optimisation de Prix",
    subtitle: "Maximisez chaque marge.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: TrendingUp,
    story: "Vos prix sont-ils trop bas pour la demande actuelle ? L'IA ajuste dynamiquement vos tarifs (hôtels, services, transport) pour s'assurer que vous ne vendez jamais à perte de potentiel.",
    pain: "Marge sacrifiée par manque de réactivité.",
    solution: "Yield Management assisté par IA.",
    gain: "+12% de chiffre d'affaires à volume égal.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse prix concurrents + Demande locale...", delay: 500 },
      { type: 'bot', text: "Opportunité détectée. Suggestion : Hausse de 5% sur le forfait Pro.", delay: 2500 }
    ]
  }
];

// --- 4 PONTS n8n (Les Liaisons Magiques) ---
const N8N_BRIDGES = [
  {
    title: "La Secrétaire WhatsApp",
    apps: ["WhatsApp", "Excel / CRM"],
    description: "C'est magique : dès qu'un prospect vous parle sur WhatsApp, ses coordonnées se notent toutes seules dans votre fichier client. Vous n'avez plus rien à recopier à la main.",
    benefit: "Fini les oublis de clients. Gain : 5h de saisie par semaine.",
    icon: UserCheck,
    color: "bg-emerald-500"
  },
  {
    title: "L'Alerte Direction Express",
    apps: ["Site Web", "Messenger", "Telegram"],
    description: "Peu importe où le client vous contacte (Site, FB, Insta), vous recevez une seule alerte immédiate sur votre téléphone. Vous répondez en 1 clic.",
    benefit: "Réactivité absolue. Ne perdez plus aucun contrat par lenteur.",
    icon: Bell,
    color: "bg-blue-500"
  },
  {
    title: "Le Classeur de Factures",
    apps: ["Email", "Cloud / Drive"],
    description: "Dès que vous recevez une facture par mail, le système la reconnaît, la renomme proprement et la range toute seule dans le bon dossier compta.",
    benefit: "Zéro papier perdu. Votre comptabilité est toujours carrée.",
    icon: Layers,
    color: "bg-purple-500"
  },
  {
    title: "Le Gardien du Cash",
    apps: ["Facturation", "SMS / MVola"],
    description: "Le système surveille vos retards de paiement. Il envoie un petit rappel SMS poli au client et lui propose le lien de paiement MVola direct.",
    benefit: "Trésorerie protégée. Vous êtes payé 2x plus vite sans appeler.",
    icon: Coins,
    color: "bg-amber-500"
  }
];

// --- LABORATOIRE D'IDÉES (NOUVELLE VERSION INTERACTIVE) ---
const EXAMPLES = [
  { role: "Gérant d'Hôtel", pain: "gérer les check-in tardifs à minuit", wish: "un système donne les clés et scanne les passeports tout seul" },
  { role: "Directrice d'École", pain: "répondre à 500 parents sur les frais de scolarité", wish: "un robot WhatsApp réponde et encaisse les frais par MVola" },
  { role: "Grossiste", pain: "compter le stock manuellement chaque soir", wish: "une caméra compte les cartons et passe commande au fournisseur" },
  { role: "Avocat", pain: "trier 2000 pages de contrats pour trouver une clause", wish: "une IA me résume tout et surligne les risques en rouge" }
];

const IdeaLab: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [role, setRole] = useState("");
  const [pain, setPain] = useState("");
  const [wish, setWish] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const fillExample = () => {
    const random = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setRole(random.role);
    setPain(random.pain);
    setWish(random.wish);
    setResult(null);
  };

  const generate = () => {
    if (!role || !pain || !wish) return;
    setIsGenerating(true);
    setResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setResult(`Reçu 5/5. Pour un ${role}, automatiser "${pain}" est notre spécialité. Nous pouvons créer ${wish.replace('un ', 'ce ')} en moins de 2 semaines.`);
    }, 1500);
  };

  return (
    <div className="mt-32 relative">
       <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/5 to-transparent rounded-[4rem] -z-10 blur-3xl"></div>
       <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal text-white font-black text-[10px] mb-8 uppercase tracking-[0.3em] shadow-lg shadow-brand-teal/20"
          >
             Laboratoire d'idées
          </motion.div>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Et vous, c'est quoi votre corvée ?</h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Ces tâches répétitives qui vous transforment en robot ? N'ayez pas peur de rêver, on essaiera de résoudre tous vos problèmes.</p>
       </div>

       <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
             <BrainCircuit className="w-32 h-32 text-brand-teal" />
          </div>

          <div className="space-y-8 relative z-10">
             
             {/* Sentence Builder */}
             <div className="text-xl md:text-3xl font-medium text-white leading-relaxed space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">Je suis...</span>
                   <input 
                     type="text" 
                     value={role}
                     onChange={(e) => setRole(e.target.value)}
                     placeholder="ex: Gérant d'Hôtel"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">Je veux arrêter de...</span>
                   <input 
                     type="text" 
                     value={pain}
                     onChange={(e) => setPain(e.target.value)}
                     placeholder="ex: répondre aux mêmes questions sur Facebook"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">J'aimerais que...</span>
                   <input 
                     type="text" 
                     value={wish}
                     onChange={(e) => setWish(e.target.value)}
                     placeholder="ex: l'IA gère les réservations toute seule"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
                <Button 
                  onClick={generate} 
                  disabled={isGenerating || !role || !pain}
                  className="w-full sm:w-auto py-4 px-8 text-lg bg-brand-teal text-white hover:bg-brand-teal/90 rounded-2xl shadow-xl shadow-brand-teal/20"
                >
                   {isGenerating ? "Analyse en cours..." : "Concevoir ma solution"}
                   <Sparkles className={`ml-2 w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>

                <button 
                   onClick={fillExample}
                   className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
                >
                   <Wand2 className="w-4 h-4" />
                   Manque d'inspiration ? Voir un exemple
                </button>
             </div>

             {/* Result Card */}
             <AnimatePresence>
                {result && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20, height: 0 }}
                     animate={{ opacity: 1, y: 0, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="bg-white rounded-2xl p-8 mt-8 border-l-8 border-brand-teal shadow-2xl"
                   >
                      <div className="flex items-start gap-4">
                         <div className="bg-brand-teal/10 p-3 rounded-full text-brand-teal shrink-0">
                            <CheckCircle2 className="w-8 h-8" />
                         </div>
                         <div>
                            <h4 className="text-slate-900 font-bold text-xl mb-2">Faisabilité Confirmée</h4>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                               {result}
                            </p>
                            <Button onClick={onContact} variant="secondary" className="text-sm">
                               Lancer ce projet maintenant
                            </Button>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

          </div>
       </div>
    </div>
  );
};

// --- COMPONENT SIMULATEUR ---
const Simulator: React.FC<{ 
  scenario: DemoStep[]; 
  type: DemoType; 
  device: DeviceType;
}> = ({ scenario, type, device }) => {
  const [visibleSteps, setVisibleSteps] = useState<DemoStep[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSteps([]);
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let cumulatedDelay = 0;

    scenario.forEach((step, index) => {
      if (step.type === 'bot' && index > 0) {
        const typingStart = cumulatedDelay - 800; 
        if (typingStart > 0) {
            const t = setTimeout(() => setIsTyping(true), typingStart);
            timeouts.push(t);
        }
      }
      cumulatedDelay += step.delay;
      const t = setTimeout(() => {
        setIsTyping(false);
        setVisibleSteps(prev => [...prev, step]);
      }, cumulatedDelay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [scenario]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSteps, isTyping]);

  if (device === 'desktop') {
     return (
        <div className="bg-slate-50 rounded-lg h-full border border-slate-200 shadow-xl overflow-hidden flex flex-col relative">
            <div className="bg-white border-b border-slate-200 h-8 flex items-center px-3 gap-2 shrink-0 z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
            </div>
            <div className="flex-1 relative overflow-hidden bg-white flex flex-col">
                <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto no-scrollbar">
                    {visibleSteps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-3 pb-3 border-b border-slate-50 last:border-0"
                        >
                            <div className="flex items-start gap-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase w-20 text-center tracking-wider shrink-0 ${
                                    step.type === 'system' ? 'bg-slate-100 text-slate-500' :
                                    step.type === 'bot' ? 'bg-brand-teal/10 text-brand-teal' :
                                    'bg-blue-50 text-blue-600'
                                }`}>
                                    {step.type === 'bot' ? 'IA' : step.type.toUpperCase()}
                                </span>
                                <span className="text-slate-600 font-medium text-xs leading-relaxed">{step.text}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
     );
  }

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-3 h-full shadow-2xl flex flex-col relative border-4 border-slate-800">
       <div className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col relative border border-slate-100">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 px-3 pt-4 no-scrollbar pb-12">
                {visibleSteps.map((step, idx) => (
                    <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex w-full ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium shadow-sm leading-relaxed ${
                            step.type === 'user' 
                                ? 'bg-brand-teal text-white rounded-br-none' 
                                : 'bg-slate-100 text-slate-700 rounded-bl-none'
                        }`}>
                            {step.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-slate-50 rounded-full px-3 py-2 flex gap-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </motion.div>
                )}
            </div>
       </div>
    </div>
  );
};


export const AiOverlay: React.FC<AiOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [activeTab, setActiveTab] = useState<'operational' | 'decision' | 'n8n'>('operational');

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-slate-950 overflow-y-auto"
    >
      {/* Background FX */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,#14B8A6_0,transparent_50%)]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px]"></div>
         <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="sticky top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-brand-teal p-2 rounded-lg">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight uppercase">Solutions Business</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6 text-white/50" />
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24">
        
        {/* NEW "NO BULLSHIT" INTRO */}
        <div className="text-center max-w-5xl mx-auto mt-8 mb-20">
            <motion.div 
               initial={{ y: 20, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }}
               className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 font-black text-[10px] mb-6 uppercase tracking-[0.3em] border border-red-500/30"
            >
               Arrêtez de perdre du temps
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
               Automatisation, IA métier<br/>ou outil interne.
            </h2>
            <p className="text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
               Sans engagement long. Sans bullshit technique. On construit des systèmes qui <span className="text-white font-bold">économisent votre argent</span> et qui font le sale boulot.
            </p>
        </div>

        {/* --- THE HURT SECTION (NEW) --- */}
        <div className="max-w-6xl mx-auto mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* The Problem */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl">
                            <Skull className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">Le Problème. <span className="text-slate-500 block text-lg font-medium mt-1">(Soyons honnêtes 2 minutes)</span></h3>
                    </div>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">Vous payez des salaires pour du "copier-coller".</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Vos meilleurs employés perdent des heures sur Excel ou à répondre aux mêmes questions sur Facebook.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">"On verra ça demain" tue vos ventes.</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Le client malgache est pressé. S'il n'a pas son prix en 2 minutes, il achète chez le concurrent.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">Peur de l'usine à gaz.</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Vous ne voulez pas d'un logiciel compliqué à 50 Millions que personne ne saura utiliser.</p>
                            </div>
                        </li>
                    </ul>
                </motion.div>

                {/* The Solution Card */}
                <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-brand-teal/10 to-slate-900 border border-brand-teal/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-brand-teal text-white font-bold text-xs uppercase tracking-widest mb-6 rounded-full shadow-lg shadow-brand-teal/20">La Réponse Kinva</div>
                        <h3 className="text-3xl font-black text-white mb-6">Le POC "Commando".</h3>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            On ne fait pas de slides. On développe un prototype fonctionnel (POC) en 5 à 10 jours. Vous testez, vous voyez le gain d'argent immédiat, et on décide ensuite.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              onClick={() => { onClose(); onContactClick(); }}
                              className="bg-brand-teal text-white py-4 px-8 text-lg font-bold shadow-xl shadow-brand-teal/20 hover:scale-[1.02] rounded-xl flex-1 justify-center"
                            >
                                Lancer un POC (Test)
                                <Rocket className="ml-2 w-5 h-5" />
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs px-4">
                                <Timer className="w-4 h-4" />
                                Délai moyen : 1 semaine
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Tabs Modernes */}
        <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar pb-4">
            <div className="bg-white/5 p-1.5 rounded-2xl flex items-center shadow-inner border border-white/10 backdrop-blur-md shrink-0">
                <button onClick={() => setActiveTab('operational')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'operational' ? 'bg-brand-teal text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Agents Intelligents</button>
                <button onClick={() => setActiveTab('decision')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'decision' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}>Aide à la Décision</button>
                <button onClick={() => setActiveTab('n8n')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'n8n' ? 'bg-blue-500 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Les Ponts (n8n)</button>
            </div>
        </div>

        {/* --- GRID OPÉRATIONNELLE / DÉCISIONNELLE --- */}
        <AnimatePresence mode="wait">
            {(activeTab === 'operational' || activeTab === 'decision') && (
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {(activeTab === 'operational' ? OPERATIONAL_CASES : DECISION_CASES).map((item, index) => (
                        <motion.div
                            key={item.id}
                            onClick={() => setSelectedCase(item)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-800/50 border border-white/5 hover:border-brand-teal/40 shadow-xl hover:shadow-brand-teal/10 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="h-44 overflow-hidden relative">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-4 left-4 bg-brand-teal p-2.5 rounded-xl text-white shadow-lg"><item.icon className="w-5 h-5" /></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-black text-xl text-white mb-2 leading-tight">{item.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed italic">"{item.subtitle}"</p>
                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em]">{item.demoType}</span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-teal group-hover:scale-110 transition-all"><ArrowRight className="w-5 h-5" /></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* --- SECTION n8n (Les Ponts) --- */}
            {activeTab === 'n8n' && (
                <motion.div 
                   key="n8n"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="space-y-12"
                >
                   <div className="bg-blue-600/10 border border-blue-500/20 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                         <div className="p-3 bg-blue-500 text-white rounded-2xl w-fit mb-6 shadow-xl shadow-blue-500/20">
                            <Workflow className="w-10 h-10" />
                         </div>
                         <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Ne copiez plus rien à la main.</h3>
                         <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Pourquoi perdre du temps à recopier des noms, des prix ou des factures ? On utilise **n8n**, un outil génial qui crée des "ponts" entre vos applications (WhatsApp, Messenger, MVola, Gmail). Les informations voyagent toutes seules, sans erreur.
                         </p>
                         <Button onClick={() => { onClose(); onContactClick(); }} className="bg-blue-500 text-white hover:bg-blue-400 px-10 py-5 rounded-2xl text-lg shadow-xl shadow-blue-500/20">Créer mon pont automatique</Button>
                      </div>
                      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {N8N_BRIDGES.map((bridge, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-blue-500/40 transition-all group relative overflow-hidden">
                               <div className={`w-10 h-10 ${bridge.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                                  <bridge.icon className="w-5 h-5" />
                               </div>
                               <h4 className="text-white font-bold text-lg mb-3">{bridge.title}</h4>
                               <p className="text-xs text-slate-300 leading-relaxed mb-4">{bridge.description}</p>
                               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                  <p className="text-[10px] text-brand-teal font-black uppercase leading-tight">{bridge.benefit}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
            )}
        </AnimatePresence>

        <IdeaLab onContact={() => { onClose(); onContactClick(); }} />

      </div>

      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[85vh] border border-slate-200">
               <button onClick={() => setSelectedCase(null)} className="absolute top-6 right-6 z-50 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X className="w-5 h-5" /></button>
               <div className="w-full md:w-1/2 flex flex-col h-full bg-white p-10 md:p-14">
                   <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
                      <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-brand-teal">
                        <selectedCase.icon className="w-5 h-5" /> {selectedCase.title}
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 leading-none">{selectedCase.subtitle}</h3>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">"{selectedCase.story}"</p>
                      <div className="space-y-4">
                           <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                              <div className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-1">Le Frein (Travail Manuel)</div>
                              <p className="text-slate-700 text-sm font-bold">{selectedCase.pain}</p>
                           </div>
                           <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                              <div className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">La Solution IA</div>
                              <p className="text-slate-900 text-sm font-black">{selectedCase.solution}</p>
                           </div>
                      </div>
                   </div>
                   <div className="pt-10 border-t border-slate-100">
                       <Button onClick={() => { setSelectedCase(null); onClose(); onContactClick(); }} className="w-full bg-slate-900 text-white py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform text-lg uppercase tracking-widest">Activer cet Agent</Button>
                   </div>
               </div>
               <div className="hidden md:flex w-1/2 bg-slate-50 items-center justify-center p-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl"></div>
                   <div className="relative z-10 w-full max-w-[340px] h-[600px] shadow-2xl rounded-[3rem] border-8 border-slate-900 bg-slate-900">
                       <Simulator scenario={selectedCase.demoScenario} type={selectedCase.demoType} device={selectedCase.device} />
                   </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
