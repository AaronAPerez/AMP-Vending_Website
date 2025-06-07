import type { Metadata } from "next";
import "./globals.css";
// import "../styles/globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';

import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body 
       className={`${inter.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white"
        >
          Skip to main content
        </a>
        
        <div className="">
          <ResizableNavbar/>
        </div>
        
        <main className="mt-4">
          <StyledComponentsRegistry>
            {children}
            <Analytics />
          </StyledComponentsRegistry>
        </main>
        
        <FeedbackWidget/>
        <Footer/>
      </body>
    </html>
  );
}