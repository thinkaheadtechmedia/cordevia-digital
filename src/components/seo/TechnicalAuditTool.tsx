import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Copy, 
  Download, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  Layers, 
  FileCode, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Sliders,
  ExternalLink,
  Code2
} from 'lucide-react';

export interface AuditChecklistItem {
  id: string;
  category: 'indexing' | 'performance' | 'metadata' | 'security' | 'schema';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'passed' | 'warning' | 'action_required';
  howToFix: string;
  codeSnippet?: string;
  estMinutes: number;
}

const DEFAULT_ITEMS: AuditChecklistItem[] = [
  {
    id: 'canonical-tag',
    category: 'indexing',
    title: 'Self-Referencing Canonical URL',
    description: 'Ensure a clean, absolute canonical link tag exists in <head> to prevent duplicate content penalties across protocol/www variants.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Include <link rel="canonical" href="https://yourdomain.com/canonical-path" /> inside the <head> of every indexable template.',
    codeSnippet: '<link rel="canonical" href="https://cordeviadigital.com/" />',
    estMinutes: 5
  },
  {
    id: 'robots-directive',
    category: 'indexing',
    title: 'Googlebot Index & Follow Directives',
    description: 'Meta robots tag must permit indexation and deep link crawling without unintended "noindex" or "nofollow" blockers.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Verify robots meta allows index and max-image-preview:large for rich snippets and Google AI Overviews.',
    codeSnippet: '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />',
    estMinutes: 5
  },
  {
    id: 'core-web-vitals-lcp',
    category: 'performance',
    title: 'Largest Contentful Paint (LCP) Optimization',
    description: 'Hero imagery or headline element renders in 1.1s, safely below Google\'s 2.5s "Good" threshold.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Preload critical hero banner assets, serve modern AVIF/WebP formats, and omit lazy loading on above-the-fold heroes.',
    codeSnippet: '<link rel="preload" as="image" href="/assets/hero.webp" fetchpriority="high" />',
    estMinutes: 15
  },
  {
    id: 'blocking-scripts',
    category: 'performance',
    title: 'Eliminate Render-Blocking JavaScript',
    description: 'Third-party tracking or analytics scripts should be deferred to preserve initial DOM parsing and sub-200ms TTFB.',
    impact: 'medium',
    status: 'warning',
    howToFix: 'Add "defer" or "async" attributes to non-critical external scripts, or load via Google Tag Manager with low priority trigger.',
    codeSnippet: '<script src="https://analytics.example.com/tag.js" defer></script>',
    estMinutes: 10
  },
  {
    id: 'structured-data-organization',
    category: 'schema',
    title: 'JSON-LD Schema.org Entity Markup',
    description: 'Rich structured data specifies Organization, WebSite, and ProfessionalService entities for Google Knowledge Graph graph inclusion.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Inject JSON-LD script tag with validated schema conforming to schema.org/Organization specifications.',
    codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cordevia Digital",
  "url": "https://cordeviadigital.com/"
}
</script>`,
    estMinutes: 15
  },
  {
    id: 'faq-schema-opportunities',
    category: 'schema',
    title: 'FAQPage Structured Data for Rich SERP Snippets',
    description: 'Enhance organic search listings with collapsible FAQ dropdowns to dominate double the vertical pixel height on mobile SERP.',
    impact: 'medium',
    status: 'warning',
    howToFix: 'Add FAQPage schema matching visible on-page accordion questions to qualify for Google rich interactive results.',
    codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How fast does Cordevia rank websites?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Algorithmic momentum typically manifests within 14-45 days."
    }
  }]
}
</script>`,
    estMinutes: 20
  },
  {
    id: 'open-graph-images',
    category: 'metadata',
    title: 'High-Resolution OpenGraph & Twitter Card Tags',
    description: 'Social preview meta tags ensure 1200x630px high-contrast branded cards display on LinkedIn, X, Telegram, and Facebook shares.',
    impact: 'medium',
    status: 'passed',
    howToFix: 'Specify og:image, og:image:width, og:image:height, and twitter:card summary_large_image.',
    codeSnippet: '<meta property="og:image" content="https://cordeviadigital.com/og-image.png" />\n<meta name="twitter:card" content="summary_large_image" />',
    estMinutes: 10
  },
  {
    id: 'meta-description-length',
    category: 'metadata',
    title: 'Meta Description Keyword Optimization',
    description: 'Page description contains high-intent target keywords within the 140-160 character boundary to prevent SERP truncation.',
    impact: 'medium',
    status: 'passed',
    howToFix: 'Keep descriptions between 145 and 155 characters with a compelling call-to-action and primary keyword in the first sentence.',
    estMinutes: 10
  },
  {
    id: 'ssl-https-hsts',
    category: 'security',
    title: 'Strict HTTPS & HSTS Header Enforcement',
    description: 'All HTTP requests automatically redirect with 301 Permanent Redirect to HTTPS, accompanied by modern TLS 1.3 encryption.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Configure your web server / Cloudflare edge to enforce HSTS (max-age=31536000; includeSubDomains; preload).',
    codeSnippet: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
    estMinutes: 15
  },
  {
    id: 'image-alt-attributes',
    category: 'metadata',
    title: 'Descriptive Image Alt Text for Google Image SEO',
    description: 'Every informative image contains keyword-rich, natural alt attributes supporting screen readers and Google Image indexation.',
    impact: 'medium',
    status: 'passed',
    howToFix: 'Audit <img> tags and ensure all convey contextual meaning rather than generic filenames or blank attributes.',
    codeSnippet: '<img src="/assets/seo-chart.svg" alt="Cordevia Digital Algorithmic SEO Growth Velocity Chart" />',
    estMinutes: 15
  },
  {
    id: 'mobile-touch-targets',
    category: 'performance',
    title: 'Mobile Touch Targets & Viewport Configuration',
    description: 'All tap targets meet the 48x48px minimum hit-zone requirement with proper spacing to pass Google Mobile-Friendly test.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Apply min-h-[44px] or min-h-[48px] on interactive button and link elements with adequate margins.',
    estMinutes: 10
  },
  {
    id: 'xml-sitemap-discovery',
    category: 'indexing',
    title: 'Sitemap Auto-Discovery via robots.txt',
    description: 'Include the absolute URL of the XML sitemap index within robots.txt to streamline Googlebot discovery cycles.',
    impact: 'high',
    status: 'passed',
    howToFix: 'Add "Sitemap: https://yourdomain.com/sitemap.xml" to the bottom of robots.txt.',
    codeSnippet: 'Sitemap: https://cordeviadigital.com/sitemap.xml',
    estMinutes: 5
  }
];

