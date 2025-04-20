import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import '../styles/globals.css'
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import 'rsuite/dist/rsuite-no-reset.min.css';
import Navigation from "@/components/layout/Navigation";


export const metadata: Metadata = {
  title: "AMP Vending Machine Website",
  description: "Premium vending machine solutions for workplaces",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* Toaster component */}
        <Toaster
          position="top-right"
        />
        {/* Skip to main content link for accessibility */}
        <a href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-emerald-600 focus:text-white"
        >
          Skip to main content
        </a>
        {/* <Navbar /> */}
        <Navigation />
        <main className="min-h-screen" id="main">
          {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}