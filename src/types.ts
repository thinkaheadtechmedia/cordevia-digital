export type ViewTab = 
  | 'home'
  | 'services'
  | 'blog'
  | 'marketplace'
  | 'about'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'dmca'
  | 'disclosure'
  | 'seo-console';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'youtube' | 'web' | 'seo' | 'social' | 'branding' | 'tech';
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  metrics: { label: string; value: string };
  pricing: {
    starter: number;
    growth: number;
    enterprise: number;
  };
  features: string[];
  popular?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  category: string;
  industry: string;
  timeline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    increase: string;
    detail: string;
  }[];
  tags: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Mastery';
  duration: string;
  modulesCount: number;
  studentsCount: number;
  rating: number;
  description: string;
  syllabus: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
  price: number;
  instructor: {
    name: string;
    role: string;
  };
}

export interface MarketplaceItem {
  id: string;
  name: string;
  category: 'templates' | 'audits' | 'kits' | 'systems' | 'ai-tools';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  includes: string[];
  downloadsCount: number;
  stock?: number;
  duration?: string;
  specs?: { label: string; value: string }[];
  detailedDescription?: string;
  faq?: { q: string; a: string }[];
  activationSteps?: string[];
}

export interface CartItem {
  item: MarketplaceItem;
  quantity: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  accentColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  experience: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}
