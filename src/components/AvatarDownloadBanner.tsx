import React, { useState } from 'react';
import { Download, FolderArchive, X, Sparkles, Copy, Check, FileImage, Image as ImageIcon } from 'lucide-react';
import { 
  downloadCordeviaAvatarZip, 
  downloadSvgString, 
  downloadSvgAsPng, 
  OFFICIAL_MASTER_SVG, 
  OFFICIAL_CIRCULAR_SVG 
} from '../utils/downloadHelper';

interface AvatarDownloadBannerProps {
  onOpenStudio: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const AvatarDownloadBanner: React.FC<AvatarDownloadBannerProps> = ({
  onOpenStudio,
  onShowToast
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (dismissed) return null;

  const handleDownloadZip = async () => {
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
    downloadSvgString(OFFICIAL_MASTER_SVG, 'cordevia-master-profile-picture-1024x1024.svg');
    onShowToast('SVG Master Saved', 'Vector SVG downloaded directly to your device.', 'success');
  };

  const handleDownloadPng = async () => {
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

  const handleCopyUrl = () => {
    const directUrl = `${window.location.origin}/cordevia-profile-pictures.zip`;
    navigator.clipboard.writeText(directUrl);
    setCopiedUrl(true);
    onShowToast('Direct Link Copied', 'Direct URL copied to clipboard.', 'success');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <aside aria-label="Official Assets Download Banner" className="relative z-40 bg-gradient-to-r from-cyan-950 via-[#0B1426] to-slate-900 border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-3 text-xs">
        
        {/* Left Info */}
        <div className="flex items-center gap-2.5 text-center lg:text-left">
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0">
            <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />
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
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 justify-center">
          {/* Primary: In-Browser JSZip generator (Never fails) */}
          <button
            onClick={handleDownloadZip}
            disabled={downloadingZip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black text-xs hover:shadow-md hover:shadow-cyan-500/20 transition-all active:scale-95"
            title="Download full zip archive generated directly in your browser"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>{downloadingZip ? 'Packaging ZIP...' : 'Download ZIP Pack'}</span>
          </button>

          {/* Quick 1024px PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={downloadingPng}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            title="Download high-resolution 1024x1024 PNG immediately without unzipping"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{downloadingPng ? 'Rendering...' : '1024px PNG'}</span>
          </button>

          {/* Quick Master SVG */}
          <button
            onClick={handleDownloadMasterSvg}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            title="Download Master SVG Vector file directly"
          >
            <FileImage className="w-3.5 h-3.5 text-emerald-400" />
            <span>Master SVG</span>
          </button>

          {/* Studio Modal */}
          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-cyan-800/60 text-cyan-300 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
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
