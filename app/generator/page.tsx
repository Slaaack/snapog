"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

// Canvas helpers
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number): number {
  const words = text.split(" ");
  let line = "", cy = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line.trim(), x, cy); line = words[i] + " "; cy += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, cy);
  return cy;
}

function getLineCount(ctx: CanvasRenderingContext2D, text: string, maxW: number, font: string) {
  ctx.save(); ctx.font = font;
  const words = text.split(" "); let line = "", count = 1;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxW && i > 0) { count++; line = words[i] + " "; }
    else line = test;
  }
  ctx.restore(); return count;
}

const TEMPLATES = [
  { id: "bold", name: "Bold" },
  { id: "minimal", name: "Minimal" },
  { id: "glass", name: "Glass" },
  { id: "split", name: "Split" },
  { id: "stripe", name: "Stripe" },
];

const PRESETS = [
  { name: "Midnight", from: "#0f0c29", to: "#302b63", text: "#ffffff" },
  { name: "Ocean", from: "#0a1628", to: "#1a4a6e", text: "#e0f0ff" },
  { name: "Ember", from: "#1a0a0a", to: "#8b2500", text: "#ffeedd" },
  { name: "Forest", from: "#0a1a0a", to: "#2d6a4f", text: "#d8f3dc" },
  { name: "Slate", from: "#1e1e2e", to: "#45475a", text: "#cdd6f4" },
  { name: "Coral", from: "#2d1b2e", to: "#c44569", text: "#ffeef2" },
  { name: "Gold", from: "#1a1505", to: "#b8860b", text: "#fff8dc" },
  { name: "Arctic", from: "#f0f4f8", to: "#c9d6e3", text: "#1a202c" },
];

const FONTS = ["Georgia", "Palatino Linotype", "Trebuchet MS", "Verdana", "Tahoma"];

// ─── Template renderers ───────────────────────────────────────────────────────

