"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const QUERIES: Record<Breakpoint, string> = {
  mobile: "(max-width: 639px)",
  tablet: "(min-width: 640px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "mobile"; // SSR-safe default
  if (window.matchMedia(QUERIES.desktop).matches) return "desktop";
  if (window.matchMedia(QUERIES.tablet).matches) return "tablet";
  return "mobile";
}

/**
 * Returns the current breakpoint: "mobile" | "tablet" | "desktop".
 * SSR-safe — defaults to "mobile" on the server.
 * Reactively updates on window resize via matchMedia listeners.
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");

  useEffect(() => {
    // Set initial value client-side
    setBreakpoint(getBreakpoint());

    const handlers: Array<{ mql: MediaQueryList; fn: () => void }> = [];

    for (const [key, query] of Object.entries(QUERIES) as [Breakpoint, string][]) {
      const mql = window.matchMedia(query);
      const fn = () => {
        if (mql.matches) setBreakpoint(key);
      };
      mql.addEventListener("change", fn);
      handlers.push({ mql, fn });
    }

    return () => {
      handlers.forEach(({ mql, fn }) => mql.removeEventListener("change", fn));
    };
  }, []);

  return breakpoint;
}
