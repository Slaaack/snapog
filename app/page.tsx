import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9" }}>

      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 40px", borderBottom: "1px solid #e7e5e4",
        background: "rgba(250,250,249,0.85)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <span style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917", letterSpacing: "-0.5px" }}>
          Snap<span style={{ color: "#f97316" }}>OG</span>
        </span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/checker" style={{
            padding: "8px 18px", borderRadius: "8px", color: "#78716c",
            fontSize: "13px", fontWeight: 500, textDecoration: "none",
            border: "1px solid #e7e5e4", background: "#fff",
          }}>
            OG Checker
          </Link>
          <Link href="/generator" style={{
            padding: "8px 18px", background: "#f97316", borderRadius: "8px",
            color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none",
            boxShadow: "0 1px 3px rgba(249,115,22,0.35)",
          }}>
            Try Free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: "96px 40px 80px", textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 600, color: "#ea580c",
          background: "#fff7ed", border: "1px solid #fed7aa",
          padding: "5px 14px", borderRadius: "20px", marginBottom: "28px", letterSpacing: "0.3px",
        }}>
          <span>✦</span> No design skills needed
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 6vw, 62px)", fontWeight: 900,
          margin: "0 0 20px", lineHeight: 1.06, letterSpacing: "-2px",
          color: "#1c1917",
        }}>
          Social previews that actually<br />
          <span style={{
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            get clicked.
          </span>
        </h1>

        <p style={{
          fontSize: "18px", color: "#78716c", lineHeight: 1.7,
          margin: "0 auto 40px", maxWidth: "520px", fontWeight: 400,
        }}>
          Generate gorgeous Open Graph images for your blog, product, or campaign in under 10 seconds. No Figma. No Canva. Just beautiful previews.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/generator" style={{
            padding: "14px 36px", background: "#f97316", borderRadius: "10px",
            color: "#fff", fontSize: "16px", fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
          }}>
            Create Free Image →
          </Link>
          <Link href="/checker" style={{
            padding: "14px 28px", background: "#fff", border: "1px solid #e7e5e4",
            borderRadius: "10px", color: "#57534e", fontSize: "16px",
            textDecoration: "none", fontWeight: 500,
          }}>
            Check My URL
          </Link>
        </div>

        <p style={{ fontSize: "12px", color: "#a8a29e", marginTop: "16px" }}>
          Free forever · No signup required · PNG in seconds
        </p>
      </div>

      {/* Preview mockup */}
      <div style={{
        maxWidth: "780px", margin: "0 auto 80px", padding: "0 40px",
      }}>
        <div style={{
          background: "#fff", borderRadius: "16px",
          border: "1px solid #e7e5e4",
          boxShadow: "0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}>
          {/* Fake browser chrome */}
          <div style={{
            padding: "12px 16px", borderBottom: "1px solid #f5f5f4",
            background: "#fafaf9", display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fca5a5" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fde68a" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#bbf7d0" }} />
            <div style={{
              flex: 1, height: "24px", background: "#f5f5f4", borderRadius: "6px",
              marginLeft: "8px", display: "flex", alignItems: "center", paddingLeft: "10px",
            }}>
              <span style={{ fontSize: "11px", color: "#a8a29e" }}>snapog.com/api/og?title=My+Post&theme=ocean</span>
            </div>
          </div>
          {/* OG preview image simulation */}
          <div style={{
            height: "360px",
            background: "linear-gradient(135deg, #0a1628, #1a4a6e)",
            display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", left: "-40px", bottom: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#e0f0ff", lineHeight: 1.2, marginBottom: "16px", position: "relative" }}>
              How We Hit $1M ARR<br />in 6 Months
            </div>
            <div style={{ fontSize: "20px", color: "#e0f0ff", opacity: 0.55, position: "relative" }}>
              The exact playbook nobody talks about
            </div>
            <div style={{ position: "absolute", bottom: "32px", left: "60px", fontSize: "16px", color: "#e0f0ff", opacity: 0.3 }}>
              yourblog.com
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: "80px 40px", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{
          textAlign: "center", fontSize: "32px", fontWeight: 800,
          color: "#1c1917", margin: "0 0 12px", letterSpacing: "-0.8px",
        }}>
          Three steps. Ten seconds.
        </h2>
        <p style={{ textAlign: "center", fontSize: "15px", color: "#a8a29e", margin: "0 0 52px" }}>
          Seriously, that's all it takes.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {[
            { n: "01", title: "Type your content", desc: "Add your title and subtitle. Takes about 5 seconds." },
            { n: "02", title: "Pick a style", desc: "Choose from 5 beautiful templates and 8 color themes." },
            { n: "03", title: "Download or embed", desc: "Get a 1200×630 PNG or paste the API URL as your og:image." },
          ].map(item => (
            <div key={item.n} style={{
              background: "#fff", borderRadius: "14px", padding: "32px 28px",
              border: "1px solid #e7e5e4",
            }}>
              <div style={{
                fontSize: "11px", fontWeight: 700, color: "#f97316",
                letterSpacing: "1.5px", marginBottom: "14px",
              }}>{item.n}</div>
              <h3 style={{ margin: "0 0 10px", fontSize: "17px", fontWeight: 700, color: "#1c1917" }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#a8a29e", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: "80px 40px", maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{
          textAlign: "center", fontSize: "32px", fontWeight: 800,
          color: "#1c1917", margin: "0 0 8px", letterSpacing: "-0.8px",
        }}>
          Simple pricing
        </h2>
        <p style={{ textAlign: "center", fontSize: "15px", color: "#a8a29e", margin: "0 0 48px" }}>
          Start free. Pay when it's worth it.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            {
              name: "Free", price: "$0", sub: "forever", highlight: false,
              features: ["10 images / month", "3 templates", "Watermark", "PNG export"],
              cta: "Get Started", href: "/generator",
            },
            {
              name: "Pro", price: "$9", sub: "/month", highlight: true,
              features: ["Unlimited images", "No watermark", "All 5 templates", "API access", "All themes"],
              cta: "Go Pro", href: "/generator",
            },
            {
              name: "Team", price: "$29", sub: "/month", highlight: false,
              features: ["Everything in Pro", "5 team members", "Custom colors", "White-label API"],
              cta: "Start Trial", href: "/generator",
            },
          ].map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? "#fff7ed" : "#fff",
              border: `1px solid ${plan.highlight ? "#fed7aa" : "#e7e5e4"}`,
              borderRadius: "16px", padding: "32px 24px",
              boxShadow: plan.highlight ? "0 4px 20px rgba(249,115,22,0.12)" : "none",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: plan.highlight ? "#f97316" : "#a8a29e", letterSpacing: "0.5px", marginBottom: "10px" }}>{plan.name.toUpperCase()}</div>
              <div style={{ marginBottom: "22px" }}>
                <span style={{ fontSize: "38px", fontWeight: 900, color: "#1c1917", letterSpacing: "-1px" }}>{plan.price}</span>
                <span style={{ fontSize: "13px", color: "#a8a29e" }}>{plan.sub}</span>
              </div>
              {plan.features.map(f => (
                <div key={f} style={{ fontSize: "13px", color: "#57534e", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ color: "#f97316", fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <Link href={plan.href} style={{
                display: "block", marginTop: "24px", textAlign: "center",
                padding: "11px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                textDecoration: "none",
                background: plan.highlight ? "#f97316" : "#fff",
                color: plan.highlight ? "#fff" : "#57534e",
                border: plan.highlight ? "none" : "1px solid #e7e5e4",
                boxShadow: plan.highlight ? "0 2px 8px rgba(249,115,22,0.3)" : "none",
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #e7e5e4", padding: "32px 40px",
        textAlign: "center", fontSize: "13px", color: "#a8a29e",
        background: "#fff",
      }}>
        SnapOG — Beautiful social preview images in seconds
      </footer>
    </div>
  );
}
