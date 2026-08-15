// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => {
        const path = new URL(page).pathname;
        const blocked = ["/preview", "/service-areas", "/our-work"];
        return !blocked.some((segment) => path.includes(segment));
      },
    }),
  ],
});
