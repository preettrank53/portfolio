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
    default: "John Doe — Systems Developer",
    template: "%s | John Doe Portfolio",
  },
  description:
    "High-performance systems engineering portfolio. Compilers, memory runtimes, and speculative inference serving layers.",
  keywords: ["systems developer", "rust", "compiler", "wasm", "portfolio"],
  authors: [{ name: "John Doe", url: "https://johndoe.dev" }],

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
    title: "John Doe — Systems Developer",
    description:
      "High-performance systems engineering portfolio. Compilers, memory runtimes, and speculative inference serving layers.",
    siteName: "John Doe Portfolio",
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "John Doe — Systems Developer",
    description: "Systems developer portfolio. Rust, compilers, WASM, and more.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
