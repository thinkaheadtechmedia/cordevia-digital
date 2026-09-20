import React, { useState } from 'react';
import { MarketplaceItem } from '../types';
import { saveLead } from '../utils/leadCapture';
import { 
  X, 
  Check, 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Building2, 
  Coins, 
  ShieldCheck, 
  DownloadCloud, 
  ArrowRight, 
  Copy, 
  PhoneCall, 
  Lock, 
  AlertCircle,
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';

export type PaymentGateway = 'binance' | 'paypal' | 'card' | 'momo_cm' | 'bank_wire';

interface MarketplacePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: { item: MarketplaceItem; quantity: number }[];
  totalAmount: number;
  discountAmount?: number;
  onSuccess: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const MarketplacePaymentModal: React.FC<MarketplacePaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  discountAmount = 0,
  onSuccess,
  onShowToast,
}) => {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('binance');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  
  // Binance / Crypto state
  const [cryptoAsset, setCryptoAsset] = useState<'USDT' | 'BTC' | 'ETH' | 'BNB'>('USDT');
  const [txHash, setTxHash] = useState('');

  // Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardCountry, setCardCountry] = useState('United States');

  // Cameroon MOMO state
  const [momoOperator, setMomoOperator] = useState<'mtn' | 'orange'>('mtn');
  const [momoPhone, setMomoPhone] = useState('');

  // Bank Deposit state
  const [bankSenderName, setBankSenderName] = useState('');
  const [bankRefCode] = useState(() => `CD-WIRE-${Math.floor(100000 + Math.random() * 900000)}`);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  // Real-time currency conversions
  const XAF_RATE = 600; // 1 USD = 600 FCFA
  const totalInXAF = Math.round(totalAmount * XAF_RATE);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
    onShowToast('Copied to Clipboard!', `${fieldName} has been copied.`, 'success');
  };

  const handleFormatCardNumber = (value: string) => {
    const raw = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < raw.length && i < 16; i += 4) {
      parts.push(raw.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleFormatExpiry = (value: string) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (clean.length >= 2) {
      return `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
    }
    return clean;
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerEmail || !customerEmail.includes('@')) {
      onShowToast('Valid Email Required', 'Please provide a valid email to receive your digital download tokens.', 'info');
      return;
    }

    if (selectedGateway === 'card' && cardNumber.replace(/\s/g, '').length < 15) {
      onShowToast('Card Incomplete', 'Please enter a valid 16-digit card number.', 'info');
      return;
    }

    if (selectedGateway === 'momo_cm' && momoPhone.length < 8) {
      onShowToast('Phone Required', 'Please provide a valid Cameroon MTN or Orange phone number.', 'info');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `CD-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const licenseKey = `CD-LIC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      const completedOrder = {
        orderId,
        licenseKey,
        gateway: selectedGateway,
        amountUSD: totalAmount,
        amountLocal: selectedGateway === 'momo_cm' ? `${totalInXAF.toLocaleString()} FCFA` : `$${totalAmount}`,
        customerEmail,
        customerName: customerName || 'Valued Customer',
        items: items.map(i => `${i.item.name} (x${i.quantity})`),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };

      // Save to centralized Leads & Orders Vault
      saveLead({
        type: 'marketplace_purchase',
        email: customerEmail.trim(),
        name: customerName.trim() || 'Marketplace Buyer',
        source: `market_checkout_${selectedGateway}`,
        details: {
          refCode: orderId,
          message: `Purchased: ${completedOrder.items.join(', ')} via ${selectedGateway.toUpperCase()}. Total: $${totalAmount} USD`,
        },
      });

      setOrderSummary(completedOrder);
      setOrderComplete(true);
      onSuccess();
      onShowToast('Payment Confirmed!', `Order ${orderId} processed via ${selectedGateway.toUpperCase()}.`, 'success');
    }, 1400);
  };

  const handleDownloadAsset = (item: MarketplaceItem, licenseKey: string) => {
    const voucherText = `=================================================================
CORDEVIA DIGITAL STORE - OFFICIAL DIGITAL ASSET & LICENSE VOUCHER
=================================================================
Product: ${item.name}
Category: ${item.category.toUpperCase()}
Unit Price: $${item.price.toFixed(2)} USD
Official License Key: ${licenseKey}
Order Reference: ${orderSummary?.orderId || 'ORD-VERIFIED'}
Issued To: ${customerEmail || 'Valued Client'}
Date Issued: ${new Date().toISOString()}

=================================================================
PRODUCT OVERVIEW & SPECIFICATIONS:
=================================================================
${item.description}
${item.detailedDescription ? '\n' + item.detailedDescription : ''}

DELIVERABLES INCLUDED:
${item.includes.map(inc => `- ${inc}`).join('\n')}

${item.specs && item.specs.length > 0 ? `\nTECHNICAL SPECIFICATIONS:\n` + item.specs.map(s => `• ${s.label}: ${s.value}`).join('\n') : ''}

${item.activationSteps && item.activationSteps.length > 0 ? `\nACTIVATION INSTRUCTIONS:\n` + item.activationSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n') : ''}

=================================================================
WARRANTY & DEDICATED SUPPORT:
=================================================================
Telegram Support: @CordeviaStore / @CordeviaStoreBot
WhatsApp Hotline: +237 671 234 567 / @cordeviadigital
Support Email: support@cordeviadigital.com
Commercial Terms: Full Replacement Warranty & Unlimited Commercial Rights
=================================================================
`;
    const blob = new Blob([voucherText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.name.replace(/[^a-zA-Z0-9]/g, '_')}_License_Voucher.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Voucher Saved', `Downloaded official license voucher for "${item.name}".`, 'success');
  };

  const handleDone = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (!isProcessing) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl bg-[#0B101D] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-cyan-950/40 via-[#0A0E1A] to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800/60 text-cyan-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Cordevia Global Checkout</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  256-Bit SSL
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Accepting Binance, PayPal, Card, Cameroon MOMO (MTN & Orange), and Global Bank Wire.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderComplete && orderSummary ? (
            /* Order Success View */
            <div className="py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-extrabold text-white">
                  Payment Verified & Assets Unlocked!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for your purchase from Cordevia Store. Your official commercial license and digital asset download tokens are ready.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono font-bold text-cyan-400">{orderSummary.orderId}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Payment Gateway:</span>
                  <span className="font-semibold text-white uppercase">{orderSummary.gateway.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Amount Settled:</span>
                  <span className="font-mono font-bold text-emerald-400">{orderSummary.amountLocal}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Delivery Email:</span>
                  <span className="font-medium text-slate-200">{orderSummary.customerEmail}</span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-slate-400 block">Commercial License Key:</span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-300 text-[11px]">
                    <span>{orderSummary.licenseKey}</span>
                    <button
                      onClick={() => handleCopy(orderSummary.licenseKey, 'License Key')}
                      className="text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Download Buttons for Purchased Assets */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="text-xs font-semibold text-slate-300 text-left">
                  Instant Asset Downloads:
                </div>
                {items.map((i, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between text-xs"
                  >
                    <div className="text-left">
                      <div className="font-semibold text-white">{i.item.name}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{i.item.category} • Complete Package</div>
                    </div>
                    <button
                      onClick={() => handleDownloadAsset(i.item, orderSummary.licenseKey)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 flex items-center gap-1.5 transition-colors"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>{i.item.category === 'ai-tools' ? 'Download Voucher' : 'Download'}</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDone}
                className="w-full max-w-md py-3.5 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm rounded-xl hover:opacity-95 shadow-xl shadow-cyan-500/20 transition-transform active:scale-95"
              >
                Close & Return to Store
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleProcessPayment} className="space-y-6">
              
              {/* Order Summary Strip */}
              <div className="p-4 rounded-2xl bg-[#090D18] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Selected Assets ({items.reduce((acc, i) => acc + i.quantity, 0)}):</span>
                  <span className="text-white font-semibold">
                    {items.map(i => i.item.name).join(', ')}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-400 block">Total Due:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-cyan-400 font-mono">
                      ${totalAmount.toFixed(0)} USD
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      (~{totalInXAF.toLocaleString()} FCFA)
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Customer Delivery Information */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span>1. Delivery Details</span>
                  <span className="text-[10px] text-cyan-400 font-normal lowercase">(files & license will be sent here)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Your Name</label>
                    <input
                      type="text"
                      placeholder="Alex Taylor"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Gateway Selection */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  2. Choose Payment Method
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  
                  {/* Binance */}
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('binance')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedGateway === 'binance'
                        ? 'bg-amber-950/30 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Coins className="w-5 h-5 text-amber-400 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-white">Binance Pay</div>
                      <div className="text-[10px] text-amber-400">Crypto / USDT</div>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('paypal')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedGateway === 'paypal'
                        ? 'bg-blue-950/30 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-blue-400 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-white">PayPal</div>
                      <div className="text-[10px] text-blue-400">Global Balance</div>
                    </div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('card')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedGateway === 'card'
                        ? 'bg-cyan-950/30 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-cyan-400 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-white">Debit / Card</div>
                      <div className="text-[10px] text-cyan-400">Visa & Master</div>
                    </div>
                  </button>

                  {/* Cameroon MOMO */}
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('momo_cm')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedGateway === 'momo_cm'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-400 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-white">Cameroon MOMO</div>
                      <div className="text-[10px] text-emerald-400">MTN & Orange</div>
                    </div>
                  </button>

                  {/* Bank Deposit */}
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('bank_wire')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedGateway === 'bank_wire'
                        ? 'bg-purple-950/30 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-purple-400 mb-2" />
                    <div>
                      <div className="font-bold text-xs text-white">Bank Deposit</div>
                      <div className="text-[10px] text-purple-400">SWIFT / Wire</div>
                    </div>
                  </button>

                </div>
              </div>

              {/* 3. Dynamic Gateway Instructions & Form */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                
                {/* BINANCE / CRYPTO DETAILS */}
                {selectedGateway === 'binance' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span>Binance Pay / Direct Crypto Settlement</span>
                      </span>
                      <span className="text-[11px] text-amber-400 font-mono">0% Network Fee</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400 block">Select Crypto Asset:</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(['USDT', 'BTC', 'ETH', 'BNB'] as const).map((coin) => (
                            <button
                              key={coin}
                              type="button"
                              onClick={() => setCryptoAsset(coin)}
                              className={`py-1.5 px-2 rounded-lg text-xs font-bold font-mono transition-colors ${
                                cryptoAsset === coin
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {coin}
                            </button>
                          ))}
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Binance Pay ID:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-amber-300">748392019</span>
                              <button
                                type="button"
                                onClick={() => handleCopy('748392019', 'Binance Pay ID')}
                                className="text-slate-400 hover:text-white"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Pay Nickname:</span>
                            <span className="font-mono text-white">CordeviaPay</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Total Due:</span>
                            <span className="font-mono font-bold text-emerald-400">{totalAmount} USDT</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-slate-400 block">Or USDT (TRC-20) Address:</label>
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] text-slate-300 truncate max-w-[200px]">
                            TFcordeviaUSDT9842109xTRC20Global
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy('TFcordeviaUSDT9842109xTRC20Global', 'USDT TRC20 Address')}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-200"
                          >
                            Copy
                          </button>
                        </div>

                        <div className="space-y-1 pt-1">
                          <label className="text-xs text-slate-300">Your Binance Pay ID / Transaction Hash (optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. 84938210 or 0x9a8f..."
                            value={txHash}
                            onChange={(e) => setTxHash(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAYPAL DETAILS */}
                {selectedGateway === 'paypal' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-blue-400" />
                        <span>PayPal Express & Buyer Protection</span>
                      </span>
                      <span className="text-[11px] text-blue-400">Instant Digital Delivery</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Merchant Account:</span>
                        <span className="font-semibold text-white">payments@cordeviadigital.com</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total in USD:</span>
                        <span className="font-mono font-bold text-blue-400 text-sm">${totalAmount}.00 USD</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        Clicking proceed will authenticate your PayPal session and automatically release your digital download licenses with full PayPal Buyer Protection.
                      </p>
                    </div>
                  </div>
                )}

                {/* CARD DETAILS */}
                {selectedGateway === 'card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-cyan-400" />
                        <span>Credit or Debit Card (Global)</span>
                      </span>
                      <span className="text-[11px] text-cyan-400">Visa • Mastercard • Amex</span>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(handleFormatCardNumber(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 font-mono focus:outline-none focus:border-cyan-500"
                          />
                          <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-3.5 top-3" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-300">Expiration</label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(handleFormatExpiry(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 font-mono text-center focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-300">Security CVC</label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="CVC"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 font-mono text-center focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-1 col-span-2 sm:col-span-1">
                          <label className="text-xs text-slate-300">Country</label>
                          <input
                            type="text"
                            value={cardCountry}
                            onChange={(e) => setCardCountry(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CAMEROON MOMO (MTN & ORANGE) */}
                {selectedGateway === 'momo_cm' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        <span>Cameroon Mobile Money (MTN & Orange Cameroun)</span>
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono">1 USD = 600 FCFA</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      {/* Operator selector */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setMomoOperator('mtn')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            momoOperator === 'mtn'
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>MTN MoMo Cameroon (*126#)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMomoOperator('orange')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            momoOperator === 'orange'
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>Orange Money Cameroun (*150#)</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                          <span className="text-slate-400 block text-[11px]">Merchant Official Number:</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-emerald-400">
                              {momoOperator === 'mtn' ? '+237 674 892 011' : '+237 698 123 456'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(momoOperator === 'mtn' ? '+237674892011' : '+237698123456', 'Merchant Number')}
                              className="text-slate-400 hover:text-white"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block">Name: Cordevia Digital CM</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                          <span className="text-slate-400 block text-[11px]">Amount to Pay (FCFA):</span>
                          <span className="font-mono font-bold text-xl text-white">
                            {totalInXAF.toLocaleString()} XAF
                          </span>
                          <span className="text-[10px] text-slate-500 block">Instant automated license unlock</span>
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1 pt-1">
                        <label className="text-xs text-slate-300 font-medium">Your Cameroon Mobile Money Number *</label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+237 6XX XXX XXX"
                            value={momoPhone}
                            onChange={(e) => setMomoPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 font-mono focus:outline-none focus:border-emerald-500"
                          />
                          <PhoneCall className="w-3.5 h-3.5 text-slate-500 absolute right-3.5 top-3" />
                        </div>
                        <p className="text-[10px] text-slate-400">
                          You will receive a USSD payment prompt on your phone ({momoOperator === 'mtn' ? '*126#' : '*150#'}) to approve {totalInXAF.toLocaleString()} FCFA.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* BANK WIRE DETAILS */}
                {selectedGateway === 'bank_wire' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <span>Direct Bank Wire / SWIFT / ACH (Global)</span>
                      </span>
                      <span className="text-[11px] text-purple-400">Commercial Invoicing</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Beneficiary Name:</span>
                          <span className="font-bold text-white">Cordevia Digital LLC</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Bank:</span>
                          <span className="text-white">JPMorgan Chase / Silicon Valley Bank</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-2 border-b border-slate-800 font-mono text-[11px]">
                        <div>
                          <span className="text-slate-400 block font-sans text-[10px]">SWIFT / BIC:</span>
                          <span className="text-cyan-300">CHASUS33</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans text-[10px]">Routing (ABA):</span>
                          <span className="text-cyan-300">121000248</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans text-[10px]">Account No:</span>
                          <span className="text-cyan-300">98402918471</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-800/40 flex items-center justify-between">
                        <div>
                          <span className="text-purple-300 block text-[10px] font-semibold">Payment Wire Reference:</span>
                          <span className="font-mono font-bold text-white text-xs">{bankRefCode}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bankRefCode, 'Bank Reference Code')}
                          className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 rounded text-[11px] text-purple-200"
                        >
                          Copy
                        </button>
                      </div>

                      <div className="space-y-1 pt-1">
                        <label className="text-xs text-slate-300">Sender Account Name</label>
                        <input
                          type="text"
                          placeholder="Name on your corporate or personal bank account"
                          value={bankSenderName}
                          onChange={(e) => setBankSenderName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Transaction & Generating Digital Tokens...</span>
                  ) : (
                    <>
                      <span>
                        Complete Payment (${totalAmount.toFixed(0)} USD
                        {selectedGateway === 'momo_cm' && ` • ${totalInXAF.toLocaleString()} FCFA`}
                        )
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center flex-wrap">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Commercial Unlimited License</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Instant Digital Token Unlock</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Buyer Guarantee</span>
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
