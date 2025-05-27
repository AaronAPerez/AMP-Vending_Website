import { MachineData } from "@/lib/data/vendingMachineData";

export function ProductJsonLd({ machine }: { machine: MachineData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: machine.name,
    description: machine.description,
    brand: { '@type': 'Brand', name: 'AMP Vending' },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}