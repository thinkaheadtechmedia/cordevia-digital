export interface CapturedLead {
  id: string;
  type: 'newsletter' | 'contact_inquiry' | 'marketplace_purchase';
  email: string;
  name?: string;
  source: string;
  createdAt: string;
  timestamp: number;
  details?: {
    services?: string[];
    budget?: string;
    timeline?: string;
    company?: string;
    website?: string;
    message?: string;
    refCode?: string;
    articleTitle?: string;
    gateway?: string;
    amount?: string;
    interests?: string[];
    subscriberName?: string;
  };
}

const LEADS_STORAGE_KEY = 'cordevia_leads_vault_v1';

export const getStoredLeads = (): CapturedLead[] => {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading leads from storage:', err);
    return [];
  }
};

export const saveLead = (lead: Omit<CapturedLead, 'id' | 'createdAt' | 'timestamp'>): CapturedLead => {
  const existing = getStoredLeads();
  const newLead: CapturedLead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    timestamp: Date.now(),
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for cross-component reactive updates
    window.dispatchEvent(new CustomEvent('cordevia_leads_updated', { detail: { count: updated.length } }));
  } catch (err) {
    console.error('Error saving lead to storage:', err);
  }

  // Also log to console for debugging and transparency
  console.log('📥 [Cordevia Lead Captured]:', newLead);
  return newLead;
};

export const deleteLead = (id: string): CapturedLead[] => {
  const existing = getStoredLeads();
  const filtered = existing.filter(l => l.id !== id);
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('cordevia_leads_updated', { detail: { count: filtered.length } }));
  } catch (err) {
    console.error('Error deleting lead:', err);
  }
  return filtered;
};

export const clearAllLeads = (): void => {
  try {
    localStorage.removeItem(LEADS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('cordevia_leads_updated', { detail: { count: 0 } }));
  } catch (err) {
    console.error('Error clearing leads:', err);
  }
};

export const exportLeadsToCSV = (): void => {
  const leads = getStoredLeads();
  if (leads.length === 0) {
    alert('No captured leads found yet in the vault.');
    return;
  }

  const headers = ['ID', 'Date & Time', 'Type', 'Email', 'Name', 'Source', 'Company', 'Services', 'Budget', 'Message'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${new Date(l.timestamp).toLocaleString()}"`,
    `"${l.type}"`,
    `"${l.email}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.source || '').replace(/"/g, '""')}"`,
    `"${(l.details?.company || '').replace(/"/g, '""')}"`,
    `"${(l.details?.services?.join(', ') || '').replace(/"/g, '""')}"`,
    `"${(l.details?.budget || '').replace(/"/g, '""')}"`,
    `"${(l.details?.message || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `cordevia_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportLeadsToJSON = (): void => {
  const leads = getStoredLeads();
  if (leads.length === 0) {
    alert('No captured leads found yet in the vault.');
    return;
  }

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `cordevia_leads_vault_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
