import { MotionValue, useSpring, useTransform } from "framer-motion";

// Custom hook for parallax effect
export const useHeroParallax = (scrollProgress: MotionValue<number>) => {
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  
  const translateX = useSpring(
    useTransform(scrollProgress, [0, 1], [0, 1000]),
    springConfig
  );
  
  const translateXReverse = useSpring(
    useTransform(scrollProgress, [0, 1], [0, -1000]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  
  return { translateX, translateXReverse, opacity };
};
