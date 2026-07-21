import type { Metadata } from "next";
import { Lato, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const lato = Lato({
  weight: ["300", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkbeyondtax.com"),
  title: {
    default: `${SITE_NAME} — Accounting, Bookkeeping & UAE Tax Support`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE}. Practical support with bookkeeping, accounting, financial reporting, VAT and Corporate Tax — inside TallyPrime, QuickBooks, Zoho Books, Xero and EmaraTax.`,
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/brand/tbt-app-icon.png",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: ["/brand/favicon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
