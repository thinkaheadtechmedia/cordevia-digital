import React, { useState, useEffect } from 'react';
import { ViewTab } from '../types';
import { SERVICES, MARKETPLACE_ITEMS, BLOG_POSTS } from '../data/brandData';
import { Search, X, ArrowRight, Layout, FileText, ShoppingBag, User, Mail } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ViewTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredServices = SERVICES.filter(
    (s) => s.title.toLowerCase().includes(normalized) || s.description.toLowerCase().includes(normalized)
  );

  const filteredMarket = MARKETPLACE_ITEMS.filter(
    (m) => m.name.toLowerCase().includes(normalized) || m.description.toLowerCase().includes(normalized)
  );

  const filteredBlog = BLOG_POSTS.filter(
    (b) => b.title.toLowerCase().includes(normalized) || b.excerpt.toLowerCase().includes(normalized)
  );

  const handleSelect = (tab: ViewTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0C1220] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Cordevia services, high-value blog articles, marketplace..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-500 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 text-sm">
          {/* Quick links when empty */}
          {!query && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Quick Navigation
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { name: 'Services', tab: 'services' as ViewTab, icon: Layout },
                  { name: 'Blog', tab: 'blog' as ViewTab, icon: FileText },
                  { name: 'Marketplace', tab: 'marketplace' as ViewTab, icon: ShoppingBag },
                  { name: 'About', tab: 'about' as ViewTab, icon: User },
                  { name: 'Contact', tab: 'contact' as ViewTab, icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleSelect(item.tab)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all text-left text-slate-200"
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium text-xs">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-cyan-400 flex items-center justify-between">
                <span>Agency Services ({filteredServices.length})</span>
                <span className="text-[11px] text-slate-500">Core Retainers</span>
              </div>
              <div className="space-y-1.5">
                {filteredServices.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect('services')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-900/40 hover:bg-cyan-950/30 border border-transparent hover:border-cyan-800/40 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white group-hover:text-cyan-300 text-xs sm:text-sm">
                        {s.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{s.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog posts */}
          {filteredBlog.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-teal-400 flex items-center justify-between">
                <span>SEO Articles & Research ({filteredBlog.length})</span>
                <span className="text-[11px] text-slate-500">High-Value Insights</span>
              </div>
              <div className="space-y-1.5">
                {filteredBlog.slice(0, 4).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect('blog')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-900/40 hover:bg-teal-950/30 border border-transparent hover:border-teal-800/40 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white group-hover:text-teal-300 text-xs sm:text-sm">
                        {b.title}
                      </div>
                      <div className="text-xs text-slate-400">{b.category} • {b.readTime}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Marketplace */}
          {filteredMarket.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-400 flex items-center justify-between">
                <span>Digital Marketplace Items ({filteredMarket.length})</span>
                <span className="text-[11px] text-slate-500">Kits, Systems & Templates</span>
              </div>
              <div className="space-y-1.5">
                {filteredMarket.slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect('marketplace')}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-900/40 hover:bg-emerald-950/30 border border-transparent hover:border-emerald-800/40 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white group-hover:text-emerald-300 text-xs sm:text-sm">
                        {m.name}
                      </div>
                      <div className="text-xs text-slate-400">${m.price} • {m.downloadsCount} downloads</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
