import type { APIRoute } from "astro";
import { siteConfig } from "../config/siteConfig";
import { withBase } from "../config/paths";

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || siteConfig.domain).replace(/\/$/, "");
  const home = `${origin}${withBase("/")}`;
  const { businessName, tagline, phone, email } = siteConfig;

  const body = `# ${businessName}

> ${tagline}. Web developer, graphic designer, and SEO specialist based in Butuan City.

Contact: ${phone} | ${email}
Site: ${home}

## Main pages

- [Home](${home})
- [Services](${origin}${withBase("/services/")})
- [About](${origin}${withBase("/about/")})
- [Blog](${origin}${withBase("/blog/")})
- [Contact](${origin}${withBase("/contact/")})

## Optional

- [Sitemap](${origin}${withBase("/sitemap.xml")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
