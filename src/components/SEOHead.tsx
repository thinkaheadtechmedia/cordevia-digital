import React, { useEffect } from 'react';
import { ViewTab, BlogPost } from '../types';
import { updateHeadMetadata, updateSEOPost, VIEW_SEO_CONFIGS } from '../utils/seo';
import { generateDynamicOGImageUrl } from '../utils/ogImage';

interface SEOHeadProps {
  currentTab: ViewTab;
  activePost?: BlogPost | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentTab, activePost }) => {
  useEffect(() => {
    // If viewing an active blog post, dynamically generate a unique OG image based on the post title
    if (activePost && currentTab === 'blog') {
      const dynamicOgImage = generateDynamicOGImageUrl({
        title: activePost.title,
        category: activePost.category,
        author: activePost.author.name,
        readTime: activePost.readTime,
        date: activePost.date,
      });

      updateHeadMetadata({
        title: `${activePost.title} | Cordevia Digital`,
        description: activePost.excerpt,
        keywords: `${activePost.tags.join(', ')}, ${activePost.category}, SEO strategy, rank page 1 google, Cordevia Digital`,
        canonicalUrl: `https://cordeviadigital.com/blog/${activePost.slug}`,
        ogType: 'article',
        ogImage: dynamicOgImage,
        image: dynamicOgImage,
        includeArticleSchema: true,
        author: activePost.author.name,
        category: activePost.category,
        publishedTime: activePost.date,
        modifiedTime: new Date().toISOString(),
      });
      return;
    }

    const config = VIEW_SEO_CONFIGS[currentTab] || VIEW_SEO_CONFIGS.home;
    const defaultOgImage = generateDynamicOGImageUrl({
      title: config.title.replace(/\s*\|\s*Cordevia Digital.*$/, '').replace(/\s*–\s*.*$/, ''),
      category: currentTab === 'blog' ? 'Insights & Research' : 'Media-Tech & Algorithmic SEO',
      author: 'Cordevia Digital',
      readTime: 'Engineering Portal',
      date: '2026 Edition',
    });

    updateHeadMetadata({
      title: config.title,
      description: config.description,
      keywords: config.keywords,
      canonicalUrl: `https://cordeviadigital.com/${currentTab === 'home' ? '' : currentTab}`,
      ogType: currentTab === 'blog' ? 'article' : 'website',
      ogImage: defaultOgImage,
      image: defaultOgImage,
      includeArticleSchema: currentTab === 'blog',
    });
  }, [currentTab, activePost]);

  return null; // Side-effect only for document.head
};
