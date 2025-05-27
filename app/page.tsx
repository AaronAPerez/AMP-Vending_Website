
import HomePage from '@/components/landing/HomePage';
import { PAGE_METADATA } from '@/lib/data/seoData';
import HomeMetaTags from '@/components/seo/MetaTags';

// In layout.tsx or page.tsx
export const metadata = PAGE_METADATA.HOME;



// Export metadata for SEO
// export const metadata: Metadata = {
//   title: "AMP Vending | Zero-Cost Premium Vending Solutions for Workplaces | Modesto, CA",
//   description: "AMP Vending provides zero-cost, maintenance-free vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options for workplaces.",
//   keywords: "vending machines, zero-cost vending, workplace vending, touchscreen vending, Modesto vending",
//   alternates: {
//     canonical: "https://www.ampvendingmachines.com/",
//   },
//   openGraph: {
//     title: "Premium Vending Solutions at Zero Cost | AMP Vending",
//     description: "Enhance your workplace with advanced vending technology featuring touchscreen interfaces and 50+ customizable options.",
//     url: "https://www.ampvendingmachines.com/",
//     siteName: "AMP Vending",
//     images: [
//       {
//         url: "https://www.ampvendingmachines.com/images/og/homepage.jpg",
//         width: 1200,
//         height: 630,
//         alt: "AMP Vending Machines"
//       }
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Premium Vending Solutions at Zero Cost | AMP Vending",
//     description: "Enhance your workplace with advanced vending technology",
//     images: ["https://www.ampvendingmachines.com/images/og/homepage.jpg"],
//   }
// };


// export const metadata: Metadata = {
//   title: "AMP Vending | Zero-Cost Premium Vending Solutions for Workplaces | Modesto, CA",
//   description: "AMP Vending provides zero-cost, maintenance-free vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options for workplaces.",
//   keywords: "vending machines, zero-cost vending, workplace vending, touchscreen vending, Modesto vending",
//   alternates: {
//     canonical: "https://www.ampvendingmachines.com/",
//   },
//   openGraph: {
//     title: "Premium Vending Solutions at Zero Cost | AMP Vending",
//     description: "Enhance your workplace with advanced vending technology featuring touchscreen interfaces and 50+ customizable options.",
//     url: "https://www.ampvendingmachines.com/",
//     siteName: "AMP Vending",
//     images: [
//       {
//         url: "https://www.ampvendingmachines.com/images/og/homepage.jpg",
//         width: 1200,
//         height: 630,
//         alt: "AMP Vending Machines"
//       }
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Premium Vending Solutions at Zero Cost | AMP Vending",
//     description: "Enhance your workplace with advanced vending technology",
//     images: ["https://www.ampvendingmachines.com/images/og/homepage.jpg"],
//   }
// };

<HomeMetaTags meta={PAGE_METADATA.HOME} />

// Home page component that renders the HomePage component
export default function Home() {
  return <HomePage />;
}