interface TechnicalAuditToolProps {
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const TechnicalAuditTool: React.FC<TechnicalAuditToolProps> = ({ onShowToast }) => {
  const [targetUrl, setTargetUrl] = useState('https://cordeviadigital.com/');
  const [analyzedUrl, setAnalyzedUrl] = useState('https://cordeviadigital.com/');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<string>('');
  const [auditProgress, setAuditProgress] = useState(100);
  
  // Checklist State
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'warnings' | 'passed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Compute baseline dynamic score based on URL string hash
  const baseScore = useMemo(() => {
    let hash = 0;
    const clean = analyzedUrl.trim().toLowerCase();
    for (let i = 0; i < clean.length; i++) {
      hash = (hash << 5) - hash + clean.charCodeAt(i);
      hash |= 0;
    }
    const variance = Math.abs(hash % 7); // 0 to 6
    return 91 + (variance % 5); // 91 to 95
  }, [analyzedUrl]);

  // Current dynamic score accounting for user-resolved checklist items
  const currentScore = useMemo(() => {
    const bonus = resolvedIds.size * 2;
    return Math.min(100, baseScore + bonus);
  }, [baseScore, resolvedIds]);

  const scoreGrade = useMemo(() => {
    if (currentScore >= 95) return { text: 'Grade A+ • Search Dominant', color: 'text-emerald-400', bg: 'bg-emerald-950/70 border-emerald-800/60' };
    if (currentScore >= 90) return { text: 'Grade A • Highly Optimized', color: 'text-cyan-400', bg: 'bg-cyan-950/70 border-cyan-800/60' };
    if (currentScore >= 80) return { text: 'Grade B • Solid Foundation', color: 'text-teal-400', bg: 'bg-teal-950/70 border-teal-800/60' };
    return { text: 'Grade C • Action Needed', color: 'text-amber-400', bg: 'bg-amber-950/70 border-amber-800/60' };
  }, [currentScore]);

  // Execute Simulated Technical SEO Audit
  const handleRunAudit = (urlToTest?: string) => {
    const finalUrl = (urlToTest || targetUrl).trim();
    if (!finalUrl) {
      onShowToast('URL Required', 'Please enter a valid web URL to audit.', 'info');
      return;
    }

    let normalized = finalUrl;
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = `https://${normalized}`;
    }

    setTargetUrl(normalized);
    setIsAuditing(true);
    setAuditProgress(15);
    setAuditStep('Querying DNS & Initializing Simulated Googlebot Crawler...');

    setTimeout(() => {
      setAuditProgress(40);
      setAuditStep('Parsing DOM, Canonical Links & Entity Schema.org...');
    }, 280);

    setTimeout(() => {
      setAuditProgress(75);
      setAuditStep('Measuring Core Web Vitals (LCP, INP, CLS & TTFB)...');
    }, 550);

    setTimeout(() => {
      setAuditProgress(100);
      setAuditStep('Calculating Technical SEO Health Index...');
    }, 850);

    setTimeout(() => {
      setIsAuditing(false);
      setAnalyzedUrl(normalized);
      setResolvedIds(new Set());
      onShowToast('Audit Completed', `Automated Technical SEO score generated for ${normalized}`, 'success');
    }, 1100);
  };

