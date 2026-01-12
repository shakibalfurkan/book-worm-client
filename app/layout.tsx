import type { Metadata } from "next";
import { Crimson_Text, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BookWorm",
  description: "Welcome to BookWorm, your personal library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${crimsonText.variable} ${playfairDisplay.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
