// Testimonials component
const Testimonials = () => {
  return (
    <div className="mt-12 border-t border-[#a4acac] pt-12">
      <h3 className="text-2xl font-bold text-white mb-6">What Our Clients Say</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#4d4d4d]/50 p-6 rounded-lg relative">
          <div className="absolute top-3 left-3 text-4xl text-[#FD5A1E]/20">&apos;</div>
          <blockquote className="relative z-10 pt-4">
            <p className="text-[#A5ACAF] italic mb-4">
              The AMP vending machines have been a game-changer for our office. The touchscreen interface is intuitive, and our team loves the diverse selection of snacks and beverages.
            </p>
            <footer className="text-white font-medium">
              Sarah Johnson, <span className="text-[#A5ACAF]">Office Manager at TechNova</span>
            </footer>
          </blockquote>
        </div>
        
        <div className="bg-[#4d4d4d]/50 p-6 rounded-lg relative">
          <div className="absolute top-3 left-3 text-4xl text-[#FD5A1E]/20">&apos;</div>
          <blockquote className="relative z-10 pt-4">
            <p className="text-[#A5ACAF] italic mb-4">
              Zero upfront costs and top-notch maintenance service. AMP&apos;s vending solution provides exactly what we needed - quality refreshments that our staff can access 24/7.
            </p>
            <footer className="text-white font-medium">
              Michael Chen, <span className="text-[#A5ACAF]">Facilities Director at Meridian Health</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;