function renderBold(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  // Background gradient
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, o.bgFrom); g.addColorStop(1, o.bgTo);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  // Decorative circles
  ctx.globalAlpha = 0.07; ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(w * 0.85, h * 0.2, 200, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(w * 0.1, h * 0.8, 150, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;

  // Title
  ctx.fillStyle = o.textColor;
  ctx.font = `800 ${o.ts}px ${o.ff}`;
  const lc = getLineCount(ctx, o.title, w - 160, `800 ${o.ts}px ${o.ff}`);
  wrapText(ctx, o.title, 80, 200, w - 160, o.ts * 1.15);

  // Subtitle
  if (o.subtitle) {
    ctx.globalAlpha = 0.65;
    ctx.font = `400 ${o.ss}px ${o.ff}`;
    wrapText(ctx, o.subtitle, 80, 200 + lc * o.ts * 1.15 + 28, w - 160, o.ss * 1.4);
    ctx.globalAlpha = 1;
  }

  // Domain
  if (o.domain) {
    ctx.font = `600 22px ${o.ff}`; ctx.globalAlpha = 0.4;
    ctx.fillText(o.domain, 80, h - 55); ctx.globalAlpha = 1;
  }
}

function renderMinimal(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  // Flat dark background
  ctx.fillStyle = o.bgFrom; ctx.fillRect(0, 0, w, h);

  // Subtle noise texture via thin lines
  ctx.globalAlpha = 0.03; ctx.strokeStyle = o.textColor; ctx.lineWidth = 1;
  for (let y = 0; y < h; y += 6) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Accent bar (left)
  const barH = 70;
  const barY = h / 2 - barH / 2 - 20;
  const accentG = ctx.createLinearGradient(0, barY, 0, barY + barH);
  accentG.addColorStop(0, o.bgTo); accentG.addColorStop(1, o.bgFrom);
  ctx.fillStyle = accentG;
  ctx.beginPath();
  ctx.roundRect(80, barY, 6, barH, 3);
  ctx.fill();

  // Title
  ctx.fillStyle = o.textColor;
  ctx.font = `700 ${o.ts}px ${o.ff}`;
  const lc = getLineCount(ctx, o.title, w - 200, `700 ${o.ts}px ${o.ff}`);
  wrapText(ctx, o.title, 112, h / 2 - (lc * o.ts * 1.15) / 2, w - 200, o.ts * 1.15);

  // Subtitle
  if (o.subtitle) {
    ctx.globalAlpha = 0.5;
    ctx.font = `400 ${o.ss}px ${o.ff}`;
    const titleBottom = h / 2 - (lc * o.ts * 1.15) / 2 + lc * o.ts * 1.15;
    wrapText(ctx, o.subtitle, 112, titleBottom + 20, w - 200, o.ss * 1.4);
    ctx.globalAlpha = 1;
  }

  // Domain bottom-right
  if (o.domain) {
    ctx.font = `500 20px ${o.ff}`; ctx.globalAlpha = 0.3;
    const dm = ctx.measureText(o.domain);
    ctx.fillText(o.domain, w - dm.width - 60, h - 50);
    ctx.globalAlpha = 1;
  }
}

function renderGlass(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  // Radial background
  const rg = ctx.createRadialGradient(w * 0.3, h * 0.35, 0, w * 0.5, h * 0.5, w * 0.8);
  rg.addColorStop(0, o.bgTo); rg.addColorStop(1, o.bgFrom);
  ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h);

  // Glowing orbs
  ctx.globalAlpha = 0.18;
  const og1 = ctx.createRadialGradient(w * 0.75, h * 0.25, 0, w * 0.75, h * 0.25, 220);
  og1.addColorStop(0, o.bgTo); og1.addColorStop(1, "transparent");
  ctx.fillStyle = og1; ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.12;
  const og2 = ctx.createRadialGradient(w * 0.2, h * 0.75, 0, w * 0.2, h * 0.75, 180);
  og2.addColorStop(0, o.bgTo); og2.addColorStop(1, "transparent");
  ctx.fillStyle = og2; ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;

  // Glass card
  const pad = 60, cardX = pad, cardY = pad, cardW = w - pad * 2, cardH = h - pad * 2, r = 24;
  ctx.globalAlpha = 0.1; ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.roundRect(cardX, cardY, cardW, cardH, r); ctx.fill();
  ctx.globalAlpha = 0.15; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(cardX, cardY, cardW, cardH, r); ctx.stroke();
  ctx.globalAlpha = 1;

  // Content
  const cx = cardX + 70, cw = cardW - 140;
  ctx.fillStyle = o.textColor;
  ctx.font = `800 ${o.ts}px ${o.ff}`;
  const lc = getLineCount(ctx, o.title, cw, `800 ${o.ts}px ${o.ff}`);
  const titleY = cardY + cardH / 2 - (lc * o.ts * 1.15) / 2 - (o.subtitle ? 20 : 0);
  wrapText(ctx, o.title, cx, titleY, cw, o.ts * 1.15);

  if (o.subtitle) {
    ctx.globalAlpha = 0.6;
    ctx.font = `400 ${o.ss}px ${o.ff}`;
    wrapText(ctx, o.subtitle, cx, titleY + lc * o.ts * 1.15 + 22, cw, o.ss * 1.4);
    ctx.globalAlpha = 1;
  }

  if (o.domain) {
    ctx.font = `500 20px ${o.ff}`; ctx.globalAlpha = 0.35;
    ctx.fillText(o.domain, cx, cardY + cardH - 36);
    ctx.globalAlpha = 1;
  }
}

