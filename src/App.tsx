import React, { useState, useEffect } from 'react';
import { ViewTab, CartItem, MarketplaceItem, ToastMessage, BlogPost } from './types';
import { BLOG_POSTS, BLOG_CATEGORIES } from './data/brandData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';
import { SEOHead } from './components/SEOHead';

// Views
import { HomeView } from './components/views/HomeView';
import { ServicesView } from './components/views/ServicesView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { AboutView } from './components/views/AboutView';
import { BlogView } from './components/views/BlogView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';
import { SEOConsoleView } from './components/views/SEOConsoleView';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { SocialAvatarModal } from './components/SocialAvatarModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  
  // Theme state: persists in localStorage (dark vs high-contrast light mode)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('cordevia_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('cordevia_theme', theme);
    } catch {
      // ignore
    }

    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(
      nextTheme === 'light' ? 'Light Mode Activated' : 'Dark Mode Activated',
      nextTheme === 'light' 
        ? 'Switched to High-Contrast Light Mode with maximum legibility (WCAG AAA).'
        : 'Switched to Default Obsidian Dark Theme.',
      'info'
    );
  };

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (item: MarketplaceItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
    showToast('Item Removed', 'Removed item from your cart.', 'info');
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectServiceForContact = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
  };

  const cartCount = cart.reduce((total, i) => total + i.quantity, 0);

  // Synchronize browser history and handle deep links / category URLs
  useEffect(() => {
    const parseUrl = () => {
      if (typeof window === 'undefined') return;
      try {
        const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
        if (!path) {
          setCurrentTab('home');
          setActivePost(null);
          return;
        }

        const segments = path.split('/');
        const root = segments[0];

        const validTabs: ViewTab[] = [
          'home',
          'services',
          'blog',
          'marketplace',
          'about',
          'contact',
          'terms',
          'privacy',
          'disclosure',
          'dmca',
          'seo-console',
        ];

        if (root === 'blog') {
          setCurrentTab('blog');
          if (segments[1]) {
            const subSlug = segments[1];
            // Check if it's an individual blog post
            const post = BLOG_POSTS.find((p) => p.slug === subSlug);
            if (post) {
              setActivePost(post);
            } else {
              // Check if it's a category slug (e.g. ai-automation, seo-search, web-engineering)
              const cat = BLOG_CATEGORIES.find((c) => c.slug === subSlug || c.id === subSlug);
              if (cat) {
                setSelectedBlogCategory(cat.id);
                setActivePost(null);
              } else {
                setActivePost(null);
              }
            }
          } else {
            setActivePost(null);
          }
        } else if (validTabs.includes(root as ViewTab)) {
          setCurrentTab(root as ViewTab);
          setActivePost(null);
        }
      } catch (_) {}
    };

    parseUrl();

    const handlePopState = () => {
      parseUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tab: ViewTab) => {
    if (tab !== 'blog') {
      setActivePost(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (typeof window !== 'undefined') {
        const targetPath = tab === 'home' ? '/' : `/${tab}`;
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ tab }, '', targetPath);
        }
      }
    } catch (_) {}
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-300">
      {/* Dynamic SEO Head Manager with unique dynamic OG images */}
      <SEOHead currentTab={currentTab} activePost={activePost} />
      
      {/* Global Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView 
            onNavigate={handleNavigate} 
            onShowToast={showToast} 
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            onNavigate={handleNavigate}
            onSelectServiceForContact={handleSelectServiceForContact}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'blog' && (
          <BlogView 
            onNavigate={handleNavigate} 
            onShowToast={showToast}
            onActivePostChange={setActivePost}
            initialPost={activePost}
            initialCategory={selectedBlogCategory}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceView
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'about' && (
          <AboutView 
            onNavigate={handleNavigate} 
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            initialService={selectedServiceForContact}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {(currentTab === 'terms' || currentTab === 'privacy' || currentTab === 'dmca' || currentTab === 'disclosure') && (
          <LegalView 
            initialType={currentTab} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentTab === 'seo-console' && (
          <SEOConsoleView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onShowToast={showToast} 
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* GDPR & Google AdSense Compliant Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacy={() => handleNavigate('privacy')}
        onOpenDisclosure={() => handleNavigate('disclosure')}
      />

      {/* Social Media Profile Picture / Avatar Studio Modal */}
      <SocialAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClear={handleClearCart}
        onShowToast={showToast}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Toast Feedback Notifications */}
      <ToastContainer 
        toasts={toasts} 
        onDismiss={handleDismissToast} 
      />

    </div>
  );
}
