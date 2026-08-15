import type { APIRoute } from "astro";
import { withBase } from "../config/paths";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || "https://manetalibong.github.io").replace(/\/$/, "");
  const xmlSitemap = `${origin}${withBase("/sitemap.xml")}`;
  const textSitemap = `${origin}${withBase("/sitemap.txt")}`;

  const body = `User-agent: *
Allow: /
Disallow: ${withBase("/preview/")}

Sitemap: ${xmlSitemap}
Sitemap: ${textSitemap}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
