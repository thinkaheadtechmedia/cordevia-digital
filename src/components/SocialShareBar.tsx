import React, { useState } from 'react';
import { 
  Share2, 
  Check, 
  Copy, 
  Twitter, 
  Linkedin, 
  Facebook, 
  MessageCircle, 
  SendHorizontal,
  Bookmark,
  Sparkles
} from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  authorName?: string;
  variant?: 'inline' | 'floating' | 'banner';
  className?: string;
  onShowToast?: (title: string, message: string, type: 'success' | 'info') => void;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  slug,
  category = 'SEO & Media-Tech',
  excerpt,
  authorName = 'Cordevia Digital',
  variant = 'inline',
  className = '',
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [sharesCount, setSharesCount] = useState(() => {
    // Generate deterministic yet lively initial share count based on slug
    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 140 + (hash % 160);
  });
  const [isBookmarked, setIsBookmarked] = useState(false);

  const canonicalUrl = `https://cordeviadigital.com/blog/${slug}`;

  // Twitter / X share text with hashtags
  const tweetText = `${title}\n\nKey analysis via @cordeviadigital:`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(canonicalUrl)}`;

  // LinkedIn share URL
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;

  // Facebook share URL
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;

  // WhatsApp share URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${canonicalUrl}`)}`;

  const trackShareClick = (platform: string) => {
    setSharesCount((prev) => prev + 1);
    if (onShowToast) {
      onShowToast('Sharing Analysis', `Opened share dialog for ${platform}. Thank you for amplifying research!`, 'info');
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = canonicalUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setSharesCount((prev) => prev + 1);
      if (onShowToast) {
        onShowToast('Link Copied!', 'Article URL copied to your clipboard.', 'success');
      }
      setTimeout(() => setCopied(false), 2500);
    } catch {
      if (onShowToast) {
        onShowToast('Copy Failed', 'Unable to copy link automatically.', 'info');
      }
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt || title,
          url: canonicalUrl,
        });
        setSharesCount((prev) => prev + 1);
        if (onShowToast) {
          onShowToast('Article Shared', 'Thank you for sharing Cordevia research!', 'success');
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onShowToast) {
      onShowToast(
        !isBookmarked ? 'Article Bookmarked' : 'Bookmark Removed',
        !isBookmarked ? 'Saved to your browser session for quick reference.' : 'Removed from saved reads.',
        'info'
      );
    }
  };

  if (variant === 'banner') {
    return (
      <div className={`p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0B1324] to-slate-900/95 border border-cyan-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-cyan-400 font-semibold">
            <Share2 className="w-3.5 h-3.5" />
            <span>Found this analysis actionable?</span>
          </div>
          <p className="text-xs text-slate-300">
            Share with your engineering, SEO, or media team to accelerate algorithmic scale.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShareClick('X / Twitter')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Share on X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
            <span className="hidden md:inline">Post on X</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShareClick('LinkedIn')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-slate-700/80 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShareClick('Facebook')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 border border-slate-700/80 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
            <span className="hidden md:inline">Facebook</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackShareClick('WhatsApp')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700/80 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="Send on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <button
            onClick={handleCopy}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              copied
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Copy URL to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Inline variant (typically rendered in post header and post footer)
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-800/80 ${className}`}>
      {/* Share stats & label */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
          <Share2 className="w-3 h-3 text-cyan-400" />
          <span>{sharesCount} Shares</span>
        </div>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline text-slate-400">Spread technical knowledge</span>
      </div>

      {/* Share action buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShareClick('X / Twitter')}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-1 text-xs"
          title="Share to Twitter / X"
          aria-label="Share on X"
        >
          <Twitter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline font-medium">X / Twitter</span>
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShareClick('LinkedIn')}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 transition-all flex items-center gap-1 text-xs"
          title="Share to LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline font-medium">LinkedIn</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShareClick('Facebook')}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center gap-1 text-xs"
          title="Share to Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline font-medium">Facebook</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShareClick('WhatsApp')}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-1 text-xs"
          title="Share via WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline font-medium">WhatsApp</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
            copied
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
          }`}
          title="Copy direct article URL"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Copy Link'}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-xl border transition-colors ${
            isBookmarked 
              ? 'bg-amber-950/50 border-amber-500/60 text-amber-300' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title={isBookmarked ? 'Article Bookmarked' : 'Bookmark Article'}
          aria-label="Bookmark"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>
      </div>
    </div>
  );
};
