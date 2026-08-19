import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsentDefaultsScript } from "@/components/cookies/consent-defaults-script";
import { CookieConsentRoot } from "@/components/cookies/cookie-consent-root";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain,
);

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...buildMetadata({
    title: "Commercial Dispute Expert Witness",
    description: siteConfig.connectorPitch,
    path: "/",
    keywords: [
      "commercial dispute expert witness",
      "forensic accounting expert witness",
      "loss of profits expert witness",
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${dmSans.variable} flex min-h-screen min-w-0 flex-col overflow-x-clip antialiased`}
      >
        <ConsentDefaultsScript />
        <CookieConsentRoot>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <Header />
          <main id="main-content" className="min-h-[60vh] flex-1">
            {children}
          </main>
          <Footer />
        </CookieConsentRoot>
      </body>
    </html>
  );
}
