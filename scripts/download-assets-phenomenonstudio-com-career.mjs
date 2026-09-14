import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "public/sites/phenomenonstudio-com-7df14782/career-92d350b5/images";

const ASSETS = [
  ["av-5.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-5.png.webp"],
  ["av-1-1.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-1-1.png.webp"],
  ["av-2-1.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-2-1.png.webp"],
  ["av-3-1.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-3-1.png.webp"],
  ["av-4-1.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/av-4-1.png.webp"],
  ["Frame-1686557780.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/Frame-1686557780.png.webp"],
  ["Frame-1686557781.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/Frame-1686557781.png.webp"],
  ["Frame-1686557782.png.webp", "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/2026/01/Frame-1686557782.png.webp"],
  ["asterisk-1.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-10.svg"],
  ["asterisk-2.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-1-1.svg"],
  ["asterisk-3.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-2-1.svg"],
  ["asterisk-4.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-3-1.svg"],
  ["asterisk-5.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-4-1.svg"],
  ["asterisk-6.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-5-1.svg"],
  ["asterisk-7.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-6-1.svg"],
  ["asterisk-8.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-7.svg"],
  ["asterisk-9.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-8.svg"],
  ["asterisk-10.svg", "https://phenomenonstudio.com/wp-content/uploads/2026/01/asterisk-svgrepo-com-2-9.svg"],
];

async function downloadOne([name, url]) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT, name), buf);
  console.log("saved", name);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const batches = [];
  for (let i = 0; i < ASSETS.length; i += 4) batches.push(ASSETS.slice(i, i + 4));
  for (const batch of batches) {
    await Promise.all(batch.map(downloadOne));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
