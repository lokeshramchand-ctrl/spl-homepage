// One-off asset downloader for the Qurtuba project-page clone.
// Destination: public/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images/
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(
  "public/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images"
);

const W = "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/";
const U = "https://phenomenonstudio.com/wp-content/uploads/";

// [localFilename, fullUrl]
const ASSETS = [
  // Hero
  ["hero-main.png.webp", W + "2025/07/Media-1-4-1-scaled.png.webp"],
  ["overview-flag.png.webp", W + "2025/07/fi_4628635-2-1.png.webp"],
  // Tech stack logos (Overview "Technologies" list)
  ["tech-typescript.png.webp", W + "2025/07/Typescript_logo_2020-1.png.webp"],
  ["tech-react.png.webp", W + "2025/07/react-2-1.png.webp"],
  ["tech-vite.png.webp", W + "2025/07/Vitejs-logo-1.png.webp"],
  ["tech-mui.png.webp", W + "2025/07/mui-logo.png.webp"],
  ["tech-redux.png.webp", W + "2025/07/redux-logo.png.webp"],
  ["tech-i18next.png.webp", W + "2025/07/i18next-icon-1.png.webp"],
  ["tech-firebase.png.webp", W + "2025/07/Firebase_Logo-2.png.webp"],
  ["tech-auth0.png.webp", W + "2025/07/auth0-svgrepo-com-2.png.webp"],
  ["tech-nestjs.png.webp", W + "2025/07/NestJS-logo.png.webp"],
  // Hero gallery (2-up)
  ["gallery-1.png.webp", W + "2025/07/Media-2-4.png.webp"],
  ["gallery-2.png.webp", W + "2025/07/Media-3-4.png.webp"],
  // Comparison slider
  ["comparison-before.png.webp", W + "2025/07/Before-10-scaled.png.webp"],
  ["comparison-after.png.webp", W + "2025/07/After-10-scaled.png.webp"],
  // Research phase images
  ["research-1a.png.webp", W + "2025/07/Media-5-4.png.webp"],
  ["research-1b.png.webp", W + "2025/07/Media-6-4.png.webp"],
  ["research-2a.png.webp", W + "2025/07/Media-7-4.png.webp"],
  ["research-2b.png.webp", W + "2025/07/Media-8-4.png.webp"],
  ["research-3.png.webp", W + "2025/07/Media-9-4-scaled.png.webp"],
  ["research-4.png.webp", W + "2025/07/Media-10-4.png.webp"],
  // Design phase images
  ["design-1.png.webp", W + "2025/07/Media-11-4-scaled.png.webp"],
  ["design-2.png.webp", W + "2025/07/Media-12-4-scaled.png.webp"],
  ["design-3a.png.webp", W + "2025/07/Media-13-4.png.webp"],
  ["design-3b.png.webp", W + "2025/07/Media-14-4.png.webp"],
  ["design-3c.png.webp", W + "2025/07/Media-15-4-scaled.png.webp"],
  ["design-4a.png.webp", W + "2025/07/Media-16-3.png.webp"],
  ["design-4b.png.webp", W + "2025/07/Media-17-3.png.webp"],
  ["design-4c.png.webp", W + "2025/07/Media-18-4-scaled.png.webp"],
  // Features (7, in order: Lesson builder, Assessments, Interactive tasks, Calendar, Fees, Enrolment, Messenger)
  ["feature-1-lesson-builder.png.webp", W + "2025/07/Media-19-4.png.webp"],
  ["feature-2-assessments.png.webp", W + "2025/07/Media-20-4.png.webp"],
  ["feature-3-interactive-tasks.png.webp", W + "2025/07/Media-21-4.png.webp"],
  ["feature-4-calendar.png.webp", W + "2025/07/Media-22-4.png.webp"],
  ["feature-5-fees.png.webp", W + "2025/07/Media-23-4.png.webp"],
  ["feature-6-enrolment.png.webp", W + "2025/07/Media-24-4.png.webp"],
  ["feature-7-messenger.png.webp", W + "2025/07/Media-25-4.png.webp"],
  // Development phase images
  ["dev-1.png.webp", W + "2025/07/Media-26-4-scaled.png.webp"],
  ["dev-2a.png.webp", W + "2025/07/Media-27-4.png.webp"],
  ["dev-2b.png.webp", W + "2025/07/Media-28-4.png.webp"],
  ["dev-3.png.webp", W + "2025/07/Media-29-3.png.webp"],
  ["dev-4.png.webp", W + "2025/07/Media-30-3-scaled.png.webp"],
  // More cases (3)
  ["case-milk-honey.png.webp", W + "2026/08/IMg-Wrapper-2-45.png.webp"],
  ["case-veridian.png.webp", W + "2026/08/IMg-Wrapper-2-43.png.webp"],
  ["case-medaxis.png.webp", W + "2026/08/Frame-2131330033-2.png.webp"],
  ["case-flag.svg", U + "2026/07/fi_4628635-12.svg"],
];

async function downloadOne(filename, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(OUT_DIR, filename), buf);
  console.log(`OK  ${filename} (${buf.length} bytes)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const batchSize = 4;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(
      batch.map(([filename, url]) =>
        downloadOne(filename, url).catch((err) => console.error(`FAIL ${filename}: ${err.message}`))
      )
    );
  }
}

main();
