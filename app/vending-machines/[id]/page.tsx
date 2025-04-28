import ImageSlider from '@/components/ImageSlider';
import Footer from '@/components/layout/Footer';
import FeatureTabs from '@/components/machines/FeatureTabs';
import MachineComparison from '@/components/machines/MachineComparison';
import Testimonials from '@/components/testimonials/TestimonialShowcase';
import Link from 'next/link';




// Main Vending Machine Page component
export default function VendingMachinePage() {
  // Page metadata (for SEO)
  
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#000000] to-[#4d4d4d]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                State-of-the-Art <span className="text-[#FD5A1E]">Vending Machines</span>
              </h1>
              <p className="text-xl text-[#A5ACAF] mb-8">
                Enhance your workplace with premium vending solutions featuring touchscreen interfaces, 
                diverse payment options, and customizable product selections – all with zero upfront cost.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-[#FD5A1E] text-white rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors"
                >
                  Request Your Machine
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="px-6 py-3 border border-[#A5ACAF] text-white rounded-full font-medium hover:border-[#FD5A1E] hover:text-[#FD5A1E] transition-colors"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            
            <div>
              <ImageSlider />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Explore Our <span className="text-[#FD5A1E]">Premium Features</span>
          </h2>
          
          <FeatureTabs />
          <MachineComparison />
          <Testimonials />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#FD5A1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Enhance Your Workplace?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the growing number of businesses providing premium refreshment options 
            to their employees and customers with zero upfront costs.
          </p>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-black hover:text-white transition-colors inline-flex items-center"
          >
            Request a Consultation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}