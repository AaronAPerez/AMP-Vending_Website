import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Vending Machines | Touchscreen Technology | AMP Vending",
  description: "Explore our premium vending machines featuring touchscreen interfaces, tap-to-pay technology, and customizable product selections for workplaces. Zero-cost installation.",
  keywords: "premium vending machines, touchscreen vending, workplace vending solutions, zero-cost vending machines, Modesto",
  alternates: {
    canonical: "https://www.ampvendingmachines.com/vending-machines",
  },
  openGraph: {
    title: "Premium Vending Machines | AMP Vending",
    description: "Zero-cost premium vending solutions with touchscreen technology and 50+ customizable product options.",
    url: "https://www.ampvendingmachines.com/vending-machines",
    siteName: "AMP Vending",
    images: [
      {
        url: "https://www.ampvendingmachines.com/images/og/vending-machines.jpg",
        width: 1200,
        height: 630,
        alt: "AMP Premium Vending Machines"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Vending Machines | AMP Vending",
    description: "Zero-cost premium vending solutions with touchscreen technology",
    images: ["https://www.ampvendingmachines.com/images/og/vending-machines.jpg"],
  }
};

export default function VendingMachinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}