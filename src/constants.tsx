

import { 
  Network, Globe, Bot, GraduationCap, ShieldCheck, Wifi, Server, Layout, ShoppingCart, 
  MessageSquare, Zap, Users, MapPin, Banknote, Lightbulb, Clock, Cable, Cpu, Lock, 
  Router, HardDrive, Rocket, Workflow, BrainCircuit, Headphones, 
  CheckCircle2, Smartphone, MousePointerClick, Briefcase,
  Database, FileText, Laptop, HelpCircle, Cloud,
  Trello, Star, AlertTriangle, Keyboard, Palette, Facebook, Crown, Eye, Wind, BatteryCharging,
  Coffee, ShieldAlert, TrendingUp, Construction, Flame,
  Stethoscope, Map, Infinity, Layers, ShieldX, Target, UserPlus, Mail, Shield, ShieldAlert as Firewall, 
  Wind as Blower, Terminal, Key, Monitor, Activity, Radio, Code, Mail as EmailIcon, ShieldCheck as SecurityIcon,
  TentTree as FamilyIcon, Wrench, Hammer
} from "lucide-react";
import { TranslationDictionary, TrainingCourse } from "./types";

// --- SHARED DATA ---
export const CONTACT_INFO = {
  phone: "+261 34 05 308 50",
  email: "contact@kinva.tech",
  address: "Manjaka Ilafy, Antananarivo, Madagascar",
  hours: "Du lundi au vendredi, 9h – 17h"
};

// --- LES CARTES d'AUDIT AVEC IMAGES ---
export const REAL_CASES_SYSTEMS = [
  {
    id: "forfait-serenite",
    title: "Abonnement Maintenance",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Un PC qui ne s'allume pas, une imprimante bloquée, la poussière qui s'accumule...",
    bricolage: "Appeler un 'dépanneur' au hasard, payer à chaque fois, attendre 3 jours l'intervention.",
    pro: "Forfait mensuel : Soufflage haute pression régulier, réparation express illimitée et check-up santé.",
    rentabilite: "Évitez les pannes bloquantes. Votre matériel dure 2x plus longtemps. Budget IT fixe et maîtrisé."
  },
  {
    id: "pc-tortue",
    title: "Le PC 'Tortue'",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Vos employés perdent 1h par jour à attendre que leurs outils s'ouvrent.",
    bricolage: "Acheter des PC neufs 'bas de gamme' qui rament déjà après 6 mois.",
    pro: "Upgrade SSD + RAM et nettoyage système profond. On transforme vos vieux PC en bêtes de course.",
    rentabilite: "Gain de 20% de productivité par employé. Coût 5x inférieur à l'achat de matériel neuf."
  },
  {
    id: "wifi-squatter",
    title: "Le Wi-Fi 'Squatté'",
    icon: Users,
    image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Tout le monde utilise le même code Wi-Fi. Le réseau sature et vos données sont à nu.",
    bricolage: "Donner le code principal à tous les clients. Risque de piratage bancaire immédiat.",
    pro: "VLANs & Isolation : Réseau invité limité et réseau Direction 100% blindé et prioritaire.",
    rentabilite: "Protection de votre trésorerie. Connexion toujours fluide pour les logiciels de vente."
  },
  {
    id: "camera-floue",
    title: "Caméras de Surveillance",
    icon: Eye,
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Vos caméras sont là, mais l'image est inexploitable après un incident.",
    bricolage: "Caméras Wi-Fi chinoises qui se déconnectent dès que quelqu'un allume un micro-ondes.",
    pro: "Système IP filaire 4K avec enregistrement local + Backup cloud des moments clés.",
    rentabilite: "Réduisez la démarque inconnue de 40%. Surveillez votre stock depuis votre smartphone."
  },
  {
    id: "usb-maudite",
    title: "La Clé USB 'Virus'",
    icon: ShieldAlert,
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Le staff s'échange les fichiers par clé USB. C'est lent et dangereux.",
    bricolage: "Aucun antivirus centralisé. Une seule clé peut infecter tout votre parc en 5 minutes.",
    pro: "Serveur de fichiers centralisé (NAS). Partage instantané, sécurisé et sans virus.",
    rentabilite: "Zéro coût de décontamination. Vos secrets commerciaux restent à l'intérieur de la boîte."
  },
  {
    id: "starlink-pro",
    title: "Starlink Industriel",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1621330396163-b5af34928329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Votre Starlink est posé en vrac. Coupures dès qu'il y a un orage ou du vent.",
    bricolage: "Câble qui traîne par terre, fixation précaire. Risque de casse du matériel coûteux.",
    pro: "Installation sur mât rigide, protection foudre et intégration à votre réseau pro.",
    rentabilite: "Internet 100% stable. Indispensable pour les hôtels et bureaux en province."
  },
  {
    id: "scale-100",
    title: "Scalabilité 0 à 100+",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Vous grandissez mais l'informatique devient un cauchemar de câbles et de lenteur.",
    bricolage: "Ajouter des multiprises et des routeurs au fur et à mesure. Le système s'écroule.",
    pro: "Architecture réseau pensée pour la croissance. Passez de 5 à 50 postes sans stress.",
    rentabilite: "Évitez de tout racheter dans 2 ans. Construisez sur des bases solides."
  },
  {
    id: "cable-serpent",
    title: "Câblage Structuré",
    icon: Cable,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Un sac de noeuds derrière vos serveurs. Danger d'incendie et pannes introuvables.",
    bricolage: "Laisser les fils s'emmêler. On met 3h à trouver pourquoi internet a coupé.",
    pro: "Baie de brassage étiquetée, câbles rangés et identifiés. Maintenance instantanée.",
    rentabilite: "Réduisez les temps d'arrêt technique de 90%. Image de marque pro garantie."
  },
  {
    id: "backup-serenity",
    title: "Protection Anti-Crash",
    icon: Database,
    image: "https://images.unsplash.com/photo-1600880218817-9798e1416689?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    scenario: "Vous espérez que votre disque dur ne vous lâchera jamais.",
    bricolage: "Copier manuellement sur un disque externe une fois par mois (quand on y pense).",
    pro: "Sauvegarde miroir automatique + Cloud chiffré. Vos données sont indestructibles.",
    rentabilite: "Sérénité absolue. Reprenez votre activité en 1h même après un vol ou un incendie."
  }
];

