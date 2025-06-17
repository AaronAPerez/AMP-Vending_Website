import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
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
    other: {
    'referrer': 'same-origin', // This helps with referrer policy
  },
  // Add CSP if needed
  // 'headers' property is not supported in Next.js Metadata
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* Enhanced skip link with proper focus styles */}
        <a 
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600 focus:text-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        
        <div>
          <ResizableNavbar/>
        </div>
        
        <main className="mt-4">
          <StyledComponentsRegistry>
            {children}
             <SpeedInsights />
            <Analytics />
          </StyledComponentsRegistry>
        </main>
        
        <FeedbackWidget/>
        <Footer/>
      </body>
    </html>
  );
}