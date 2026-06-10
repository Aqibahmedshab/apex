import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://apexautomations.ai"),
  title: "Apex Automations | AI Automation Agency",
  description:
    "Apex Automations designs autonomous AI systems for lead generation, customer support, operations, and always-on business growth.",
  keywords: [
    "AI automation agency",
    "AI agents",
    "WhatsApp automation",
    "lead generation automation",
    "business process automation",
    "customer support AI",
  ],
  openGraph: {
    title: "Apex Automations",
    description:
      "Build an AI-Powered Business That Works 24/7 with autonomous AI teams, command-center analytics, and revenue-driving automation.",
    url: "https://apexautomations.ai",
    siteName: "Apex Automations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Automations",
    description:
      "Premium AI automation systems, autonomous agents, WhatsApp flows, and command-center infrastructure for ambitious businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

