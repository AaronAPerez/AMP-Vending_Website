import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className = "" }: ProductImageProps) => {
  // Placeholder for missing images
  const placeholderSrc = '/api/placeholder/600/400';
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src || placeholderSrc}
        alt={alt}
        width={600}
        height={400}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = placeholderSrc;
        }}
      />
    </div>
  );
};

export default ProductImage;