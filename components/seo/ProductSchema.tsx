import { generateProductSchema } from '@/lib/seo/structuredData';
import StructuredData from './StructuredData';

interface ProductSchemaProps {
  product: any;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = generateProductSchema(product);
  
  return (
    <StructuredData 
      data={schema} 
      id={`product-schema-${product.id}`} 
    />
  );
}