import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapOG — Beautiful Social Preview Images in Seconds",
  description:
    "Generate stunning Open Graph images for your blog posts. No design skills needed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#FAFAF9",
          color: "#1c1917",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}
