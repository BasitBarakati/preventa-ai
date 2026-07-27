import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Phronesis AI — Transforming Health and Wellness.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetches a Google Font as a binary buffer for Satori/ImageResponse to embed. */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error(`No matching font source for ${family}`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Failed to fetch font binary for ${family}`);
  return res.arrayBuffer();
}

const TITLE = "Phronesis AI";
const TAGLINE = "Transforming Health and Wellness.";

export default async function OpengraphImage() {
  let fonts: { name: string; data: ArrayBuffer; weight: 600; style: "normal" }[] = [];
  try {
    const [fraunces] = await Promise.all([loadGoogleFont("Fraunces", 600, TITLE + TAGLINE)]);
    fonts = [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }];
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(1200px 700px at 78% 20%, rgba(31,138,138,0.35), transparent 60%), radial-gradient(900px 700px at 10% 90%, rgba(232,168,124,0.28), transparent 60%), #0B3D5F",
          padding: 80,
        }}
      >
        {/* brand mark */}
        <svg width={92} height={92} viewBox="0 0 64 64" style={{ marginBottom: 36 }}>
          <path d="M32 10.2V50c0 2.7-1.7 4-4.5 5" stroke="#FAF7F2" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M30.6 13.9C21.8 12.1 13.5 18.7 13.3 27.9c-.1 4.8 2.2 7.8 2.6 11.4.5 5.6 5.4 9.8 11.2 9.6" stroke="#FAF7F2" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="27.3" cy="21.9" r="2.4" fill="#FAF7F2" />
          <circle cx="16.7" cy="29.3" r="3.1" fill="#3FA7B0" />
          <path d="M32 24.6c5-1 8.6-3.6 10.6-8.4" stroke="#FAF7F2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M32 31.6c7.5-1.5 13.4-5 16.9-9" stroke="#FAF7F2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M32 38.6c6.5-1 11.4-2.5 14.7-5" stroke="#FAF7F2" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="50.9" cy="20.6" r="3" fill="#F0973C" />
          <circle cx="48.3" cy="32" r="2.7" fill="#3FA7B0" />
          <circle cx="51.6" cy="28.9" r="2.1" fill="#8FAE7A" />
        </svg>

        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: "#FAF7F2",
            fontFamily: fonts.length ? "Fraunces" : undefined,
            letterSpacing: -1.5,
          }}
        >
          {TITLE}
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            color: "rgba(250,247,242,0.82)",
            fontFamily: fonts.length ? "Fraunces" : undefined,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {TAGLINE}
        </div>

        {/* PHRONESIS letters ribbon */}
        <div style={{ display: "flex", marginTop: 48, gap: 14 }}>
          {["P", "H", "R", "O", "N", "E", "S", "I", "S"].map((l, i) => (
            <div
              key={`${l}-${i}`}
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: ["#3FA7B0", "#8FAE7A", "#E8A87C", "#C38D6B"][i % 4],
                fontFamily: fonts.length ? "Fraunces" : undefined,
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
