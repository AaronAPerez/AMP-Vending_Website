'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Product {
  title: string;
  thumbnail: string;
  link: string;
}

interface HeroParallaxProps {
  products: Product[];
  children?: React.ReactNode;
}

export const CustomHeroParallax = ({ products, children }: HeroParallaxProps) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [-700, 500]);

  const first = Math.floor(products.length / 3);
  const second = Math.floor(products.length / 3);
  const third = products.length - first - second;

  const firstRow = products.slice(0, first);
  const secondRow = products.slice(first, first + second);
  const thirdRow = products.slice(first + second);

  return (
    <div ref={ref} className="h-auto pb-40 pt-20 antialiased">
      {/* Top section with content */}
      <div className="max-w-7xl relative mx-auto pt-20 px-4">
        {children}
      </div>

      {/* Moving products - Modified for better performance */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`product-first-row-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`product-second-row-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`product-third-row-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <div className="h-full w-full rounded-lg overflow-hidden shadow-lg border border-[#4d4d4d] group-hover/product:border-[#FD5A1E] transition-colors">
          <Image
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center absolute h-full w-full inset-0"
            alt={product.title}
          />
          <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
          <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-lg font-semibold z-10 transition-all duration-200">
            {product.title}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
};

export default CustomHeroParallax;