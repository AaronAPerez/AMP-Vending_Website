
import { Product } from "../sections/ProductSection";
import { HydrationSafeImage } from "./shared/HydrationSafeImage";





/**
 * Background Overlay Card Component - Inspired by Aceternity
 */
const BackgroundOverlayCard = ({ product }: { product: Product }) => {

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <HydrationSafeImage
          src={product.image}
          alt={product.name}
          width={10}
          height={10}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tags */}
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        {product.popular && (
          <div className="px-2 py-1 bg-[#FD5A1E] text-white text-xs rounded-full backdrop-blur-sm">
            Popular
          </div>
        )}
        {product.healthy && (
          <div className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded-full backdrop-blur-sm">
            Healthy
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white shadow-">
        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
             <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" />
        <p className="text-sm text-gray-300 capitalize mb-1">{product.category}</p>

        {/* {product.details && (
          <p className="text-xs text-gray-400 italic mb-2 line-clamp-2">{product.details}</p>
        )} */}
        
        {/* Bottom section with price and gradient line */}
        <div className="relative mt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" />
          <div className="flex justify-between items-center">
           {/* <span className="text-[#FD5A1E] font-bold text-lg">{formatPrice(product.price)}</span> */}
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors">
              Add
            </button> 
          </div>
        </div> 
      </div>

      {/* Hover Effect Glow */}
      <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD5A1E]/20 to-transparent blur-md" />
      </div>
    </div>

   
 
  );
};

export default BackgroundOverlayCard;