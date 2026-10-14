import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_ICON, SITE_NAME, SITE_TITLE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: SITE_ICON, sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
