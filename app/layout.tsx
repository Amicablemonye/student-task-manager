import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Manager App",
  description: "Created by Amicable Monye",
  icons: {
    icon: [
      {
        url: "/app-icon.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark_app-icon.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/app-icon-32x32.png",
        type: "image/png+xml",
      },
    ],
    apple: "/app-icon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