function renderSplit(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  // Right panel: gradient
  const rg = ctx.createLinearGradient(w * 0.42, 0, w, h);
  rg.addColorStop(0, o.bgFrom); rg.addColorStop(1, o.bgTo);
  ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h);

  // Left panel: solid accent
  ctx.fillStyle = o.bgTo;
  ctx.beginPath(); ctx.roundRect(0, 0, w * 0.42, h, [0, 0, 0, 0]); ctx.fill();

  // Diagonal slice between panels
  ctx.fillStyle = o.bgTo;
  ctx.beginPath();
  ctx.moveTo(w * 0.38, 0);
  ctx.lineTo(w * 0.48, 0);
  ctx.lineTo(w * 0.44, h);
  ctx.lineTo(w * 0.34, h);
  ctx.closePath(); ctx.fill();

  // Left side: big initial / icon area
  ctx.fillStyle = o.textColor; ctx.globalAlpha = 0.12;
  ctx.font = `900 260px ${o.ff}`;
  const initial = o.title.charAt(0).toUpperCase();
  const im = ctx.measureText(initial);
  ctx.fillText(initial, (w * 0.42) / 2 - im.width / 2, h / 2 + 100);
  ctx.globalAlpha = 1;

  // Left: domain vertical
  if (o.domain) {
    ctx.save();
    ctx.fillStyle = o.textColor; ctx.globalAlpha = 0.5;
    ctx.font = `600 18px ${o.ff}`;
    ctx.translate(w * 0.21, h / 2);
    ctx.rotate(-Math.PI / 2);
    const dm = ctx.measureText(o.domain);
    ctx.fillText(o.domain, -dm.width / 2, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  // Right: title & subtitle
  const rx = w * 0.52, rw = w * 0.44;
  ctx.fillStyle = o.textColor;
  ctx.font = `800 ${o.ts}px ${o.ff}`;
  const lc = getLineCount(ctx, o.title, rw, `800 ${o.ts}px ${o.ff}`);
  const titleY = h / 2 - (lc * o.ts * 1.15) / 2 - (o.subtitle ? 20 : 0);
  wrapText(ctx, o.title, rx, titleY, rw, o.ts * 1.15);

  if (o.subtitle) {
    ctx.globalAlpha = 0.6;
    ctx.font = `400 ${o.ss}px ${o.ff}`;
    wrapText(ctx, o.subtitle, rx, titleY + lc * o.ts * 1.15 + 22, rw, o.ss * 1.4);
    ctx.globalAlpha = 1;
  }
}

function renderStripe(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  // Base
  ctx.fillStyle = o.bgFrom; ctx.fillRect(0, 0, w, h);

  // Diagonal stripes
  ctx.globalAlpha = 0.06; ctx.fillStyle = o.bgTo;
  const stripeW = 80, gap = 120;
  for (let x = -h; x < w + h; x += gap) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x + stripeW, 0);
    ctx.lineTo(x + stripeW + h, h); ctx.lineTo(x + h, h);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  // Bold top accent bar
  const accentG = ctx.createLinearGradient(0, 0, w, 0);
  accentG.addColorStop(0, o.bgTo); accentG.addColorStop(0.6, o.bgFrom); accentG.addColorStop(1, "transparent");
  ctx.fillStyle = accentG;
  ctx.fillRect(0, 0, w, 8);

  // Bottom accent bar
  const accentG2 = ctx.createLinearGradient(0, 0, w, 0);
  accentG2.addColorStop(0, "transparent"); accentG2.addColorStop(0.4, o.bgTo);
  ctx.fillStyle = accentG2;
  ctx.fillRect(0, h - 8, w, 8);

  // Content — centered
  ctx.fillStyle = o.textColor; ctx.textAlign = "center";
  ctx.font = `800 ${o.ts}px ${o.ff}`;
  const lc = getLineCount(ctx, o.title, w - 160, `800 ${o.ts}px ${o.ff}`);
  const titleY = h / 2 - (lc * o.ts * 1.15) / 2 - (o.subtitle ? 20 : 0);
  wrapText(ctx, o.title, w / 2, titleY, w - 160, o.ts * 1.15);

  if (o.subtitle) {
    ctx.globalAlpha = 0.55;
    ctx.font = `400 ${o.ss}px ${o.ff}`;
    wrapText(ctx, o.subtitle, w / 2, titleY + lc * o.ts * 1.15 + 24, w - 160, o.ss * 1.4);
    ctx.globalAlpha = 1;
  }

  if (o.domain) {
    ctx.font = `500 20px ${o.ff}`; ctx.globalAlpha = 0.35;
    ctx.fillText(o.domain, w / 2, h - 48);
    ctx.globalAlpha = 1;
  }

  ctx.textAlign = "left"; // reset
}

