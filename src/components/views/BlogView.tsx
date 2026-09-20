import React, { useState, useRef, useEffect } from 'react';
import { ViewTab, BlogPost, BlogCategory } from '../../types';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../data/brandData';
import { ReadingProgressBar } from '../ReadingProgressBar';
import { NewsletterSignup } from '../NewsletterSignup';
import { AdSenseUnit } from '../AdSenseUnit';
import { updateSEOPost, updateHeadMetadata, VIEW_SEO_CONFIGS } from '../../utils/seo';
import { 
  FileText, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X, 
  Share2, 
  User, 
  Sparkles,
  Search,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Youtube,
  Cpu,
  Bot,
  Layers,
  Filter,
  Flame
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate, onShowToast }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const articleScrollRef = useRef<HTMLDivElement | null>(null);

  // Map category icons dynamically
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube':
        return <Youtube className="w-4 h-4" />;
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Bot':
        return <Bot className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Dynamically update SEO head metadata when opening or closing an article
  useEffect(() => {
    if (selectedPost) {
      updateSEOPost(selectedPost);
      // Scroll modal container to top when switching posts
      if (articleScrollRef.current) {
        articleScrollRef.current.scrollTop = 0;
      }
    } else {
      updateHeadMetadata({
        title: VIEW_SEO_CONFIGS.blog.title,
        description: VIEW_SEO_CONFIGS.blog.description,
        canonicalUrl: 'https://cordeviadigital.com/blog',
      });
    }
  }, [selectedPost]);

  const activeCategoryObj = BLOG_CATEGORIES.find(c => c.id === activeCategory) || BLOG_CATEGORIES[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = activeCategory === 'all' || 
      post.category.toLowerCase().includes(activeCategoryObj.name.toLowerCase()) ||
      activeCategoryObj.name.toLowerCase().includes(post.category.toLowerCase());
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getCategoryCount = (cat: BlogCategory) => {
    if (cat.id === 'all') return BLOG_POSTS.length;
    return BLOG_POSTS.filter(p => 
      p.category.toLowerCase().includes(cat.name.toLowerCase()) ||
      cat.name.toLowerCase().includes(p.category.toLowerCase())
    ).length;
  };

  const handleShare = (post: BlogPost) => {
    navigator.clipboard.writeText(`https://cordeviadigital.com/blog/${post.slug}`);
    onShowToast('Link Copied!', `Copied article link to clipboard.`, 'success');
  };

  // Compute 2-3 most relevant articles for the current article
  const getRelatedPosts = (current: BlogPost): BlogPost[] => {
    return BLOG_POSTS.filter((p) => p.id !== current.id)
      .sort((a, b) => {
        const aCatScore = a.category === current.category ? 3 : 0;
        const bCatScore = b.category === current.category ? 3 : 0;
        const aTagScore = a.tags.filter((t) => current.tags.includes(t)).length;
        const bTagScore = b.tags.filter((t) => current.tags.includes(t)).length;
        return bCatScore + bTagScore - (aCatScore + aTagScore);
      })
      .slice(0, 2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Cordevia Insights & Intelligence Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Media-Tech Research, Algorithm Audits & Engineering Playbooks
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Deep-dive technical analyses written by Cordevia Digital practitioners on audience retention, search mechanics, multimodal AI, and high-conversion architecture.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search articles, keywords, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Badges Carousel / Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Browse By Category</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Showing {filteredPosts.length} of {BLOG_POSTS.length} articles
          </span>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0B101D] border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.accentColor}`} />
                )}

                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800/80 text-cyan-400 group-hover:text-cyan-300 group-hover:bg-slate-800'
                  }`}>
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSelected
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {count}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xs font-bold leading-snug line-clamp-1 ${
                    isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-200'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Descriptive Banner */}
        {activeCategory !== 'all' && (
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-600/50 flex items-center justify-center text-cyan-400 shrink-0">
                {getCategoryIcon(activeCategoryObj.iconName)}
              </div>
              <div>
                <span className="text-white font-bold block sm:inline mr-2">
                  Category: {activeCategoryObj.name}
                </span>
                <span className="text-slate-300">
                  {activeCategoryObj.description}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveCategory('all')}
              className="text-cyan-400 hover:text-white font-semibold underline text-xs whitespace-nowrap self-start sm:self-auto"
            >
              Reset to All Articles
            </button>
          </div>
        )}
      </div>

      {/* Featured / Empty State handling */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No articles found in this category</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting your category filter or search query to browse our entire intelligence library.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="p-7 rounded-3xl bg-[#0B101D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              {post.featured && (
                <div className="absolute top-4 right-5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Featured Analysis</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const match = BLOG_CATEGORIES.find(c => 
                        c.name.toLowerCase().includes(post.category.toLowerCase()) || 
                        post.category.toLowerCase().includes(c.name.toLowerCase())
                      );
                      if (match) setActiveCategory(match.id);
                    }}
                    className="px-3 py-1 rounded-full bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 font-semibold text-[11px] transition-colors"
                  >
                    {post.category}
                  </button>
                  <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800/70">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                    {post.author.name[0]}
                  </div>
                  <span>{post.author.name}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleShare(post)}
                  className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 transition-colors"
                  title="Share article link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="px-4 py-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-800/60 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Embedded High-Value Dispatch Card for Blog Hub */}
      <NewsletterSignup 
        variant="card" 
        source="blog_hub_feed"
        onShowToast={onShowToast}
      />

      {/* Post Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedPost(null)} 
          />

          <div 
            ref={articleScrollRef}
            className="relative z-10 w-full max-w-4xl bg-[#0D1424] border border-slate-700 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col"
          >
            {/* Scroll-Dependent Progress Bar pinned to the top of the reading container */}
            <ReadingProgressBar 
              containerRef={articleScrollRef}
              showIndicator={true}
            />

            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold">
                      {selectedPost.category}
                    </span>
                    <span className="text-xs text-slate-400">{selectedPost.date}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-xs font-bold text-cyan-300">
                      {selectedPost.author.name[0]}
                    </div>
                    <span>
                      By <strong className="text-cyan-300">{selectedPost.author.name}</strong> • {selectedPost.author.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shrink-0 transition-colors"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content body */}
              <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {/* Article Featured Excerpt Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border-l-4 border-cyan-400 border-y border-r border-slate-800/80 text-cyan-100 font-medium text-sm sm:text-base italic leading-relaxed">
                    {selectedPost.excerpt}
                  </div>

                  {/* Render content with Markdown-aware rich formatting */}
                  {selectedPost.content.map((block, idx) => {
                    // Detect H2
                    if (block.startsWith('## ')) {
                      const headingText = block.replace(/^##\s+/, '');
                      return (
                        <h2 key={idx} className="text-xl sm:text-2xl font-black text-white pt-6 pb-2 border-b border-slate-800 tracking-tight flex items-center gap-2">
                          <span className="w-1.5 h-6 rounded-full bg-cyan-400 inline-block" />
                          <span>{headingText}</span>
                        </h2>
                      );
                    }

                    // Detect H3
                    if (block.startsWith('### ')) {
                      const headingText = block.replace(/^###\s+/, '');
                      return (
                        <h3 key={idx} className="text-base sm:text-lg font-extrabold text-cyan-300 pt-4 pb-1 tracking-tight">
                          {headingText}
                        </h3>
                      );
                    }

                    // Detect Blockquote
                    if (block.startsWith('> ')) {
                      const quoteText = block.replace(/^>\s+/, '');
                      return (
                        <blockquote key={idx} className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-amber-400 my-3 text-slate-200 text-sm italic shadow-inner">
                          {quoteText}
                        </blockquote>
                      );
                    }

                    // Detect Bullet List
                    if (block.includes('\n- ') || block.startsWith('- ')) {
                      const items = block.split('\n').filter(line => line.trim().startsWith('- '));
                      return (
                        <ul key={idx} className="space-y-2 my-3 pl-2">
                          {items.map((item, itemIdx) => {
                            const text = item.replace(/^-\s+/, '');
                            return (
                              <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                                <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }

                    // Detect Markdown Table
                    if (block.includes('|') && block.includes('---')) {
                      const lines = block.split('\n').filter(line => line.trim().length > 0);
                      const headerLine = lines[0];
                      const dataLines = lines.slice(2);
                      const headers = headerLine.split('|').filter(c => c.trim().length > 0).map(c => c.trim());

                      return (
                        <div key={idx} className="my-5 overflow-x-auto rounded-2xl border border-slate-800 bg-[#090E1A]">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-900/90 border-b border-slate-800 text-cyan-300 font-bold">
                                {headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 sm:p-3.5 whitespace-nowrap">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                              {dataLines.map((row, rIdx) => {
                                const cells = row.split('|').filter(c => c.trim().length > 0).map(c => c.trim());
                                return (
                                  <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                                    {cells.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-3 sm:p-3.5 text-xs">
                                        <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }

                    // Standard Paragraph with inline bolding & links
                    return (
                      <p 
                        key={idx} 
                        className="leading-relaxed text-sm sm:text-base text-slate-300"
                        dangerouslySetInnerHTML={{ 
                          __html: block
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline font-medium">$1</a>')
                        }} 
                      />
                    );
                  })}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {selectedPost.tags.map((t, i) => (
                  <span key={i} className="text-xs text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-800/40 font-mono">
                    #{t}
                  </span>
                ))}
              </div>

              {/* AdSense Compliant In-Article Sponsored Unit */}
              <AdSenseUnit 
                slotId="8392019482" 
                demoTitle="Cordevia Digital Technical SEO & High-Retention Video Production"
                className="my-6"
              />

              {/* In-Article Newsletter Lead Capture */}
              <div className="pt-2">
                <NewsletterSignup
                  variant="card"
                  source={`article_${selectedPost.slug}`}
                  articleTitle={selectedPost.title}
                  onShowToast={onShowToast}
                />
              </div>

              {/* RELATED ARTICLES SECTION (Boosts dwell time & internal navigation) */}
              <div className="pt-6 border-t border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Related Articles & Analyses</h3>
                  </div>
                  <span className="text-xs text-slate-500">Curated for your reading path</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getRelatedPosts(selectedPost).map((rel) => (
                    <div
                      key={rel.id}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
                            {rel.category}
                          </span>
                          <span className="text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {rel.readTime}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {rel.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPost(rel);
                          if (articleScrollRef.current) {
                            articleScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300"
                      >
                        <span>Read Next Article</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal footer navigation actions */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleShare(selectedPost)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-cyan-400 flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Back to Insights
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onNavigate('contact');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs hover:opacity-95 shadow-md shadow-cyan-500/20"
                  >
                    Discuss with Strategy Team
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

