import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

/**
 * Generic hook for fetching per-country content.
 * Shows errors in console so you can see exactly why content fails.
 */
export function useContent(fetcher) {
  const { countryCode } = useSite();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    if (!countryCode) return;
    setLoading(true);
    setError(null);
    fetcher(countryCode)
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.error || err?.message || "Unknown error";
        console.error(`[useContent] Failed for ${countryCode}:`, msg, err);
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [countryCode]);

  return { data, loading, error, refetch: load };
}
