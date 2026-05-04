import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, "data");
const NEWS_FILE = path.join(DATA_DIR, "news.json");
const FAQ_FILE = path.join(DATA_DIR, "faq.json");
const PORT = Number(process.env.PORT || 3001);

await fs.mkdir(DATA_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────
// Storage helpers (JSON file with serialized writes)
// ─────────────────────────────────────────────────────────────
const SEED_NEWS = [
  {
    id: "sample-ipc",
    author: "Cátedra (ejemplo)",
    url: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
    date: "2025-04-11",
    source: "INDEC",
    region: "Argentina",
    topic: "Inflación / IPC",
    summary:
      "EJEMPLO. El IPC del mes muestra una variación mensual y otra interanual. Recordá: la mensual es respecto al mes anterior; la interanual es respecto al mismo mes del año previo.",
    concepts: "IPC, inflación, variación mensual vs interanual",
    questions:
      "Si la mensual baja, ¿necesariamente bajan los precios? (No: bajó la velocidad, no el nivel.)",
    preview: null,
    createdAt: "2025-04-11T12:00:00.000Z",
  },
  {
    id: "sample-bcra",
    author: "Cátedra (ejemplo)",
    url: "https://www.bcra.gob.ar/Pdfs/Polmon/InformeMonetarioMensual.pdf",
    date: "2025-04-05",
    source: "BCRA",
    region: "Argentina",
    topic: "Política monetaria",
    summary:
      "EJEMPLO. Informe monetario del BCRA: tasa de política monetaria, base monetaria, reservas. Cómo cada una se vincula con el tipo de cambio y la inflación.",
    concepts: "Política monetaria, tasa de interés, base monetaria, reservas",
    questions:
      "Si el BCRA baja la tasa fuerte, ¿qué pasa con el incentivo a quedarse en pesos? Conectar con tipo de cambio.",
    preview: null,
    createdAt: "2025-04-05T12:00:00.000Z",
  },
  {
    id: "sample-fmi",
    author: "Cátedra (ejemplo)",
    url: "https://www.imf.org/en/Countries/ARG",
    date: "2025-03-15",
    source: "IMF / FMI",
    region: "Argentina",
    topic: "Deuda y FMI",
    summary:
      "EJEMPLO. Página país del FMI: review del programa, metas fiscales y monetarias, desembolsos. Útil para seguir las metas de déficit primario y reservas netas.",
    concepts: "Deuda soberana, FMI, déficit primario, reservas",
    questions:
      "¿Cómo se relaciona la meta de reservas con el régimen cambiario y con la Ley 27.612?",
    preview: null,
    createdAt: "2025-03-15T12:00:00.000Z",
  },
];

let writeChain = Promise.resolve();
function serializeWrite(file, value) {
  const next = writeChain.then(() =>
    fs.writeFile(file, JSON.stringify(value, null, 2)),
  );
  writeChain = next.catch(() => {});
  return next;
}

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (e) {
    if (e.code === "ENOENT") return fallback;
    throw e;
  }
}

// Seed news once on first start
{
  const existing = await readJson(NEWS_FILE, null);
  if (!existing) {
    await serializeWrite(NEWS_FILE, SEED_NEWS);
    console.log(`[seed] news.json inicializado con ${SEED_NEWS.length} ejemplos`);
  }
}

// ─────────────────────────────────────────────────────────────
// Open Graph metadata extraction
// ─────────────────────────────────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function pickMeta(html, name, attr = "property") {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re1 = new RegExp(
    `<meta[^>]+${attr}=["']${escapedName}["'][^>]*content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]*${attr}=["']${escapedName}["']`,
    "i",
  );
  const m = html.match(re1) || html.match(re2);
  return m ? decodeEntities(m[1].trim()) : null;
}

