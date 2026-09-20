import { ViewTab, BlogPost } from '../types';
import { BRAND_INFO } from '../data/brandData';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  includeArticleSchema?: boolean;
}

export const VIEW_SEO_CONFIGS: Record<ViewTab, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'Cordevia Digital – Rank #1 on Google with Algorithmic SEO & Media-Tech Scale',
    description: 'Cordevia Digital engineers first-page Google rankings, high-converting React platforms, and multi-million view YouTube channels. Trusted by 180+ global brands.',
    keywords: 'Cordevia Digital, rank first page on google, best SEO agency, algorithmic SEO, YouTube growth agency, technical SEO audit, high performance web engineering, digital media tech, Cameroon MOMO, Binance crypto pay',
  },
  services: {
    title: 'High-Velocity Growth Services & SEO Retainers | Cordevia Digital',
    description: 'Dominate organic search and audience algorithms with Cordevia Digital: algorithmic SEO architecture, YouTube channel management, sub-second web apps, and brand engineering.',
    keywords: 'algorithmic SEO services, rank page 1 google, YouTube channel management, web development agency, Core Web Vitals optimization, technical SEO retainer, search engine dominance',
  },
  blog: {
    title: 'SEO Research, YouTube Algorithms & Engineering Playbooks | Cordevia Digital',
    description: 'Battle-tested SEO research, topical authority blueprints, Google algorithm teardowns, and conversion optimization strategies to capture top search rankings.',
    keywords: 'SEO playbooks, Google algorithm updates, rank first page google, programmatic SEO, Core Web Vitals guide, YouTube CTR tactics, technical search engine optimization',
  },
  marketplace: {
    title: 'Cordevia Store & Marketplace – Digital Assets, SEO Audits & Creator Systems',
    description: 'Purchase verified SEO audit spreadsheets, production frameworks, and Figma systems. Pay globally with Binance, PayPal, Card, Cameroon MOMO (MTN & Orange), and Direct Bank Wire.',
    keywords: 'Cordevia Store, CordeviaStoreBot, buy SEO audit, digital marketing templates, Figma creator kit, Binance pay, PayPal, MTN MOMO Cameroon, Orange Money Cameroun, direct bank deposit',
  },
  about: {
    title: 'About Cordevia Digital – Leading Media-Tech & Search Optimization Agency',
    description: 'Discover how Cordevia Digital engineers exponential digital growth for 180+ global brands across North America, Europe, Africa, and Asia.',
    keywords: 'about Cordevia Digital, media tech engineering, SEO founders, global growth agency, digital transformation, brand identity systems',
  },
  contact: {
    title: 'Contact Cordevia Digital – Schedule Your Free Search & Growth Audit',
    description: 'Partner with senior growth architects at Cordevia Digital. Get a custom organic keyword roadmap, YouTube audit, and high-performance strategy within 24 hours.',
    keywords: 'contact Cordevia Digital, book SEO audit, YouTube consultation, hire web development agency, Telegram CordeviaStore, WhatsApp cordeviadigital',
  },
  privacy: {
    title: 'Privacy Policy & Google AdSense Compliance | Cordevia Digital',
    description: 'Cordevia Digital privacy commitment: Google AdSense DART cookies, analytics transparency, CCPA consumer rights, and global GDPR compliance standards.',
    keywords: 'Cordevia Digital privacy, AdSense compliance, GDPR, CCPA, cookies policy',
  },
  terms: {
    title: 'Terms of Service & Licensing | Cordevia Digital LLC',
    description: 'Official governing terms for client growth retainers, digital asset purchases, commercial licensing, and payments via Card, PayPal, Binance, and Mobile Money.',
    keywords: 'terms of service, Cordevia Digital LLC, digital licenses, commercial terms',
  },
  disclosure: {
    title: 'Advertising & Cookie Policy Disclosure | Cordevia Digital',
    description: 'Full transparency regarding monetization, Google AdSense advertising mechanics, analytics tracking, and strict editorial independence.',
    keywords: 'advertising disclosure, Google AdSense, affiliate transparency, cookie consent',
  },
  dmca: {
    title: 'DMCA Copyright Compliance & Notice Protocol | Cordevia Digital',
    description: 'Digital Millennium Copyright Act (DMCA) policies, designated copyright agent records, and intellectual property protection guidelines.',
    keywords: 'DMCA copyright, Cordevia Digital IP, takedown notice, intellectual property',
  },
  'seo-console': {
    title: 'Automated XML Sitemap & Google Search Console Hub | Cordevia Digital',
    description: 'Dynamic XML sitemap generator, Google Search Console indexing inspector, robots.txt verification, and Google AdSense compliance diagnostics.',
    keywords: 'XML sitemap generator, dynamic sitemap.xml, Google Search Console indexing, robots.txt, AdSense ads.txt, SEO health audit, Cordevia Digital',
  },
};

