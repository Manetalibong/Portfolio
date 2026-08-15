/** Prefix internal paths with Astro's base (needed on GitHub Pages project sites). */
export function withBase(path = "/"): string {
  const rawBase = import.meta.env.BASE_URL || "/";
  const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
  if (!path || path === "/") return `${base}/`;
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
