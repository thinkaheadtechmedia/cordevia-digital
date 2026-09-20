import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewTab } from '../../types';
import { SERVICES, CASE_STUDIES, BRAND_INFO, TESTIMONIALS, FAQS } from '../../data/brandData';
import { Testimonials } from '../Testimonials';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Youtube, 
  Layout, 
  Search, 
  ShieldCheck, 
  Zap, 
  Check, 
  ChevronRight, 
  BarChart3, 
  Layers, 
  Clock, 
  Award,
  Play
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onShowToast }) => {
  // Interactive mini calculator state on homepage
  const [calcSubscribers, setCalcSubscribers] = useState(25000);
  const [calcMonthlyVideos, setCalcMonthlyVideos] = useState(8);
  const [calcNiche, setCalcNiche] = useState<'tech' | 'finance' | 'lifestyle' | 'gaming'>('tech');

  // Interactive FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Calculate estimated YouTube ROI
  const cpmMap = { tech: 12, finance: 24, lifestyle: 7, gaming: 5 };
  const estimatedViewsPerVideo = calcSubscribers * 0.45;
  const totalMonthlyViews = estimatedViewsPerVideo * calcMonthlyVideos;
  const projectedRevenue = ((totalMonthlyViews / 1000) * cpmMap[calcNiche]).toFixed(0);
  const projectedBrandDeals = ((Number(projectedRevenue) * 1.6)).toFixed(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background glow flares */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" 
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 max-w-4xl mx-auto relative z-10"
        >
          {/* Identity Pill Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>The New Era: Tarana Group is now Cordevia Digital</span>
              <span className="text-slate-500">•</span>
              <span className="text-teal-300">Media-Tech Authority</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            We Engineer Exponential <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Media-Tech Scale
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Cordevia Digital combines data-backed YouTube channel management, high-converting web architecture, and algorithmic SEO to transform modern brands into industry category leaders.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 hover:opacity-95 hover:shadow-cyan-500/40 transition-all transform active:scale-95"
            >
              <span>Build Your Growth Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore Capabilities</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </motion.div>

          {/* Micro trust indicators */}
          <motion.div variants={itemVariants} className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Full IP Ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-teal-400" />
              <span>Sub-48hr Rapid Sprint Onboarding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>180+ Channels & Brands Scaled</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Live Agency Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto"
        >
          {BRAND_INFO.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-4 rounded-2xl bg-[#0C1220]/80 border border-slate-800/80 backdrop-blur-sm text-center space-y-1 hover:border-cyan-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Impact Across the Entire Digital Lifecycle
          </h2>
          <p className="text-sm text-slate-400">
            From video virality to technical indexation and high-conversion web development, we provide the full-stack media-tech foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0F1A] border transition-all duration-300 flex flex-col justify-between ${
                  service.popular 
                    ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/10' 
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                    High Demand
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-teal-400 font-medium mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{service.metrics.label}:</span>
                    <span className="font-bold text-emerald-400 font-mono">{service.metrics.value}</span>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs text-slate-300">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Starting at</span>
                    <span className="text-lg font-bold text-white font-mono">${service.pricing.starter}</span>
                    <span className="text-[10px] text-slate-500">/mo</span>
                  </div>
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-800 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center gap-1"
                  >
                    <span>View Tiers</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Growth & ROI Estimator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C1424] via-[#0A0E1A] to-[#070B14] border border-cyan-500/30 shadow-2xl relative overflow-hidden"
        >
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Interactive Growth Simulator</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Estimate Your YouTube Channel Yield with Cordevia Media Engine
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  See how optimizing audience retention, thumbnail CTR, and sponsorship integrations transforms monthly cash flow.
                </p>
              </div>

              {/* Slider 1: Subscribers */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Current Subscribers</span>
                  <span className="text-cyan-400 font-mono font-bold">{calcSubscribers.toLocaleString()} subs</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="500000"
                  step="2000"
                  value={calcSubscribers}
                  onChange={(e) => setCalcSubscribers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider 2: Monthly Uploads */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Monthly Upload Schedule</span>
                  <span className="text-teal-400 font-mono font-bold">{calcMonthlyVideos} videos / month</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={calcMonthlyVideos}
                  onChange={(e) => setCalcMonthlyVideos(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Niche Selector */}
              <div className="space-y-2">
                <span className="text-xs text-slate-300 font-medium block">Select Channel Vertical</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'tech', label: 'Tech & AI', cpm: '$12 CPM' },
                    { id: 'finance', label: 'Finance & B2B', cpm: '$24 CPM' },
                    { id: 'lifestyle', label: 'Lifestyle', cpm: '$7 CPM' },
                    { id: 'gaming', label: 'Gaming', cpm: '$5 CPM' },
                  ].map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => setCalcNiche(niche.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        calcNiche === niche.id
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-sm'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">{niche.label}</div>
                      <div className="text-[10px] text-cyan-400/80 font-mono">{niche.cpm}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Projection Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0D18] border border-cyan-500/40 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Projected Monthly Revenue Run-Rate
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-mono mt-1">
                  ${(Number(projectedRevenue) + Number(projectedBrandDeals)).toLocaleString()}
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ mo</span>
                </div>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  ↑ Includes AdSense + Integrated Sponsor Deals
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Estimated Monthly Views:</span>
                  <span className="font-mono font-bold text-white">{Math.round(totalMonthlyViews).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Projected AdSense Payout:</span>
                  <span className="font-mono font-bold text-cyan-400">${Number(projectedRevenue).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Curated Brand Sponsorships:</span>
                  <span className="font-mono font-bold text-teal-400">${Number(projectedBrandDeals).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Cordevia Channel Velocity Lift:</span>
                  <span className="font-mono font-bold text-emerald-400">+315% Avg</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onShowToast('Simulator Configured!', 'Opening consultation with your growth projections pre-loaded.', 'success');
                  onNavigate('contact');
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-cyan-500/20"
              >
                <span>Unlock This Growth Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Featured Case Studies Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800/50 text-teal-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Proven Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Transformative Client Breakthroughs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm inline-flex items-center gap-1.5 self-start"
          >
            <span>Explore Agency Services & Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-[#0B101C] border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 font-semibold">
                    {study.category}
                  </span>
                  <span className="text-slate-500 font-mono">{study.timeline}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {study.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {study.summary}
                </p>

                {/* Metrics Highlight Box */}
                <div className="space-y-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  {study.results.map((r, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{r.metric}:</span>
                      <span className="font-bold text-emerald-400 font-mono">{r.increase}</span>
                    </div>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <div className="p-3 bg-cyan-950/20 border-l-2 border-cyan-400 rounded-r-lg text-xs italic text-slate-300">
                  "{study.testimonial.quote}"
                  <div className="text-[10px] text-slate-400 font-sans not-italic mt-1">
                    — {study.testimonial.author}, {study.testimonial.company}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{study.clientName}</span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Inquire for Similar Results</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials & Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials onNavigate={onNavigate} />
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about partnering with Cordevia Digital.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-950 via-[#0A1222] to-teal-950 border border-cyan-500/40 shadow-2xl text-center space-y-6 overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              Start Your Evolution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Accelerate with Cordevia Digital?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an executive growth architecture review within 24 hours. No boilerplate sales pitches — pure strategic analysis.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity"
              >
                Schedule Strategy Architecture Call
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm rounded-xl hover:bg-slate-800 transition-colors"
              >
                Explore Agency Services
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

