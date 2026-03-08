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
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#06060B",
          color: "#d4d4d8",
          fontFamily:
            "Trebuchet MS, Lucida Sans, Lucida Sans Regular, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
