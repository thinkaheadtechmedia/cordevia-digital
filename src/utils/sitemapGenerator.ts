import { BLOG_POSTS, SERVICES, MARKETPLACE_ITEMS } from '../data/brandData';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  title?: string;
  category?: string;
  image?: {
    loc: string;
    title: string;
    caption?: string;
  };
}

export const BASE_CANONICAL_URL = 'https://cordeviadigital.com';

/**
 * Returns structured metadata for all indexable URLs on Cordevia Digital.
 */
export function getSitemapEntries(baseUrl = BASE_CANONICAL_URL): SitemapEntry[] {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const coreRoutes: SitemapEntry[] = [
    {
      loc: `${cleanBase}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.00',
      title: 'Cordevia Digital – Home & Media-Tech Agency',
      category: 'Core',
      image: {
        loc: `${cleanBase}/favicon.svg`,
        title: 'Cordevia Digital Logo & Identity',
      },
    },
    {
      loc: `${cleanBase}/services`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.95',
      title: 'Growth Services & Algorithmic SEO Retainers',
      category: 'Services',
    },
    {
      loc: `${cleanBase}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.90',
      title: 'SEO Research, YouTube Algorithms & Engineering Playbooks',
      category: 'Content',
    },
    {
      loc: `${cleanBase}/marketplace`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.90',
      title: 'Cordevia Store – Digital Assets & SEO Audit Systems',
      category: 'Commerce',
    },
    {
      loc: `${cleanBase}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.80',
      title: 'About Cordevia Digital – Media-Tech Founders & Agency Story',
      category: 'Company',
    },
    {
      loc: `${cleanBase}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.85',
      title: 'Contact Cordevia Digital & Free Growth Audit Request',
      category: 'Company',
    },
    {
      loc: `${cleanBase}/seo-console`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.80',
      title: 'Google Search Console & AdSense Compliance Hub',
      category: 'SEO Tools',
    },
    {
      loc: `${cleanBase}/privacy`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.60',
      title: 'Privacy Policy & Google AdSense Compliance',
      category: 'Legal',
    },
    {
      loc: `${cleanBase}/terms`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.60',
      title: 'Terms of Service & Licensing Agreements',
      category: 'Legal',
    },
    {
      loc: `${cleanBase}/disclosure`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.60',
      title: 'AdSense & Cookie Advertising Policy Disclosure',
      category: 'Legal',
    },
    {
      loc: `${cleanBase}/dmca`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.50',
      title: 'DMCA Copyright Compliance & Intellectual Property',
      category: 'Legal',
    },
  ];

  // Dynamic Service Deep-Links
  const serviceRoutes: SitemapEntry[] = SERVICES.map((service) => ({
    loc: `${cleanBase}/services#${service.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    title: `${service.title} | Cordevia Services`,
    category: 'Services',
  }));

  // Dynamic Marketplace Product Deep-Links
  const productRoutes: SitemapEntry[] = MARKETPLACE_ITEMS.map((item) => ({
    loc: `${cleanBase}/marketplace#${item.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80',
    title: `${item.name} ($${item.price}) | Cordevia Store`,
    category: 'Marketplace',
  }));

  // Dynamic Blog Posts with specific publication/update date & rich image tag
  const blogRoutes: SitemapEntry[] = BLOG_POSTS.map((post) => {
    // Parse date if possible
    let postDate = today;
    try {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        postDate = parsed.toISOString().split('T')[0];
      }
    } catch {
      postDate = today;
    }

    return {
      loc: `${cleanBase}/blog/${post.slug}`,
      lastmod: postDate,
      changefreq: 'weekly',
      priority: '0.90',
      title: `${post.title} | Cordevia Blog`,
      category: 'Blog Posts',
      image: {
        loc: `${cleanBase}/favicon.svg`,
        title: post.title,
        caption: post.excerpt,
      },
    };
  });

  return [...coreRoutes, ...blogRoutes, ...serviceRoutes, ...productRoutes];
}

/**
 * Generates automated XML sitemap string conforming to sitemaps.org 0.9 protocol
 * and Google Image Sitemap extension specifications.
 */
export function generateSitemapXml(baseUrl = BASE_CANONICAL_URL): string {
  const entries = getSitemapEntries(baseUrl);

  const xmlEntries = entries
    .map((entry) => {
      let xml = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>`;

      if (entry.image) {
        xml += `\n    <image:image>\n      <image:loc>${escapeXml(entry.image.loc)}</image:loc>\n      <image:title>${escapeXml(entry.image.title)}</image:title>`;
        if (entry.image.caption) {
          xml += `\n      <image:caption>${escapeXml(entry.image.caption)}</image:caption>`;
        }
        xml += `\n    </image:image>`;
      }

      xml += `\n  </url>`;
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
<!-- Generated by Cordevia Digital Automated XML Sitemap Engine -->
<!-- Total Indexed URLs: ${entries.length} | Generated: ${new Date().toISOString()} -->
${xmlEntries}
</urlset>`;
}

/**
 * Generates an SEO-optimized robots.txt for Googlebot, AdsBot-Google, and search crawlers.
 */
export function generateRobotsTxt(baseUrl = BASE_CANONICAL_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  return `# Cordevia Digital Robots.txt
# Fully optimized for Googlebot, AdsBot-Google, Bingbot, and AI Search Crawlers

User-agent: *
Allow: /
Allow: /services
Allow: /blog
Allow: /marketplace
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms
Allow: /disclosure
Allow: /dmca
Allow: /seo-console
Disallow: /api/
Disallow: /*?*filter=
Disallow: /*?*sort=

# Googlebot specific directives
User-agent: Googlebot
Allow: /
Allow: /*.js$
Allow: /*.css$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.svg$
Allow: /*.webp$

# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

# Google Ads Quality Crawler
User-agent: AdsBot-Google
Allow: /

# Canonical Sitemap Declaration
Sitemap: ${cleanBase}/sitemap.xml
`;
}

/**
 * Generates an authorized digital sellers ads.txt file for Google AdSense compliance.
 */
export function generateAdsTxt(publisherId = 'pub-1983675798905014'): string {
  const cleanPub = publisherId.replace(/^pub-/, '');
  return `# Google AdSense Authorized Digital Sellers (ads.txt)
google.com, pub-${cleanPub}, DIRECT, f08c47fec0942fa0
contact=hello@cordeviadigital.com
`;
}

/**
 * XML character escaping helper
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Triggers in-browser dynamic download of generated files.
 */
export function downloadFile(content: string, filename: string, mimeType = 'application/xml;charset=utf-8;'): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
