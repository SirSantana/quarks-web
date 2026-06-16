// pages/sitemap.xml.js
// Genera el sitemap dinámico leyendo todos los .md de content/codes
// Accesible en: /sitemap.xml

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes");
const BASE_URL    = process.env.NEXT_PUBLIC_VERCEL_URL;

function slugify(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseAffectedVehicles(data) {
  const raw = data.affectedVehicles;
  if (!Array.isArray(raw)) return [];

  return raw.flatMap(({ make, models = "" }) => {
    if (!make) return [];
    const displayMake = String(make).replace(/\s*\/\s*/g, " / ").trim();
    const noteMatch   = String(models).match(/^(.*?)\s*\(([^)]+)\)\s*$/s);
    const modelList   = noteMatch
      ? noteMatch[1].split(",").map((m) => m.trim()).filter(Boolean)
      : String(models).split(",").map((m) => m.trim()).filter(Boolean);

    return modelList.map((model) => ({ make: displayMake, model }));
  });
}

function escape(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function url(loc, { priority = "0.5", changefreq = "monthly" } = {}) {
  return `
  <url>
    <loc>${escape(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default function Sitemap() { return null; }

export async function getServerSideProps({ res }) {
  const files = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"))
    : [];

  // ── Collect codes + vehicles ──────────────────────────────────────────────
  const codeUrls    = [];
  const vehicleKeys = new Set(); // "makeSlug::modelSlug"
  const makeKeys    = new Set(); // "makeSlug"

  for (const file of files) {
    const raw      = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const code     = (data.code ?? file.replace(".md", "")).toUpperCase();

    // /obd2/[code]
    codeUrls.push(
      url(`${BASE_URL}/obd2/${code}`, { priority: "0.9", changefreq: "weekly" })
    );

    // /vehicles/[make]/[model]  &  /vehicles/[make]
    for (const { make, model } of parseAffectedVehicles(data)) {
      const makeSlug  = slugify(make);
      const modelSlug = slugify(model);

      makeKeys.add(makeSlug);
      vehicleKeys.add(`${makeSlug}::${modelSlug}`);
    }
  }

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticUrls = [
    url(`${BASE_URL}`,          { priority: "1.0", changefreq: "daily"   }),
    url(`${BASE_URL}/obd2`,     { priority: "0.9", changefreq: "weekly"  }),
    url(`${BASE_URL}/vehicles`, { priority: "0.8", changefreq: "weekly"  }),
  ];

  // ── Make pages ────────────────────────────────────────────────────────────
  const makeUrls = Array.from(makeKeys).map((makeSlug) =>
    url(`${BASE_URL}/vehicles/${makeSlug}`, { priority: "0.7", changefreq: "weekly" })
  );

  // ── Model pages ───────────────────────────────────────────────────────────
  const modelUrls = Array.from(vehicleKeys).map((key) => {
    const [makeSlug, modelSlug] = key.split("::");
    return url(`${BASE_URL}/vehicles/${makeSlug}/${modelSlug}`, {
      priority:   "0.7",
      changefreq: "weekly",
    });
  });

  // ── Build XML ─────────────────────────────────────────────────────────────
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${staticUrls.join("")}
${codeUrls.join("")}
${makeUrls.join("")}
${modelUrls.join("")}
</urlset>`;

  res.setHeader("Content-Type",  "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
}