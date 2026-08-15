// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://manetalibong.com',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      entryLimit: 1000,
      chunks: {
        services: (item) => {
          const path = new URL(item.url).pathname;
          if (path === '/services/' || path.startsWith('/services/')) return item;
        },
        'service-areas': (item) => {
          const path = new URL(item.url).pathname;
          if (path === '/service-areas/' || path.startsWith('/service-areas/')) return item;
        },
        blog: (item) => {
          const path = new URL(item.url).pathname;
          if (path === '/blog/' || path.startsWith('/blog/')) return item;
        },
      },
      filter: (page) =>
        !page.includes('/preview/') &&
        !page.endsWith('/preview'),
    }),
  ],
});
