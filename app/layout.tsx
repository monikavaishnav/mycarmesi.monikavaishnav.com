import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Her Job — Live on the Grid | Carmesi",
  description:
    "A takeover week on @mycarmesi, imagined post by post. Tap any tile to see the strategist's note behind it.",
  openGraph: {
    title: "Not Her Job — Live on the Grid | Carmesi",
    description:
      "A takeover week on @mycarmesi, imagined post by post. Tap any tile to see the strategist's note behind it.",
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
