import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(join(process.cwd(), "src/app/fonts/Syne-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c8102e",
          color: "#f6efe4",
          fontFamily: "Syne",
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: -0.8,
          paddingBottom: 1,
          borderRadius: 8,
        }}
      >
        M
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: font, weight: 800, style: "normal" }],
    },
  );
}
