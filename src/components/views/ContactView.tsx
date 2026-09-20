import React, { useState } from 'react';
import { ViewTab } from '../../types';
import { BRAND_INFO } from '../../data/brandData';
import { saveLead } from '../../utils/leadCapture';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  Bot,
  Music2
} from 'lucide-react';

interface ContactViewProps {
  initialService?: string;
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialService = '',
  onNavigate,
  onShowToast,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ['YouTube Management & Channel Growth']
  );
  const [budget, setBudget] = useState<string>('$3,000 - $6,000/mo');
  const [timeline, setTimeline] = useState<string>('Immediately (Next 1-2 weeks)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const availableServices = [
    'YouTube Management & Channel Growth',
    'High-Performance Web Design & Dev',
    'Algorithmic SEO & Search Dominance',
    'Social Media Omnichannel Scale',
    'Brand Identity & Visual Design',
    'Cloud, Automation & IT Solutions',
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      onShowToast('Missing Fields', 'Please provide your name and email address.', 'info');
      return;
    }

    const generatedCode = `CD-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedCode);
    
    // Save to the central Leads Vault so the owner can catch all submissions
    saveLead({
      type: 'contact_inquiry',
      email: email.trim(),
      name: name.trim(),
      source: 'contact_proposal_intake',
      details: {
        services: selectedServices,
        budget,
        timeline,
        company: company.trim(),
        website: website.trim(),
        message: message.trim(),
        refCode: generatedCode,
      },
    });

    setIsSubmitted(true);
    onShowToast('Proposal Request Dispatched!', `Reference ${generatedCode} assigned to your discovery briefing.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Strategic Partnership Intake</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Initiate Your Cordevia Digital Architecture Brief
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Tell us about your audience goals, web bottlenecks, or organic ranking targets. Our senior partners review all inquiries within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info & Office details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-7 rounded-3xl bg-[#0B101D] border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Direct Executive Channels</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">General Inquiries</span>
                  <a href={`mailto:${BRAND_INFO.email}`} className="text-white hover:text-cyan-400 font-semibold transition-colors">
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Project Proposals</span>
                  <a href={`mailto:${BRAND_INFO.inquiriesEmail}`} className="text-white hover:text-teal-400 font-semibold transition-colors">
                    {BRAND_INFO.inquiriesEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Direct Line</span>
                  <span className="text-white font-semibold">{BRAND_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Headquarters</span>
                  <span className="text-slate-300 leading-relaxed">{BRAND_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Social Media & Telegram Channels */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0E1526] to-[#0A0F1D] border border-cyan-900/40 space-y-3">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Social Handles</span>
                <span className="text-cyan-400 font-mono text-[11px]">@cordeviadigital</span>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="https://instagram.com/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                  title="Instagram @cordeviadigital"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com/@cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                  title="YouTube @cordeviadigital"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                  title="Facebook @cordeviadigital"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com/@cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                  title="TikTok @cordeviadigital"
                >
                  <Music2 className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/message/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  title="WhatsApp @cordeviadigital"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-1 flex flex-col gap-1.5 text-xs">
                <a
                  href="https://t.me/CordeviaStore"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-900/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Telegram Store</span>
                  </span>
                  <span className="font-mono font-bold text-[11px]">@CordeviaStore</span>
                </a>
                <a
                  href="https://t.me/CordeviaStoreBot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-teal-950/40 border border-teal-800/40 text-teal-300 hover:bg-teal-900/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-teal-400" />
                    <span>Telegram Store Bot</span>
                  </span>
                  <span className="font-mono font-bold text-[11px]">CordeviaStoreBot</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Rapid SLA Guarantee</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Guaranteed response within 24 business hours. No junior account handlers — you speak directly with senior growth practitioners.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Proposal Request Form */}
        <div className="lg:col-span-8">
          <div className="p-7 sm:p-10 rounded-3xl bg-[#0B101E] border border-cyan-500/30 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Brief Received</span>
                  <h3 className="text-2xl font-bold text-white">Proposal Dispatched Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. Your project dossier has been registered under reference <span className="font-mono text-cyan-300 font-bold">{refCode}</span>.
                  </p>
                </div>

                <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Partner:</span>
                    <span className="text-white font-semibold">Julian Cordevia & Alex Vance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Response:</span>
                    <span className="text-emerald-400">Within 24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Scope:</span>
                    <span className="text-cyan-300 truncate max-w-[200px]">{selectedServices.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Services Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    1. Capabilities Required (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-950/80 border-cyan-400 text-white font-semibold shadow-sm'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate pr-2">{srv}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-bold' : 'border-slate-700'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      2. Approximate Monthly Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>$1,500 - $3,000 / mo</option>
                      <option>$3,000 - $6,000 / mo</option>
                      <option>$6,000 - $12,000 / mo</option>
                      <option>$12,000+ / mo (Enterprise Dedicated)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      3. Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>Immediately (Next 1-2 weeks)</option>
                      <option>Within 30 Days</option>
                      <option>Next Quarter</option>
                      <option>Exploring Options</option>
                    </select>
                  </div>
                </div>

                {/* 3. Contact & Company Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Company / YouTube Channel Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Media or ApexTech"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-semibold">Website or Channel URL</label>
                    <input
                      type="text"
                      placeholder="https://youtube.com/@channel or https://company.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* 4. Project description */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold">Project Scope & Primary Growth Bottleneck</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your target KPIs, current subscriber or traffic numbers, or specific deliverable needs..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all transform active:scale-95"
                >
                  <span>Transmit Strategy Brief to Partners</span>
                  <Send className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Strict Non-Disclosure Guarantee • Your IP & Channel Analytics are 100% Confidential</span>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
