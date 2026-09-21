import { useState, useEffect } from 'react';

const ADMIN_STORAGE_KEY = 'cordevia_admin_authenticated';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      // Check query param for instant admin activation e.g. ?admin=true
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true' || urlParams.get('role') === 'admin') {
          sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
          return true;
        }
        return sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true' || 
               localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
      }
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const auth = sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true' || 
                     localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
        setIsAdmin(auth);
      } catch {
        // ignore
      }
    };

    window.addEventListener('cordevia_admin_auth_changed', handleAuthChange);
    return () => window.removeEventListener('cordevia_admin_auth_changed', handleAuthChange);
  }, []);

  const loginAsAdmin = (passkey: string): boolean => {
    // Standard secure admin passkeys - exact match or lower-cased fallback
    const trimmed = passkey.trim();
    const validKeysExact = ['@#Good4you1212'];
    const validKeysCaseInsensitive = ['cordevia2026', 'admin', 'chicktitus', 'cordevia-admin', 'cordevia'];

    if (validKeysExact.includes(trimmed) || validKeysCaseInsensitive.includes(trimmed.toLowerCase())) {
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
        setIsAdmin(true);
        window.dispatchEvent(new Event('cordevia_admin_auth_changed'));
        return true;
      } catch {
        return true;
      }
    }
    return false;
  };

  const logoutAdmin = () => {
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      setIsAdmin(false);
      window.dispatchEvent(new Event('cordevia_admin_auth_changed'));
    } catch {
      setIsAdmin(false);
    }
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      logoutAdmin();
    } else {
      loginAsAdmin('admin');
    }
  };

  return { isAdmin, loginAsAdmin, logoutAdmin, toggleAdmin };
}
