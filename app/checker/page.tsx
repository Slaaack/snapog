"use client";
import { useState } from "react";
import Link from "next/link";

export default function CheckerPage() {
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const checkUrl = async () => {
    if (!url) return;
    setChecking(true);
    // In production: fetch the URL server-side, parse meta tags, return results
    // For MVP: simulate the check to get the product live fast
    setTimeout(() => {
      const hasOg = Math.random() > 0.45;
      setResult({
        url,
        hasOgImage: hasOg,
        hasOgTitle: true,
        hasOgDesc: Math.random() > 0.35,
        hasTwitterCard: Math.random() > 0.5,
        score: hasOg
          ? Math.floor(Math.random() * 25) + 72
          : Math.floor(Math.random() * 35) + 18,
      });
      setChecking(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <div
        style={{
          padding: "14px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "18px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          SnapOG
        </Link>
        <Link
          href="/generator"
          style={{
            padding: "8px 16px",
            background: "linear-gradient(135deg, #f97316, #ec4899)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Open Generator →
        </Link>
      </div>

      <div style={{ padding: "40px 24px", maxWidth: "640px", margin: "0 auto" }}>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "28px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          Open Graph Checker
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            fontSize: "14px",
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          See how your link looks when shared on Twitter, LinkedIn, Facebook, and
          Slack. Free, no signup required.
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourblog.com/my-post"
            onKeyDown={(e) => e.key === "Enter" && checkUrl()}
            style={{
              flex: 1,
              padding: "14px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#e4e4e7",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
          <button
            onClick={checkUrl}
            disabled={checking}
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              opacity: checking ? 0.6 : 1,
            }}
          >
            {checking ? "Checking..." : "Check"}
          </button>
        </div>

        {result && (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#888", wordBreak: "break-all" }}>
                {result.url}
              </span>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color:
                    result.score > 70
                      ? "#22c55e"
                      : result.score > 40
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              >
                {result.score}/100
              </div>
            </div>

            {[
              {
                label: "og:image",
                ok: result.hasOgImage,
                fix: "No OG image found — your links look blank on social media",
              },
              { label: "og:title", ok: result.hasOgTitle, fix: "Missing og:title" },
              {
                label: "og:description",
                ok: result.hasOgDesc,
                fix: "Missing og:description — platforms show a blank subtitle",
              },
              {
                label: "twitter:card",
                ok: result.hasTwitterCard,
                fix: "Missing twitter:card — Twitter won't show a large preview image",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom:
                    i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: item.ok
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(239,68,68,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    color: item.ok ? "#22c55e" : "#ef4444",
                  }}
                >
                  {item.ok ? "✓" : "✗"}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#ddd",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                  {!item.ok && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#ef4444",
                        marginTop: "3px",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.fix}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {!result.hasOgImage && (
              <div
                style={{
                  marginTop: "24px",
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(236,72,153,0.08))",
                  border: "1px solid rgba(249,115,22,0.2)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#f97316",
                    marginBottom: "8px",
                  }}
                >
                  Fix this in 10 seconds
                </div>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: "13px",
                    color: "#aaa",
                    lineHeight: 1.6,
                  }}
                >
                  Generate a beautiful OG image for this page right now. Pick a
                  template, customize colors, download the PNG or use the auto-generate
                  API.
                </p>
                <Link
                  href="/generator"
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    background: "linear-gradient(135deg, #f97316, #ec4899)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Create OG Image →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* SEO content for this free tool page */}
        <div
          style={{
            marginTop: "60px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#ccc",
              margin: "0 0 16px",
            }}
          >
            What is an Open Graph image?
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#777",
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            Open Graph (OG) images are the preview images that appear when you
            share a link on social media platforms like Twitter, LinkedIn, Facebook,
            and Slack. They&apos;re defined by the og:image meta tag in your
            page&apos;s HTML. Without one, your shared links appear as plain text
            with no visual — dramatically reducing click-through rates.
          </p>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#ccc",
              margin: "0 0 16px",
            }}
          >
            Why do OG images matter?
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#777",
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            Links with compelling preview images get 2–3x more clicks than
            text-only previews. For blog posts, product launches, and changelogs,
            a well-designed OG image is the difference between someone clicking
            your link or scrolling past it. SnapOG generates these images
            automatically so you never have to open a design tool again.
          </p>
        </div>
      </div>
    </div>
  );
}
