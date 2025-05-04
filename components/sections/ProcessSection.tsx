import Link from 'next/link'
import React from 'react'

const ProcessSection = () => {
  return (
    <div>
          {/* Process Section */}
      <section
        className="py-16 bg-black"
        aria-labelledby="process-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="process-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Getting Started Is Simple
            </h2>
            <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
              Our streamlined process gets your vending machines up and running with minimal effort.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">1</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Request a Consultation</h3>
              <p className="text-[#A5ACAF]">Schedule a quick call to discuss your workplace needs and machine options.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">2</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Site Assessment</h3>
              <p className="text-[#A5ACAF]">We`&apos;ll visit your location to identify the optimal placement for your machines.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">3</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Installation</h3>
              <p className="text-[#A5ACAF]">Our team handles the complete setup with zero disruption to your workplace.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#4d4d4d] border border-[#a4acac] rounded-xl p-6 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#FD5A1E] text-white font-bold flex items-center justify-center">4</div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Ongoing Support</h3>
              <p className="text-[#A5ACAF]">We handle all maintenance and restocking automatically. You simply enjoy the convenience.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-full shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProcessSection