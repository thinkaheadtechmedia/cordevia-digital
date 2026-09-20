import React from 'react';
import { ViewTab } from '../../types';
import { BRAND_INFO, TEAM_MEMBERS } from '../../data/brandData';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Target, 
  Globe2, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Download,
  Palette,
  Eye,
  ExternalLink,
  FolderArchive,
  Copy,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { downloadAsset, downloadSvgAsPng, OFFICIAL_CIRCULAR_SVG } from '../../utils/downloadHelper';

interface AboutViewProps {
  onNavigate: (tab: ViewTab) => void;
  onOpenAvatarModal?: () => void;
  onShowToast?: (title: string, message: string, type: 'success' | 'info') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenAvatarModal, onShowToast }) => {
  const [downloadingZip, setDownloadingZip] = React.useState(false);
  const [downloadingPng, setDownloadingPng] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    onShowToast?.('Downloading Package', 'cordevia-profile-pictures.zip is downloading...', 'info');
    try {
      const ok = await downloadAsset('/cordevia-profile-pictures.zip', 'cordevia-profile-pictures.zip');
      if (ok) {
        onShowToast?.('Download Complete', 'Saved cordevia-profile-pictures.zip to your Downloads folder.', 'success');
      }
    } catch {
      onShowToast?.('Download Triggered', 'cordevia-profile-pictures.zip initiated.', 'info');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleCopyDirectLink = () => {
    const directUrl = `${window.location.origin}/cordevia-profile-pictures.zip`;
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    onShowToast?.('URL Copied', 'Direct download link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };
  const milestones = [
    {
      year: '2019',
      title: 'The Inception',
      description: 'Started as a boutique creator studio helping early tech founders and YouTube channels break through algorithmic saturation.',
    },
    {
      year: '2021',
      title: 'Full-Stack Web & Brand Expansion',
      description: 'Expanded into high-performance web engineering, conversion optimization, and bespoke Figma design systems.',
    },
    {
      year: '2023',
      title: 'Global Footprint Scale',
      description: 'Scaled past 100+ clients across 20 countries, generating over 50M+ organic video impressions and top SERP rankings.',
    },
    {
      year: '2025',
      title: 'Proprietary AI & IT Workflows',
      description: 'Integrated automated programmatic SEO architectures and sub-second React/Next.js frameworks for enterprise clientele.',
    },
    {
      year: '2026',
      title: 'Rebranded as Cordevia Digital',
      description: 'Formerly known as Tarana Group, unified globally under Cordevia Digital as a comprehensive media-tech power agency.',
    },
  ];

  const values = [
    {
      title: 'Engineering Precision',
      desc: 'We reject vague marketing promises. Every campaign, website build, and video hook is rooted in verifiable data and mathematical logic.',
    },
    {
      title: 'Relentless Audience Growth',
      desc: 'We treat our clients channels and search rankings with the same urgency as our own company. Your scale is our singular metric.',
    },
    {
      title: 'Radical Transparency',
      desc: 'No hidden markups or obscure reporting. Real-time dashboards, direct communication in shared Slack channels, and complete IP handover.',
    },
    {
      title: 'Enduring Craftsmanship',
      desc: 'From sub-second web vitals to pixel-perfect brand identities, we build digital assets that stand the test of algorithmic shifts.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header & Rebrand Story */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Origin & Purpose</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Pioneering the Intersection of Media & Technology
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          At Cordevia Digital, we are not merely an agency — we are growth architects, media engineers, and digital craftsmen obsessed with unlocking compounding audience reach.
        </p>

        {/* Rebranding Callout Card */}
        <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-left flex items-start gap-3 text-xs text-slate-300">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Official Brand Evolution: From Tarana Group to Cordevia Digital</span>
            <p className="text-slate-400 leading-relaxed">
              We have officially transitioned our identity from Tarana Group to <strong>Cordevia Digital</strong>. This rebrand reflects our expanded global capabilities in programmatic SEO, sub-second web platforms, YouTube audience scale, and enterprise digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Core Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Channels & Brands', value: '180+' },
          { label: 'Total Views Generated', value: '75M+' },
          { label: 'Countries Served', value: '28' },
          { label: 'Verified Client CSAT', value: '99.4%' },
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#0B101E] border border-slate-800 text-center space-y-1">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
              {item.value}
            </div>
            <div className="text-xs text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Official Brand Identity & Social Avatar Kit Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B101F] via-[#090D18] to-cyan-950/40 border border-cyan-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Avatar Graphic Preview */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              {/* Outer halo */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
              {/* Circular Avatar */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-[#080d18]">
                <img 
                  src="/cordevia-avatar-circular.svg" 
                  alt="Cordevia Digital Official Social Media Profile Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-1 right-3 bg-cyan-950 text-cyan-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/60 shadow">
                1024 × 1024
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-3 font-mono">
              Official Cordevia Digital Monogram CD
            </span>
          </div>

          {/* Asset Info & Controls */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Brand Kit & Social Asset Suite</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Social Media Profile Picture & Identity Mark
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineered specifically for circular crop boundaries across <strong>YouTube, X (Twitter), LinkedIn, Instagram, TikTok, WhatsApp, and Telegram</strong>. Features optical centering, a 3D metallic bevel monogram, obsidian space depth, and vibrant electric cyan/emerald neon edge illumination.
            </p>

            {/* Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Master Resolution</span>
                <span className="text-white font-mono font-bold">1024 × 1024 px</span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Format</span>
                <span className="text-cyan-400 font-mono font-bold">HD PNG & SVG Vector</span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Safe Zone</span>
                <span className="text-emerald-400 font-mono font-bold">Circular Verified</span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Color Space</span>
                <span className="text-teal-300 font-mono font-bold">sRGB Web Optimized</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black text-xs hover:opacity-95 shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <FolderArchive className="w-4 h-4 text-slate-950" />
                <span>{downloadingZip ? 'Downloading ZIP Package...' : 'Download Profile Picture Folder (.ZIP)'}</span>
              </button>

              <button
                onClick={handleCopyDirectLink}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Copy direct download link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
              </button>

              {onOpenAvatarModal && (
                <button
                  onClick={onOpenAvatarModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/80 text-xs font-semibold hover:border-cyan-500/60 transition-all flex items-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Avatar Studio & Live Mockups</span>
                </button>
              )}

              <button
                onClick={async () => {
                  setDownloadingPng(true);
                  onShowToast?.('Rendering PNG', 'Generating crisp 1024x1024 profile picture PNG...', 'info');
                  try {
                    await downloadSvgAsPng(OFFICIAL_CIRCULAR_SVG, 1024, 'cordevia-digital-avatar-1024x1024.png');
                    onShowToast?.('PNG Ready', 'cordevia-digital-avatar-1024x1024.png saved!', 'success');
                  } finally {
                    setDownloadingPng(false);
                  }
                }}
                disabled={downloadingPng}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Download 1024x1024 HD PNG directly"
              >
                <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>{downloadingPng ? 'Rendering...' : '1024px HD PNG'}</span>
              </button>

              <button
                onClick={() => downloadAsset('/cordevia-social-profile-picture.svg', 'cordevia-digital-profile-picture.svg')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Master SVG</span>
              </button>

              <button
                onClick={() => downloadAsset('/cordevia-avatar-circular.svg', 'cordevia-digital-avatar-circular.svg')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Circular SVG</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Evolution Timeline */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Evolution Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-400">Seven years of compounding media-tech innovation.</p>
        </div>

        <div className="relative border-l-2 border-slate-800 pl-6 sm:pl-8 space-y-10 max-w-3xl mx-auto">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#090D16] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 hover:border-cyan-500/40 transition-colors">
                <span className="text-xs font-mono font-bold text-cyan-400">{m.year}</span>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The Principles That Guide Us</h2>
          <p className="text-xs sm:text-sm text-slate-400">Our non-negotiable operational tenets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center font-bold text-xs">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-white">{v.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Senior Leadership</h2>
          <p className="text-xs sm:text-sm text-slate-400">Led by practitioners with deep expertise in media, code, and search algorithms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 text-slate-950 font-bold text-lg flex items-center justify-center">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{member.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">{member.role}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{member.specialty}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                {member.bio}
              </p>
              <span className="text-[10px] font-mono text-teal-400 block pt-1">
                {member.experience}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-[#0A1222] to-teal-950 border border-cyan-500/30 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Join the Next Chapter with Cordevia Digital</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Whether you need YouTube management, a custom web app, or an algorithmic SEO campaign, we are ready to build.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl hover:opacity-95 shadow-lg shadow-cyan-500/20"
        >
          Book Discovery Session
        </button>
      </div>

    </div>
  );
};
