import JSZip from 'jszip';

export const OFFICIAL_MASTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#0e1726" />
      <stop offset="100%" stop-color="#04060a" />
    </radialGradient>
    <radialGradient id="cyanGlow" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="rimGrad" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="33%" stop-color="#22d3ee" />
      <stop offset="66%" stop-color="#14b8a6" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <linearGradient id="cGrad" x1="20%" y1="15%" x2="80%" y2="85%">
      <stop offset="0%" stop-color="#67e8f9" />
      <stop offset="50%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="dGrad" x1="0%" y1="20%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#5eead4" />
      <stop offset="50%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#06b6d4" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)" />
  <circle cx="512" cy="512" r="480" fill="url(#cyanGlow)" />
  <circle cx="512" cy="512" r="460" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="8 8" />
  <circle cx="512" cy="512" r="420" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.2" />
  <g filter="url(#shadow)">
    <circle cx="512" cy="512" r="360" fill="#080d18" stroke="url(#rimGrad)" stroke-width="8" />
    <circle cx="512" cy="512" r="356" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5" />
    <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="url(#cGrad)" />
    <path d="M 512 256 A 256 256 0 1 0 768 512 H 656 A 144 144 0 1 1 512 368 V 256 Z" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.5" />
    <polygon points="496,396 680,512 496,628" fill="url(#dGrad)" />
    <polygon points="496,396 680,512 496,628" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.6" stroke-linejoin="round" />
  </g>
  <circle cx="760" cy="272" r="14" fill="#38bdf8" />
  <circle cx="760" cy="272" r="7" fill="#ffffff" />
  <circle cx="760" cy="272" r="26" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />
</svg>`;

export const OFFICIAL_CIRCULAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <clipPath id="circleClip">
      <circle cx="512" cy="512" r="512" />
    </clipPath>
    <radialGradient id="circBg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#0e1726" />
      <stop offset="100%" stop-color="#04060a" />
    </radialGradient>
    <radialGradient id="circCyanGlow" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="circRimGrad" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="33%" stop-color="#22d3ee" />
      <stop offset="66%" stop-color="#14b8a6" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <linearGradient id="circCGrad" x1="20%" y1="15%" x2="80%" y2="85%">
      <stop offset="0%" stop-color="#67e8f9" />
      <stop offset="50%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="circDGrad" x1="0%" y1="20%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#5eead4" />
      <stop offset="50%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <filter id="circShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#06b6d4" flood-opacity="0.35" />
    </filter>
  </defs>
  <g clip-path="url(#circleClip)">
    <rect width="1024" height="1024" fill="url(#circBg)" />
    <circle cx="512" cy="512" r="500" fill="url(#circCyanGlow)" />
    <g filter="url(#circShadow)">
      <circle cx="512" cy="512" r="390" fill="#080d18" stroke="url(#circRimGrad)" stroke-width="10" />
      <circle cx="512" cy="512" r="384" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5" />
      <path d="M 512 240 A 272 272 0 1 0 784 512 H 664 A 152 152 0 1 1 512 360 V 240 Z" fill="url(#circCGrad)" />
      <path d="M 512 240 A 272 272 0 1 0 784 512 H 664 A 152 152 0 1 1 512 360 V 240 Z" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.5" />
      <polygon points="494,386 690,512 494,638" fill="url(#circDGrad)" />
      <polygon points="494,386 690,512 494,638" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.6" stroke-linejoin="round" />
    </g>
    <circle cx="778" cy="256" r="16" fill="#38bdf8" />
    <circle cx="778" cy="256" r="8" fill="#ffffff" />
    <circle cx="778" cy="256" r="28" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />
    <circle cx="512" cy="512" r="508" fill="none" stroke="url(#circRimGrad)" stroke-width="6" opacity="0.75" />
  </g>
</svg>`;

/**
 * Triggers direct browser download for any text or blob
 */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 300);
}

/**
 * Direct download for SVG string
 */
export function downloadSvgString(svgContent: string, filename: string): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  triggerBlobDownload(blob, filename);
}

/**
 * Renders SVG to canvas and downloads as PNG
 */
export async function downloadSvgAsPng(svgContent: string, size: number, filename: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            triggerBlobDownload(pngBlob, filename);
          }
          URL.revokeObjectURL(url);
          resolve();
        }, 'image/png');
      } else {
        URL.revokeObjectURL(url);
        resolve();
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
}

/**
 * Render SVG to PNG Blob for bundling inside JSZip
 */
function svgToPngBlob(svgContent: string, size: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
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
}

