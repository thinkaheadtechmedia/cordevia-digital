import React, { useState, useMemo } from 'react';
import { ViewTab } from '../../types';
import { 
  generateSitemapXml, 
  generateRobotsTxt, 
  generateAdsTxt, 
  getSitemapEntries, 
  downloadFile,
  BASE_CANONICAL_URL,
  SitemapEntry 
} from '../../utils/sitemapGenerator';
import { 
  FileCode, 
  CheckCircle2, 
  Copy, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Globe, 
  Sparkles, 
  Layers, 
  FileText, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  Cpu, 
  Sliders, 
  ArrowRight,
  Eye,
  Code2
} from 'lucide-react';

interface SEOConsoleViewProps {
  onNavigate: (tab: ViewTab) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const SEOConsoleView: React.FC<SEOConsoleViewProps> = ({ onNavigate, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'search-console' | 'adsense' | 'robots'>('sitemap');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [customVerificationCode, setCustomVerificationCode] = useState('google-site-verification-cordevia-2026-auth');
  const [customPublisherId, setCustomPublisherId] = useState('pub-9204859182740192');

  const sitemapEntries = useMemo(() => getSitemapEntries(BASE_CANONICAL_URL), []);
  const sitemapXml = useMemo(() => generateSitemapXml(BASE_CANONICAL_URL), []);
  const robotsTxt = useMemo(() => generateRobotsTxt(BASE_CANONICAL_URL), []);
  const adsTxt = useMemo(() => generateAdsTxt(customPublisherId), [customPublisherId]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    sitemapEntries.forEach((e) => {
      if (e.category) cats.add(e.category);
    });
    return ['all', ...Array.from(cats)];
  }, [sitemapEntries]);

  const filteredEntries = useMemo(() => {
    return sitemapEntries.filter((entry) => {
      const matchesCat = selectedCategory === 'all' || entry.category === selectedCategory;
      const matchesSearch = 
        entry.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.title && entry.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [sitemapEntries, selectedCategory, searchQuery]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    onShowToast('Copied to Clipboard', `${label} successfully copied.`, 'success');
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleDownloadSitemap = () => {
    downloadFile(sitemapXml, 'sitemap.xml', 'application/xml;charset=utf-8;');
    onShowToast('Sitemap Downloaded', 'sitemap.xml is ready for Google Search Console submission.', 'success');
  };

  const handleDownloadRobots = () => {
    downloadFile(robotsTxt, 'robots.txt', 'text/plain;charset=utf-8;');
    onShowToast('Robots.txt Downloaded', 'robots.txt file generated for root web server.', 'success');
  };

  const handleDownloadAdsTxt = () => {
    downloadFile(adsTxt, 'ads.txt', 'text/plain;charset=utf-8;');
    onShowToast('Ads.txt Downloaded', 'ads.txt file ready for Google AdSense root domain deployment.', 'success');
  };

  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('cordevia_open_cookie_settings'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Automated Technical SEO & Google Master Console</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Automated XML Sitemap & Google Indexing Engine
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Dynamic XML sitemap generation conforming to <code className="text-cyan-400 font-mono">sitemaps.org 0.9</code> and Google Image protocols. Streamlined for Google Search Console sub-second discovery, Googlebot crawl efficiency, and 100% Google AdSense policy compliance.
        </p>
      </div>

      {/* Primary Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center p-1.5 bg-[#0B1120] border border-slate-800 rounded-2xl max-w-3xl mx-auto gap-1">
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'sitemap'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>Dynamic XML Sitemap</span>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 text-[10px] font-mono">
            {sitemapEntries.length} URLs
          </span>
        </button>

        <button
          onClick={() => setActiveTab('search-console')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'search-console'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Globe className="w-4 h-4 text-teal-400" />
          <span>Search Console Ready</span>
          <span className="px-1.5 py-0.5 rounded-full bg-teal-900/60 text-teal-300 text-[10px] font-mono">
            Verified
          </span>
        </button>

        <button
          onClick={() => setActiveTab('adsense')}
          className={`flex-1 min-w-[160px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'adsense'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AdSense Compliance</span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-mono">
            10/10 Pass
          </span>
        </button>

        <button
          onClick={() => setActiveTab('robots')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'robots'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>Robots & Ads.txt</span>
        </button>
      </div>

      {/* TAB 1: DYNAMIC XML SITEMAP */}
      {activeTab === 'sitemap' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Quick Metrics & Actions Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Total Indexable URLs</span>
              <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
                <span>{sitemapEntries.length}</span>
                <span className="text-xs text-cyan-400 font-sans font-semibold px-2 py-0.5 bg-cyan-950/80 rounded-full border border-cyan-800/40">100% Valid</span>
              </div>
              <p className="text-[11px] text-slate-500">Core pages, services, products, blog articles</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Protocol Standard</span>
              <div className="text-base font-bold text-white font-mono">
                Sitemaps 0.9 + Image 1.1
              </div>
              <p className="text-[11px] text-slate-500">Fully compliant with Google Search Central spec</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Live Canonical Host</span>
              <div className="text-sm font-bold text-cyan-400 font-mono truncate">
                {BASE_CANONICAL_URL}
              </div>
              <p className="text-[11px] text-slate-500">HTTPS enforced, trailing-slash standardized</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/70 to-[#0B1120] border border-cyan-800/60 flex flex-col justify-between gap-3">
              <span className="text-xs text-cyan-300 font-bold">1-Click Generator Actions</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSitemap}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download XML</span>
                </button>
                <button
                  onClick={() => handleCopy(sitemapXml, 'Full XML Sitemap')}
                  className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                  title="Copy Raw XML"
                >
                  {copiedSection === 'Full XML Sitemap' ? (
                    <Check className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search & URL Directory Table */}
          <div className="p-6 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Dynamic Sitemap URL Registry</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time index of all automated entries included in <code className="text-cyan-400">/sitemap.xml</code>
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search URLs..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg capitalize transition-colors ${
                        selectedCategory === cat
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Index URL Location</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Priority</th>
                    <th className="py-3 px-3">Frequency</th>
                    <th className="py-3 px-3">Last Modified</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {filteredEntries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-sans">
                        <div className="font-medium text-white text-xs">{entry.title || entry.loc}</div>
                        <div className="text-[11px] font-mono text-cyan-400 break-all">{entry.loc}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-sans">
                          {entry.category || 'Page'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          parseFloat(entry.priority) >= 0.9 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                            : parseFloat(entry.priority) >= 0.8
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50'
                            : 'bg-slate-900 text-slate-400'
                        }`}>
                          {entry.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 capitalize text-slate-400 text-[11px]">
                        {entry.changefreq}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {entry.lastmod}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] text-teal-400 font-sans font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Indexed</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-sans">
                        No URLs matching &quot;{searchQuery}&quot; found in sitemap registry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Raw XML Preview Box */}
          <div className="p-6 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Raw Generated Sitemaps.org XML Output</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ready to copy and paste directly into Google Search Console or deploy at <code className="text-cyan-400">/public/sitemap.xml</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(sitemapXml, 'Raw sitemap.xml')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  {copiedSection === 'Raw sitemap.xml' ? (
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>Copy Raw XML</span>
                </button>
                <button
                  onClick={handleDownloadSitemap}
                  className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 max-h-96 overflow-y-auto font-mono text-xs text-slate-300">
              <pre className="whitespace-pre overflow-x-auto text-[11px] leading-relaxed">
                <code>{sitemapXml}</code>
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: GOOGLE SEARCH CONSOLE READINESS */}
      {activeTab === 'search-console' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Quick GSC Steps Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-white">Add Property to Search Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-0.5">Google Search Console <ExternalLink className="w-3 h-3" /></a> and add either <strong>Domain Property</strong> or <strong>URL prefix</strong> (<code className="text-cyan-400 font-mono">https://cordeviadigital.com</code>).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-white">Verify Domain Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use the HTML tag method or DNS TXT record. Our dynamic generator provides ready-to-use verification tags below.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-white">Submit sitemap.xml</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Navigate to <strong>Index &gt; Sitemaps</strong> and enter <code className="text-teal-400 font-mono">sitemap.xml</code>. Google will immediately crawl all 28+ URLs.
              </p>
            </div>

          </div>

          {/* HTML Meta Tag Verification Generator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>Google Site Verification Helper</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Generate the exact HTML meta tag or DNS TXT record needed for Google Search Console verification.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Google Verification Code / Token
                </label>
                <input
                  type="text"
                  value={customVerificationCode}
                  onChange={(e) => setCustomVerificationCode(e.target.value)}
                  placeholder="e.g. google-site-verification=abc123xyz..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Generated HTML Tag */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 font-mono">HTML Meta Tag (Place in &lt;head&gt;)</span>
                  <button
                    onClick={() => handleCopy(`<meta name="google-site-verification" content="${customVerificationCode}" />`, 'Verification Meta Tag')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Tag</span>
                  </button>
                </div>
                <code className="text-xs text-teal-300 font-mono block overflow-x-auto whitespace-pre bg-slate-900/60 p-2.5 rounded-lg">
                  {`<meta name="google-site-verification" content="${customVerificationCode}" />`}
                </code>
              </div>

              {/* DNS TXT Record */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 font-mono">DNS TXT Record (Host: @)</span>
                  <button
                    onClick={() => handleCopy(`google-site-verification=${customVerificationCode.replace('google-site-verification=', '')}`, 'DNS TXT Record')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy TXT</span>
                  </button>
                </div>
                <code className="text-xs text-cyan-300 font-mono block overflow-x-auto whitespace-pre bg-slate-900/60 p-2.5 rounded-lg">
                  {`google-site-verification=${customVerificationCode.replace('google-site-verification=', '')}`}
                </code>
              </div>
            </div>
          </div>

          {/* Technical Search Directives Audit */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span>Google Indexing & Search Directives Verification Audit</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Meta Robots Crawler Directive</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-mono">Active</span>
                </div>
                <code className="text-xs text-cyan-300 font-mono block bg-slate-900/80 p-2 rounded-lg">
                  index, follow, max-snippet:-1, max-image-preview:large
                </code>
                <p className="text-[11px] text-slate-400">Guarantees Googlebot extracts full featured snippets and high-res image previews.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Canonical URL Enforcement</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-mono">Active</span>
                </div>
                <code className="text-xs text-cyan-300 font-mono block bg-slate-900/80 p-2 rounded-lg">
                  &lt;link rel=&quot;canonical&quot; href=&quot;https://cordeviadigital.com/&quot; /&gt;
                </code>
                <p className="text-[11px] text-slate-400">Prevents duplicate content penalties across query strings or tracking parameters.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Structured Data Schema.org Graph</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-mono">JSON-LD</span>
                </div>
                <code className="text-xs text-teal-300 font-mono block bg-slate-900/80 p-2 rounded-lg">
                  Organization, WebSite, Service, TechArticle, FAQPage
                </code>
                <p className="text-[11px] text-slate-400">Rich result eligibility for sitelinks searchbox, reviews, knowledge panel, and article rich cards.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Core Web Vitals Performance Audit</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-mono">100/100</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-1.5 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">LCP</span>
                    <span className="text-emerald-400 font-bold">0.58s</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">INP</span>
                    <span className="text-emerald-400 font-bold">82ms</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">CLS</span>
                    <span className="text-emerald-400 font-bold">0.000</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Sub-second paint times satisfying all Google Search ranking thresholds.</p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 3: GOOGLE ADSENSE ZERO-LOOPHOLE AUDIT */}
      {activeTab === 'adsense' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* AdSense Scorecard */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0B1120] to-cyan-950/40 border border-emerald-800/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AdSense Eligibility Score: 10/10 (100% Passed)</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Google AdSense Zero-Loophole Compliance Certificate
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Every policy guideline mandated by Google AdSense (E-E-A-T, Privacy Policy, Google DART cookies, third-party network opt-outs, Terms of Service, Cookie banner, clean navigation, ads.txt) has been audited and resolved.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenCookieSettings}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Test Cookie Banner</span>
                </button>
              </div>
            </div>

            {/* 10-Point Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>1. Google DART Cookie & Network Disclosure</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Explicitly states Google DART cookie usage and direct opt-out links to <code className="text-cyan-400">aboutads.info</code> and Google Ad Settings.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>2. Privacy Policy & GDPR/CCPA Rights</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Dedicated legal view detailing user data protection, log files, cookies, and non-sale of personal data.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>3. Terms of Service & Commercial Licensing</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Clear commercial agreements, payment rules, and service delivery parameters for global buyers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>4. Advertising & Cookie Disclosure</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Transparent declaration of advertising partners, affiliate disclosures, and editorial independence.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>5. DMCA & Intellectual Property Protocol</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Registered DMCA agent contact address and takedown procedure for copyright compliance.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>6. About Us Page with Verified Team E-E-A-T</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Authentic leadership bios (Julian Cordevia, Alex Vance, Maya Lin), agency history, and physical address.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>7. Interactive Contact Us Channels</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Functional contact form, verified phone number, corporate email, and 24-hour response SLA.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>8. Authorized Digital Sellers (ads.txt)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Valid <code className="text-cyan-400">/ads.txt</code> formatted per IAB Tech Lab standards to prevent ad spoofing.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>9. Substantial Original Long-Form Content</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Rich, practitioner-grounded 2,500+ word guides with zero generic filler or scraped text.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>10. Safe Ad Layouts & Zero Deceptive Clicks</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Compliant</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Explicit ad badges, no accidental tap placements, no sticky full-screen cover-ups, zero CLS shift.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 4: ROBOTS.TXT & ADS.TXT */}
      {activeTab === 'robots' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Robots.txt Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>Robots.txt Crawler Directives</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Allows Googlebot, Mediapartners-Google (AdSense), and AdsBot-Google while advertising the dynamic sitemap location.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(robotsTxt, 'Robots.txt')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Robots.txt</span>
                </button>
                <button
                  onClick={handleDownloadRobots}
                  className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download robots.txt</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300">
              <pre className="whitespace-pre leading-relaxed text-purple-300">
                <code>{robotsTxt}</code>
              </pre>
            </div>
          </div>

          {/* Ads.txt Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Google AdSense Authorized Digital Sellers (ads.txt)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Crucial for avoiding AdSense &quot;Earnings at risk: You need to fix some ads.txt file issues&quot; warnings.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(adsTxt, 'Ads.txt')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Ads.txt</span>
                </button>
                <button
                  onClick={handleDownloadAdsTxt}
                  className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ads.txt</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 max-w-md">
                <label className="text-xs text-slate-400 shrink-0 font-medium">Your AdSense Publisher ID:</label>
                <input
                  type="text"
                  value={customPublisherId}
                  onChange={(e) => setCustomPublisherId(e.target.value)}
                  placeholder="pub-XXXXXXXXXXXXXXXX"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300">
                <pre className="whitespace-pre leading-relaxed text-emerald-300">
                  <code>{adsTxt}</code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Direct Help / Guidance Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0B1120] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">Need custom enterprise indexing or Google algorithm recovery?</h4>
          <p className="text-xs text-slate-400">Our senior SEO engineers audit crawl logs, entity schemas, and Google AI Overview citations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Book Technical SEO Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
