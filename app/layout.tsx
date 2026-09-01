import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",           // prevents render-blocking
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,            // mono only needed later; save LCP budget
});

export const metadata: Metadata = {
  title: {
    default: "Preet Rank - AIML engineer",
    template: "%s | Preet Rank - AIML engineer",
  },
  description: "Preet Rank - AIML engineer",
  keywords: ["systems developer", "AI/ML engineer", "rust", "python", "machine learning", "portfolio"],
  authors: [{ name: "Preet Rank", url: "https://github.com/preettrank53" }],

  // Favicon — Next.js picks up app/favicon.ico automatically,
  // but we add explicit icons to prevent the 500 on /favicon.ico
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // Open Graph (LinkedIn, Slack previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Preet Rank - AIML engineer",
    description: "Preet Rank - AIML engineer",
    siteName: "Preet Rank Portfolio",
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Preet Rank - AIML engineer",
    description: "Preet Rank - AIML engineer",
  },

  // Stops browser from trying to detect phone numbers etc.
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,           // allow pinch-zoom for accessibility
};



import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} bg-[var(--theme-bg)] text-[var(--theme-text)] antialiased`}
        suppressHydrationWarning
      >
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  );
}
