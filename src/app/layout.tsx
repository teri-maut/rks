import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Sister • A Cinematic Raksha Bandhan Story",
  description:
    "An interactive, scroll-driven cinematic journey celebrating sisterhood, classical dance, and heartfelt memories for Raksha Bandhan.",
  keywords: [
    "Raksha Bandhan",
    "Sister Gift",
    "Kuchipudi Dance",
    "Cinematic Story",
    "Personalized Gift",
  ],
  authors: [{ name: "Your Brother" }],
  openGraph: {
    title: "For My Sister • A Cinematic Raksha Bandhan Story",
    description: "A scroll-driven cinematic journey celebrating love and classical dance.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020204",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
