import React, { useState } from 'react';
import { MarketplaceItem } from '../types';
import { 
  X, 
  Check, 
  Star, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  Cpu, 
  HardDrive, 
  Globe2, 
  ChevronRight,
  Layers,
  Award,
  DownloadCloud
} from 'lucide-react';

interface MarketplaceDetailModalProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MarketplaceItem) => void;
  onQuickBuy: (item: MarketplaceItem) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const MarketplaceDetailModal: React.FC<MarketplaceDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  onQuickBuy,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'activation' | 'faq'>('overview');

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    onAddToCart(item);
    onShowToast('Added to Cart!', `Added "${item.name}" to your Cart Vault.`, 'success');
  };

  const handleBuy = () => {
    onQuickBuy(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0A0F1D] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-[#091022]">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/40 text-[10px] font-bold uppercase tracking-wider">
                {item.category === 'ai-tools' ? 'AI & Pro Licenses' : item.category}
              </span>
              {item.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
              {item.stock !== undefined && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-bold flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.stock} Units In Stock</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {item.name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{item.rating}</span>
                <span className="text-slate-400 font-normal">({item.reviewsCount} verified reviews)</span>
              </div>
              <div className="text-slate-400">
                <span>{item.downloadsCount.toLocaleString()} activated</span>
              </div>
              {item.duration && (
                <div className="flex items-center gap-1 text-cyan-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.duration}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800/80 bg-slate-950/60 px-6 gap-2 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Benefits
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Full Specifications {item.specs ? `(${item.specs.length})` : ''}
          </button>
          <button
            onClick={() => setActiveTab('activation')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'activation'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Instant Activation Guide
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Product Summary</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.detailedDescription || item.description}
                </p>
              </div>

              {/* Core Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>2M Token Context</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Process 1 hr video, 10+ hrs audio, or 700k words in a single continuous prompt.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                    <HardDrive className="w-4 h-4" />
                    <span>2TB Cloud Storage</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Bundled Google One high-speed storage for Drive, Gmail, and high-res media.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Globe2 className="w-4 h-4" />
                    <span>Global Activation</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Works worldwide across web, mobile apps, and Workspace without any VPN.
                  </p>
                </div>
              </div>

              {/* Package Deliverables */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>What You Receive Immediately Upon Purchase:</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {item.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-emerald-300 block">18-Month Guaranteed Protection Warranty</span>
                  <span className="text-slate-300">
                    Includes continuous license monitoring, 24/7 dedicated Cordevia support, and free instant replacement guarantee throughout the full 18-month duration.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FULL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Verified Product Specifications</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">SKU: {item.id}</span>
              </div>

              {item.specs ? (
                <div className="divide-y divide-slate-800/80 rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
                  {item.specs.map((spec, idx) => (
                    <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs">
                      <span className="text-slate-400 font-medium sm:w-1/3">{spec.label}:</span>
                      <span className="text-white font-semibold sm:w-2/3 sm:text-right font-mono">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 text-xs text-slate-400">
                  Standard specifications apply for this digital asset.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVATION */}
          {activeTab === 'activation' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>4-Step Instant Activation Protocol</span>
              </h3>

              <div className="space-y-3">
                {(item.activationSteps || [
                  'Complete secure payment using your preferred payment method (Crypto, Card, MOMO, PayPal, Wire).',
                  'Receive your official license credentials & redemption voucher immediately on your screen and email.',
                  'Click the secure activation token to link the plan to your Google profile in one tap.',
                  'Enjoy Gemini Advanced and 2TB cloud storage across all your devices instantly.'
                ]).map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed pt-0.5">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Digital delivery is automated: tokens are created in under 60 seconds after checkout.</span>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Common Questions About This License</span>
              </h3>

              <div className="space-y-2.5">
                {(item.faq || [
                  {
                    q: 'How do I activate the 18 months?',
                    a: 'Immediately after checkout, you will receive your digital token and an automated activation guide. You can activate it with a single click on any Google account.'
                  },
                  {
                    q: 'Can I use this internationally?',
                    a: 'Yes, this license works worldwide without any VPN or region restrictions.'
                  },
                  {
                    q: 'What is included in the 18-month warranty?',
                    a: 'Cordevia guarantees full coverage for the complete 18 months with dedicated 24/7 client support and immediate replacement in case of any issues.'
                  }
                ]).map((faqItem, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{faqItem.q}</span>
                    </h5>
                    <p className="text-xs text-slate-300 pl-5 leading-relaxed">
                      {faqItem.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Purchase Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#091022] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">
                  USD (~{(item.price * 600).toLocaleString()} FCFA)
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>One-time payment • No monthly recurring subscription</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuy}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now (${item.price.toFixed(2)})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
