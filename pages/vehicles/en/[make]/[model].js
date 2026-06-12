// pages/vehicles/[make]/[model].jsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import VehiclePage from "@/src/Components/Obd/VehiclePage";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes/en");

function slugify(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Parse affectedVehicles from frontmatter ──────────────────────────────────
// Reads the YAML array at the top of each .md:
//   affectedVehicles:
//     - { make: "Toyota", models: "Corolla, RAV4 (note here)" }
//
// Returns [{ make, models: string[], note: string }]
function parseAffectedVehicles(data) {
  const raw = data.affectedVehicles;
  if (!Array.isArray(raw)) return [];

  return raw.flatMap(({ make, models = "" }) => {
    if (!make) return [];

    // Split note from models: "Corolla, RAV4 (the note)" → models + note
    const noteMatch = String(models).match(/^(.*?)\s*\(([^)]+)\)\s*$/s);

    let modelList, note;
    if (noteMatch) {
      modelList = noteMatch[1].split(",").map((m) => m.trim()).filter(Boolean);
      note      = noteMatch[2].trim();
    } else {
      modelList = String(models).split(",").map((m) => m.trim()).filter(Boolean);
      note      = "";
    }

    return modelList.map((model) => ({ make: make.trim(), model, note }));
  });
}

// ─── Build vehicle → codes index from all .md files ──────────────────────────
function buildVehicleIndex() {
  if (!fs.existsSync(CONTENT_DIR)) return new Map();

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const index = new Map(); // key: "make-slug::model-slug"

  for (const file of files) {
    const raw      = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const vehicles = parseAffectedVehicles(data);

    for (const { make, model, note } of vehicles) {
      const key = `${slugify(make)}::${slugify(model)}`;

      if (!index.has(key)) {
        index.set(key, { make, model, codes: [] });
      }

      index.get(key).codes.push({
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

// ─── getStaticPaths ───────────────────────────────────────────────────────────
export async function getStaticPaths() {
  const index = buildVehicleIndex();

  const paths = Array.from(index.values()).map(({ make, model }) => ({
    params: {
      make:  slugify(make),
      model: slugify(model),
    },
  }));

  return { paths, fallback: false };
}

// ─── getStaticProps ───────────────────────────────────────────────────────────
export async function getStaticProps({ params }) {
  const index = buildVehicleIndex();
  const key   = `${params.make}::${params.model}`;
  const entry = index.get(key);

  if (!entry) return { notFound: true };

  // Sort: high → medium → low
  const sevOrder = { high: 0, medium: 1, low: 2 };
  const codes = [...entry.codes].sort(
    (a, b) => (sevOrder[a.severity] ?? 1) - (sevOrder[b.severity] ?? 1)
  );

  const stats = {
    total:  codes.length,
    high:   codes.filter((c) => c.severity === "high").length,
    medium: codes.filter((c) => c.severity === "medium").length,
    low:    codes.filter((c) => c.severity === "low").length,
  };

  return {
    props: { make: entry.make, model: entry.model, codes, stats },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VehicleRoute({ make, model, codes, stats }) {
  return <VehiclePage make={make} model={model} codes={codes} stats={stats} />;
}