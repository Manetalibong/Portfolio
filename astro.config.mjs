// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { googleSitemap } from "./src/integrations/google-sitemap.mjs";

export default defineConfig({
  site: "https://manetalibong.github.io",
  base: "/Portfolio/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [googleSitemap()],
});
