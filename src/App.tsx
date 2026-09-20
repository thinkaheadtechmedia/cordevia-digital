import React, { useState, useEffect } from 'react';
import { ViewTab, CartItem, MarketplaceItem, ToastMessage } from './types';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');

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

  const handleNavigate = (tab: ViewTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-300">
      {/* Dynamic SEO Head Manager */}
      <SEOHead currentTab={currentTab} />
      
      {/* Global Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
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
          <AboutView onNavigate={handleNavigate} />
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
      />

      {/* GDPR & Google AdSense Compliant Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacy={() => handleNavigate('privacy')}
        onOpenDisclosure={() => handleNavigate('disclosure')}
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
