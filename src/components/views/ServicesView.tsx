import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab, ServiceItem } from '../../types';
import { SERVICES } from '../../data/brandData';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Youtube, 
  Layout, 
  Search, 
  Layers, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (tab: ViewTab) => void;
  onSelectServiceForContact: (serviceId: string) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onSelectServiceForContact,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'youtube', label: 'YouTube Management' },
    { id: 'web', label: 'Web Design & Dev' },
    { id: 'seo', label: 'Algorithmic SEO' },
    { id: 'social', label: 'Social Media' },
    { id: 'branding', label: 'Brand Identity' },
    { id: 'tech', label: 'IT & Cloud Automation' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const discountMultiplier = pricingCycle === 'quarterly' ? 0.85 : 1.0;

  const handleBookService = (service: ServiceItem, tierName: string) => {
    onSelectServiceForContact(`${service.title} (${tierName.toUpperCase()} Tier)`);
    onShowToast('Service Pre-Selected', `Configured ${service.title} in proposal request.`, 'info');
    onNavigate('contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cordevia Media-Tech Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Precision Capabilities Built for Quantifiable Scale
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore our specialized agency services with transparent pricing tiers, clear deliverable matrices, and senior media-tech execution.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cycle Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setPricingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
              pricingCycle === 'monthly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Retainer
          </button>
          <button
            onClick={() => setPricingCycle('quarterly')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              pricingCycle === 'quarterly' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Quarterly Sprint</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">15% OFF</span>
          </button>
        </div>
      </motion.div>

      {/* Services List */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, serviceIdx) => {
            const Icon = {
              Youtube: Youtube,
              Layout: Layout,
              Search: Search,
              Share2: Layers,
              Sparkles: Sparkles,
              Cpu: Zap,
            }[service.iconName] || Zap;

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: serviceIdx * 0.06, ease: "easeOut" }}
                className="p-6 sm:p-8 rounded-3xl bg-[#0B101D] border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-8"
              >
                {/* Top Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h2>
                        {service.popular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold uppercase">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-teal-400 font-medium mt-0.5">{service.tagline}</p>
                      <p className="text-xs text-slate-400 mt-2 max-w-2xl leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">{service.metrics.label}</span>
                      <span className="text-xl font-extrabold text-emerald-400 font-mono">{service.metrics.value}</span>
                    </div>
                  </div>
                </div>

                {/* Three Tiers for this Service */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Starter Tier */}
                  <motion.div 
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Sprint</span>
                        <span className="text-[11px] text-slate-500">Early Traction</span>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white font-mono">
                          ${Math.round(service.pricing.starter * discountMultiplier).toLocaleString()}
                          <span className="text-xs font-sans text-slate-400 font-normal">/{pricingCycle === 'quarterly' ? 'mo (billed qtr)' : 'mo'}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Essential core setup & initial momentum.</p>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                        {service.deliverables.slice(0, 3).map((deliv, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2 text-slate-500 line-through">
                          <span>Advanced cohort heatmaps</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleBookService(service, 'Starter')}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                    >
                      Select Starter Tier
                    </button>
                  </motion.div>

                  {/* Growth Tier (Recommended) */}
                  <motion.div 
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-gradient-to-b from-[#0F172B] to-[#0A101E] border-2 border-cyan-500/60 flex flex-col justify-between space-y-5 shadow-lg shadow-cyan-500/10 relative"
                  >
                    <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      Recommended
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Growth Velocity</span>
                        <span className="text-[11px] text-teal-400 font-medium">Aggressive Scale</span>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 font-mono">
                          ${Math.round(service.pricing.growth * discountMultiplier).toLocaleString()}
                          <span className="text-xs font-sans text-slate-400 font-normal">/{pricingCycle === 'quarterly' ? 'mo (billed qtr)' : 'mo'}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">Comprehensive execution for rapid market capture.</p>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-200 pt-2 border-t border-cyan-900/40">
                        {service.deliverables.slice(0, 5).map((deliv, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                        {service.features.slice(0, 2).map((feat, i) => (
                          <li key={`f-${i}`} className="flex items-start gap-2 text-teal-300">
                            <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleBookService(service, 'Growth')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-xs font-black hover:opacity-95 transition-opacity shadow-md shadow-cyan-500/20"
                    >
                      Select Growth Velocity
                    </button>
                  </motion.div>

                  {/* Enterprise Tier */}
                  <motion.div 
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise Dedicated</span>
                        <span className="text-[11px] text-slate-500">Market Dominance</span>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white font-mono">
                          ${Math.round(service.pricing.enterprise * discountMultiplier).toLocaleString()}
                          <span className="text-xs font-sans text-slate-400 font-normal">/{pricingCycle === 'quarterly' ? 'mo (billed qtr)' : 'mo'}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Full-suite dedicated media-tech pod.</p>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                        {service.deliverables.map((deliv, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2 text-cyan-300 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>Dedicated Slack Connect & 24/7 SLA</span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleBookService(service, 'Enterprise')}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                    >
                      Inquire for Enterprise
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* SLA & Engagement Promise */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        <div className="space-y-2">
          <Clock className="w-6 h-6 text-cyan-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">48-Hour Rapid Deployment</h4>
          <p className="text-xs text-slate-400">We don't waste weeks on administrative bureaucracy. Kickoff sprint initiates in 48 hours.</p>
        </div>
        <div className="space-y-2">
          <ShieldCheck className="w-6 h-6 text-teal-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Absolute IP & Code Ownership</h4>
          <p className="text-xs text-slate-400">You own 100% of all code, Figma design files, thumbnails, and copy produced by Cordevia.</p>
        </div>
        <div className="space-y-2">
          <Zap className="w-6 h-6 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Zero Lock-In Guarantee</h4>
          <p className="text-xs text-slate-400">Monthly retainers can be adjusted or paused anytime with a standard 30-day notice.</p>
        </div>
      </motion.div>

    </div>
  );
};

