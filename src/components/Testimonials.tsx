import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab } from '../types';
import { TESTIMONIALS } from '../data/brandData';
import { 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Search, 
  Youtube, 
  Layout, 
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface TestimonialsProps {
  onNavigate: (tab: ViewTab) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Verified Proof', icon: Award },
    { id: 'SEO & Organic Search', label: 'SEO & Search Dominance', icon: Search },
    { id: 'YouTube Management', label: 'YouTube Scale', icon: Youtube },
    { id: 'Web Engineering & CRO', label: 'Web & Conversion', icon: Layout },
    { id: 'Omnichannel Scale', label: 'Global eCommerce & Systems', icon: Globe2 },
  ];

  const filtered = TESTIMONIALS.filter((t) => {
    if (selectedFilter === 'all') return true;
    return t.category === selectedFilter;
  });

  return (
    <section className="space-y-12">
      {/* Header & Trust Proposition */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Proven Client Social Proof & ROI Verification</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          How We Drive First-Page Rankings & Explosive Growth
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Real metrics from enterprise software brands, high-velocity creators, and global eCommerce businesses that rely on Cordevia Digital for search engine domination and media engineering.
        </p>
      </div>

      {/* Aggregate Trust Numbers Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0E1526] to-[#0A0F1D] border border-cyan-900/30 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
            320+
          </div>
          <div className="text-xs font-medium text-slate-300">Google Top 3 Rankings</div>
          <div className="text-[10px] text-slate-500">High-intent buyer keywords</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0E1526] to-[#0A0F1D] border border-teal-900/30 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300 font-mono">
            75M+
          </div>
          <div className="text-xs font-medium text-slate-300">Views Engineered</div>
          <div className="text-[10px] text-slate-500">Across 180+ managed channels</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0E1526] to-[#0A0F1D] border border-cyan-900/30 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 font-mono">
            315%
          </div>
          <div className="text-xs font-medium text-slate-300">Average Client ROI Lift</div>
          <div className="text-[10px] text-slate-500">Documented across 28 countries</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0E1526] to-[#0A0F1D] border border-emerald-900/30 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
            98.6%
          </div>
          <div className="text-xs font-medium text-slate-300">Client Retention Rate</div>
          <div className="text-[10px] text-slate-500">Sustained quarterly retainers</div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Testimonials Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((t, idx) => (
            <motion.div
              layout
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0D1424] to-[#080D18] border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl relative group"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{t.category}</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Primary Metric Pill */}
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-sm">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span>{t.resultMetric}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    {t.resultDetail}
                  </div>
                </div>

                {/* Scope Tag */}
                <div className="text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider">
                  Scope: {t.projectScope}
                </div>

                {/* Client Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-md shadow-cyan-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{t.name}</span>
                      {t.verified && (
                        <span title="Verified Client Engagement">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {t.role}, <strong className="text-slate-300 font-medium">{t.company}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">{t.year}</div>
                  <div className="text-[10px] text-slate-400">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Callout Footer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-teal-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-base sm:text-lg font-bold text-white">
            Ready to become our next documented growth case study?
          </div>
          <div className="text-xs text-slate-400">
            Book an algorithmic architecture audit. We pinpoint the exact keywords and traffic bottlenecks limiting your scale.
          </div>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 hover:opacity-95 shadow-lg shadow-cyan-500/20 shrink-0 transition-transform active:scale-95"
        >
          <span>Schedule Strategy Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
