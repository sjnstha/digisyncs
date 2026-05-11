import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";

/**
 * Generic hook for fetching content per-country.
 * @param {Function} fetcher — async fn(countryCode) => data
 * @returns { data, loading, error, refetch }
 */
export function useContent(fetcher) {
  const { countryCode } = useSite();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetcher(countryCode)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [countryCode]);

  return { data, loading, error, refetch: load };
}
