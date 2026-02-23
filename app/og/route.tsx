import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdfbf9 0%, #faf0ec 50%, #f4eeeb 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#c47d6a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "36px",
              fontStyle: "italic",
            }}
          >
            n
          </div>
          <div
            style={{
              fontSize: "72px",
              fontStyle: "italic",
              color: "#2d2a27",
              letterSpacing: "-1px",
            }}
          >
            nacería
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#7a7572",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.4,
              fontFamily: "sans-serif",
            }}
          >
            Encuentra la clínica de fertilidad perfecta para ti
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px 32px",
              borderRadius: "999px",
              background: "#c47d6a",
              color: "#ffffff",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            936 941 874 — Asesoramiento gratuito
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "#7a7572",
            fontFamily: "sans-serif",
          }}
        >
          www.naceria.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
