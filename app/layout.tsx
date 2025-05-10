import type { Metadata } from "next";
import GlobalStyles from "@/GlobalStyles";
import "./globals.css";
import '../styles/globals.css';
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from 'next/font/google';
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
import 'rsuite/dist/rsuite-no-reset.min.css';
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import FeedbackWidget from "@/components/FeedbackWidget";



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
      <body className={`${inter.variable} 'antialiased'`}>
      <GlobalStyles />
        {/* Toaster component */}
        <Toaster
          position="top-right"
        />
        {/* Skip to main content link for accessibility */}
        <a href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white"
        >
          Skip to main content
        </a>
        <div className="mb-18">
         <ResizableNavbar/>
         </div>
        <main className="min-h-screen" id="main">
          {/* <AuthProvider> */}
          <StyledComponentsRegistry>
          {children}
          </StyledComponentsRegistry>
          {/* </AuthProvider> */}
          <Analytics />
        </main>
        <Footer />
        <FeedbackWidget/>
      </body>
    </html>
  );
}