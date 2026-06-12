// pages/vehicles/[make]/index.jsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MakePage from "@/src/Components/Obd/MakePage";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes");

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

    let modelList, note;
    if (noteMatch) {
      modelList = noteMatch[1].split(",").map((m) => m.trim()).filter(Boolean);
      note      = noteMatch[2].trim();
    } else {
      modelList = String(models).split(",").map((m) => m.trim()).filter(Boolean);
      note      = "";
    }

    return modelList.map((model) => ({ make: displayMake, model, note }));
  });
}

function buildMakeIndex() {
  if (!fs.existsSync(CONTENT_DIR)) return new Map();

  const files  = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const index  = new Map(); // makeSlug → { make, models: Map }

  for (const file of files) {
    const raw      = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const vehicles = parseAffectedVehicles(data);

    for (const { make, model, note } of vehicles) {
      const makeSlug  = slugify(make);
      const modelSlug = slugify(model);

      if (!index.has(makeSlug)) {
        index.set(makeSlug, { make, makeSlug, models: new Map() });
      }

      const makeEntry = index.get(makeSlug);

      if (!makeEntry.models.has(modelSlug)) {
        makeEntry.models.set(modelSlug, {
          model, modelSlug,
          codes: [],
        });
      }

      makeEntry.models.get(modelSlug).codes.push({
        code:     data.code     ?? file.replace(".md", ""),
        title:    data.title    ?? "",
        severity: data.severity ?? "medium",
        category: data.category ?? "",
        note,
      });
    }
  }

  return index;
}

export async function getStaticPaths() {
  const index = buildMakeIndex();
  return {
    paths: Array.from(index.keys()).map((make) => ({ params: { make } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const index    = buildMakeIndex();
  const entry    = index.get(params.make);
  if (!entry) return { notFound: true };

  const sevOrder = { high: 0, medium: 1, low: 2 };

  const models = Array.from(entry.models.values())
    .map(({ model, modelSlug, codes }) => {
      const sorted = [...codes].sort(
        (a, b) => (sevOrder[a.severity] ?? 1) - (sevOrder[b.severity] ?? 1)
      );
      return {
        model, modelSlug,
        codeCount: codes.length,
        high:   codes.filter((c) => c.severity === "high").length,
        medium: codes.filter((c) => c.severity === "medium").length,
        low:    codes.filter((c) => c.severity === "low").length,
        topCodes: sorted.slice(0, 3),   // preview chips
      };
    })
    .sort((a, b) => b.codeCount - a.codeCount);

  const stats = {
    totalModels: models.length,
    totalCodes:  models.reduce((s, m) => s + m.codeCount, 0),
    high:        models.reduce((s, m) => s + m.high,      0),
    medium:      models.reduce((s, m) => s + m.medium,    0),
    low:         models.reduce((s, m) => s + m.low,       0),
  };

  return {
    props: {
      make:     entry.make,
      makeSlug: entry.makeSlug,
      models,
      stats,
    },
  };
}

export default function MakeRoute({ make, makeSlug, models, stats }) {
  return <MakePage make={make} makeSlug={makeSlug} models={models} stats={stats} />;
}