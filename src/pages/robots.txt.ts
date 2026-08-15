import type { APIRoute } from "astro";
import { withBase } from "../config/paths";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || "https://manetalibong.github.io").replace(/\/$/, "");
  const sitemap = `${origin}${withBase("/sitemap.xml")}`;

  const body = `User-agent: *
Allow: /
Disallow: ${withBase("/preview/")}

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
