import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X, Settings, ArrowRight } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'cordevia_cookie_consent';

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCookiePreferences(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent('cordevia_cookie_consent_updated', { detail: prefs }));
  } catch {
    // ignore
  }
}

interface CookieConsentBannerProps {
  onOpenPrivacy?: () => void;
  onOpenDisclosure?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacy,
  onOpenDisclosure,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    advertising: true,
    timestamp: '',
  });

  useEffect(() => {
    const stored = getStoredCookiePreferences();
    if (!stored) {
      // Delay presentation slightly for optimal initial render
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setPreferences(stored);
    }
  }, []);

  // Listen for manual trigger to reopen settings
  useEffect(() => {
    const handleReopen = () => {
      setIsCustomizing(true);
      setIsOpen(true);
    };
    window.addEventListener('cordevia_open_cookie_settings', handleReopen);
    return () => window.removeEventListener('cordevia_open_cookie_settings', handleReopen);
  }, []);

  const handleAcceptAll = () => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(newPrefs);
    setPreferences(newPrefs);
    setIsOpen(false);
    setIsCustomizing(false);
  };

  const handleRejectNonEssential = () => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(newPrefs);
    setPreferences(newPrefs);
    setIsOpen(false);
    setIsCustomizing(false);
  };

  const handleSaveCustom = () => {
    const newPrefs: CookiePreferences = {
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    saveCookiePreferences(newPrefs);
    setIsOpen(false);
    setIsCustomizing(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1120] border border-cyan-800/60 shadow-2xl shadow-cyan-950/40 text-slate-200 space-y-4 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center text-cyan-400 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                Cookie & Privacy Consent
              </h4>
              <p className="text-[11px] text-cyan-400 font-mono">
                Google AdSense & GDPR/CCPA Compliant
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text */}
        {!isCustomizing ? (
          <p className="text-xs text-slate-300 leading-relaxed">
            We use cookies to enhance navigation, analyze site traffic, personalize content, and serve relevant advertising via Google AdSense. You can accept all cookies or customize your preferences to control your privacy.
          </p>
        ) : (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-300">
              Select which categories of cookies and data processing you permit:
            </p>

            {/* Preference toggles */}
            <div className="space-y-2 text-xs">
              {/* Necessary */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>Strictly Necessary</span>
                    <span className="text-[10px] text-cyan-400 font-mono font-normal">(Required)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Essential for site security, navigation, and shopping cart persistence.</p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 cursor-not-allowed"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-white">Analytics & Performance</span>
                  <p className="text-[11px] text-slate-400">Anonymous traffic measurement to improve load times and user journeys.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Advertising & AdSense */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-white">AdSense & Marketing</span>
                  <p className="text-[11px] text-slate-400">Allows Google and authorized ad networks to deliver non-intrusive, relevant ads.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.advertising}
                  onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
          {onOpenPrivacy && (
            <button
              onClick={onOpenPrivacy}
              className="text-cyan-400 hover:underline inline-flex items-center gap-0.5"
            >
              Privacy Policy
            </button>
          )}
          <span>•</span>
          {onOpenDisclosure && (
            <button
              onClick={onOpenDisclosure}
              className="text-teal-400 hover:underline inline-flex items-center gap-0.5"
            >
              Ad & Cookie Disclosure
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {!isCustomizing ? (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 min-w-[120px] px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20 text-center"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setIsCustomizing(true)}
                className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors"
                title="Customize preferences"
                aria-label="Customize cookie preferences"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSaveCustom}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md text-center"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-xl transition-colors"
              >
                Back
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
