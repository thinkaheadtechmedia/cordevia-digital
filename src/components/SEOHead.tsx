import React, { useEffect } from 'react';
import { ViewTab, BlogPost } from '../types';
import { updateHeadMetadata, updateSEOPost, VIEW_SEO_CONFIGS } from '../utils/seo';

interface SEOHeadProps {
  currentTab: ViewTab;
  activePost?: BlogPost | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentTab, activePost }) => {
  useEffect(() => {
    if (activePost && currentTab === 'blog') {
      updateSEOPost(activePost);
      return;
    }

    const config = VIEW_SEO_CONFIGS[currentTab] || VIEW_SEO_CONFIGS.home;
    updateHeadMetadata({
      title: config.title,
      description: config.description,
      keywords: config.keywords,
      canonicalUrl: `https://cordeviadigital.com/${currentTab === 'home' ? '' : currentTab}`,
      ogType: currentTab === 'blog' ? 'article' : 'website',
      includeArticleSchema: currentTab === 'blog',
    });
  }, [currentTab, activePost]);

  return null; // Side-effect only for document.head
};