export const updateHeadMetadata = (config: SEOConfig): void => {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = config.title;

  // 2. Helper to set or create meta tags
  const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Description & SEO Keywords
  setMetaTag('meta[name="description"]', 'name', 'description', config.description);
  if (config.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', config.keywords);
  }

  // Search Engine Crawl Directives
  setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  setMetaTag('meta[name="googlebot"]', 'name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  setMetaTag('meta[name="author"]', 'name', 'author', config.author || 'Cordevia Digital');

  // OpenGraph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', config.ogType || 'website');
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cordeviadigital.com';
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', config.canonicalUrl || currentUrl);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Cordevia Digital');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

  // Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@cordeviadigital');
  setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@cordeviadigital');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', config.canonicalUrl || currentUrl);

  // Favicon check
  let faviconEl = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
  if (!faviconEl) {
    faviconEl = document.createElement('link');
    faviconEl.setAttribute('rel', 'icon');
    faviconEl.setAttribute('type', 'image/svg+xml');
    faviconEl.setAttribute('href', '/favicon.svg');
    document.head.appendChild(faviconEl);
  }

  // Schema.org JSON-LD Structured Data Injection
  // Injecting Article, Organization, Service, WebSite graph
  let scriptEl = document.getElementById('cordevia-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'cordevia-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Comprehensive Schema Graph
  const schemaGraph: any[] = [
    // 1. Organization Schema
    {
      '@type': 'Organization',
      '@id': 'https://cordeviadigital.com/#organization',
      name: 'Cordevia Digital',
      legalName: 'Cordevia Digital LLC',
      url: 'https://cordeviadigital.com',
      logo: 'https://cordeviadigital.com/favicon.svg',
      description: 'Premier media-tech engineering agency scaling brands with algorithmic SEO, YouTube growth, high-performance web development, and digital commerce.',
      foundingDate: '2019',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '500 Howard St',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94105',
        addressCountry: 'US',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-888-492-7384',
          contactType: 'customer service',
          email: 'hello@cordeviadigital.com',
          availableLanguage: ['English', 'French'],
        },
      ],
      sameAs: [
        'https://instagram.com/cordeviadigital',
        'https://youtube.com/@cordeviadigital',
        'https://facebook.com/cordeviadigital',
        'https://tiktok.com/@cordeviadigital',
        'https://wa.me/message/cordeviadigital',
        'https://t.me/CordeviaStore',
        'https://t.me/CordeviaStoreBot',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '186',
        bestRating: '5',
        worstRating: '1',
      },
    },

    // 2. Service Schema
    {
      '@type': 'Service',
      '@id': 'https://cordeviadigital.com/#service-seo',
      name: 'Algorithmic SEO & Search Engine Optimization',
      serviceType: 'Search Engine Optimization',
      provider: {
        '@id': 'https://cordeviadigital.com/#organization',
      },
      description: 'First-page Google ranking acceleration through programmatic SEO architecture, Core Web Vitals optimization, and keyword topical authority maps.',
      areaServed: 'Global',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'SEO & Growth Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO & Core Web Vitals Audit',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'YouTube Channel Growth & Media Optimization',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'High-Performance Web Engineering & CRO',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cordevia Store Digital Assets (Binance, PayPal, Card, Cameroon MOMO)',
            },
          },
        ],
      },
    },

    // 3. WebSite Schema with Sitelinks Searchbox
    {
      '@type': 'WebSite',
      '@id': 'https://cordeviadigital.com/#website',
      url: 'https://cordeviadigital.com',
      name: 'Cordevia Digital',
      publisher: {
        '@id': 'https://cordeviadigital.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://cordeviadigital.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  // 4. Article Schema (When viewing articles or blog content)
  if (config.ogType === 'article' || config.includeArticleSchema) {
    schemaGraph.push({
      '@type': 'TechArticle',
      '@id': `${config.canonicalUrl || currentUrl}#article`,
      isPartOf: {
        '@id': 'https://cordeviadigital.com/#website',
      },
      headline: config.title,
      description: config.description,
      inLanguage: 'en-US',
      mainEntityOfPage: config.canonicalUrl || currentUrl,
      datePublished: config.publishedTime || '2026-03-01T08:00:00Z',
      dateModified: config.modifiedTime || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: config.author || 'Cordevia Digital Technical Team',
      },
      publisher: {
        '@id': 'https://cordeviadigital.com/#organization',
      },
      articleSection: config.category || 'SEO & Engineering',
      keywords: config.keywords || 'SEO, YouTube Algorithm, Web Performance, Core Web Vitals',
    });
  }

  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  });
};

export const updateSEOPost = (post: BlogPost): void => {
  updateHeadMetadata({
    title: `${post.title} | Cordevia Digital`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, ${post.category}, SEO strategy, rank page 1 google, Cordevia Digital`,
    ogType: 'article',
    includeArticleSchema: true,
    author: post.author.name,
    category: post.category,
    canonicalUrl: `https://cordeviadigital.com/blog/${post.slug}`,
    publishedTime: post.date,
    modifiedTime: new Date().toISOString(),
  });
};
