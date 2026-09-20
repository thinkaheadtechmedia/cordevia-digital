import React, { useState } from 'react';
import { ViewTab } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  Calculator,
  Compass,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAvatarModal?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAvatarModal,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: ViewTab }[] = [
    { label: 'Overview', tab: 'home' },
    { label: 'Services', tab: 'services' },
    { label: 'Blog', tab: 'blog' },
    { label: 'Marketplace', tab: 'marketplace' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNav = (tab: ViewTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Precision Top Notification Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0A1220] to-teal-950 border-b border-cyan-900/30 text-xs py-1.5 px-4 text-center text-slate-300 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold text-[11px] border border-cyan-500/30">
            <Sparkles className="w-3 h-3" /> Rebranded to Cordevia Digital
          </span>
          <span>Next-Gen Media-Tech Engineering • YouTube, Web & SEO Acceleration</span>
          <button 
            onClick={() => handleNav('services')}
            className="text-cyan-400 font-medium hover:underline inline-flex items-center gap-0.5 ml-1"
          >
            Explore Agency Services <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
          >
            <BrandLogo size="md" showTagline={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleNav(link.tab)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800/60 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Social Avatar Kit Quick Trigger */}
            {onOpenAvatarModal && (
              <button
                onClick={onOpenAvatarModal}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all bg-gradient-to-r from-cyan-950/80 to-slate-900 hover:bg-slate-800 border-cyan-700/60 text-cyan-300 hover:text-white hover:border-cyan-400 shadow-sm"
                title="Cordevia Digital Official Social Profile Picture & Avatar Package (ZIP)"
              >
                <img 
                  src="/cordevia-avatar-circular.svg" 
                  alt="Avatar" 
                  className="w-4 h-4 rounded-full" 
                  referrerPolicy="no-referrer" 
                />
                <span>Profile Pic (.ZIP)</span>
              </button>
            )}

            {/* SEO & Sitemap Engine Hub Quick Link */}
            <button
              onClick={() => handleNav('seo-console')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                currentTab === 'seo-console'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-700 shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-cyan-300'
              }`}
              title="Automated XML Sitemap & Google Search Console"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Sitemap.xml</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all text-xs"
              title="Quick Search (Cmd+K)"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User-Controlled Theme Toggle (Dark vs High-Contrast Light) */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all flex items-center justify-center relative group"
                aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to High-Contrast Light Mode'}
                title={theme === 'light' ? 'Active: High-Contrast Light Mode. Click to switch to Dark Obsidian.' : 'Active: Dark Obsidian Mode. Click to switch to High-Contrast Light Mode.'}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                )}
                <span className="sr-only">
                  {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to High-Contrast Light Mode'}
                </span>
              </button>
            )}

            {/* Request Proposal Primary CTA */}
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 hover:shadow-cyan-500/40 transition-all transform active:scale-95"
            >
              <span>Get Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A0E18] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = currentTab === link.tab;
                return (
                  <button
                    key={link.tab}
                    onClick={() => handleNav(link.tab)}
                    className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                        : 'bg-slate-900/60 text-slate-300 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              {/* Mobile Theme Toggle */}
              {onToggleTheme && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {theme === 'light' ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-400" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white">
                        {theme === 'light' ? 'High-Contrast Light Mode' : 'Default Obsidian Dark'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {theme === 'light' ? 'WCAG AAA Enhanced Readability' : 'Low-Glare Dark Palette'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onToggleTheme}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-mono font-bold text-cyan-300 transition-colors"
                  >
                    Switch to {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                </div>
              )}

              {onOpenAvatarModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAvatarModal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-900/50 text-slate-200 text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <img src="/cordevia-avatar-circular.svg" alt="Avatar" className="w-4 h-4 rounded-full" referrerPolicy="no-referrer" />
                  <span>Social Avatar & Brand Profile Kit (1024x1024)</span>
                </button>
              )}
              <button
                onClick={() => handleNav('seo-console')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-mono text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Automated XML Sitemap & SEO Console</span>
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm text-center shadow-lg shadow-cyan-500/20"
              >
                Schedule Strategy Architecture Call
              </button>
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
                <span>Direct Inquiries: hello@cordeviadigital.com</span>
                <span>Tier 1 Support</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
