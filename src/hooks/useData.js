import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { publicUrl } from '../utils/publicUrl';

/**
 * Hook to fetch and parse data from the /sources directory.
 * @param {string} filename - The name of the file to fetch (e.g., 'Cash Inflows.csv' or 'Observations.md').
 * @returns {Object} { data, loading, error }
 */
export function useData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filename) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(publicUrl(`sources/${filename}`), window.location.origin);
        if (import.meta.env.DEV) {
          // Avoid stale cached data in dev when files change.
          url.searchParams.set('t', Date.now().toString());
        }
        const response = await fetch(url, {
          cache: import.meta.env.DEV ? 'no-store' : 'default',
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok || (contentType && contentType.includes('text/html'))) {
             throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText} - Possibly 404 returning index.html`);
        }

        const text = await response.text();

        if (filename.endsWith('.csv')) {
          Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.errors.length > 0) {
                 console.warn('CSV Parsing errors:', results.errors);
              }
              setData(results.data);
              setLoading(false);
            },
            error: (err) => {
              setError(err);
              setLoading(false);
            }
          });
        } else {
          // Assume text/markdown
          setData(text);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [filename]);

  return { data, loading, error };
}
