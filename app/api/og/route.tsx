import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Your Title Here";
  const subtitle = searchParams.get("subtitle") || "";
  const domain = searchParams.get("domain") || "";
  const theme = searchParams.get("theme") || "midnight";
  const template = searchParams.get("template") || "bold";

  // Color themes
  const themes: Record<string, { from: string; to: string; text: string }> = {
    midnight: { from: "#0f0c29", to: "#302b63", text: "#ffffff" },
    ocean: { from: "#0a1628", to: "#1a4a6e", text: "#e0f0ff" },
    ember: { from: "#1a0a0a", to: "#8b2500", text: "#ffeedd" },
    forest: { from: "#0a1a0a", to: "#2d6a4f", text: "#d8f3dc" },
    slate: { from: "#1e1e2e", to: "#45475a", text: "#cdd6f4" },
    coral: { from: "#2d1b2e", to: "#c44569", text: "#ffeef2" },
    gold: { from: "#1a1505", to: "#b8860b", text: "#fff8dc" },
    arctic: { from: "#f0f4f8", to: "#c9d6e3", text: "#1a202c" },
  };

  const t = themes[theme] || themes.midnight;

  // Template: bold
  const boldTemplate = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          fontSize: "56px",
          fontWeight: 800,
          color: t.text,
          lineHeight: 1.15,
          marginBottom: "20px",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: "26px",
            color: t.text,
            opacity: 0.65,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
      {domain && (
        <div
          style={{
            fontSize: "22px",
            color: t.text,
            opacity: 0.4,
            marginTop: "auto",
          }}
        >
          {domain}
        </div>
      )}
    </div>
  );

  // Template: minimal
  const minimalTemplate = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        paddingLeft: "110px",
        background: t.from,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "80px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "4px",
          height: "60px",
          background: t.to,
          borderRadius: "2px",
        }}
      />
      <div
        style={{
          fontSize: "52px",
          fontWeight: 700,
          color: t.text,
          lineHeight: 1.15,
          marginBottom: "16px",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: "24px",
            color: t.text,
            opacity: 0.5,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      )}
      {domain && (
        <div
          style={{
            fontSize: "20px",
            color: t.text,
            opacity: 0.35,
            marginTop: "auto",
          }}
        >
          {domain}
        </div>
      )}
    </div>
  );

  // Template: glass
  const glassTemplate = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px",
        background: `radial-gradient(ellipse at 20% 30%, ${t.to}, ${t.from})`,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "60px",
          right: "60px",
          bottom: "60px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          fontSize: "54px",
          fontWeight: 800,
          color: t.text,
          lineHeight: 1.15,
          marginBottom: "20px",
          position: "relative",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: "24px",
            color: t.text,
            opacity: 0.6,
            lineHeight: 1.4,
            position: "relative",
          }}
        >
          {subtitle}
        </div>
      )}
      {domain && (
        <div
          style={{
            fontSize: "20px",
            color: t.text,
            opacity: 0.4,
            marginTop: "auto",
            position: "relative",
          }}
        >
          {domain}
        </div>
      )}
    </div>
  );

  const templates: Record<string, JSX.Element> = {
    bold: boldTemplate,
    minimal: minimalTemplate,
    glass: glassTemplate,
  };

  const selectedTemplate = templates[template] || templates.bold;

  return new ImageResponse(selectedTemplate, {
    width: 1200,
    height: 630,
  });
}
