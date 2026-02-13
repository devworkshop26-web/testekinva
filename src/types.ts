
import { LucideIcon } from "lucide-react";

export type Language = 'fr' | 'en';

export interface ServicePole {
  id: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
}

export interface GalleryItem {
  title: string;
  image: string;
}

export interface DetailedServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefit?: string;
  ctaText: string;
  icon: LucideIcon;
  themeColor: string;
  gallery: GalleryItem[];
}

export interface StepData {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface WhyUsPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutData {
  badge: string;
  title: string;
  description: string;
  stats: StatItem[];
  image: string;
  // Merged Sections
  whyUsTitle: string;
  whyUsSubtitle: string;
  whyUsPoints: WhyUsPoint[];
  faqTitle: string;
  faqSubtitle: string;
  faqQuestions: FAQItem[];
  faqCta: string;
  faqCtaSub: string;
}

// Admin / Data Collection Types
export type LeadStatus = 'new' | 'contacted' | 'meeting' | 'won' | 'lost' | 'archived';

export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  timestamp: string;
  source: string; // 'chatbot' or 'contact_form' | 'manual'
  status: LeadStatus;
  adminNotes?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  timestamp: string;
}

export interface ChatLog {
  id: string;
  user: string;
  query: string;
  response: string;
  timestamp: string;
}

export interface TranslationDictionary {
  nav: {
    links: { name: string; href: string }[];
    cta: string;
  };
  hero: {
    slides: {
      id: string;
      title: string;
      subtitle: string;
      img: string;
    }[];
    location: string;
    cta_primary: string;
    cta_secondary: string;
  };
  services_overview: {
    title: string;
    subtitle: string;
    cta: string;
    poles: ServicePole[];
  };
  approach: {
    badge: string;
    title: string;
    subtitle: string;
    steps: StepData[];
  };
  about: AboutData;
  contact: {
    badge: string;
    title: string;
    description: string;
    phone_label: string;
    email_label: string;
    office_label: string;
    form: {
      title: string;
      name: string;
      email: string;
      subject: string;
      subjects: { value: string; label: string }[];
      message: string;
      cta: string;
      disclaimer: string;
      appointment: {
        label: string;
        date_label: string;
        time_label: string;
        time_options: { value: string; label: string }[];
      }
    };
  };
  footer: {
    summary: string;
    services_title: string;
    company_title: string;
    newsletter_title: string;
    newsletter_desc: string;
    newsletter_placeholder: string;
    newsletter_cta: string;
    rights: string;
    links: string[];
    back_to_top: string;
  };
  chatbot: {
    title: string;
    welcome: string;
    placeholder: string;
    send: string;
    sources: string;
    disclaimer: string;
    close: string;
    open: string;
    thinking: string;
    error: string;
    // Lead Gen Form
    form_title: string;
    form_desc: string;
    form_name_label: string;
    form_email_label: string;
    form_phone_label: string;
    form_message_label: string;
    form_submit: string;
    form_privacy: string;
  };
  overlays: {
    services: DetailedServiceData[];
    audit: any; // Using any for brevity in types, but strictly structured in constants
    web: any;
    ai: any;
    training: any;
  };
}
