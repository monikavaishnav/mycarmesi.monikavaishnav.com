import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Inter, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-luckiest-guy",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${caveat.variable} ${inter.variable} ${luckiestGuy.variable}`}>
      <body>
        <header className="siteBar">
          <a href="https://monikavaishnav.com/" className="siteBarBack">← monikavaishnav.com</a>
          <span className="siteBarMark">Carmesi — Not Her Job</span>
        </header>
        {children}
      </body>
    </html>
  );
}