/**
 * Generates and downloads the complete cordevia-profile-pictures.zip in browser memory.
 * Completely immune to 404s, CORS, or missing server files!
 */
export async function downloadCordeviaAvatarZip(): Promise<void> {
  const zip = new JSZip();

  // Root level masters
  zip.file('cordevia-social-profile-picture-1024x1024.svg', OFFICIAL_MASTER_SVG);
  zip.file('cordevia-avatar-circular-1024x1024.svg', OFFICIAL_CIRCULAR_SVG);

  // Folder 1: Vector SVG Masters
  const vectorFolder = zip.folder('01-vector-svg-masters');
  vectorFolder?.file('cordevia-master-profile-picture.svg', OFFICIAL_MASTER_SVG);
  vectorFolder?.file('cordevia-circular-crop-avatar.svg', OFFICIAL_CIRCULAR_SVG);

  // Folder 2: High Resolution PNG Rasters
  const pngFolder = zip.folder('02-platform-png-rasters');
  const [png1024, png800, png400, png320] = await Promise.all([
    svgToPngBlob(OFFICIAL_CIRCULAR_SVG, 1024),
    svgToPngBlob(OFFICIAL_CIRCULAR_SVG, 800),
    svgToPngBlob(OFFICIAL_CIRCULAR_SVG, 400),
    svgToPngBlob(OFFICIAL_CIRCULAR_SVG, 320),
  ]);

  if (png1024) pngFolder?.file('cordevia-avatar-1024x1024-master.png', png1024);
  if (png800) pngFolder?.file('cordevia-avatar-800x800-youtube.png', png800);
  if (png400) pngFolder?.file('cordevia-avatar-400x400-x-twitter-linkedin.png', png400);
  if (png320) pngFolder?.file('cordevia-avatar-320x320-instagram-tiktok.png', png320);

  // Folder 3: Platform specs and guidelines
  const docFolder = zip.folder('03-platform-specs-and-guidelines');
  docFolder?.file('README-PROFILE-PICTURE-GUIDELINES.txt', `================================================================================
CORDEVIA DIGITAL — OFFICIAL SOCIAL MEDIA AVATAR SUITE
================================================================================
Brand: Cordevia Digital
Type: Social Media Profile Picture Suite & Vector Brand Kit

PACKAGE CONTENTS:
1. cordevia-social-profile-picture-1024x1024.svg
   Full resolution vector master with subtle obsidian gradient background.
   
2. cordevia-avatar-circular-1024x1024.svg
   Pre-framed circular SVG with calibrated outer glow and circular safe-crop.

3. 02-platform-png-rasters/
   - cordevia-avatar-1024x1024-master.png (Universal master PNG)
   - cordevia-avatar-800x800-youtube.png (YouTube channel icon standard)
   - cordevia-avatar-400x400-x-twitter-linkedin.png (X & LinkedIn company page)
   - cordevia-avatar-320x320-instagram-tiktok.png (Instagram & TikTok mobile feed)

RECOMMENDED UPLOAD SIZES:
- YouTube Channel Profile: 800 x 800 px (circle crop)
- X / Twitter Profile: 400 x 400 px (circle crop)
- LinkedIn Company Page: 400 x 400 px
- Instagram / TikTok: 320 x 320 px
- Telegram / WhatsApp Business: 1024 x 1024 px

All graphics are designed to maintain maximum contrast and clarity at 32px thumbnail size.`);

  docFolder?.file('BRAND-HEX-CODES.txt', `CORDEVIA DIGITAL BRAND COLOR SPECIFICATION:
Primary Obsidian Background: #04060a / #0e1726
Electric Cyan Accent:        #06b6d4 (Glow) / #22d3ee (Mid) / #67e8f9 (Light)
Algorithmic Emerald Accent:  #10b981 (Base) / #2dd4bf (Mid) / #5eead4 (Light)
Deep Plate Dark:             #080d18
Sky Blue Highlight:          #38bdf8
Pure White Accent:           #ffffff`);

  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  triggerBlobDownload(zipBlob, 'cordevia-profile-pictures.zip');
}

/**
 * Universal fallback fetch helper
 */
export async function downloadAsset(url: string, filename: string): Promise<boolean> {
  if (filename.endsWith('.zip')) {
    try {
      await downloadCordeviaAvatarZip();
      return true;
    } catch {
      // Fallback
    }
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    triggerBlobDownload(blob, filename);
    return true;
  } catch (err) {
    console.warn('Fetch fallback triggered:', err);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 300);
    return false;
  }
}
