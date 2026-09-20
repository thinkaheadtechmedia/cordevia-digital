import React, { useState } from 'react';
import { ViewTab, MarketplaceItem } from '../../types';
import { MARKETPLACE_ITEMS } from '../../data/brandData';
import { MarketplacePaymentModal } from '../MarketplacePaymentModal';
import { MarketplaceDetailModal } from '../MarketplaceDetailModal';
import { 
  ShoppingBag, 
  Star, 
  Check, 
  DownloadCloud, 
  Sparkles, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight,
  Coins,
  Wallet,
  CreditCard,
  Smartphone,
  Building2,
  Zap,
  Info
} from 'lucide-react';

interface MarketplaceViewProps {
  onNavigate: (tab: ViewTab) => void;
  onAddToCart: (item: MarketplaceItem) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onNavigate,
  onAddToCart,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickBuyItem, setQuickBuyItem] = useState<MarketplaceItem | null>(null);
  const [detailModalItem, setDetailModalItem] = useState<MarketplaceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Digital Assets' },
    { id: 'ai-tools', label: 'AI & Pro Licenses' },
    { id: 'kits', label: 'Creator & Media Kits' },
    { id: 'audits', label: 'Audit Spreadsheets' },
    { id: 'systems', label: 'Design Systems' },
    { id: 'templates', label: 'Brand Guidelines' },
  ];

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (item: MarketplaceItem) => {
    onAddToCart(item);
    onShowToast('Added to Cart!', `Added "${item.name}" to your Cordevia Vault.`, 'success');
  };

  const handleQuickBuy = (item: MarketplaceItem) => {
    setQuickBuyItem(item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Cordevia Marketplace</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Production Kits, Systems & Technical Audits
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Battle-tested frameworks, Figma systems, and automated spreadsheets deployed directly in client engagements, now available for instant download.
        </p>

        {/* Global Multi-Payment Banner */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C1222] via-[#091629] to-[#0C1222] border border-cyan-500/20 shadow-lg">
            <div className="text-xs text-slate-300 font-semibold mb-2 flex items-center justify-center gap-1.5">
              <span>Accepted Payment Methods Worldwide:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-600/30 text-amber-300 font-medium">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Binance Pay (Crypto / USDT)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-950/40 border border-blue-600/30 text-blue-300 font-medium">
                <Wallet className="w-3.5 h-3.5 text-blue-400" />
                <span>PayPal</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/40 border border-cyan-600/30 text-cyan-300 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Credit / Debit Card</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-600/30 text-emerald-300 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cameroon MOMO (MTN & Orange)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-600/30 text-purple-300 font-medium">
                <Building2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Direct Bank Wire / SWIFT</span>
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search assets and templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-[#0B101D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="capitalize text-cyan-400 font-semibold text-[11px]">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {item.name}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 py-1.5 border-y border-slate-800/80">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                  <span className="text-slate-500 text-[11px] font-normal">({item.reviewsCount})</span>
                </div>
                <div className="text-slate-500 text-[11px] font-mono">
                  {item.downloadsCount.toLocaleString()} downloads
                </div>
              </div>

              {/* Stock Inventory Counter */}
              {item.stock !== undefined && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Inventory Allocation:</span>
                  </div>
                  <span className="font-mono font-bold text-white bg-emerald-900/60 px-2 py-0.5 rounded-md">
                    {item.stock} Units In Stock
                  </span>
                </div>
              )}

              {/* What's included checklist */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Package Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Specs Button */}
              <button
                type="button"
                onClick={() => setDetailModalItem(item)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Full Specs & Details</span>
              </button>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-white font-mono">${item.price}</span>
                  <span className="text-[10px] text-slate-500 block">Commercial License • (~{(item.price * 600).toLocaleString()} FCFA)</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                  <span>Instant Access</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Add to Vault</span>
                </button>
                <button
                  onClick={() => handleQuickBuy(item)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commercial License Note */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-3 text-xs text-slate-400 text-center">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>Every digital purchase includes unlimited commercial usage rights, lifetime template updates, and priority customer support.</span>
      </div>

      {/* Quick Buy Payment Modal */}
      {quickBuyItem && (
        <MarketplacePaymentModal
          isOpen={!!quickBuyItem}
          onClose={() => setQuickBuyItem(null)}
          items={[{ item: quickBuyItem, quantity: 1 }]}
          totalAmount={quickBuyItem.price}
          onSuccess={() => setQuickBuyItem(null)}
          onShowToast={onShowToast}
        />
      )}

      {/* Item Detail Modal */}
      {detailModalItem && (
        <MarketplaceDetailModal
          isOpen={!!detailModalItem}
          onClose={() => setDetailModalItem(null)}
          item={detailModalItem}
          onAddToCart={(item) => onAddToCart(item)}
          onQuickBuy={(item) => {
            setDetailModalItem(null);
            setQuickBuyItem(item);
          }}
          onShowToast={onShowToast}
        />
      )}

    </div>
  );
};
