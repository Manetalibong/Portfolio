// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { googleSitemap } from "./src/integrations/google-sitemap.mjs";

export default defineConfig({
  site: "https://manetalibong.com",
  base: "/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [googleSitemap()],
});
