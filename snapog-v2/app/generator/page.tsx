"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

// Canvas helpers
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const words = text.split(" ");
  let line = "", cy = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line.trim(), x, cy); line = words[i] + " "; cy += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, cy);
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

function renderBold(ctx: CanvasRenderingContext2D, w: number, h: number, o: any) {
  const g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,o.bgFrom); g.addColorStop(1,o.bgTo);
  ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  ctx.globalAlpha=0.07; ctx.fillStyle="#fff";
  ctx.beginPath(); ctx.arc(w*.85,h*.2,200,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(w*.1,h*.8,150,0,Math.PI*2); ctx.fill();
  ctx.globalAlpha=1; ctx.fillStyle=o.textColor;
  ctx.font=`800 ${o.ts}px ${o.ff}`; wrapText(ctx,o.title,80,200,w-160,o.ts*1.15);
  ctx.globalAlpha=0.65; ctx.font=`400 ${o.ss}px ${o.ff}`;
  const lc = getLineCount(ctx,o.title,w-160,`800 ${o.ts}px ${o.ff}`);
  wrapText(ctx,o.subtitle,80,200+lc*o.ts*1.15+28,w-160,o.ss*1.4);
  ctx.globalAlpha=1;
  if(o.domain){ctx.font=`600 22px ${o.ff}`;ctx.globalAlpha=0.4;ctx.fillText(o.domain,80,h-55);ctx.globalAlpha=1;}
}

function renderTemplate(ctx: CanvasRenderingContext2D, w: number, h: number, templateId: string, o: any) {
  // For MVP, all templates use bold with slight variations
  // In production, each template has unique rendering logic
  renderBold(ctx, w, h, o);
}

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

  const lbl: React.CSSProperties = { display: "block", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#555", fontWeight: 700, marginBottom: "8px" };
  const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#e4e4e7", fontSize: "14px", fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ fontSize: "18px", fontWeight: 800, background: "linear-gradient(135deg, #f97316, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>SnapOG</Link>
          <Link href="/checker" style={{ color: "#666", fontSize: "12px", textDecoration: "none" }}>OG Checker</Link>
        </div>
        <button onClick={download} style={{ padding: "8px 20px", background: "linear-gradient(135deg, #f97316, #ec4899)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Download PNG
        </button>
      </div>

      {/* Canvas */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <canvas ref={canvasRef} style={{ width: "100%", maxWidth: "680px", height: "auto", aspectRatio: "1200/630", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)", display: "block" }} />
      </div>

      {/* Controls */}
      <div style={{ padding: "20px 24px 40px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label style={lbl}>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} style={inp} />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={lbl}>Subtitle</label>
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} style={inp} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>Domain</label>
          <input value={domain} onChange={e => setDomain(e.target.value)} style={{ ...inp, maxWidth: "260px" }} />
        </div>

        {/* Templates */}
        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>Template</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {TEMPLATES.map((t, i) => (
              <button key={t.id} onClick={() => setTIdx(i)} style={{ padding: "7px 14px", background: tIdx === i ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${tIdx === i ? "#f97316" : "rgba(255,255,255,0.07)"}`, borderRadius: "6px", color: tIdx === i ? "#f97316" : "#777", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{t.name}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>Theme</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {PRESETS.map((p, i) => (
              <button key={p.name} onClick={() => setPIdx(i)} title={p.name} style={{ width: "40px", height: "28px", borderRadius: "6px", cursor: "pointer", background: `linear-gradient(135deg, ${p.from}, ${p.to})`, border: `2px solid ${pIdx === i ? "#f97316" : "transparent"}` }} />
            ))}
          </div>
        </div>

        {/* Font */}
        <div style={{ marginBottom: "20px" }}>
          <label style={lbl}>Font</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {FONTS.map((f, i) => (
              <button key={f} onClick={() => setFIdx(i)} style={{ padding: "5px 12px", background: fIdx === i ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${fIdx === i ? "#f97316" : "rgba(255,255,255,0.07)"}`, borderRadius: "5px", color: fIdx === i ? "#f97316" : "#666", fontSize: "11px", cursor: "pointer", fontFamily: f }}>{f.split(" ")[0]}</button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "24px" }}>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={lbl}>Title: {ts}px</label>
            <input type="range" min="32" max="80" value={ts} onChange={e => setTs(+e.target.value)} style={{ width: "100%", cursor: "pointer" }} />
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <label style={lbl}>Subtitle: {ss}px</label>
            <input type="range" min="16" max="40" value={ss} onChange={e => setSs(+e.target.value)} style={{ width: "100%", cursor: "pointer" }} />
          </div>
        </div>

        {/* API URL */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
          <label style={{ ...lbl, color: "#22c55e" }}>API URL (use as og:image)</label>
          <code style={{ display: "block", padding: "10px", background: "rgba(0,0,0,0.4)", borderRadius: "6px", fontSize: "10px", color: "#22c55e", overflow: "auto", wordBreak: "break-all", lineHeight: 1.6 }}>{apiUrl}</code>
        </div>

        {/* Meta tags */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px" }}>
          <label style={{ ...lbl, color: "#f97316" }}>HTML Meta Tags</label>
          <pre style={{ margin: "8px 0 0", padding: "12px", background: "rgba(0,0,0,0.4)", borderRadius: "6px", fontSize: "10px", color: "#777", overflow: "auto", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{`<meta property="og:image" content="${apiUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${subtitle}" />
<meta name="twitter:card" content="summary_large_image" />`}</pre>
        </div>
      </div>
    </div>
  );
}
