import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { saveLead } from '../utils/leadCapture';

interface NewsletterSignupProps {
  variant?: 'footer' | 'card' | 'inline';
  source?: string;
  articleTitle?: string;
  onShowToast?: (title: string, message: string, type: 'success' | 'info') => void;
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'footer',
  source = 'website_newsletter',
  articleTitle,
  onShowToast,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!validateEmail(cleanEmail)) {
      if (onShowToast) {
        onShowToast('Valid Email Required', 'Please enter a valid work or corporate email address.', 'info');
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate network latency for authentic feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Save permanently to the leads vault
    saveLead({
      type: 'newsletter',
      email: cleanEmail,
      source: source,
      details: {
        articleTitle: articleTitle || undefined,
      },
    });

    setConfirmedEmail(cleanEmail);
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail('');

    if (onShowToast) {
      onShowToast(
        'Subscription Confirmed!',
        'Your email has been registered to receive weekly media-tech dispatches.',
        'success'
      );
    }
  };

  if (variant === 'card') {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0C1222] via-[#0E162B] to-[#0A101D] border border-cyan-500/30 shadow-2xl relative overflow-hidden ${className}`}>
        <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cordevia Velocity Dispatch</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Want algorithm teardowns like this every Tuesday?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Join 14,000+ digital creators and engineering leaders. Receive exclusive YouTube CTR test results, Google Core update analyses, and SEO playbooks directly in your inbox.
          </p>

          {isSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">Welcome aboard!</span> A confirmation has been registered for <strong className="text-emerald-300">{confirmedEmail}</strong>.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 shrink-0 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Dispatch</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Zero spam. Unsubscribe in 1-click anytime. No third-party data trading.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Footer or inline variant
  return (
    <div className={`w-full ${className}`}>
      {isSubscribed ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-semibold text-white text-sm">You are subscribed!</div>
            <div className="text-xs text-slate-300">
              Dispatches will be delivered to <span className="text-emerald-300 font-mono">{confirmedEmail}</span>.
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="Enter your executive work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-5 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-cyan-500/20 shrink-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pl-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Weekly high-signal media-tech insights. 100% privacy protected.</span>
          </div>
        </form>
      )}
    </div>
  );
};
