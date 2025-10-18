import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// TODO: Update this to use actual title and description
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PromptKit",
  description: "Web app for creating and managing prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-white max-w-[640px] mx-auto pb-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
