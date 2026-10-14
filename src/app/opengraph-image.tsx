import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.6 }}>splsystems.in</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 112, fontWeight: 600 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 48, opacity: 0.7 }}>{SITE_TAGLINE}</div>
        </div>
      </div>
    ),
    size,
  );
}
