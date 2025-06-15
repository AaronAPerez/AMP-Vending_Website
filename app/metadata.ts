export const siteMetadata = {
  title: {
    template: '%s | AMP Vending - Premium Workplace Vending Solutions',
    default: 'AMP Vending - Premium Workplace Vending Solutions',
  },
  description: 'Professional vending machine solutions with 21.5" touchscreen technology, contactless payments, and comprehensive service packages for Central California workplaces.',
  keywords: [
    'vending machines California',
    'workplace vending solutions',
    'touchscreen vending machines',
    'professional vending service',
    'Modesto vending machines',
    'Central Valley vending',
    'contactless payment vending',
    'office break room solutions'
  ],
  authors: [{ name: 'AMP Vending' }],
  creator: 'AMP Vending',
  publisher: 'AMP Vending',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ampvendingmachines.com',
    siteName: 'AMP Vending',
    title: 'Professional Vending Solutions | AMP Vending',
    description: 'Transform your workplace with advanced vending machines featuring 21.5" touchscreen interfaces, contactless payments, and 50+ customizable product options.',
    images: [
      {
        url: '/images/og/default-og-image.png',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Professional Workplace Vending Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Vending Solutions | AMP Vending',
    description: 'Transform your workplace with advanced vending machines featuring touchscreen technology and contactless payments.',
    images: ['/images/og/default-og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};