export const DICTIONARIES = {
  fr: {
    nav: {
      links: [
        { name: "Infrastructure", href: "#network" },
        { name: "Web & Apps", href: "#web" },
        { name: "IA & Auto", href: "#ai" },
        { name: "À Propos", href: "#about" },
      ],
      cta: "Audit Gratuit"
    },
    hero: {
      slides: [
        {
          id: 'overview',
          title: 'Partenaire Technologique Global',
          subtitle: 'Un seul interlocuteur pour <span class="text-brand-teal">tout votre écosystème digital.</span>',
          description: "Infrastructure IT, Développement Web, Intelligence Artificielle et Formation. Nous centralisons les expertises pour simplifier votre croissance à Madagascar.",
          ctaText: "Découvrir Kinva",
          img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        },
        {
          id: 'network',
          title: 'Infrastructure IT Fiable',
          subtitle: 'Fini le bricolage. <span class="text-brand-teal">Passez aux standards internationaux.</span>',
          description: "Pour les entreprises qui ne peuvent pas se permettre d'arrêter de travailler. Réseau, Sécurité et Maintenance 24/7.",
          ctaText: "Sécuriser mon entreprise",
          img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        },
        {
          id: 'web',
          title: 'Votre Commercial 24/7',
          subtitle: 'Un site web ne sert à rien <span class="text-brand-purple">s\'il ne rapporte pas de clients.</span>',
          description: "Sites Vitrines, E-commerce MVola ou Logiciels SaaS : nous créons des outils digitaux conçus pour vendre et gérer.",
          ctaText: "Digitaliser mon activité",
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        },
        {
          id: 'ai',
          title: 'Automatisation IA',
          subtitle: 'Réduisez vos coûts opérationnels <span class="text-brand-coral">par deux.</span>',
          description: "Service Client, Gestion de données, Rapports : laissez l'Intelligence Artificielle gérer le répétitif. Concentrez-vous sur le business.",
          ctaText: "Explorer l'IA",
          img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        },
      ],
      location: "Madagascar",
      cta_primary: "Parler à un pro",
      cta_secondary: "Nos Solutions"
    },
    services_overview: {
      title: "Expertise Opérationnelle",
      subtitle: "Nous ne vendons pas de l'informatique, nous vendons de la performance. Chaque pôle est conçu pour éliminer une friction spécifique de votre entreprise.",
      cta: "Lancer un audit",
      poles: [
        { 
          id: "network", 
          title: "Infrastructure", 
          shortDescription: "Des pannes réseau ? Nous installons une architecture blindée et sécurisée. Gain : 0 coupure et données protégées.", 
          icon: Network 
        },
        { 
          id: "web", 
          title: "Web & Vente", 
          shortDescription: "Votre site ne vend pas ? Nous créons des outils e-commerce et SaaS connectés. Gain : Commercial 24/7 et encaissement auto.", 
          icon: Globe 
        },
        { 
          id: "ai", 
          title: "IA Robots", 
          shortDescription: "Trop de tâches manuelles ? Nos agents IA gèrent vos clients et fichiers. Gain : -50% de coûts admin et réponse instantanée.", 
          icon: Bot 
        },
      ]
    },
    approach: {
      badge: "Standards",
      title: "Méthode Kinva",
      subtitle: "Le bricolage coûte cher. Le professionnalisme rapporte.",
      steps: [
        { number: 1, title: "Audit & Diagnostic", description: "On vient voir la reality de votre installation.", icon: Stethoscope, color: "text-teal-400" },
        { number: 2, title: "Planification Pro", description: "Architecture pour 10 à 100 utilisateurs.", icon: Map, color: "text-purple-400" },
        { number: 3, title: "Action & Installation", description: "Mise aux normes et sécurisation totale.", icon: Rocket, color: "text-coral-400" },
        { number: 4, title: "Infogérance", description: "Maintenance mensuelle et surveillance 24/7.", icon: Infinity, color: "text-blue-400" }
      ]
    },
    about: {
      badge: "L'Expertise",
      title: "Kinva : Le partenaire des entreprises sérieuses.",
      description: "Hôtels, ONG, écoles ou PME... Nous intervenons là où l'informatique 'maison' a montré ses limites. On ne bidouille pas, on ingénie.",
      stats: [
        { value: "0", label: "Panne bloquante" },
        { value: "100%", label: "Pro" }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      whyUsTitle: "L'Exigence comme Standard",
      whyUsSubtitle: "Dans un environnement où l'approximation coûte cher, Kinva apporte une rigueur industrielle. Nous ne sommes pas des bricoleurs, nous sommes des partenaires stratégiques engagés sur votre continuité de service.",
      whyUsPoints: [
        { 
          title: "Rigueur Absolue", 
          description: "Respect strict des délais et des normes internationales. Pas de mauvaise surprise.", 
          icon: ShieldCheck 
        },
        { 
          title: "Support Réactif", 
          description: "Une équipe locale qui répond vraiment et intervient immédiatement.", 
          icon: Headphones 
        },
        { 
          title: "Exécution Premium", 
          description: "Câblage structuré, code propre et matériel certifié. Des solutions durables.", 
          icon: Star 
        },
        { 
          title: "Focus Business", 
          description: "On ne parle pas technique, on parle rentabilité, sécurité et gain de temps.", 
          icon: TrendingUp 
        }
      ],
      faqTitle: "Expertise",
      faqSubtitle: "Vos questions sur la rentabilité IT.",
      faqQuestions: [
        { question: "On est seulement 3, a-t-on besoin de vous ?", answer: "Absolument. Une cyberattaque ou un hack MVola peut tuer votre boîte en 1 jour. On installe les fondations pour vos futurs 100 employés." }
      ],
      faqCta: "Besoin d'un conseil ?",
      faqCtaSub: "Rabe analyse votre cas."
    },
    contact: {
      badge: "Audit",
      title: "Fini les pannes ?",
      description: "Contactez-nous pour qu'on vienne ranger votre informatique et sécuriser vos données.",
      phone_label: "WhatsApp",
      email_label: "Email",
      office_label: "Bureau",
      form: {
        title: "Demande d'Expertise Pro",
        firstname: "Prénom",
        lastname: "Nom",
        phone: "Téléphone",
        whatsapp_check: "Ce numéro a WhatsApp",
        email: "Email Professionnel",
        subject: "Votre besoin",
        subjects: [
          { value: "audit", label: "Audit Réseau / Wi-Fi" },
          { value: "infogerance", label: "Contrat de Maintenance Mensuel" },
          { value: "web", label: "Site Web / SaaS" },
          // { value: "training", label: "Formation Equipe" } // DISABLED
        ],
        message: "Décrivez vos enjeux business...",
        consent: "J'accepte d'être recontacté(e) par l'équipe Kinva pour discuter de mon projet.",
        cta: "Envoyer ma demande",
        disclaimer: "Réponse en moins de 2h.",
        appointment: {
          title: "Prochaine étape ?",
          choices: {
            visit: "Visite Technique (Sur site)",
            office: "RDV au Bureau (Ilafy)",
            email: "Échange par Email"
          },
          date_label: "Date souhaitée",
          time_label: "Créneau"
        }
      }
    },
    footer: {
      summary: "Ingénierie informatique et infogérance pour entreprises à Madagascar.",
      services_title: "Expertises",
      company_title: "Kinva",
      newsletter_title: "Le Brief Tech",
      newsletter_desc: "Anticipez les pannes et les hacks.",
      newsletter_placeholder: "Votre email pro",
      newsletter_cta: "S'inscrire",
      rights: "Kinva Madagascar. Professionnels IT.",
      links: ["Légal"],
      back_to_top: "Top"
    },
    chatbot: {
      title: "Rabe Expert IA",
      welcome: "Bonjour. Je suis Rabe. On règle quel problème informatique aujourd'hui pour libérer votre rentabilité ?",
      placeholder: "Décrivez votre souci...",
      send: "Envoyer",
      sources: "Sources :",
      disclaimer: "Conseils pro par Kinva.",
      close: "Fermer",
      open: "Parler à Rabe",
      thinking: "Analyse...",
      error: "Erreur.",
      form_title: "Qui êtes-vous ?",
      form_desc: "Pour une réponse business précise.",
      form_name_label: "Nom & Poste",
      form_email_label: "Email Pro",
      form_phone_label: "Tel",
      form_message_label: "Besoin principal",
      form_submit: "Continuer",
      form_privacy: "Données privées."
    },
    overlays: {
      services: [
        {
          id: "network",
          title: "Infrastructure & Systèmes",
          subtitle: "Ne laissez pas une panne bloquer votre chiffre d'affaires.",
          description: "Nous transformons votre informatique 'fatiguée' en un moteur de croissance. De 3 à 100 utilisateurs, nous garantissons la stabilité totale.",
          features: ["Architecture Scalable", "Câblage Propre", "Protection Élec", "Wi-Fi Partout"],
          techStack: ["Cisco", "Mikrotik", "Ubiquiti", "Windows Server", "Linux", "MacOS", "Fortinet", "Synology", "Starlink", "Android"],
          ctaText: "Auditer mon bureau",
          icon: Network,
          themeColor: "bg-slate-50",
          gallery: [
            { title: "Installation Pro", image: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
          ]
        },
        {
          id: "web",
          title: "Web & SaaS",
          subtitle: "Propulsez votre Notoriété.",
          description: "Votre site web est votre meilleur commercial, 24h/24. Gagnez des parts de marché avec un site qui vend vraiment.",
          features: ["E-commerce MVola", "Design Unique", "SEO Local Mada", "Apps Métiers"],
          techStack: ["HTML5", "CSS3", "React", "Next.js", "Tailwind", "Node.js", "Supabase", "WordPress", "WooCommerce", "Shopify"],
          ctaText: "Lancer mon site",
          icon: Globe,
          themeColor: "bg-white",
          gallery: []
        },
        {
          id: "ai",
          title: "IA & Automatisation",
          subtitle: "Sky is the limit.",
          description: "Votre imagination est la seule limite. Automatisez chaque tâche répétitive de votre entreprise grâce à l'IA.",
          features: ["Agents Facebook 24/7", "Qualification Leads", "Automatisation Mails", "Analyse Données"],
          techStack: ["Python", "TensorFlow", "OpenAI", "Meta Llama", "n8n", "Pandas", "Scikit-learn", "Hugging Face"],
          ctaText: "Sky is the limit",
          icon: Bot,
          themeColor: "bg-slate-50",
          gallery: []
        },
      ],
      audit: {},
      web: {},
      ai: {},
      training: {}
    }
  },
  en: {
    nav: {
      links: [
        { name: "Infrastructure", href: "#network" },
        { name: "Web & Apps", href: "#web" },
        { name: "AI & Auto", href: "#ai" },
        { name: "About", href: "#about" },
      ],
      cta: "Free Audit"
    },
    hero: { slides: [], location: "", cta_primary: "", cta_secondary: "" },
    services_overview: { title: "", subtitle: "", cta: "", poles: [] },
    approach: { badge: "", title: "", subtitle: "", steps: [] },
    about: { badge: "", title: "", description: "", stats: [], image: "", whyUsTitle: "", whyUsSubtitle: "", whyUsPoints: [], faqTitle: "", faqSubtitle: "", faqQuestions: [], faqCta: "", faqCtaSub: "" },
    contact: { badge: "", title: "", description: "", phone_label: "", email_label: "", office_label: "", form: { title: "", firstname: "", lastname: "", phone: "", whatsapp_check: "Available on WhatsApp", email: "", subject: "", subjects: [], message: "", consent: "", cta: "", disclaimer: "", appointment: { title: "", choices: { visit: "", office: "", email: "" }, date_label: "", time_label: "" } } },
    footer: { summary: "", services_title: "", company_title: "", newsletter_title: "", newsletter_desc: "", newsletter_placeholder: "", newsletter_cta: "", rights: "", links: [], back_to_top: "" },
    chatbot: { title: "", welcome: "", placeholder: "", send: "", sources: "", disclaimer: "", close: "", open: "", thinking: "", error: "", form_title: "", form_desc: "", form_name_label: "", form_email_label: "", form_phone_label: "", form_message_label: "", form_submit: "", form_privacy: "" },
    overlays: { services: [
        {
          id: "network",
          title: "Infrastructure & Systems",
          subtitle: "Don't let downtime kill your revenue.",
          description: "We transform tired IT into a growth engine. From 3 to 100 users, we guarantee total stability.",
          features: ["Scalable Architecture", "Clean Cabling", "Power Protection", "Wi-Fi Everywhere"],
          techStack: ["Cisco", "Mikrotik", "Ubiquiti", "Windows Server", "Linux", "MacOS", "Fortinet", "Synology", "Starlink", "Android"],
          ctaText: "Audit my office",
          icon: Network,
          themeColor: "bg-slate-50",
          gallery: []
        },
        {
          id: "web",
          title: "Web & SaaS",
          subtitle: "Boost your Authority.",
          description: "Your website is your best salesperson, 24/7. Gain market share with a site that actually sells.",
          features: ["MVola E-commerce", "Unique Design", "Local SEO", "Business Apps"],
          techStack: ["HTML5", "CSS3", "React", "Next.js", "Tailwind", "Node.js", "Supabase", "WordPress", "WooCommerce", "Shopify"],
          ctaText: "Launch my site",
          icon: Globe,
          themeColor: "bg-white",
          gallery: []
        },
        {
          id: "ai",
          title: "AI & Automation",
          subtitle: "Sky is the limit.",
          description: "Your imagination is the only limit. Automate every repetitive task in your company using AI.",
          features: ["24/7 Facebook Agents", "Lead Qualification", "Email Automation", "Data Analysis"],
          techStack: ["Python", "TensorFlow", "OpenAI", "Meta Llama", "n8n", "Pandas", "Scikit-learn", "Hugging Face"],
          ctaText: "Sky is the limit",
          icon: Bot,
          themeColor: "bg-slate-50",
          gallery: []
        },
    ], audit: {}, web: {}, ai: {}, training: {} }
  }
};

// Re-export other necessary constants with business tone
export const WEB_SOLUTIONS = [
  { icon: Layout, title: "Sites Vitrines", description: "Présentez votre activité avec professionnalisme.", tags: ["React", "Next.js", "Tailwind", "SEO", "Responsive", "Fast"] },
  { icon: ShoppingCart, title: "E-commerce MVola", description: "Vendez et encaissez 24h/24 à Madagascar.", tags: ["MVola", "Stripe", "WooCommerce", "Shopify", "Node.js", "Supabase"] },
  { icon: Smartphone, title: "Apps Mobiles", description: "Vos services dans la poche de vos clients.", tags: ["React Native", "iOS", "Android", "PWA", "Notifications"] },
  { icon: Code, title: "SaaS Métiers", description: "Automatisez votre gestion interne (CRM/Stock).", tags: ["Dashboard", "PostgreSQL", "Cloud", "API", "Auth", "Secure"] }
];
export const WEB_FEATURES = [
  { icon: Zap, title: "Vitesse", description: "Sites ultra-rapides même sur connexion 3G/4G." },
  { icon: ShieldCheck, title: "Sécurité", description: "Protection de vos paiements et données clients." },
  { icon: Smartphone, title: "Mobile First", description: "Interface parfaite sur les téléphones malgaches." },
  { icon: Globe, title: "SEO Local", description: "Soyez le premier sur Google à Madagascar." }
];
export const WEB_PORTFOLIO_EXAMPLES = [
  { image: "https://images.unsplash.com/photo-1566073771259-6a8506099945", title: "Hôtel de Luxe", category: "Hospitalité", description: "Réservation en ligne avec acompte MVola." },
  { image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df", title: "Boutique Mode", category: "Retail", description: "E-shop complet avec gestion de stock temps réel." },
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", title: "Agence B2B", category: "SaaS", description: "Gestionnaire de leads et facturation auto." }
];
export const WEB_PRICING_PLANS = [
  { name: "Vitrine", price: "59.000", popular: false, textColor: "text-slate-900", borderColor: "border-slate-200" },
  { name: "Commercial", price: "Sur Devis", popular: true, textColor: "text-brand-purple", borderColor: "border-brand-purple" },
  { name: "Entreprise", price: "Sur Devis", popular: false, textColor: "text-white", borderColor: "border-slate-800" }
];
export const WEB_PRICING_ROWS = [
  { label: "Design Unique", vitrine: true, commercial: true, entreprise: true },
  { label: "Paiement MVola", vitrine: false, commercial: true, entreprise: true },
  { label: "Nombre de pages", vitrine: "5", commercial: "15", entreprise: "Illimité" },
  { label: "Support Prioritaire", vitrine: false, commercial: true, entreprise: true },
  { label: "Notre Conseil", vitrine: false, commercial: "star", entreprise: false }
];
export const WEB_MODULES = [
  { name: "Blog / News", price: "+15.000 Ar", highlight: false, bubble: false, desc: "Attirez plus de clients par le contenu." },
  { name: "E-commerce Pro", price: "+45.000 Ar", highlight: true, bubble: true, desc: "Paiements automatiques illimités." },
  { name: "Multilingue", price: "+20.000 Ar", highlight: false, bubble: false, desc: "FR / EN / MG." }
];
export const TRAINING_SOLUTIONS: TrainingCourse[] = [
  { icon: Bot, title: "Maîtrise de l'IA", description: "ChatGPT & Claude pour décupler votre productivité.", duration: "2 jours", level: "Essentiel", tags: ["IA", "Pro"], targetAudience: "Direction & Staff", syllabus: [] },
  { icon: Trello, title: "Outils Collaboratifs", description: "Maitrisez Notion, Slack & Trello.", duration: "3 jours", level: "Intermédiaire", tags: ["Cloud", "Team"], targetAudience: "Equipes", syllabus: [] },
  { icon: ShieldCheck, title: "Sécurité Business", description: "Protégez vos accès bancaires et vos données.", duration: "1 jour", level: "Critique", tags: ["Safe", "Cyber"], targetAudience: "Tout staff", syllabus: [] },
  { icon: ShieldAlert, title: "Vente Digitale", description: "Vendre massivement sur Facebook à Mada.", duration: "4 jours", level: "Avancé", tags: ["Sales", "FB"], targetAudience: "Vendeurs", syllabus: [] }
];
export const TRAINING_FEATURES = [
  { icon: MousePointerClick, title: "Pratique", description: "80% de pratique sur vos outils business." },
  { icon: CheckCircle2, title: "Certifié", description: "Attestation Kinva Academy reconnue." },
  { icon: Headphones, title: "Suivi", description: "Accès au support 30 jours après-formation." },
  { icon: Briefcase, title: "B2B", description: "Formation dans vos locaux ou les nôtres." }
];
export const TRAINING_PORTFOLIO_EXAMPLES = [
  { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", title: "Formation Banques", category: "Finance", description: "Sensibilisation cyber et outils digitaux." },
  { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", title: "Managers PME", category: "IA", description: "Stratégie IA pour optimiser la marge." },
  { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998", title: "Digitalisation ONG", category: "Outils", description: "Cloud & collaboration internationale." }
];
export const FMFP_INFO = {
  title: "Financement FMFP",
  description: "Récupérez jusqu'à 100% de vos frais via vos cotisations FMFP.",
  benefits: ["Zéro reste à charge", "Audit de formation inclus", "Gestion administrative"]
};