function renderTemplate(ctx: CanvasRenderingContext2D, w: number, h: number, templateId: string, o: any) {
  switch (templateId) {
    case "minimal": return renderMinimal(ctx, w, h, o);
    case "glass":   return renderGlass(ctx, w, h, o);
    case "split":   return renderSplit(ctx, w, h, o);
    case "stripe":  return renderStripe(ctx, w, h, o);
    default:        return renderBold(ctx, w, h, o);
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function AppPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState("How We Scaled to $1M ARR in 6 Months");
  const [subtitle, setSubtitle] = useState("The playbook nobody talks about");
  const [domain, setDomain] = useState("yourblog.com");
  const [tIdx, setTIdx] = useState(0);
  const [pIdx, setPIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [ts, setTs] = useState(56);
  const [ss, setSs] = useState(26);
  const [copied, setCopied] = useState(false);

  const preset = PRESETS[pIdx];

  const render = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = 1200; c.height = 630;
    renderTemplate(ctx, 1200, 630, TEMPLATES[tIdx].id, {
      title, subtitle, domain, ff: `"${FONTS[fIdx]}", sans-serif`,
      bgFrom: preset.from, bgTo: preset.to, textColor: preset.text, ts, ss,
    });
  }, [title, subtitle, domain, tIdx, pIdx, fIdx, ts, ss, preset]);

  useEffect(() => { render(); }, [render]);

  const download = () => {
    const c = canvasRef.current; if (!c) return;
    const a = document.createElement("a");
    a.download = `snapog-${Date.now()}.png`;
    a.href = c.toDataURL("image/png"); a.click();
  };

  const apiUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&domain=${encodeURIComponent(domain)}&theme=${PRESETS[pIdx].name.toLowerCase()}&template=${TEMPLATES[tIdx].id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Style tokens
  const lbl: React.CSSProperties = {
    display: "block", fontSize: "11px", fontWeight: 600,
    color: "#78716c", marginBottom: "6px", letterSpacing: "0.2px",
  };
  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    background: "#fff", border: "1px solid #e7e5e4",
    borderRadius: "8px", color: "#1c1917", fontSize: "14px",
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s",
  };
  const section: React.CSSProperties = { marginBottom: "22px" };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9", display: "flex", flexDirection: "column" }}>

      {/* Nav */}
      <div style={{
        padding: "14px 28px", borderBottom: "1px solid #e7e5e4",
        background: "#fff", display: "flex", justifyContent: "space-between",
        alignItems: "center", gap: "10px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{
            fontSize: "17px", fontWeight: 800, color: "#1c1917",
            textDecoration: "none", letterSpacing: "-0.4px",
          }}>
            Snap<span style={{ color: "#f97316" }}>OG</span>
          </Link>
          <Link href="/checker" style={{ color: "#a8a29e", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}>
            OG Checker
          </Link>
        </div>
        <button onClick={download} style={{
          padding: "9px 20px", background: "#f97316",
          border: "none", borderRadius: "8px", color: "#fff",
          fontSize: "13px", fontWeight: 700, cursor: "pointer",
          fontFamily: "inherit", boxShadow: "0 1px 4px rgba(249,115,22,0.3)",
        }}>
          ↓ Download PNG
        </button>
      </div>

      {/* Main: side-by-side */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left: controls */}
        <div style={{
          width: "320px", flexShrink: 0, background: "#fff",
          borderRight: "1px solid #e7e5e4", padding: "24px 22px",
          overflowY: "auto",
        }}>

          <div style={section}>
            <label style={lbl}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inp} placeholder="Your post title" />
          </div>

          <div style={section}>
            <label style={lbl}>Subtitle</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} style={inp} placeholder="Optional tagline" />
          </div>

          <div style={section}>
            <label style={lbl}>Domain</label>
            <input value={domain} onChange={e => setDomain(e.target.value)} style={{ ...inp, maxWidth: "220px" }} placeholder="yourblog.com" />
          </div>

          <div style={{ height: "1px", background: "#f5f5f4", margin: "4px 0 22px" }} />

          {/* Templates */}
          <div style={section}>
            <label style={lbl}>Template</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {TEMPLATES.map((t, i) => (
                <button key={t.id} onClick={() => setTIdx(i)} style={{
                  padding: "6px 14px",
                  background: tIdx === i ? "#fff7ed" : "#fafaf9",
                  border: `1px solid ${tIdx === i ? "#f97316" : "#e7e5e4"}`,
                  borderRadius: "6px",
                  color: tIdx === i ? "#ea580c" : "#78716c",
                  fontSize: "12px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div style={section}>
            <label style={lbl}>Theme — <span style={{ color: "#a8a29e", fontWeight: 400 }}>{PRESETS[pIdx].name}</span></label>
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
              {PRESETS.map((p, i) => (
                <button
                  key={p.name} onClick={() => setPIdx(i)} title={p.name}
                  style={{
                    width: "36px", height: "26px", borderRadius: "6px", cursor: "pointer",
                    background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                    border: pIdx === i ? "2px solid #f97316" : "2px solid transparent",
                    boxShadow: pIdx === i ? "0 0 0 2px #fff, 0 0 0 4px #f97316" : "none",
                    transition: "box-shadow 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Font */}
          <div style={section}>
            <label style={lbl}>Font</label>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {FONTS.map((f, i) => (
                <button key={f} onClick={() => setFIdx(i)} style={{
                  padding: "5px 11px",
                  background: fIdx === i ? "#fff7ed" : "#fafaf9",
                  border: `1px solid ${fIdx === i ? "#f97316" : "#e7e5e4"}`,
                  borderRadius: "5px",
                  color: fIdx === i ? "#ea580c" : "#78716c",
                  fontSize: "11px", cursor: "pointer", fontFamily: f,
                }}>
                  {f.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Size sliders */}
          <div style={section}>
            <label style={lbl}>Title size — {ts}px</label>
            <input type="range" min="32" max="80" value={ts}
              onChange={e => setTs(+e.target.value)}
              style={{ width: "100%", cursor: "pointer", accentColor: "#f97316" }} />
          </div>
          <div style={section}>
            <label style={lbl}>Subtitle size — {ss}px</label>
            <input type="range" min="16" max="40" value={ss}
              onChange={e => setSs(+e.target.value)}
              style={{ width: "100%", cursor: "pointer", accentColor: "#f97316" }} />
          </div>
        </div>

        {/* Right: canvas + outputs */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

          {/* Canvas preview */}
          <div style={{
            background: "#f5f5f4", borderRadius: "14px", padding: "20px",
            marginBottom: "24px", border: "1px solid #e7e5e4",
          }}>
            <canvas ref={canvasRef} style={{
              width: "100%", height: "auto", aspectRatio: "1200/630",
              borderRadius: "8px", display: "block",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            }} />
          </div>

          {/* API URL */}
          <div style={{
            background: "#fff", border: "1px solid #e7e5e4",
            borderRadius: "12px", padding: "18px", marginBottom: "14px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ ...lbl, marginBottom: 0, color: "#16a34a", fontSize: "12px" }}>
                🔗 API URL — use as your og:image src
              </label>
              <button onClick={copyUrl} style={{
                padding: "4px 12px", background: copied ? "#dcfce7" : "#f0fdf4",
                border: `1px solid ${copied ? "#86efac" : "#bbf7d0"}`,
                borderRadius: "6px", color: copied ? "#15803d" : "#16a34a",
                fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <code style={{
              display: "block", padding: "10px 12px",
              background: "#f0fdf4", borderRadius: "6px",
              fontSize: "10px", color: "#15803d",
              overflow: "auto", wordBreak: "break-all", lineHeight: 1.7,
            }}>{apiUrl}</code>
          </div>

          {/* Meta tags */}
          <div style={{
            background: "#fff", border: "1px solid #e7e5e4",
            borderRadius: "12px", padding: "18px",
          }}>
            <label style={{ ...lbl, color: "#ea580c", fontSize: "12px" }}>
              {"</>"} HTML Meta Tags — paste into your {"<head>"}
            </label>
            <pre style={{
              margin: "8px 0 0", padding: "12px",
              background: "#fff7ed", borderRadius: "6px",
              fontSize: "10px", color: "#9a3412",
              overflow: "auto", lineHeight: 1.8,
              whiteSpace: "pre-wrap", wordBreak: "break-all",
            }}>{`<meta property="og:image" content="${apiUrl}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${subtitle}" />\n<meta name="twitter:card" content="summary_large_image" />`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
