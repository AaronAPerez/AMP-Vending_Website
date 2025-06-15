import Script from 'next/script';


interface StructuredDataProps {
  data: Record<string, any>;
  id?: string;
}

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "category": product.category,
    "image": product.image,
    "popular": product.popular,
    "healthy": product.healthy,
    "details": product.details,
  };
}