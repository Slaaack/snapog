import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#f97316",
          }}
        >
          SnapOG
        </span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/checker"
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#aaa",
              fontSize: "12px",
              textDecoration: "none",
            }}
          >
            Free OG Checker
          </Link>
          <Link
            href="/generator"
            style={{
              padding: "8px 16px",
              background: "#f97316",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Open App
          </Link>
        </div>
      </nav>

      <div
        style={{
          padding: "80px 28px 60px",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#f97316",
            background: "rgba(249,115,22,0.1)",
            padding: "6px 16px",
            borderRadius: "20px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          STOP LOSING CLICKS TO UGLY LINK PREVIEWS
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            margin: "0 0 20px",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          Beautiful social images.{" "}
          <span style={{ color: "#f97316" }}>Zero design skills.</span>
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#777",
            lineHeight: 1.6,
            margin: "0 auto 36px",
            maxWidth: "520px",
          }}
        >
          Generate stunning Open Graph images for your blog posts, changelogs,
          and landing pages in under 10 seconds.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/generator"
            style={{
              padding: "14px 36px",
              background: "#f97316",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Free Image →
          </Link>
          <Link
            href="/checker"
            style={{
              padding: "14px 28px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#aaa",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Check Your URL
          </Link>
        </div>
      </div>

      <div
        style={{
          padding: "60px 28px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 48px",
          }}
        >
          Three steps. Ten seconds.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          <div style={cardStyle}>
            <div style={numberStyle}>1</div>
            <h3 style={cardTitleStyle}>Type your title</h3>
            <p style={cardDescStyle}>
              Enter your blog post title and subtitle. Pick a template and color
              theme.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={numberStyle}>2</div>
            <h3 style={cardTitleStyle}>Customize</h3>
            <p style={cardDescStyle}>
              Adjust fonts, sizes, and colors. Live preview updates instantly.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={numberStyle}>3</div>
            <h3 style={cardTitleStyle}>Download or use API</h3>
            <p style={cardDescStyle}>
              Get a 1200x630 PNG or use the API URL as your og:image for
              auto-generation.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "60px 28px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px",
          }}
        >
          Simple pricing
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
            margin: "0 0 40px",
          }}
        >
          Start free. Upgrade when you need more.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <div style={pricingCardStyle}>
            <div style={{ fontSize: "13px", color: "#888", fontWeight: 700, marginBottom: "8px" }}>Free</div>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#fff" }}>$0</span>
              <span style={{ fontSize: "13px", color: "#666" }}> forever</span>
            </div>
            <p style={featureStyle}>✓ 10 images/month</p>
            <p style={featureStyle}>✓ 3 templates</p>
            <p style={featureStyle}>✓ Watermark</p>
            <p style={featureStyle}>✓ PNG export</p>
            <Link href="/generator" style={btnSecondary}>Get Started</Link>
          </div>
          <div style={{ ...pricingCardStyle, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <div style={{ fontSize: "13px", color: "#f97316", fontWeight: 700, marginBottom: "8px" }}>Pro</div>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#fff" }}>$9</span>
              <span style={{ fontSize: "13px", color: "#666" }}>/month</span>
            </div>
            <p style={featureStyle}>✓ Unlimited images</p>
            <p style={featureStyle}>✓ No watermark</p>
            <p style={featureStyle}>✓ All templates</p>
            <p style={featureStyle}>✓ API access</p>
            <p style={featureStyle}>✓ All themes</p>
            <Link href="/generator" style={btnPrimary}>Go Pro</Link>
          </div>
          <div style={pricingCardStyle}>
            <div style={{ fontSize: "13px", color: "#888", fontWeight: 700, marginBottom: "8px" }}>Team</div>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#fff" }}>$29</span>
              <span style={{ fontSize: "13px", color: "#666" }}>/month</span>
            </div>
            <p style={featureStyle}>✓ Everything in Pro</p>
            <p style={featureStyle}>✓ 5 team members</p>
            <p style={featureStyle}>✓ Custom colors</p>
            <p style={featureStyle}>✓ White-label API</p>
            <Link href="/generator" style={btnSecondary}>Start Trial</Link>
          </div>
        </div>
      </div>

      <footer
        style={{
          padding: "40px 28px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
          fontSize: "12px",
          color: "#444",
        }}
      >
        SnapOG — Beautiful social preview images in seconds
      </footer>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "12px",
  padding: "28px",
};
const numberStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "rgba(249,115,22,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 800,
  color: "#f97316",
  marginBottom: "16px",
};
const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "16px",
  color: "#eee",
  fontWeight: 700,
};
const cardDescStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#777",
  lineHeight: 1.6,
};
const pricingCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "14px",
  padding: "32px 24px",
};
const featureStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#999",
  margin: "0 0 6px",
};
const btnPrimary: React.CSSProperties = {
  display: "block",
  marginTop: "20px",
  textAlign: "center",
  padding: "10px",
  background: "#f97316",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 700,
  textDecoration: "none",
};
const btnSecondary: React.CSSProperties = {
  display: "block",
  marginTop: "20px",
  textAlign: "center",
  padding: "10px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#aaa",
  fontSize: "13px",
  fontWeight: 700,
  textDecoration: "none",
};
