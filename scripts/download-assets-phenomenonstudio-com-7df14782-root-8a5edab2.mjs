import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetRoot = path.join(root, "public/sites/phenomenonstudio-com-7df14782/root-8a5edab2");

const listPath = path.join(root, "docs/research/phenomenonstudio-com-7df14782/root-8a5edab2/asset-urls.txt");
const urls = fs.readFileSync(listPath, "utf-8").split("\n").map(l => l.trim()).filter(Boolean);

function destFor(url) {
  const u = new URL(url);
  let name = path.basename(u.pathname);
  // webp-express duplicates: webp-images/uploads/... -> flatten & keep .webp
  let dir = "images";
  if (name.endsWith(".mp4")) dir = "videos";
  else if (name.endsWith(".svg")) dir = "icons";
  return { dir, name };
}

async function downloadOne(url) {
  const { dir, name } = destFor(url);
  const outDir = path.join(assetRoot, dir);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, name);
  if (fs.existsSync(outPath)) return { url, status: "skip-exists" };
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return { url, status: `error-${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    return { url, status: "ok", bytes: buf.length };
  } catch (e) {
    return { url, status: "error-" + e.message };
  }
}

async function run() {
  const results = [];
  const batchSize = 4;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(downloadOne));
    results.push(...batchResults);
    console.log(`Progress: ${Math.min(i + batchSize, urls.length)}/${urls.length}`);
  }
  const errors = results.filter(r => r.status.startsWith("error"));
  const ok = results.filter(r => r.status === "ok");
  const skipped = results.filter(r => r.status === "skip-exists");
  console.log(`Done. ok=${ok.length} skipped=${skipped.length} errors=${errors.length}`);
  if (errors.length) console.log(JSON.stringify(errors, null, 1));
}

run();
