import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Navigation from "@/components/layout/Navigation";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/FeedbackWidget";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

// const geistSans = Geist({
//   display: "swap",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
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
          <main className="min-h-screen" id="main">
            {/* <UnifiedNavbar/> */}
            {/* <div className="flex-1 w-full gap-20 items-center"> */}
              <Navigation/> 
              {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-start items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>
                      <Image
                        src="/images/logo/AMP__logo.png"
                        alt="AMP Vending Logo"
                        width={100}
                        height={0}
                        className=""
                      />
                    </Link>
                  </div>

                </div>
                <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <ThemeSwitcher />
                    
                    <Link
                      href="/contact"
                      className="ml-4 bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(253,90,30,0.3)] hover:shadow-[0_0_20px_rgba(253,90,30,0.5)]"
                      aria-label="Get a quote for vending machine services"
                    >
                      Get Started
                    </Link>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </div>
              </nav> */}
              <div className="flex flex-col gap-20">
                {children}
                <Analytics />
              </div>
                {/* <ThemeSwitcher /> */}
           <Footer/>
           <FeedbackWidget/>
            {/* </div> */}
          </main>
      </body>
    </html>
  );
}
