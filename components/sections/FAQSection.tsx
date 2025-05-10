import Link from "next/link";

import React from 'react'

const FAQSection = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2
                        id="faq-heading"
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
                        Common questions about our vending solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* FAQ Item 1 */}
                    <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
                        <h3 className="text-lg font-bold text-white mb-2">How can you offer machines at zero cost?</h3>
                        <p className="text-[#A5ACAF]">
                            Our business model allows us to provide premium machines at no cost to qualified locations that meet our minimum traffic requirements.
                        </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
                        <h3 className="text-lg font-bold text-white mb-2">What types of products are available?</h3>
                        <p className="text-[#A5ACAF]">
                            We offer a wide selection of premium snacks, beverages, and healthy options. Our team customizes the selection based on your workplace preferences.
                        </p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
                        <h3 className="text-lg font-bold text-white mb-2">How often are machines restocked?</h3>
                        <p className="text-[#A5ACAF]">
                            We monitor inventory levels remotely and typically restock weekly, though high-traffic locations may receive more frequent service.
                        </p>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
                        <h3 className="text-lg font-bold text-white mb-2">What payment methods are accepted?</h3>
                        <p className="text-[#A5ACAF]">
                            Our machines accept multiple payment options including credit/debit cards, mobile payments (Apple Pay, Google Pay), as well as traditional cash and coins.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/faq"
                        className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 font-medium inline-flex items-center"
                    >
                        View all FAQs
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

        </>
    );
};

export default FAQSection;