import type { APIRoute } from "astro";
import { siteConfig } from "../config/siteConfig";

/**
 * llms.txt — machine-readable site summary for AI agents (llmstxt.org).
 * Generated from siteConfig so each client site stays accurate.
 */
export const GET: APIRoute = () => {
  const origin = siteConfig.domain.replace(/\/$/, "");
  const { businessName, tagline, serviceArea, phone, email } = siteConfig;

  const body = `# ${businessName}

> ${tagline}. Professional home services in ${serviceArea}.

Contact: ${phone} | ${email}
Site: ${origin}/

## Main pages

- [Home](${origin}/)
- [Services](${origin}/services/)
- [Service Areas](${origin}/service-areas/)
- [About](${origin}/about/)
- [Contact](${origin}/contact/)
- [Blog](${origin}/blog/)

## Optional

- [Sitemap](${origin}/sitemap-index.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
