import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// TODO: Update this to use actual title and description
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "My App",
  description: "A clean Next.js app with Supabase authentication",
};

// TODO: Update this to use actual font
const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <div className="min-h-screen bg-white max-w-2xl mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
