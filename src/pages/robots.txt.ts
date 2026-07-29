import type { APIRoute } from "astro";
import { siteConfig } from "../config/siteConfig";

export const GET: APIRoute = () => {
  const origin = siteConfig.domain.replace(/\/$/, "");
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