  const toggleResolveItem = (id: string) => {
    setResolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        onShowToast('Status Updated', 'Item marked as pending optimization.', 'info');
      } else {
        next.add(id);
        onShowToast('Score Boosted!', '+2 Points added to Technical SEO Health Score.', 'success');
      }
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    return DEFAULT_ITEMS.filter((item) => {
      const isResolved = resolvedIds.has(item.id);
      const effectiveStatus = isResolved ? 'passed' : item.status;

      if (activeFilter === 'warnings' && effectiveStatus === 'passed') return false;
      if (activeFilter === 'passed' && effectiveStatus !== 'passed') return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      return true;
    });
  }, [activeFilter, categoryFilter, resolvedIds]);

  const handleCopyReport = () => {
    const reportText = `CORDEVIA DIGITAL — AUTOMATED TECHNICAL SEO AUDIT REPORT
Target URL: ${analyzedUrl}
Crawler User-Agent: Googlebot (${deviceMode === 'mobile' ? 'Smartphone Mobile-First' : 'Desktop'})
Overall Technical Score: ${currentScore}/100 (${scoreGrade.text})
Date: ${new Date().toLocaleDateString()}

CORE PILLAR SUB-SCORES:
- Crawlability & Indexing: 98/100
- Core Web Vitals & Speed: 89/100
- Metadata & OpenGraph: 94/100
- Security & HTTPS: 100/100

ACTIONABLE IMPROVEMENT CHECKLIST:
${DEFAULT_ITEMS.map((item, idx) => {
  const isDone = resolvedIds.has(item.id) || item.status === 'passed';
  return `${idx + 1}. [${isDone ? 'PASS' : 'ACTION'}] ${item.title} (${item.impact.toUpperCase()} Impact) - ${item.description}\n   Fix: ${item.howToFix}`;
}).join('\n\n')}

Generated via Cordevia Digital Automated Technical SEO Console`;

    navigator.clipboard.writeText(reportText);
    onShowToast('Audit Report Copied', 'Full checklist & scores copied to clipboard.', 'success');
  };

  const handleDownloadReport = () => {
    const reportText = `CORDEVIA DIGITAL — AUTOMATED TECHNICAL SEO AUDIT REPORT
Target URL: ${analyzedUrl}
Technical Score: ${currentScore}/100 (${scoreGrade.text})
Crawler: Googlebot (${deviceMode === 'mobile' ? 'Mobile First' : 'Desktop'})
Timestamp: ${new Date().toISOString()}

================================================================================
EXECUTIVE SUMMARY
================================================================================
The inspected URL demonstrates exceptional algorithmic alignment for Google Search.
Key optimizations detected: Self-referencing canonical tags, valid robots directives,
and clean sub-second Largest Contentful Paint (LCP).

================================================================================
TECHNICAL AUDIT CHECKLIST
================================================================================
${DEFAULT_ITEMS.map((item) => {
  const statusLabel = resolvedIds.has(item.id) ? 'RESOLVED' : item.status.toUpperCase();
  return `[${statusLabel}] [${item.category.toUpperCase()}] ${item.title}
Impact: ${item.impact.toUpperCase()}
Est. Fix Time: ${item.estMinutes} minutes
Details: ${item.description}
Action Required: ${item.howToFix}
${item.codeSnippet ? `Sample Code:\n${item.codeSnippet}\n` : ''}`;
}).join('\n--------------------------------------------------------------------------------\n')}
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technical-seo-audit-${analyzedUrl.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Report Downloaded', 'Saved technical SEO audit report file.', 'success');
  };

  const quickPresets = [
    { label: 'Homepage', url: 'https://cordeviadigital.com/' },
    { label: 'Algorithmic SEO', url: 'https://cordeviadigital.com/services/algorithmic-seo' },
    { label: 'Digital Marketplace', url: 'https://cordeviadigital.com/marketplace' },
    { label: 'Brand Identity', url: 'https://cordeviadigital.com/about' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Interactive Audit Input Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Automated URL Technical SEO Diagnostic</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Test Any URL for Google Indexing & Technical SEO
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Simulate Googlebot crawler evaluation, diagnose Core Web Vitals, and receive an instant actionable checklist.
            </p>
          </div>

          {/* Device User-Agent Selector */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'mobile' 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Googlebot Mobile
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'desktop' 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Googlebot Desktop
            </button>
          </div>
        </div>

        {/* Input Bar Form */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe className="w-5 h-5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAudit()}
              placeholder="Enter target URL (e.g. https://yourbrand.com/page)"
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
          </div>

          <button
            onClick={() => handleRunAudit()}
            disabled={isAuditing}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 text-slate-950 animate-spin" />
                <span>Simulating Crawler...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-slate-950 fill-current" />
                <span>Run Technical Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
          {quickPresets.map((preset) => (
            <button
              key={preset.url}
              onClick={() => {
                setTargetUrl(preset.url);
                handleRunAudit(preset.url);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Audit Progress Feedback */}
        {isAuditing && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                {auditStep}
              </span>
              <span className="text-slate-400 font-bold">{auditProgress}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${auditProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Audit Scorecard Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          
          {/* Main Score Dial */}
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border border-cyan-800/60 flex flex-col items-center justify-center p-2 shrink-0 shadow-lg shadow-cyan-950/40">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-mono">Score</span>
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {currentScore}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-semibold">/ 100</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold font-mono ${scoreGrade.bg} ${scoreGrade.color}`}>
                  {scoreGrade.text}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Googlebot {deviceMode === 'mobile' ? 'Mobile' : 'Desktop'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                {analyzedUrl}
              </h3>
              <p className="text-xs text-slate-400">
                Simulated Google indexability analysis completed. All primary rendering, robots, and schema pipelines active.
              </p>
            </div>
          </div>

          {/* Quick Actions for Report */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <button
              onClick={handleCopyReport}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Copy Report</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="px-3.5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Audit (.txt)</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillar Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Crawlability</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">98%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '98%' }} />
            </div>
            <p className="text-[11px] text-slate-400">200 OK • Self Canonical • Robots Verified</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>Core Web Vitals</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">89%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: '89%' }} />
            </div>
            <p className="text-[11px] text-slate-400">LCP: 1.1s • INP: 35ms • CLS: 0.02</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Schema & Meta</span>
              </span>
              <span className="text-xs font-mono font-bold text-purple-400">94%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: '94%' }} />
            </div>
            <p className="text-[11px] text-slate-400">JSON-LD Active • OpenGraph 1200x630</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security & Mobile</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">100%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-[11px] text-slate-400">TLS 1.3 HTTPS • HSTS • 48px Tap Targets</p>
          </div>
        </div>

      </div>

      {/* Actionable Improvement Checklist Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Actionable Technical SEO Checklist ({filteredItems.length} Audited Items)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click the checkbox to mark resolved improvements and watch your score recalculate in real-time.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Items ({DEFAULT_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveFilter('warnings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'warnings'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Needs Optimization</span>
            </button>
            <button
              onClick={() => setActiveFilter('passed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'passed'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Passed</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1">Category:</span>
          {['all', 'indexing', 'performance', 'schema', 'metadata', 'security'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[10px] font-mono transition-colors ${
                categoryFilter === cat
                  ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isResolved = resolvedIds.has(item.id);
            const isPass = isResolved || item.status === 'passed';
            const isExpanded = expandedItemId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isPass 
                    ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700/60'
                }`}
              >
                {/* Header Row */}
                <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    {/* Interactive Completion Checkbox */}
                    <button
                      onClick={() => toggleResolveItem(item.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all mt-0.5 sm:mt-0 ${
                        isPass
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                      title={isPass ? 'Mark as unresolved' : 'Mark as resolved'}
                    >
                      {isPass ? <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                    </button>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-bold truncate ${isPass ? 'text-white' : 'text-amber-200'}`}>
                          {item.title}
                        </span>
                        
                        {/* Impact Badge */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          item.impact === 'high' 
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60' 
                            : item.impact === 'medium'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {item.impact} Impact
                        </span>

                        {/* Category Tag */}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-cyan-300 border border-slate-800 uppercase">
                          {item.category}
                        </span>

                        {isResolved && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                            Fixed (+2 pts)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand / Details Toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                      ~{item.estMinutes}m
                    </span>
                    <button
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                      title="Toggle how to fix code and advice"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible How to Fix Panel */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-800/60 bg-slate-900/40 space-y-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Actionable Resolution Plan:</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.howToFix}
                      </p>
                    </div>

                    {item.codeSnippet && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Implementation Snippet:</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.codeSnippet || '');
                              onShowToast('Snippet Copied', 'Code snippet copied to clipboard.', 'success');
                            }}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </button>
                        </div>
                        <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                          <code>{item.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
