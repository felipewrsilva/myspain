import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            fill="#f6efe4"
            d="M15 47V15.5h8.2L32 32.4 40.8 15.5H49V47h-8.2V30.8L32 45.4 23.2 30.8V47H15Z"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
