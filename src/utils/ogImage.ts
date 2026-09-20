/**
 * Dynamic Open Graph Image Generator for Cordevia Digital
 * Generates unique 1200x630 SVG data URIs dynamically based on blog post titles and metadata.
 */

interface DynamicOGOptions {
  title: string;
  category?: string;
  author?: string;
  readTime?: string;
  date?: string;
}

// Helper to wrap text into lines for SVG rendering
function wrapTextToLines(text: string, maxCharsPerLine: number = 32, maxLines: number = 3): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length >= maxLines - 1) {
        break;
      }
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  // If text was cut off, add ellipsis
  if (lines.length === maxLines && words.length > lines.join(' ').split(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:!?]?$/, '...');
  }

  return lines;
}

// Escape XML characters for safe SVG inclusion
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateDynamicOGImageUrl({
  title,
  category = 'Research & Engineering',
  author = 'Cordevia Digital',
  readTime = '12 min read',
  date = '2026 Edition',
}: DynamicOGOptions): string {
  const lines = wrapTextToLines(title, 34, 3);
  const escapedCategory = escapeXml(category.toUpperCase());
  const escapedAuthor = escapeXml(author);
  const escapedReadTime = escapeXml(readTime);
  const escapedDate = escapeXml(date);

  // Calculate vertical positions for title lines
  const startY = lines.length === 1 ? 295 : lines.length === 2 ? 265 : 235;
  const lineHeight = 60;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070B14" />
      <stop offset="50%" stop-color="#0A1224" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>

    <!-- Radial Glow spots -->
    <radialGradient id="cyanGlow" cx="15%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="emeraldGlow" cx="85%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
    </radialGradient>

    <!-- Border Accent Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#14B8A6" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.6" />
    </linearGradient>

    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.75" stroke-opacity="0.4" />
    </pattern>
  </defs>

  <!-- Base Canvas Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)" />
  
  <!-- Subtle Grid Overlay -->
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Ambient Glow Layers -->
  <rect width="1200" height="630" fill="url(#cyanGlow)" />
  <rect width="1200" height="630" fill="url(#emeraldGlow)" />

  <!-- Outer Framing Border with Soft Bevel -->
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" />

  <!-- Top Header Section: Brand Logo & Category Pill -->
  <g transform="translate(80, 85)">
    <!-- Brand Logo Mark (Hexagon/Diamond) -->
    <rect x="0" y="0" width="42" height="42" rx="12" fill="#0E1E38" stroke="#06B6D4" stroke-width="1.5" />
    <polygon points="21,10 32,21 21,32 10,21" fill="#06B6D4" />
    <circle cx="21" cy="21" r="3.5" fill="#FFFFFF" />

    <!-- Brand Name -->
    <text x="56" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" letter-spacing="2.5">
      CORDEVIA DIGITAL
    </text>

    <!-- Category Pill -->
    <g transform="translate(730, 0)">
      <rect x="0" y="2" width="260" height="38" rx="19" fill="#082F49" fill-opacity="0.7" stroke="#0284C7" stroke-width="1.2" />
      <circle cx="22" cy="21" r="4.5" fill="#38BDF8" />
      <text x="36" y="26" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="1.2">
        ${escapedCategory}
      </text>
    </g>
  </g>

  <!-- Divider Line -->
  <line x1="80" y1="155" x2="1120" y2="155" stroke="#1E293B" stroke-width="1" stroke-opacity="0.8" />

  <!-- Blog Post Title Lines -->
  <g transform="translate(80, 0)">
    ${lines
      .map(
        (line, idx) => `
      <text x="0" y="${startY + idx * lineHeight}" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" letter-spacing="-0.5">
        ${escapeXml(line)}
      </text>`
      )
      .join('')}
  </g>

  <!-- Bottom Metadata Section -->
  <g transform="translate(80, 490)">
    <!-- Author Circle & Info -->
    <circle cx="24" cy="24" r="24" fill="#0E1D36" stroke="#0284C7" stroke-width="1.5" />
    <text x="24" y="31" text-anchor="middle" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">
      ${escapedAuthor.charAt(0)}
    </text>

    <text x="64" y="18" fill="#F1F5F9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">
      ${escapedAuthor}
    </text>
    <text x="64" y="38" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500">
      ${escapedReadTime} • ${escapedDate}
    </text>

    <!-- Verification Badge (Right side) -->
    <g transform="translate(680, 5)">
      <rect x="0" y="0" width="360" height="38" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1" />
      <!-- Shield/Checkmark icon -->
      <path d="M 22 12 L 29 15 L 29 23 C 29 27 22 30 22 30 C 22 30 15 27 15 23 L 15 15 Z" fill="#10B981" fill-opacity="0.2" stroke="#10B981" stroke-width="1.5" />
      <path d="M 19 21 L 21 23 L 25 18" fill="none" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <text x="38" y="24" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5">
        OFFICIAL RESEARCH REPORT • E-E-A-T
      </text>
    </g>
  </g>
</svg>
`.trim();

  // Convert SVG to data URI
  const encodedSvg = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
}