async function fetchPreview(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WikiMacroBot/1.0; +https://github.com/)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);

    const ct = r.headers.get("content-type") || "";
    if (!ct.includes("text/html")) {
      return { url, image: null, title: null, description: null, site: null };
    }

    const html = (await r.text()).slice(0, 200000);

    const ogImage =
      pickMeta(html, "og:image") ||
      pickMeta(html, "twitter:image") ||
      pickMeta(html, "twitter:image", "name");
    const ogTitle =
      pickMeta(html, "og:title") ||
      pickMeta(html, "twitter:title", "name") ||
      (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim()
        ? decodeEntities(html.match(/<title[^>]*>([^<]+)<\/title>/i)[1].trim())
        : null);
    const ogDescription =
      pickMeta(html, "og:description") ||
      pickMeta(html, "description", "name") ||
      pickMeta(html, "twitter:description", "name");
    const ogSite = pickMeta(html, "og:site_name");

    let imageAbs = null;
    if (ogImage) {
      try {
        imageAbs = new URL(ogImage, url).toString();
      } catch {
        imageAbs = null;
      }
    }

    return {
      url,
      image: imageAbs,
      title: ogTitle,
      description: ogDescription,
      site: ogSite,
    };
  } catch (e) {
    return { url, image: null, title: null, description: null, site: null, error: e.message };
  }
}

// ─────────────────────────────────────────────────────────────
// HTTP app
// ─────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/news", async (_req, res) => {
  const list = await readJson(NEWS_FILE, []);
  res.json(list);
});

app.post("/api/news", async (req, res) => {
  const body = req.body || {};
  const author = String(body.author || "").trim();
  const url = String(body.url || "").trim();
  if (!url) return res.status(400).json({ error: "url requerido" });
  if (!author) return res.status(400).json({ error: "autor requerido" });
  if (!/^https?:\/\//i.test(url))
    return res.status(400).json({ error: "url debe empezar con http(s)://" });

  const preview = body.preview ?? (await fetchPreview(url));

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    author,
    url,
    date: String(body.date || ""),
    source: String(body.source || "").trim(),
    region: String(body.region || "").trim(),
    topic: String(body.topic || "").trim(),
    summary: String(body.summary || "").trim(),
    concepts: String(body.concepts || "").trim(),
    questions: String(body.questions || "").trim(),
    preview,
  };

  const list = await readJson(NEWS_FILE, []);
  const next = [entry, ...list];
  await serializeWrite(NEWS_FILE, next);
  res.status(201).json(entry);
});

app.delete("/api/news/:id", async (req, res) => {
  const list = await readJson(NEWS_FILE, []);
  const next = list.filter((e) => e.id !== req.params.id);
  if (next.length === list.length) return res.status(404).json({ error: "no encontrado" });
  await serializeWrite(NEWS_FILE, next);
  res.status(204).end();
});

app.get("/api/og", async (req, res) => {
  const url = String(req.query.url || "");
  if (!/^https?:\/\//i.test(url))
    return res.status(400).json({ error: "url inválida" });
  const data = await fetchPreview(url);
  res.json(data);
});

// ─────────────────────────────────────────────────────────────
// FAQ submitted by students (simple persistence)
// ─────────────────────────────────────────────────────────────
app.get("/api/faq", async (_req, res) => {
  const list = await readJson(FAQ_FILE, []);
  res.json(list);
});

app.post("/api/faq", async (req, res) => {
  const body = req.body || {};
  const author = String(body.author || "").trim();
  const q = String(body.q || "").trim();
  if (!q) return res.status(400).json({ error: "pregunta requerida" });
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString().slice(0, 10),
    author,
    q,
  };
  const list = await readJson(FAQ_FILE, []);
  await serializeWrite(FAQ_FILE, [entry, ...list]);
  res.status(201).json(entry);
});

// ─────────────────────────────────────────────────────────────
// Serve the SPA in production
// ─────────────────────────────────────────────────────────────
const dist = path.join(ROOT, "dist");
let hasDist = false;
try {
  await fs.access(path.join(dist, "index.html"));
  hasDist = true;
} catch {}

if (hasDist) {
  app.use(express.static(dist));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
} else {
  console.log("[server] dist/ no encontrado: solo modo API (dev)");
}

app.listen(PORT, () => {
  console.log(`[server] escuchando en :${PORT} · DATA_DIR=${DATA_DIR}`);
});
