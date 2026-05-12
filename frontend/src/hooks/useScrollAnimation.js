import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver to make scroll-fade elements visible.
 * Uses threshold:0 + rootMargin so elements in viewport trigger immediately.
 * Falls back to making visible after 300ms in case observer doesn't fire.
 */
export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if observer never fires (e.g. element already visible on mount)
    // make it visible after a short delay
    const fallback = setTimeout(() => {
      el.classList.add("visible");
    }, 300);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallback);
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px", // trigger 50px before entering viewport
      },
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return ref;
}
