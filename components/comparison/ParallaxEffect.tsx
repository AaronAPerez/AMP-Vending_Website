import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react'


/**
 * Parallax Effect Component
 */
const ParallaxEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create smooth motion values with spring physics
  const springConfig = { stiffness: 150, damping: 30 };
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]), 
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), 
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]), 
    springConfig
  );
  
  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{ translateY, scale, opacity }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxEffect