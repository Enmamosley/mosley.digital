// Genera imágenes OG (1200x630) de marca para posts de blog.
// Uso: node scripts/generateOgImages.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT_DIR = "public/images/blog";
mkdirSync(OUT_DIR, { recursive: true });

const BRAND = {
  bg: "#ffffff",
  text: "#1d1d1d",
  primary: "#fc2919",
  muted: "#6b6b6b",
  site: "mosley.digital",
};

const posts = [
  {
    file: "por-que-tu-empresa-necesita-sitio-web-en-2026.png",
    title: "¿Por qué tu empresa necesita un sitio web profesional en 2026?",
    tag: "DESARROLLO WEB",
  },
  {
    file: "que-es-un-erp-y-cuando-implementar-odoo.png",
    title: "¿Qué es un ERP y cuándo implementar Odoo en tu empresa?",
    tag: "ERP · ODOO",
  },
  {
    file: "google-workspace-vs-correo-profesional-comparativa.png",
    title: "Google Workspace vs correo profesional: comparativa",
    tag: "GUÍA",
  },
];

// Envuelve el título en líneas de ~26 caracteres para 1200px de ancho
function wrap(text, maxChars = 26) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 4); // máx. 4 líneas
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

for (const post of posts) {
  const lines = wrap(post.title);
  const fontSize = lines.length >= 4 ? 56 : 62;
  const lineHeight = fontSize * 1.25;
  const startY = 630 / 2 - ((lines.length - 1) * lineHeight) / 2 + 8;

  const titleSpans = lines
    .map(
      (line, i) =>
        `<text x="90" y="${startY + i * lineHeight}" font-size="${fontSize}" font-weight="700" fill="${BRAND.text}">${escapeXml(line)}</text>`,
    )
    .join("\n  ");

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BRAND.bg}"/>
  <rect x="0" y="0" width="14" height="630" fill="${BRAND.primary}"/>
  <text x="90" y="150" font-size="26" font-weight="700" letter-spacing="6" fill="${BRAND.primary}">${escapeXml(post.tag)}</text>
  ${titleSpans}
  <text x="90" y="560" font-size="30" font-weight="600" fill="${BRAND.muted}">${BRAND.site}</text>
  <circle cx="1090" cy="550" r="8" fill="${BRAND.primary}"/>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(`${OUT_DIR}/${post.file}`);
  console.log(`✓ ${OUT_DIR}/${post.file}`);
}
console.log("Listo.");
