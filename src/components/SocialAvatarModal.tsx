import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Share2, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  ExternalLink,
  Layers,
  Palette,
  Zap,
  FolderArchive,
  Archive,
  FileCheck
} from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { downloadAsset } from '../utils/downloadHelper';
import { useAdminAuth } from '../utils/useAdminAuth';

interface SocialAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ThemePreset = 'obsidian' | 'emerald' | 'titanium' | 'amber';
type PlatformPreview = 'youtube' | 'x' | 'linkedin' | 'instagram' | 'telegram';

export const SocialAvatarModal: React.FC<SocialAvatarModalProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAdminAuth();
  const [activeTheme, setActiveTheme] = useState<ThemePreset>('obsidian');
  const [activePlatform, setActivePlatform] = useState<PlatformPreview>('youtube');
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [zipping, setZipping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen || !isAdmin) return null;

  // Theme palettes
  const themes = {
    obsidian: {
      name: 'Obsidian Cyan (Official)',
      bgCenter: '#0e1726',
      bgOuter: '#04060a',
      glowCyan: '#06b6d4',
      glowEmerald: '#10b981',
      rimGrad: ['#38bdf8', '#22d3ee', '#14b8a6', '#10b981'],
      cGrad: ['#67e8f9', '#22d3ee', '#06b6d4', '#0284c7'],
      dGrad: ['#5eead4', '#2dd4bf', '#10b981', '#047857'],
      nodeColor: '#38bdf8',
      description: 'The core Cordevia Digital agency signature with high-contrast electric cyan and deep cosmic obsidian.',
    },
    emerald: {
      name: 'Emerald Algorithmic',
      bgCenter: '#06201a',
      bgOuter: '#020d0b',
      glowCyan: '#10b981',
      glowEmerald: '#059669',
      rimGrad: ['#34d399', '#10b981', '#059669', '#047857'],
      cGrad: ['#6ee7b7', '#34d399', '#10b981', '#047857'],
      dGrad: ['#a7f3d0', '#6ee7b7', '#34d399', '#059669'],
      nodeColor: '#34d399',
      description: 'Calibrated for search growth, algorithmic systems, and high-velocity analytics.',
    },
    titanium: {
      name: 'Platinum Titanium',
      bgCenter: '#1e293b',
      bgOuter: '#090d16',
      glowCyan: '#94a3b8',
      glowEmerald: '#64748b',
      rimGrad: ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b'],
      cGrad: ['#ffffff', '#f1f5f9', '#cbd5e1', '#94a3b8'],
      dGrad: ['#e2e8f0', '#cbd5e1', '#94a3b8', '#475569'],
      nodeColor: '#f8fafc',
      description: 'Monochrome executive luxury styling for enterprise consulting and advisory leadership.',
    },
    amber: {
      name: 'Solar High-CTR',
      bgCenter: '#261706',
      bgOuter: '#0c0702',
      glowCyan: '#f59e0b',
      glowEmerald: '#ef4444',
      rimGrad: ['#fbbf24', '#f59e0b', '#d97706', '#b45309'],
      cGrad: ['#fde68a', '#fcd34d', '#f59e0b', '#b45309'],
      dGrad: ['#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
      nodeColor: '#fbbf24',
      description: 'High-visibility packaging optimized for YouTube algorithms and thumb-stopping mobile feeds.',
    },
  };

  const currentT = themes[activeTheme];

  // Helper to render high-res PNG
  const handleDownloadPng = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      // Generate SVG string for active theme
      const svgString = generateSvgString(activeTheme);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1024, 1024);
        URL.revokeObjectURL(url);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `cordevia-digital-avatar-${activeTheme}-1024x1024.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setDownloading(false);
      };
      img.src = url;
    } catch (err) {
      console.error(err);
      setDownloading(false);
    }
  };

  const handleDownloadSvg = () => {
    const svgString = generateSvgString(activeTheme);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cordevia-digital-avatar-${activeTheme}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySvg = () => {
    const svgString = generateSvgString(activeTheme);
    navigator.clipboard.writeText(svgString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render SVG string onto canvas and resolve as PNG blob
  const renderSvgToPngBlob = (svgStr: string, size: number): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        URL.revokeObjectURL(url);
        canvas.toBlob((b) => resolve(b), 'image/png');
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  };

  const handleDownloadZipFolder = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      const svgString = generateSvgString(activeTheme);
      
      // Vector folder
      const vectorFolder = zip.folder('01-vector-svg');
      vectorFolder?.file(`cordevia-avatar-${activeTheme}-master.svg`, svgString);

      // Attempt to include pre-built circular SVG
      try {
        const res = await fetch('/cordevia-avatar-circular.svg');
        if (res.ok) {
          const circularSvgText = await res.text();
          vectorFolder?.file('cordevia-avatar-circular.svg', circularSvgText);
        }
      } catch {
        // Continue if offline
      }

      // Raster PNGs for all social platform standards
      const pngFolder = zip.folder('02-png-rasters');
      const dimensions = [
        { name: `cordevia-avatar-${activeTheme}-1024x1024-master.png`, size: 1024 },
        { name: `cordevia-avatar-${activeTheme}-800x800-youtube.png`, size: 800 },
        { name: `cordevia-avatar-${activeTheme}-400x400-x-twitter-linkedin.png`, size: 400 },
        { name: `cordevia-avatar-${activeTheme}-320x320-instagram-tiktok.png`, size: 320 },
      ];

      for (const d of dimensions) {
        const blob = await renderSvgToPngBlob(svgString, d.size);
        if (blob) {
          pngFolder?.file(d.name, blob);
        }
      }

      // Documentation and specs
      const docFolder = zip.folder('03-documentation');
      docFolder?.file('README-PROFILE-PICTURE-SPECS.txt', `================================================================================
