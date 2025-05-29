declare module '@/components/ui/aceternity/hero-parallax' {
    import { ReactNode } from 'react';
    
    interface Product {
      title: string;
      thumbnail: string;
      link: string;
    }
    
    interface HeroParallaxProps {
      products: Product[];
      children?: ReactNode;
    }
    
    export const HeroParallax: React.FC<HeroParallaxProps>;
    export default HeroParallax;
  }