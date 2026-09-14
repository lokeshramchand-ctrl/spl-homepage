import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(
  process.cwd(),
  "public/sites/phenomenonstudio-com-7df14782/article-faq-what-services-does-phenomenon-studio-offer-35204c8a/images"
);

const ASSETS = [
  {
    url: "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/02/Profile-Picture-Container-1-150x150.png.webp",
    name: "author-oleksandr.png.webp",
  },
  {
    url: "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/02/Profile-Picture-Container-9-1-150x150.png.webp",
    name: "author-yuliya.png.webp",
  },
  {
    url: "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/08/cover-2026-08-31T213822.816.png.webp",
    name: "insight-fintech-ux.png.webp",
  },
  {
    url: "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/08/cover-121.png.webp",
    name: "insight-website-development.png.webp",
  },
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${dest} (${buf.length} bytes)`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const batchSize = 4;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(
      batch.map((a) => download(a.url, path.join(OUT_DIR, a.name)).catch((e) => console.error(e.message)))
    );
  }
}

main();
