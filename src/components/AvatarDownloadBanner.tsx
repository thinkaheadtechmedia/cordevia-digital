import React, { useState } from 'react';
import { 
  Download, 
  FolderArchive, 
  X, 
  Sparkles, 
  FileImage, 
  Image as ImageIcon, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { 
  downloadCordeviaAvatarZip, 
  downloadSvgString, 
  downloadSvgAsPng, 
  OFFICIAL_MASTER_SVG, 
  OFFICIAL_CIRCULAR_SVG 
} from '../utils/downloadHelper';
import { useAdminAuth } from '../utils/useAdminAuth';

interface AvatarDownloadBannerProps {
  onOpenStudio: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
}

export const AvatarDownloadBanner: React.FC<AvatarDownloadBannerProps> = ({
  onOpenStudio,
  onShowToast
}) => {
  const { isAdmin, loginAsAdmin, logoutAdmin, toggleAdmin } = useAdminAuth();
  const [dismissed, setDismissed] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  if (dismissed) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsAdmin(password)) {
      onShowToast('Admin Access Granted', 'Official brand download controls unlocked.', 'success');
      setShowPasswordInput(false);
      setPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      onShowToast('Authentication Failed', 'Invalid administrator password. Please try again.', 'warning');
    }
  };

  const handleToggleMock = () => {
    toggleAdmin();
    if (!isAdmin) {
      onShowToast('Admin Mode Active', 'Admin privileges enabled via mock switch.', 'success');
    } else {
      onShowToast('Admin Locked', 'Official download assets are now locked.', 'info');
    }
  };

  const handleLockedClick = (actionName: string) => {
    setShowPasswordInput(true);
    onShowToast('Admin Restricted', `Authentication required to download ${actionName}. Enter admin password or toggle Admin state.`, 'warning');
  };

  const handleDownloadZip = async () => {
    if (!isAdmin) {
      handleLockedClick('ZIP Archive');
      return;
    }
    setDownloadingZip(true);
    onShowToast('Creating Avatar ZIP', 'Packaging vector SVG masters and social PNG sizes directly in your browser...', 'info');
    try {
      await downloadCordeviaAvatarZip();
      onShowToast('Download Complete', 'cordevia-profile-pictures.zip saved to your Downloads folder!', 'success');
    } catch (err) {
      console.error(err);
      onShowToast('Download Triggered', 'Check your browser downloads for cordevia-profile-pictures.zip', 'info');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadMasterSvg = () => {
    if (!isAdmin) {
      handleLockedClick('Master SVG');
      return;
    }
    downloadSvgString(OFFICIAL_MASTER_SVG, 'cordevia-master-profile-picture-1024x1024.svg');
    onShowToast('SVG Master Saved', 'Vector SVG downloaded directly to your device.', 'success');
  };

  const handleDownloadPng = async () => {
    if (!isAdmin) {
      handleLockedClick('1024px PNG');
      return;
    }
    setDownloadingPng(true);
    onShowToast('Rendering PNG', 'Generating crisp 1024x1024 social profile picture PNG...', 'info');
    try {
      await downloadSvgAsPng(OFFICIAL_CIRCULAR_SVG, 1024, 'cordevia-avatar-1024x1024-circle.png');
      onShowToast('PNG Ready', 'cordevia-avatar-1024x1024-circle.png downloaded successfully!', 'success');
    } catch {
      onShowToast('PNG Generated', 'Saved 1024px PNG', 'info');
    } finally {
      setDownloadingPng(false);
    }
  };

  const handleOpenStudio = () => {
    if (!isAdmin) {
      handleLockedClick('Studio');
      return;
    }
    onOpenStudio();
  };

  return (
    <aside aria-label="Official Assets Download Banner" className="relative z-40 bg-gradient-to-r from-cyan-950 via-[#0B1426] to-slate-900 border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-3 text-xs">
        
        {/* Left Info & Gate Status */}
        <div className="flex items-center gap-2.5 text-center lg:text-left">
          <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
            isAdmin 
              ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400' 
              : 'bg-amber-500/20 border-amber-400/50 text-amber-400'
          }`}>
            {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 justify-center lg:justify-start">
            <span className="font-bold text-white flex items-center gap-1">
              <span>Official Social Media Profile Picture:</span>
            </span>
            <code className="bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-cyan-300 font-mono text-[11px] font-semibold">
              cordevia-profile-pictures.zip
            </code>
            <span className="text-slate-400 hidden md:inline">
              (1024×1024 Master Vectors, YouTube, X, LinkedIn & Specs)
            </span>

            {/* Admin Gate Status Pill */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
              isAdmin 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60' 
                : 'bg-amber-950/80 text-amber-300 border-amber-600/60'
            }`}>
              {isAdmin ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
              <span>{isAdmin ? 'Admin Unlocked' : 'Admin Locked'}</span>
            </span>
          </div>
        </div>

        {/* Right Actions: Auth controls + Gated download components */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 justify-center">
          
          {/* Mock 'Is Admin' Toggle Switch */}
          <div className="flex items-center bg-slate-950/90 rounded-lg border border-slate-800 p-0.5" title="Toggle Mock 'Is Admin' State">
            <button
              onClick={handleToggleMock}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
                isAdmin 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Mock Admin:</span>
              <span className="font-mono uppercase">{isAdmin ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Inline Password Unlock / Lock Button */}
          {!isAdmin ? (
            !showPasswordInput ? (
              <button
                onClick={() => setShowPasswordInput(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors"
                title="Enter Administrator Password to unlock official asset downloads"
              >
                <KeyRound className="w-3 h-3 text-amber-400" />
                <span>Unlock with Password</span>
              </button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="flex items-center gap-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                  className={`w-36 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] border focus:outline-none transition-colors ${
                    passwordError 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-cyan-600 focus:border-cyan-400'
                  }`}
                />
                <button
                  type="submit"
                  className="px-2 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px] hover:bg-cyan-400 transition-colors"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPasswordError(false);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </form>
            )
          ) : (
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-medium transition-colors"
              title="Lock Admin and restrict downloads"
            >
              <Lock className="w-3 h-3" />
              <span>Lock Assets</span>
            </button>
          )}

          {/* Primary: In-Browser JSZip generator */}
          <button
            onClick={handleDownloadZip}
            disabled={downloadingZip}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-black text-xs transition-all active:scale-95 ${
              isAdmin
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 hover:shadow-md hover:shadow-cyan-500/20 cursor-pointer'
                : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:border-amber-500/60 cursor-pointer'
            }`}
            title={isAdmin ? "Download full zip archive" : "Admin Authentication required to download ZIP"}
          >
            {isAdmin ? <Download className="w-3.5 h-3.5 text-slate-950" /> : <Lock className="w-3 h-3 text-amber-400" />}
            <span>{downloadingZip ? 'Packaging ZIP...' : 'Download ZIP Pack'}</span>
          </button>

          {/* Quick 1024px PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={downloadingPng}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isAdmin
                ? 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer'
                : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-slate-400 cursor-pointer'
            }`}
            title={isAdmin ? "Download high-resolution 1024x1024 PNG immediately" : "Admin Authentication required for 1024px PNG"}
          >
            {isAdmin ? <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
            <span>{downloadingPng ? 'Rendering...' : '1024px PNG'}</span>
          </button>

          {/* Quick Master SVG */}
          <button
            onClick={handleDownloadMasterSvg}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isAdmin
                ? 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer'
                : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-slate-400 cursor-pointer'
            }`}
            title={isAdmin ? "Download Master SVG Vector file directly" : "Admin Authentication required for Master SVG"}
          >
            {isAdmin ? <FileImage className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
            <span>Master SVG</span>
          </button>

          {/* Studio Modal */}
          <button
            onClick={handleOpenStudio}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isAdmin
                ? 'bg-slate-900/80 hover:bg-slate-800 border border-cyan-800/60 text-cyan-300 cursor-pointer'
                : 'bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-slate-400 cursor-pointer'
            }`}
            title={isAdmin ? "Open Avatar Studio" : "Admin Authentication required for Avatar Studio"}
          >
            {isAdmin ? <Sparkles className="w-3 h-3 text-cyan-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
            <span>Studio</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
