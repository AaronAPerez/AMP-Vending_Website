import Link from 'next/link'
import React from 'react'

const CTASection = () => {
  return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Refreshments, Zero Hassle
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with no costs and no maintenance worries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/proposal"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-black transition-colors"
            >
              View Proposal
            </Link>
          </div>
        </div>
  )
}

export default CTASection