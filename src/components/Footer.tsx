import React, { useState, useEffect } from 'react';
import { ViewTab } from '../types';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/brandData';
import { NewsletterSignup } from './NewsletterSignup';
import { LeadsVaultModal } from './LeadsVaultModal';
import { getStoredLeads } from '../utils/leadCapture';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Shield, 
  CheckCircle2, 
  ArrowUpRight, 
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  Bot,
  Music2,
  Database,
  Lock
} from 'lucide-react';
import { downloadAsset } from '../utils/downloadHelper';
import { useAdminAuth } from '../utils/useAdminAuth';
import { AdminLoginModal } from './AdminLoginModal';

interface FooterProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
  onOpenAvatarModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast, onOpenAvatarModal }) => {
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);

  useEffect(() => {
    setLeadsCount(getStoredLeads().length);
    const handleLeadsUpdated = (e: Event) => {
      const custom = e as CustomEvent<{ count: number }>;
      setLeadsCount(custom.detail?.count ?? getStoredLeads().length);
    };
    window.addEventListener('cordevia_leads_updated', handleLeadsUpdated);
    return () => window.removeEventListener('cordevia_leads_updated', handleLeadsUpdated);
  }, []);

  const handleNav = (tab: ViewTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060911] border-t border-slate-800 text-slate-400 text-sm">
      {/* Top CTA & Newsletter Section */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-semibold">
                <span>Cordevia Velocity Dispatch</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to dominate search rankings and audience algorithms?
              </h3>
              <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                Join 14,000+ digital founders, media creators, and marketing executives receiving our weekly teardown of search updates, YouTube algorithms, and conversion engineering.
              </p>
            </div>

            <div className="lg:col-span-5">
              <NewsletterSignup
                variant="footer"
                source="footer_main"
                onShowToast={onShowToast}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Cordevia Digital is a premier media-tech agency delivering exponential audience growth, high-converting digital platforms, algorithmic SEO, and bespoke brand architecture.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">{BRAND_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">{BRAND_INFO.address}</span>
              </div>
            </div>

            {/* Social Media & Instant Channels */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span>Follow <strong className="text-cyan-400">@cordeviadigital</strong></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <a 
                  href="https://instagram.com/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                  aria-label="Instagram @cordeviadigital"
                  title="Instagram @cordeviadigital"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com/@cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                  aria-label="YouTube @cordeviadigital"
                  title="YouTube @cordeviadigital"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                  aria-label="Facebook @cordeviadigital"
                  title="Facebook @cordeviadigital"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com/@cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors"
                  aria-label="TikTok @cordeviadigital"
                  title="TikTok @cordeviadigital"
                >
                  <Music2 className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/message/cordeviadigital" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  aria-label="WhatsApp @cordeviadigital"
                  title="WhatsApp @cordeviadigital"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              {/* Telegram Channel & Telegram Store Bot */}
              <div className="pt-1 flex flex-col gap-1.5">
                <a
                  href="https://t.me/CordeviaStore"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-900/40 text-xs transition-colors group"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Telegram: <strong>@CordeviaStore</strong></span>
                </a>
                <a
                  href="https://t.me/CordeviaStoreBot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-teal-950/40 border border-teal-800/40 text-teal-300 hover:bg-teal-900/40 text-xs transition-colors group"
                >
                  <Bot className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
                  <span>Store Bot: <strong>CordeviaStoreBot</strong></span>
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  YouTube Channel Management
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  High-Performance Web Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  Algorithmic SEO & SERP Scale
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  Social Media Scale & Content
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  Brand Identity & Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors">
                  Agency Services & Retainers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-cyan-400 transition-colors">
                  SEO Blog & Tech Insights
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('marketplace')} className="hover:text-cyan-400 transition-colors">
                  Digital Marketplace & Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-400 transition-colors">
                  About Cordevia Digital
                </button>
              </li>
              {/* Admin-Only: Social Media Avatar Studio & Zip Pack */}
              {isAdmin && onOpenAvatarModal && (
                <li>
                  <button 
                    onClick={onOpenAvatarModal} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>Social Media Avatar Studio</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">Admin</span>
                  </button>
                </li>
              )}
              {isAdmin && (
                <li>
                  <button 
                    onClick={async () => {
                      onShowToast('Downloading Package', 'cordevia-profile-pictures.zip is downloading...', 'info');
                      const ok = await downloadAsset('/cordevia-profile-pictures.zip', 'cordevia-profile-pictures.zip');
                      if (ok) {
                        onShowToast('Download Complete', 'Saved cordevia-profile-pictures.zip to Downloads folder.', 'success');
                      }
                    }}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Download Avatar Pack (.ZIP)</span>
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">Admin</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">SEO & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('seo-console')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>XML Sitemap & Search Console</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy (AdSense Compliant)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('disclosure')} className="hover:text-cyan-400 transition-colors">
                  Ad & Cookie Policy Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dmca')} className="hover:text-cyan-400 transition-colors">
                  DMCA Copyright Notice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('cordevia_open_cookie_settings'))} 
                  className="hover:text-cyan-400 transition-colors text-slate-400"
                >
                  Manage Cookie Settings
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Identity Bar */}
      <div className="border-t border-slate-800/80 bg-[#05070D] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2019–{new Date().getFullYear()} Cordevia Digital LLC. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-slate-400">Precision Media-Tech Agency.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={() => handleNav('seo-console')} className="hover:text-cyan-400 font-mono text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>sitemap.xml</span>
            </button>
            <button onClick={() => handleNav('privacy')} className="hover:text-cyan-400">Privacy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-cyan-400">Terms</button>
            <button onClick={() => handleNav('disclosure')} className="hover:text-cyan-400">Ad Disclosure</button>
            <button onClick={() => handleNav('dmca')} className="hover:text-cyan-400">DMCA</button>
            
            {/* Leads Vault - Restricted to Admins */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLeadsModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 transition-colors shadow-sm"
                  title="Open captured client proposals & subscriber leads vault (Admin Only)"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Leads Vault</span>
                  {leadsCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-cyan-900 text-cyan-200 rounded-full text-[10px] font-mono font-bold border border-cyan-700">
                      {leadsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    logoutAdmin();
                    onShowToast('Admin Logged Out', 'Locked admin sessions.', 'info');
                  }}
                  className="text-[10px] text-slate-500 hover:text-rose-400 underline"
                  title="Log out of Admin Mode"
                >
                  Lock Admin
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-500 hover:text-slate-300 border border-slate-800/80 text-[11px] transition-colors"
                title="Admin Authentication Portal"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onShowToast={onShowToast}
        onSuccess={() => setIsLeadsModalOpen(true)}
      />

      {/* Leads Vault Admin Modal */}
      <LeadsVaultModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        onShowToast={onShowToast}
      />
    </footer>
  );
};
