import React, { createContext, useContext, useState, useEffect } from "react";
import fetchPriceList from "../api/PriceApi";

/**
 * Normalizes any currency representation (code, numeric ID, ASP.NET cookie string)
 * into a standard 3-letter currency code ('USD', 'INR', 'MYR', 'GBP', etc.)
 */
export const parseAstroVedCurrency = (raw) => {
  if (!raw) return null;
  const str = String(raw).trim().replace(/^["']|["']$/g, '');

  // 1. Check if string contains explicit CurrencyCode=XXX
  const codeMatch = str.match(/(?:CurrencyCode|currency|code)\s*=\s*([A-Za-z]{3})/i);
  if (codeMatch && codeMatch[1]) {
    return codeMatch[1].toUpperCase();
  }

  // 2. Check if string contains explicit CurrencyId=X (1=USD, 2=INR, 3=MYR, 5=GBP)
  const idMatch = str.match(/(?:CurrencyId|id)\s*=\s*(\d+)/i);
  if (idMatch && idMatch[1]) {
    const id = idMatch[1];
    if (id === '1') return 'USD';
    if (id === '2') return 'INR';
    if (id === '3') return 'MYR';
    if (id === '5') return 'GBP';
  }

  const clean = str.toUpperCase();

  // 3. Direct numeric ID mapping
  if (clean === '1' || clean === 'USD') return 'USD';
  if (clean === '2' || clean === 'INR') return 'INR';
  if (clean === '3' || clean === 'MYR') return 'MYR';
  if (clean === '5' || clean === 'GBP') return 'GBP';
  if (clean === 'EUR') return 'EUR';
  if (clean === 'CAD') return 'CAD';
  if (clean === 'AUD') return 'AUD';
  if (clean === 'SGD') return 'SGD';

  // 4. Substring presence check
  if (clean.includes('USD')) return 'USD';
  if (clean.includes('MYR')) return 'MYR';
  if (clean.includes('GBP')) return 'GBP';
  if (clean.includes('INR')) return 'INR';

  return clean.length === 3 ? clean : null;
};

/**
 * Reads and parses currency from document.cookie, matching any cookie
 * variant used by AstroVed ('currentcurrency', 'CurrentCurrency', 'currency', etc.)
 */
export const getAstroVedCookieCurrency = () => {
  if (typeof document === 'undefined') return null;

  try {
    const cookies = (document.cookie || '').split(';');
    for (let c of cookies) {
      const parts = c.trim().split('=');
      const key = parts[0]?.trim();
      const val = parts.slice(1).join('=').trim();

      if (/^(currentcurrency|currency|selectedcurrency|usercurrency)$/i.test(key)) {
        const decoded = decodeURIComponent(val);
        const parsed = parseAstroVedCurrency(decoded);
        if (parsed) return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading cookie currency:', err);
  }

  // Also check parent window cookie if accessible (when embedded on astroved.com)
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      const parentCookies = (window.parent.document.cookie || '').split(';');
      for (let c of parentCookies) {
        const parts = c.trim().split('=');
        const key = parts[0]?.trim();
        const val = parts.slice(1).join('=').trim();
        if (/^(currentcurrency|currency|selectedcurrency|usercurrency)$/i.test(key)) {
          const parsed = parseAstroVedCurrency(decodeURIComponent(val));
          if (parsed) return parsed;
        }
      }
    }
  } catch {
    // Cross-origin iframe parent access security restriction, safely ignored
  }

  return null;
};

/**
 * Detects the active currency from AstroVed cookies, URL query params,
 * window global variables, localStorage, or browser location.
 */
export const detectCurrentCurrency = () => {
  // 1. URL parameters have highest override priority (?currency=USD or ?curr=MYR)
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCurrency = params.get('currency') || params.get('curr') || params.get('currentcurrency');
      if (urlCurrency) {
        const parsed = parseAstroVedCurrency(urlCurrency);
        if (parsed) return parsed;
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  // 2. AstroVed Cookie ('currentcurrency') - Primary Source of Truth
  const cookieCurrency = getAstroVedCookieCurrency();
  if (cookieCurrency) {
    return cookieCurrency;
  }

  // 3. Global window variable (if injected by AstroVed page)
  if (typeof window !== 'undefined') {
    const windowCurrency = window.currentcurrency || window.CurrentCurrency || window.astrovedCurrency;
    if (windowCurrency) {
      const parsed = parseAstroVedCurrency(windowCurrency);
      if (parsed) return parsed;
    }
  }

  // 4. Check localStorage or sessionStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('currentcurrency') || sessionStorage.getItem('currentcurrency');
      if (stored) {
        const parsed = parseAstroVedCurrency(stored);
        if (parsed) return parsed;
      }

      // Check lead form data if saved
      const leadDataStr = sessionStorage.getItem('past_life_lead_data') || localStorage.getItem('past_life_lead_data');
      if (leadDataStr) {
        const leadData = JSON.parse(leadDataStr);
        const country = (leadData.country || leadData.birthCountry || '').toLowerCase();
        if (country.includes('india') || country === 'in') return 'INR';
        if (country.includes('malaysia') || country === 'my') return 'MYR';
        if (country.includes('united kingdom') || country === 'gb' || country === 'uk') return 'GBP';
        if (country.includes('united states') || country === 'us' || country === 'usa') return 'USD';
      }
    } catch {
      // Ignore storage errors
    }
  }

  // 5. Browser Timezone heuristic
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India')) {
      return 'INR';
    }
    if (tz.includes('Kuala_Lumpur') || tz.includes('Malaysia')) {
      return 'MYR';
    }
    if (tz.includes('London')) {
      return 'GBP';
    }
  } catch {
    // Ignore timezone detection errors
  }

  // 6. Default fallback to INR
  return 'INR';
};

const PriceContext = createContext(undefined);

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrencyState] = useState(() => detectCurrentCurrency());

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchPriceList();
        setPrices(data);
      } catch (err) {
        setError(err.message || "Failed to load prices");
      } finally {
        setIsLoading(false);
      }
    };

    loadPrices();
  }, []);

  useEffect(() => {
    const checkCurrency = () => {
      const detected = detectCurrentCurrency();
      setCurrencyState((prev) => (prev !== detected ? detected : prev));
    };

    checkCurrency();

    // Check periodically so cookie changes in AstroVed header or DevTools immediately update
    const intervalId = setInterval(checkCurrency, 600);

    // Listen for postMessage from parent window (for iframe embeds)
    const handleMessage = (event) => {
      if (event.data?.currentcurrency || event.data?.currency) {
        const parsed = parseAstroVedCurrency(event.data.currentcurrency || event.data.currency);
        if (parsed) setCurrencyState(parsed);
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', checkCurrency);
    window.addEventListener('popstate', checkCurrency);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', checkCurrency);
      window.removeEventListener('popstate', checkCurrency);
    };
  }, []);

  const setCurrency = (newCurrency) => {
    if (!newCurrency) return;
    const parsed = parseAstroVedCurrency(newCurrency);
    if (!parsed) return;

    setCurrencyState(parsed);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentcurrency', parsed);
        document.cookie = `currentcurrency=${parsed}; path=/; max-age=31536000`;
      }
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <PriceContext.Provider value={{ prices, isLoading, error, currency, setCurrency }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePrice must be used within a PriceProvider");
  }
  return context;
};

export const useCurrentCurrency = () => {
  const { currency, setCurrency } = usePrice();
  return { currency, setCurrency };
};
