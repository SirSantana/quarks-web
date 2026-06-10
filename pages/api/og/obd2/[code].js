// pages/api/og/[code].js

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes");

const SEV = {
  high:   { label: "SEVERIDAD ALTA",  color: "#FF3B00" },
  medium: { label: "SEVERIDAD MEDIA", color: "#F59E0B" },
  low:    { label: "SEVERIDAD BAJA",  color: "#10B981" },
};

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapTitle(title = "", maxChars = 38) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === 1) break;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

export default function handler(req, res) {
  const { code } = req.query;
  const filePath = path.join(CONTENT_DIR, `${String(code).toUpperCase()}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  const sev   = SEV[data.severity] ?? SEV.high;
  const lines = wrapTitle(data.title ?? "");
  const line1 = escapeXml(lines[0] ?? "");
  const line2 = escapeXml(lines[1] ?? "");

  // Title sits at y=408 (1 line) or y=408+y=446 (2 lines)
  // Severity bar sits 44px below the last title line
  const sevY = line2 ? 490 : 452;

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">

  <!-- Background -->
  <rect width="1200" height="630" fill="#F8F8F6"/>

  <!-- Technical grid — vertical -->
  <line x1="100"  y1="0" x2="100"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="200"  y1="0" x2="200"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="300"  y1="0" x2="300"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="400"  y1="0" x2="400"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="500"  y1="0" x2="500"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="600"  y1="0" x2="600"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="700"  y1="0" x2="700"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="800"  y1="0" x2="800"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="900"  y1="0" x2="900"  y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="1000" y1="0" x2="1000" y2="630" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="1100" y1="0" x2="1100" y2="630" stroke="#E4E4E0" stroke-width="0.5"/>

  <!-- Technical grid — horizontal -->
  <line x1="0" y1="105" x2="1200" y2="105" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="0" y1="210" x2="1200" y2="210" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="0" y1="315" x2="1200" y2="315" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="0" y1="420" x2="1200" y2="420" stroke="#E4E4E0" stroke-width="0.5"/>
  <line x1="0" y1="525" x2="1200" y2="525" stroke="#E4E4E0" stroke-width="0.5"/>

  <!-- Left severity accent strip -->
  <rect x="0" y="0" width="6" height="630" fill="${sev.color}"/>

  <!-- Branding -->
  <text x="72" y="82"
    font-family="Courier New, monospace"
    font-size="13" font-weight="700"
    fill="#9B9B96" letter-spacing="3">OBD.guide</text>

  <text x="1128" y="82"
    font-family="Courier New, monospace"
    font-size="11" fill="#C4C4BE"
    letter-spacing="2" text-anchor="end">SAE J1979</text>

  <!-- Code — ghost depth layer -->
  <text x="72" y="348"
    font-family="Courier New, monospace"
    font-size="196" font-weight="700"
    fill="${sev.color}" letter-spacing="-6" opacity="0.06">${escapeXml(data.code)}</text>

  <!-- Code — main -->
  <text x="72" y="348"
    font-family="Courier New, monospace"
    font-size="196" font-weight="700"
    fill="${sev.color}" letter-spacing="-6">${escapeXml(data.code)}</text>

  <!-- Title -->
  <text x="72" y="408"
    font-family="Arial, sans-serif"
    font-size="30" font-weight="700"
    fill="#0F0F0F" letter-spacing="-0.8">${line1}</text>
  ${line2 ? `<text x="72" y="446"
    font-family="Arial, sans-serif"
    font-size="30" font-weight="700"
    fill="#0F0F0F" letter-spacing="-0.8">${line2}</text>` : ""}

  <!-- Severity indicator -->
  <rect x="72" y="${sevY}" width="8" height="34" rx="2" fill="${sev.color}"/>
  <text x="92" y="${sevY + 23}"
    font-family="Courier New, monospace"
    font-size="13" font-weight="700"
    fill="${sev.color}" letter-spacing="2">${sev.label}</text>

  <!-- Footer -->
  <text x="72" y="598"
    font-family="Courier New, monospace"
    font-size="11" fill="#C4C4BE"
    letter-spacing="1.5">REFERENCIA TÉCNICA AUTOMOTRIZ</text>

</svg>`;

  res.setHeader("Content-Type",  "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.status(200).send(svg);
}