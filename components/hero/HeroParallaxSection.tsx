
// // Export additional utilities if needed
export const HeroParallaxSection: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <section className={`relative bg-[#000000] ${className}`}>
      {children}
    </section>
  );
 };