import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_IMAGES = "public/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/images";
const OUT_VIDEOS = "public/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/videos";
const OUT_AUDIO = "public/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/audio";

const U = "https://phenomenonstudio.com/wp-content/uploads/";
const W = "https://phenomenonstudio.com/wp-content/webp-express/webp-images/uploads/";

const IMAGES = [
  // founder avatar
  ["polina-avatar.png.webp", `${W}2026/02/av.png.webp`],
  // office / team gallery
  ["gallery-1.jpg.webp", `${W}2025/04/IMG_0477-e1776164064781.jpg.webp`],
  ["gallery-2.jpg.webp", `${W}2025/04/telegram-cloud-document-2-5300745544623214765-1.jpg.webp`],
  ["gallery-3.jpg.webp", `${W}2025/05/telegram-cloud-document-2-5300745544623214761.jpg.webp`],
  ["gallery-4.jpg.webp", `${W}2025/04/IMG_0478.jpg.webp`],
  ["gallery-5.jpg.webp", `${W}2025/05/telegram-cloud-photo-size-2-5253719888026007023-y.jpg.webp`],
  // leadership photos
  ["team-polina.png.webp", `${W}2026/02/Profile-Picture-Container-4.png.webp`],
  ["team-valerii.png.webp", `${W}2026/02/Profile-Picture-Container.png.webp`],
  ["team-yuliia.png.webp", `${W}2026/02/Profile-Picture-Container-9-2.png.webp`],
  ["team-ruslan.png.webp", `${W}2026/02/Profile-Picture-Container-44.png.webp`],
  ["team-alina.png.webp", `${W}2026/02/Profile-Picture-Container-26.png.webp`],
  ["team-anatolii.png.webp", `${W}2026/02/Profile-Picture-Container-23.png.webp`],
  ["team-denis.png.webp", `${W}2026/02/Profile-Picture-Container-8.png.webp`],
  ["team-dmitriy.png.webp", `${W}2026/02/Profile-Picture-Container-28.png.webp`],
  ["team-alena.png.webp", `${W}2026/02/Profile-Picture-Container-25.png.webp`],
  ["team-artem.png.webp", `${W}2026/02/Profile-Picture-Container-65.png.webp`],
  ["team-anastasia.png.webp", `${W}2026/02/Profile-Picture-Container-3.png.webp`],
  ["team-ksenia.png.webp", `${W}2026/04/Profile-Picture-Container.png.webp`],
  ["team-oleksandr.png.webp", `${W}2026/02/Profile-Picture-Container-1.png.webp`],
  ["team-iryna.png.webp", `${W}2026/02/Profile-Picture-Container-31.png.webp`],
  ["team-vadym.png.webp", `${W}2026/02/Profile-Picture-Container-55.png.webp`],
  ["team-anna-ch.png.webp", `${W}2026/02/Profile-Picture-Container-24.png.webp`],
  ["team-denys-m.png.webp", `${W}2026/02/Profile-Picture-Container-9.png.webp`],
  ["team-denys-z.png.webp", `${W}2026/02/Profile-Picture-Container-5-1.png.webp`],
  ["team-daria.png.webp", `${W}2026/02/Profile-Picture-Container-6.png.webp`],
  ["team-katerina.png.webp", `${W}2026/02/Profile-Picture-Container-63.png.webp`],
  // client logos
  ["client-logo-1.svg", `${U}2025/02/logo1.svg`],
  ["client-logo-2.svg", `${U}2025/02/logo2.svg`],
  ["client-logo-3.svg", `${U}2025/02/logo3.svg`],
  ["client-logo-4.svg", `${U}2025/02/logo4.svg`],
  ["client-logo-5.svg", `${U}2025/02/logo5.svg`],
  ["client-logo-6.svg", `${U}2025/01/logo6.svg`],
  ["client-logo-8.svg", `${U}2025/02/logo8.svg`],
  ["client-logo-wisdom.svg", `${U}2026/01/Wisdom.svg`],
  ["client-logo-hormn.svg", `${U}2026/02/HORMN.svg`],
  ["client-logo-pragmatike.svg", `${U}2026/02/Pragmatike.svg`],
  ["client-logo-prettypatty.svg", `${U}2026/02/PrettyPatty.svg`],
  ["client-logo-zebeyond.svg", `${U}2026/02/Zebeyond.svg`],
];

const VIDEOS = [
  ["team-polina.mp4", `${U}2026/05/video_polina-1.mp4`],
  ["team-valerii.mp4", `${U}2026/05/zoom-1.mp4`],
  ["team-yuliia.mp4", `${U}2026/05/Video-Project-29-1.mp4`],
  ["team-alina.mp4", `${U}2026/05/video1365762158-1.mp4`],
  ["team-anatolii.mp4", `${U}2026/05/video1747026778-1.mp4`],
  ["team-dmitriy.mp4", `${U}2026/05/Video-Project-30-1.mp4`],
  ["team-ksenia.mp4", `${U}2026/05/Video-Project-18-1.mp4`],
  ["team-iryna.mp4", `${U}2026/05/zoom.us-Zoom-Meeting-30-April-2026-1.mp4`],
  ["team-denys-m.mp4", `${U}2026/05/d.melnyk_greeting_video-1.mp4`],
  ["team-denys-z.mp4", `${U}2026/04/media-69d8fd137c38c5b378f47d70.mp4`],
];

const AUDIO = [
  ["valerii-quote.mp3", `${U}2026/02/Valerii-comment.mp3`],
  ["polina-quote.mp3", `${U}2026/02/2026-02-10-13.04.49.mp3`],
];

async function downloadOne(out, [name, url]) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.error("FAILED", url, res.status);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(out, name), buf);
  console.log("saved", name);
}

async function downloadAll(out, list) {
  const batches = [];
  for (let i = 0; i < list.length; i += 4) batches.push(list.slice(i, i + 4));
  for (const batch of batches) {
    await Promise.all(batch.map((item) => downloadOne(out, item)));
  }
}

async function main() {
  await mkdir(OUT_IMAGES, { recursive: true });
  await mkdir(OUT_VIDEOS, { recursive: true });
  await mkdir(OUT_AUDIO, { recursive: true });
  await downloadAll(OUT_IMAGES, IMAGES);
  await downloadAll(OUT_VIDEOS, VIDEOS);
  await downloadAll(OUT_AUDIO, AUDIO);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
