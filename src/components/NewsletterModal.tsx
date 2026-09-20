import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Lock, 
  Check, 
  ArrowRight,
  BellRing
} from 'lucide-react';
import { saveLead } from '../utils/leadCapture';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (title: string, message: string, type: 'success' | 'info') => void;
  source?: string;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  source = 'retention_modal',
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Algorithmic SEO',
    'YouTube Systems',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const topicsList = [
    'Algorithmic SEO',
    'YouTube Systems',
    'Web Core Vitals',
    'GEO & AI Search',
    'Conversion Engineering',
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      if (onShowToast) {
        onShowToast('Valid Email Required', 'Please enter a valid work or personal email address.', 'info');
      }
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    saveLead({
      type: 'newsletter',
      email: cleanEmail,
      name: name.trim() || undefined,
      source,
      details: {
        subscriberName: name.trim() || undefined,
        interests: selectedTopics,
      },
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    if (onShowToast) {
      onShowToast(
        'Subscription Confirmed!',
        'You are officially on the priority list for Cordevia Velocity dispatches.',
        'success'
      );
    }
  };

  const handleDismiss = () => {
    onClose();
    if (typeof window !== 'undefined') {
      localStorage.setItem('cordevia_newsletter_dismissed', Date.now().toString());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={handleDismiss} 
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0C1222] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-500/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Welcome to the Inner Circle
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Confirmation sent to <strong className="text-cyan-300 font-mono">{email}</strong>. Every Tuesday morning, you will receive our freshest algorithmic tests and search playbooks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <BellRing className="w-3.5 h-3.5" />
                <span>What happens next:</span>
              </div>
              <p className="text-slate-400 pl-5">
                • Zero spam. 1-click unsubscribe anytime.
              </p>
              <p className="text-slate-400 pl-5">
                • Curated topics: <span className="text-slate-200">{selectedTopics.join(', ') || 'All topics'}</span>
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20"
            >
              Back to Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header Badge & Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Audience Retention & Growth Dispatch</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Never Miss an Algorithm Shift
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join 14,000+ digital founders and engineering leaders. Receive battle-tested search teardowns, YouTube retention blueprints, and conversion research directly in your inbox.
              </p>
            </div>

            {/* Topic Chips */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Select your intelligence priorities:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {topicsList.map((topic) => {
                  const isChecked = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm'
                          : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-cyan-400" />}
                      <span>{topic}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Dispatch...</span>
                ) : (
                  <>
                    <span>Claim Free Weekly Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Zero spam guarantee. 100% privacy respected. 1-click unsubscribe.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
