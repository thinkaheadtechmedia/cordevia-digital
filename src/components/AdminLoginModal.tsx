import React, { useState } from 'react';
import { Shield, KeyRound, Lock, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../utils/useAdminAuth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
  onSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onSuccess,
}) => {
  const { loginAsAdmin } = useAdminAuth();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passkey.trim()) {
      setError('Please enter the administrator passkey.');
      return;
    }

    const success = loginAsAdmin(passkey);
    if (success) {
      onShowToast?.('Admin Verified', 'Authenticated as administrator. Admin controls unlocked.', 'success');
      setPasskey('');
      onSuccess?.();
      onClose();
    } else {
      setError('Invalid administrator key. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose} 
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md bg-[#0B101E] border border-cyan-900/60 rounded-2xl shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Administrator Access Verification</h3>
              <p className="text-[11px] text-slate-400">Restricted area for authorized personnel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Admin Passkey
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Protected Resources:</span> Social Media Profile Pictures (.ZIP, 1024px PNG, Master SVG), Avatar Studio, and Leads Vault.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