CORDEVIA DIGITAL — OFFICIAL SOCIAL MEDIA AVATAR SUITE
================================================================================
Active Preset: ${themes[activeTheme].name}
Description: ${themes[activeTheme].description}

UPLOAD INSTRUCTIONS:
- YouTube Channel Icon: Use '02-png-rasters/cordevia-avatar-${activeTheme}-800x800-youtube.png'
- X / Twitter: Use '02-png-rasters/cordevia-avatar-${activeTheme}-400x400-x-twitter-linkedin.png'
- LinkedIn Company Page: Use '02-png-rasters/cordevia-avatar-${activeTheme}-400x400-x-twitter-linkedin.png'
- Instagram & TikTok: Use '02-png-rasters/cordevia-avatar-${activeTheme}-320x320-instagram-tiktok.png'
- Scalable Vector Masters: Available in '01-vector-svg/'

All assets calibrated for zero-loss circular cropping.`);

      docFolder?.file('BRAND-HEX-CODES.txt', `CORDEVIA DIGITAL COLOR SYSTEM (${themes[activeTheme].name}):
Background Center: ${themes[activeTheme].bgCenter}
Background Edge:   ${themes[activeTheme].bgOuter}
Primary Glow:      ${themes[activeTheme].glowCyan}
Secondary Glow:    ${themes[activeTheme].glowEmerald}
Node Accent:       ${themes[activeTheme].nodeColor}`);

      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `cordevia-digital-profile-pictures-${activeTheme}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Client zip creation fallback to server bundle:', err);
      const link = document.createElement('a');
      link.href = '/cordevia-profile-pictures.zip';
      link.download = 'cordevia-profile-pictures.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setZipping(false);
    }
  };

  function generateSvgString(themeKey: ThemePreset): string {
    const t = themes[themeKey];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${t.bgCenter}" />
      <stop offset="100%" stop-color="${t.bgOuter}" />
    </radialGradient>
    <radialGradient id="cyanGlow" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="${t.glowCyan}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${t.glowCyan}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="rimGrad" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="${t.rimGrad[0]}" />
      <stop offset="33%" stop-color="${t.rimGrad[1]}" />
      <stop offset="66%" stop-color="${t.rimGrad[2]}" />
      <stop offset="100%" stop-color="${t.rimGrad[3]}" />
    </linearGradient>
    <linearGradient id="cGrad" x1="20%" y1="15%" x2="80%" y2="85%">
      <stop offset="0%" stop-color="${t.cGrad[0]}" />
      <stop offset="50%" stop-color="${t.cGrad[1]}" />
      <stop offset="100%" stop-color="${t.cGrad[2]}" />
    </linearGradient>
    <linearGradient id="dGrad" x1="0%" y1="20%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="${t.dGrad[0]}" />
      <stop offset="50%" stop-color="${t.dGrad[1]}" />
      <stop offset="100%" stop-color="${t.dGrad[2]}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="${t.glowCyan}" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)" />
  <circle cx="512" cy="512" r="480" fill="url(#cyanGlow)" />
  <circle cx="512" cy="512" r="460" fill="none" stroke="${t.glowCyan}" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="8 8" />
  <circle cx="512" cy="512" r="420" fill="none" stroke="${t.glowEmerald}" stroke-width="1" stroke-opacity="0.2" />
  <g filter="url(#shadow)">
    <circle cx="512" cy="512" r="360" fill="#080d18" stroke="url(#rimGrad)" stroke-width="8" />
    <circle cx="512" cy="512" r="356" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5" />
    <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="url(#cGrad)" />
    <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.5" />
    <polygon points="496,396 680,512 496,628" fill="url(#dGrad)" />
    <polygon points="496,396 680,512 496,628" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.6" stroke-linejoin="round" />
  </g>
  <circle cx="760" cy="272" r="14" fill="${t.nodeColor}" />
  <circle cx="760" cy="272" r="7" fill="#ffffff" />
  <circle cx="760" cy="272" r="26" fill="none" stroke="${t.glowCyan}" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />
</svg>`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#090D16] border border-cyan-900/40 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 p-[1.5px]">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Cordevia Digital • Official Social Media Profile Asset
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  1024x1024 HD
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pixel-perfect vector avatar & circular crop framework for YouTube, X, LinkedIn, Instagram & TikTok
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          
          {/* Left / Center: Interactive Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/80 rounded-xl p-6 border border-slate-800/60 relative">
            
            {/* Safe Zone Overlay Toggle */}
            <div className="w-full flex items-center justify-between mb-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Live Avatar Master
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSafeZone(!showSafeZone)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    showSafeZone 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                  }`}
                >
                  {showSafeZone ? 'Hide Circular Safe Zone' : 'Show Circular Crop Zone'}
                </button>
              </div>
            </div>

            {/* Avatar Stage */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group transition-all duration-300">
              
              {/* Rendered SVG Vector */}
              <svg 
                viewBox="0 0 1024 1024" 
                className="w-full h-full select-none"
              >
                <defs>
                  <radialGradient id="modalBg" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor={currentT.bgCenter} />
                    <stop offset="100%" stopColor={currentT.bgOuter} />
                  </radialGradient>
                  <radialGradient id="modalGlow" cx="50%" cy="50%" r="48%">
                    <stop offset="0%" stopColor={currentT.glowCyan} stopOpacity="0.38" />
                    <stop offset="100%" stopColor={currentT.glowCyan} stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="modalRim" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor={currentT.rimGrad[0]} />
                    <stop offset="33%" stopColor={currentT.rimGrad[1]} />
                    <stop offset="66%" stopColor={currentT.rimGrad[2]} />
                    <stop offset="100%" stopColor={currentT.rimGrad[3]} />
                  </linearGradient>
                  <linearGradient id="modalC" x1="20%" y1="15%" x2="80%" y2="85%">
                    <stop offset="0%" stopColor={currentT.cGrad[0]} />
                    <stop offset="50%" stopColor={currentT.cGrad[1]} />
                    <stop offset="100%" stopColor={currentT.cGrad[2]} />
                  </linearGradient>
                  <linearGradient id="modalD" x1="0%" y1="20%" x2="100%" y2="80%">
                    <stop offset="0%" stopColor={currentT.dGrad[0]} />
                    <stop offset="50%" stopColor={currentT.dGrad[1]} />
                    <stop offset="100%" stopColor={currentT.dGrad[2]} />
                  </linearGradient>
                  <filter id="modalShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#000000" floodOpacity="0.85" />
                    <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor={currentT.glowCyan} floodOpacity="0.35" />
                  </filter>
                </defs>

                <rect width="1024" height="1024" fill="url(#modalBg)" />
                <circle cx="512" cy="512" r="480" fill="url(#modalGlow)" />
                <circle cx="512" cy="512" r="460" fill="none" stroke={currentT.glowCyan} strokeWidth="2" strokeOpacity="0.2" strokeDasharray="8 8" />
                <circle cx="512" cy="512" r="420" fill="none" stroke={currentT.glowEmerald} strokeWidth="1.5" strokeOpacity="0.25" />

                {/* Badge Container */}
                <g filter="url(#modalShadow)">
                  <circle cx="512" cy="512" r="360" fill="#080D18" stroke="url(#modalRim)" strokeWidth="8" />
                  <circle cx="512" cy="512" r="356" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.45" />
                  
                  {/* Monogram C-Arc */}
                  <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="url(#modalC)" />
                  <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.4" />

                  {/* Monogram D-Play Arrow */}
                  <polygon points="496,396 680,512 496,628" fill="url(#modalD)" />
                  <polygon points="496,396 680,512 496,628" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.6" strokeLinejoin="round" />
                </g>

                {/* Energy satellite node */}
                <circle cx="760" cy="272" r="14" fill={currentT.nodeColor} />
                <circle cx="760" cy="272" r="7" fill="#ffffff" />
                <circle cx="760" cy="272" r="26" fill="none" stroke={currentT.glowCyan} strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />
              </svg>

              {/* Circular Safe-Zone Overlay (shows how YouTube/X/Instagram crop this avatar) */}
              {showSafeZone && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-red-500/80 bg-red-500/5 flex items-center justify-center">
                    <span className="bg-red-950/90 text-red-300 text-[10px] font-mono px-2 py-0.5 rounded border border-red-500/40 shadow">
                      Circular Crop Boundary
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Aesthetic Theme Selector Tabs */}
            <div className="w-full mt-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1 font-medium text-slate-300">
                  <Palette className="w-3.5 h-3.5 text-teal-400" />
                  Colorway Presets:
                </span>
                <span className="text-[11px] text-cyan-400 font-mono">{currentT.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(themes) as ThemePreset[]).map((tKey) => {
                  const tItem = themes[tKey];
                  const isSelected = activeTheme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => setActiveTheme(tKey)}
                      className={`px-3 py-2 rounded-lg text-xs text-left font-medium transition-all flex flex-col gap-1 border ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-950'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: tItem.glowCyan }} 
                        />
                        <span className="truncate">{tItem.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate">{tItem.name.split(' ')[1] || 'Preset'}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                {currentT.description}
              </p>
            </div>
          </div>

          {/* Right Column: Multi-Platform Mockups & Download Suite */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            
            {/* Platform Preview Selector */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                  Live Platform Preview
                </span>
                <span className="text-[10px] text-slate-400">Exact UI Mockup</span>
              </div>

              {/* Platform Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
                {[
                  { id: 'youtube', label: 'YouTube' },
                  { id: 'x', label: 'X / Twitter' },
                  { id: 'linkedin', label: 'LinkedIn' },
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'telegram', label: 'Telegram' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePlatform(p.id as PlatformPreview)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
                      activePlatform === p.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Active Platform UI Mockup Box */}
              <div className="bg-[#0b101b] rounded-lg p-3.5 border border-slate-800 text-xs">
                
                {/* YouTube Mockup */}
                {activePlatform === 'youtube' && (
                  <div className="space-y-3">
                    {/* Simulated Banner */}
                    <div className="w-full h-14 rounded bg-gradient-to-r from-cyan-950 via-slate-900 to-teal-950 border border-slate-800/80 flex items-center justify-between px-3 text-[10px] text-cyan-400 font-mono">
                      <span>CORDEVIA DIGITAL</span>
                      <span className="text-slate-400">75M+ Views</span>
                    </div>
                    {/* Channel Row */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500 shrink-0 shadow">
                        <img 
                          src="/cordevia-avatar-circular.svg" 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white text-sm truncate">Cordevia Digital</span>
                          <span className="w-3 h-3 rounded-full bg-slate-500 flex items-center justify-center text-[8px] text-white">✓</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">@cordeviadigital • 180+ Channels • 75M+ Views</p>
                      </div>
                      <button className="bg-white text-slate-950 px-3 py-1 rounded-full text-[11px] font-bold shrink-0">
                        Subscribe
                      </button>
                    </div>
                  </div>
                )}

                {/* X / Twitter Mockup */}
                {activePlatform === 'x' && (
                  <div className="space-y-3">
                    <div className="w-full h-12 rounded bg-gradient-to-r from-slate-900 to-cyan-950 border border-slate-800 relative">
                      <div className="absolute -bottom-4 left-3 w-11 h-11 rounded-full overflow-hidden border-2 border-[#0b101b] shadow">
                        <img 
                          src="/cordevia-avatar-circular.svg" 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex items-start justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 font-bold text-white text-sm">
                          Cordevia Digital
                          <span className="text-cyan-400 text-xs">☑</span>
                        </div>
                        <p className="text-[11px] text-slate-400">@cordeviadigital</p>
                      </div>
                      <button className="bg-white text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-bold">
                        Follow
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Engineering Organic Search Dominance, Algorithmic Media & Enterprise Intelligence. San Francisco • London
                    </p>
                  </div>
                )}

                {/* LinkedIn Mockup */}
                {activePlatform === 'linkedin' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0 shadow bg-slate-950">
                        <img 
                          src="/cordevia-social-profile-picture.svg" 
                          alt="Avatar" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-white text-sm block truncate">Cordevia Digital</span>
                        <p className="text-[11px] text-slate-400 truncate">Marketing Services • 11-50 employees</p>
                        <span className="text-[10px] text-cyan-400">5,820 followers</span>
                      </div>
                      <button className="bg-cyan-500 text-slate-950 font-bold px-3 py-1 rounded-md text-[11px]">
                        + Follow
                      </button>
                    </div>
                  </div>
                )}

                {/* Instagram Mockup */}
                {activePlatform === 'instagram' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      {/* Gradient Story Ring */}
                      <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                        <div className="w-full h-full rounded-full border-2 border-[#0b101b] overflow-hidden bg-slate-950">
                          <img 
                            src="/cordevia-avatar-circular.svg" 
                            alt="Avatar" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex justify-around text-center">
                        <div>
                          <div className="font-bold text-white text-xs">142</div>
                          <div className="text-[10px] text-slate-400">posts</div>
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">28.4K</div>
                          <div className="text-[10px] text-slate-400">followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">318</div>
                          <div className="text-[10px] text-slate-400">following</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Cordevia Digital</div>
                      <p className="text-[11px] text-slate-400">Digital Media Agency • Media-Tech Engineering • YouTube Growth</p>
                    </div>
                  </div>
                )}

                {/* Telegram Mockup */}
                {activePlatform === 'telegram' && (
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-cyan-500/50 shadow">
                      <img 
                        src="/cordevia-avatar-circular.svg" 
                        alt="Avatar" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white text-xs block truncate">Cordevia Official Store & Agency</span>
                      <span className="text-[11px] text-emerald-400">online • 1,490 subscribers</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Platform Specifications & Safe-Zone Dimensions */}
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/80 text-xs">
              <span className="text-slate-300 font-semibold mb-2 block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Platform Requirements
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-white font-medium block">YouTube</span>
                  <span>800 × 800 px (Circle crop)</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-white font-medium block">X / Twitter</span>
                  <span>400 × 400 px (Circle crop)</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-white font-medium block">LinkedIn</span>
                  <span>400 × 400 px (Square/Circle)</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-white font-medium block">Instagram & TikTok</span>
                  <span>320 × 320 px (Circle crop)</span>
                </div>
              </div>
            </div>

            {/* Export & Download Buttons */}
            <div className="space-y-2 pt-2">
              {/* Primary: Full Downloadable ZIP Package */}
              <button
                onClick={handleDownloadZipFolder}
                disabled={zipping}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm group"
              >
                <FolderArchive className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>
                  {zipping 
                    ? 'Packaging ZIP Folder (All Sizes + SVGs)...' 
                    : 'Download Complete Avatar Pack (.ZIP Folder)'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadPng}
                  disabled={downloading}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  {downloading ? 'Rendering...' : 'Download HD PNG (1024px)'}
                </button>

                <button
                  onClick={() => downloadAsset('/cordevia-profile-pictures.zip', 'cordevia-profile-pictures.zip')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 text-xs font-semibold transition-colors text-center"
                  title="Direct download pre-compiled server ZIP archive"
                >
                  <Archive className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pre-built ZIP (All Vectors)</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadSvg}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  Download Active SVG
                </button>

                <button
                  onClick={handleCopySvg}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied SVG Markup!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy SVG Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Asset stored at: <code className="text-cyan-400 font-mono">/cordevia-social-profile-picture.svg</code></span>
          <span className="hidden sm:inline">Cordevia Digital Brand Identity Guidelines v2.4 • All Rights Reserved</span>
        </div>

      </div>
    </div>
  );
};
