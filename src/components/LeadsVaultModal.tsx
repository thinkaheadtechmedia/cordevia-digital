import React, { useState, useEffect } from 'react';
import { 
  getStoredLeads, 
  deleteLead, 
  clearAllLeads, 
  exportLeadsToCSV, 
  exportLeadsToJSON, 
  CapturedLead 
} from '../utils/leadCapture';
import { useAdminAuth } from '../utils/useAdminAuth';
import { 
  Database, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  X, 
  Search, 
  Mail, 
  FileSpreadsheet, 
  ExternalLink,
  Calendar,
  Layers,
  UserCheck,
  Send
} from 'lucide-react';

interface LeadsVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const LeadsVaultModal: React.FC<LeadsVaultModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const { isAdmin } = useAdminAuth();
  const [leads, setLeads] = useState<CapturedLead[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'newsletter' | 'contact_inquiry' | 'marketplace_purchase'>('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CapturedLead | null>(null);

  const refreshLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      refreshLeads();
    };
    window.addEventListener('cordevia_leads_updated', handleUpdate);
    return () => window.removeEventListener('cordevia_leads_updated', handleUpdate);
  }, []);

  if (!isOpen || !isAdmin) return null;

  const filtered = leads.filter((l) => {
    const matchesType = filterType === 'all' || l.type === filterType;
    const matchesSearch = 
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.name && l.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.source && l.source.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleCopyEmails = () => {
    const emails = [...new Set(filtered.map((l) => l.email))].join(', ');
    if (!emails) {
      onShowToast('No Emails Found', 'No email addresses to copy.', 'info');
      return;
    }
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast('Emails Copied!', `${filtered.length} email addresses copied to clipboard.`, 'success');
  };

  const handleDelete = (id: string) => {
    const updated = deleteLead(id);
    setLeads(updated);
    if (selectedLead?.id === id) setSelectedLead(null);
    onShowToast('Lead Deleted', 'Removed entry from local storage.', 'info');
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all leads from this device? Make sure to download a CSV backup first.')) {
      clearAllLeads();
      setLeads([]);
      setSelectedLead(null);
      onShowToast('Leads Cleared', 'The local vault has been reset.', 'info');
    }
  };

  const handleEmailSummary = () => {
    const subject = encodeURIComponent(`Cordevia Digital Leads Digest (${leads.length} leads)`);
    const body = encodeURIComponent(
      `Cordevia Digital Leads Digest:\nTotal Captured: ${leads.length}\nGenerated: ${new Date().toLocaleString()}\n\n` +
      leads.map((l, i) => `${i + 1}. [${l.type.toUpperCase()}] ${l.email} (${l.name || 'Anonymous'}) - Source: ${l.source}\n   Date: ${new Date(l.timestamp).toLocaleString()}\n   Details: ${JSON.stringify(l.details || {})}`).join('\n\n')
    );
    window.open(`mailto:chicktitusfomumbod@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0B101E] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Cordevia Leads Vault & Dispatch</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                  {leads.length} Total Captured
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                All submitted contact forms and newsletter subscriber leads captured across your website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportLeadsToCSV}
              className="px-3.5 py-2 rounded-xl bg-teal-950 border border-teal-700 text-teal-300 hover:bg-teal-900 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={handleCopyEmails}
              className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Copy emails list"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>Copy Emails</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Controls & Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search leads by email, name, or source..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'all' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({leads.length})
              </button>
              <button
                onClick={() => setFilterType('newsletter')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'newsletter' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Subscribers ({leads.filter(l => l.type === 'newsletter').length})
              </button>
              <button
                onClick={() => setFilterType('contact_inquiry')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'contact_inquiry' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Proposals ({leads.filter(l => l.type === 'contact_inquiry').length})
              </button>
              <button
                onClick={() => setFilterType('marketplace_purchase')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'marketplace_purchase' ? 'bg-emerald-950 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Orders ({leads.filter(l => l.type === 'marketplace_purchase').length})
              </button>
            </div>

            <button
              onClick={handleEmailSummary}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs flex items-center gap-1.5"
              title="Email summary to owner email"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Send Digest</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                <Database className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-300">No leads found in this view</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submissions from the footer newsletter, blog reading views, and contact proposal form will automatically accumulate here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        lead.type === 'marketplace_purchase'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                          : lead.type === 'contact_inquiry'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                      }`}>
                        {lead.type === 'marketplace_purchase' ? 'Store Order' : lead.type === 'contact_inquiry' ? 'Client Proposal' : 'Newsletter Lead'}
                      </span>
                      <span className="font-semibold text-sm text-white">{lead.email}</span>
                      {lead.name && (
                        <span className="text-xs text-slate-400 font-medium">({lead.name})</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>•</span>
                      <span className="text-cyan-400 font-mono text-[11px]">Source: {lead.source}</span>
                      {lead.details?.company && (
                        <>
                          <span>•</span>
                          <span className="text-slate-300">Company: {lead.details.company}</span>
                        </>
                      )}
                      {lead.details?.budget && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">Budget: {lead.details.budget}</span>
                        </>
                      )}
                    </div>

                    {lead.details?.message && (
                      <p className="text-xs text-slate-400 pt-1 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800/80 mt-1 line-clamp-2">
                        &quot;{lead.details.message}&quot;
                      </p>
                    )}

                    {lead.details?.services && lead.details.services.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {lead.details.services.map((srv, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            {srv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        window.open(`mailto:${lead.email}?subject=Cordevia Digital Follow-up`, '_blank');
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                      title="Email this lead directly"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-800/50 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Storage: Local browser storage (`cordevia_leads_vault_v1`)</span>
            <span>•</span>
            <button 
              onClick={exportLeadsToJSON} 
              className="text-cyan-400 hover:underline"
            >
              Export JSON Backup
            </button>
          </div>

          <div className="flex items-center gap-3">
            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Clear All Leads
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
