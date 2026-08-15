// @ts-check
import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

/** Search Console looks for sitemap.xml; Astro only writes sitemap-index.xml + sitemap-0.xml. */
function aliasSitemapXml() {
  return {
    name: "alias-sitemap-xml",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        await copyFile(path.join(dist, "sitemap-0.xml"), path.join(dist, "sitemap.xml"));
        logger.info("Created sitemap.xml for Google Search Console.");
      },
    },
  };
}

export default defineConfig({
  site: "https://manetalibong.github.io",
  base: "/Portfolio/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      entryLimit: 1000,
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
      filter: (page) => {
        const path = new URL(page).pathname;
        const blocked = ["/preview", "/service-areas", "/our-work"];
        return !blocked.some((segment) => path.includes(segment));
      },
    }),
    aliasSitemapXml(),
  ],
});
