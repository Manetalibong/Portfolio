import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BLOCKED = ["/preview/", "/service-areas/", "/our-work/"];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function joinUrl(origin, base, pagePath) {
  const host = String(origin).replace(/\/$/, "");
  const prefix = String(base || "/").replace(/\/$/, "") || "";
  if (pagePath === "/") return `${host}${prefix}/`;
  return `${host}${prefix}${pagePath}`;
}

async function walkIndexHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walkIndexHtml(full)));
    else if (entry.name === "index.html") files.push(full);
  }
  return files;
}

function htmlFileToPagePath(dist, file) {
  const rel = path.relative(dist, path.dirname(file)).replaceAll("\\", "/");
  if (!rel || rel === ".") return "/";
  return `/${rel}/`;
}

async function blogLastmods(rootDir) {
  const dir = path.join(rootDir, "src/content/blog");
  /** @type {Record<string, string>} */
  const dates = {};
  try {
    const files = (await readdir(dir)).filter((name) => name.endsWith(".md"));
    for (const file of files) {
      const raw = await readFile(path.join(dir, file), "utf8");
      const match = raw.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
      if (!match) continue;
      const slug = file.replace(/\.md$/, "");
      dates[`/blog/${slug}/`] = match[1];
    }
  } catch {
    // No blog folder yet.
  }
  return dates;
}

/** Builds Google Search Central XML + text sitemaps (not a sitemap index). */
export function googleSitemap() {
  /** @type {{ origin: string, base: string, rootDir: string }} */
  let site = {
    origin: "https://manetalibong.github.io",
    base: "/Portfolio/",
    rootDir: process.cwd(),
  };

  return {
    name: "google-sitemap",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = {
          origin: config.site ? new URL(config.site).origin : site.origin,
          base: config.base || "/",
          rootDir: fileURLToPath(config.root),
        };
      },
      "astro:build:done": async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const htmlFiles = await walkIndexHtml(dist);
        const lastmods = await blogLastmods(site.rootDir);

        const pages = htmlFiles
          .map((file) => htmlFileToPagePath(dist, file))
          .filter((pagePath) => !BLOCKED.some((segment) => pagePath.includes(segment)))
          .sort((a, b) => a.localeCompare(b));

        const urls = pages.map((pagePath) => ({
          loc: joinUrl(site.origin, site.base, pagePath),
          lastmod: lastmods[pagePath],
        }));

        const xmlLines = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ];
        for (const url of urls) {
          xmlLines.push("  <url>");
          xmlLines.push(`    <loc>${escapeXml(url.loc)}</loc>`);
          if (url.lastmod) xmlLines.push(`    <lastmod>${url.lastmod}</lastmod>`);
          xmlLines.push("  </url>");
        }
        xmlLines.push("</urlset>", "");

        const xml = xmlLines.join("\n");
        const txt = `${urls.map((url) => url.loc).join("\n")}\n`;

        await writeFile(path.join(dist, "sitemap.xml"), xml, "utf8");
        await writeFile(path.join(dist, "sitemap.txt"), txt, "utf8");
        logger.info(`Wrote sitemap.xml and sitemap.txt with ${urls.length} canonical URLs.`);
      },
    },
  };
}
