import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Davin Amadeo Wijaya — AI Engineer",
  description:
    "Personal portfolio of Davin Amadeo Wijaya, a developer building clean, fast, and thoughtful digital experiences.",
  keywords: [
    "developer",
    "portfolio",
    "frontend",
    "AI engineer",
    "software engineer",
  ],
  authors: [{ name: "Davin Amadeo Wijaya" }],
  openGraph: {
    title: "Davin Amadeo Wijaya — AI Engineer",
    description: "Personal portfolio of Davin Amadeo Wijaya.",
    url: "https://yourname.vercel.app",
    siteName: "Davin Amadeo Wijaya",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davin Amadeo Wijaya — AI Engineer",
    description: "Personal portfolio of Davin Amadeo Wijaya.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="bg-neutral-950 text-neutral-100 antialiased overflow-hidden">
        {/* Film grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {children}
      </body>
    </html>
  );
}