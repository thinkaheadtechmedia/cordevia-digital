import React, { useState } from 'react';
import { CartItem } from '../types';
import { MarketplacePaymentModal } from './MarketplacePaymentModal';
import { X, Trash2, ArrowRight, ShieldCheck, DownloadCloud, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQuantity,
  onClear,
  onShowToast,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'CORDEVIA20' || code === 'GROWTH20') {
      setDiscount(20);
      onShowToast('Promo Code Applied!', '20% discount applied to your order.', 'success');
    } else if (code === 'CORDEVIA10') {
      setDiscount(10);
      onShowToast('Promo Code Applied!', '10% discount applied to your order.', 'success');
    } else {
      onShowToast('Invalid Code', 'Try using code "CORDEVIA20" for 20% off.', 'info');
    }
  };

  const handleOpenPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    onClear();
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClear();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-[#0D1322] border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">Your Cordevia Vault</span>
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded-full font-semibold">
              {cart.reduce((total, i) => total + i.quantity, 0)} Items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 rounded-full mx-auto flex items-center justify-center">
                <DownloadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                Thank you for choosing Cordevia Digital. Your digital assets, templates, and access tokens are ready for instant download.
              </p>
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-left space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono text-cyan-400">CD-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery:</span>
                  <span className="text-emerald-400">Instant Digital Access</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License:</span>
                  <span className="text-white">Commercial Unlimited</span>
                </div>
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold rounded-xl hover:opacity-95 transition-opacity"
              >
                Return to Cordevia Hub
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-500 border border-slate-800">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-white">Your cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our digital kits, technical SEO audits, and production systems in the Marketplace.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {cartItem.item.name}
                    </h4>
                    <span className="text-xs text-slate-400 capitalize block mt-0.5">
                      {cartItem.item.category} • Instant Download
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-cyan-400">
                        ${cartItem.item.price * cartItem.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(cartItem.item.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo (use CORDEVIA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {!isSuccess && cart.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-[#0A0E18] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Special Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-cyan-400 text-base font-mono">${total.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={handleOpenPayment}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-cyan-500/20"
            >
              <span>Proceed to Payment (${total.toFixed(0)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Commercial License • 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        )}
      </div>

      {/* Global Multi-Gateway Payment Modal */}
      <MarketplacePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        items={cart}
        totalAmount={total}
        discountAmount={discountAmount}
        onSuccess={handlePaymentSuccess}
        onShowToast={onShowToast}
      />
    </div>
  );
};
