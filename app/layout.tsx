import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Residential Proxy Builder | IPRoyal Helper",
  description: "Build your IPRoyal residential proxy string in seconds. Compose HOST:PORT:USERNAME:PASSWORD strings with region selection and connection details.",
  keywords: ["proxy", "IPRoyal", "residential proxy", "proxy builder", "proxy string"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
