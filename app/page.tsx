import HomePage from "../components/features/landing/HomePage";
import type { Metadata } from "next";

/**
 * Metadata for the homepage
 * Optimized for SEO and social sharing
 */
export const metadata: Metadata = {
  title: "AMP Vending | Premium Vending Solutions for Workplaces | Modesto, CA",
  description: "AMP Vending provides premium vending machines with 21.5\" touchscreen interfaces and 50+ customizable product options for workplaces in Central California.",
  keywords: "vending machines, workplace vending, touchscreen vending, Modesto vending, Central California vending solutions",
  alternates: {
    canonical: "https://www.ampvendingmachines.com/",
  },
  openGraph: {
    title: "Premium Vending Solutions | AMP Vending",
    description: "Enhance your workplace with advanced vending technology featuring touchscreen interfaces and 50+ customizable options.",
    url: "https://www.ampvendingmachines.com/",
    siteName: "AMP Vending",
    images: [
      {
        url: "https://www.ampvendingmachines.com/images/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "AMP Vending Machines"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Vending Solutions | AMP Vending",
    description: "Enhance your workplace with advanced vending technology",
    images: ["https://www.ampvendingmachines.com/images/og/homepage.jpg"],
  }
};

/**
 * Home Page Component
 * 
 * Main landing page that showcases AMP Vending's services and solutions.
 * Features comprehensive vending machine information, workplace benefits,
 * and contact options for potential clients.
 */
export default function Home() {
  return <HomePage />;
}