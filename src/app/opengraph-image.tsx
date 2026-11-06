import { ImageResponse } from "next/og";

export const alt = "Latin Quarter Big Band — Latin jazz in Amsterdam";
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
          justifyContent: "center",
          background: "#1B5164",
          color: "#F4F0E6",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>
          Amsterdam
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 20,
            maxWidth: 980,
          }}
        >
          Latin Quarter Big Band
        </div>
        <div style={{ fontSize: 34, marginTop: 28 }}>
          Latin jazz concerts and live events
        </div>
      </div>
    ),
    { ...size }
  );
}
