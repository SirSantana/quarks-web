// pages/vehicles/index.jsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import VehiclesPage from "@/src/Components/Obd/VehiclesHome";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes/en");

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

export async function getStaticProps() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return { props: { makes: [] } };
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  // makes Map: makeSlug → { make, makeSlug, models: Map<modelSlug, { model, modelSlug, codeCount, severities }> }
  const makesMap = new Map();

  for (const file of files) {
    const raw      = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    const vehicles = parseAffectedVehicles(data);

    for (const { make, model } of vehicles) {
      const makeSlug  = slugify(make);
      const modelSlug = slugify(model);

      if (!makesMap.has(makeSlug)) {
        makesMap.set(makeSlug, { make, makeSlug, models: new Map() });
      }

      const makeEntry = makesMap.get(makeSlug);

      if (!makeEntry.models.has(modelSlug)) {
        makeEntry.models.set(modelSlug, {
          model,
          modelSlug,
          codeCount:  0,
          high:       0,
          medium:     0,
          low:        0,
        });
      }

      const modelEntry = makeEntry.models.get(modelSlug);
      modelEntry.codeCount += 1;
      if (data.severity === "high")        modelEntry.high   += 1;
      else if (data.severity === "medium") modelEntry.medium += 1;
      else if (data.severity === "low")    modelEntry.low    += 1;
    }
  }

  // Serialize: Map → array, sort makes alphabetically, models by codeCount desc
  const makes = Array.from(makesMap.values())
    .sort((a, b) => a.make.localeCompare(b.make))
    .map(({ make, makeSlug, models }) => ({
      make,
      makeSlug,
      totalCodes:  Array.from(models.values()).reduce((s, m) => s + m.codeCount, 0),
      modelCount:  models.size,
      models: Array.from(models.values())
        .sort((a, b) => b.codeCount - a.codeCount),
    }));

  return { props: { makes } };
}

export default function VehiclesRoute({ makes }) {
  return <VehiclesPage makes={makes} />;
}