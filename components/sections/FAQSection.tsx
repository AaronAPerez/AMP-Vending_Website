import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle, Search, Zap, CreditCard } from 'lucide-react';

/**
 * FAQSection Component
 * Displays frequently asked questions about AMP Vending services
 * Updated styling to match site-wide visual enhancements
 */
const FAQSection = () => {
  // FAQ data structure with categories
  const faqItems = [
    {
      id: 1,
      question: "How can you offer machines at zero cost?",
      answer: "Our business model allows us to provide premium machines at no cost to qualified locations that meet our minimum traffic requirements.",
      icon: <Zap size={20} />,
      category: "business"
    },
    {
      id: 2,
      question: "What types of products are available?",
      answer: "We offer a wide selection of premium snacks, beverages, and healthy options. Our team customizes the selection based on your workplace preferences.",
      icon: <Search size={20} />,
      category: "products"
    },
    {
      id: 3,
      question: "How often are machines restocked?",
      answer: "We monitor inventory levels remotely and typically restock weekly, though high-traffic locations may receive more frequent service.",
      icon: <HelpCircle size={20} />,
      category: "service"
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer: "Our machines accept multiple payment options including credit/debit cards, mobile payments (Apple Pay, Google Pay), as well as traditional cash and coins.",
      icon: <CreditCard size={20} />,
      category: "payment"
    }
  ];
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
          Support
        </span>
        <h2
          id="faq-heading"
          className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
        >
          Frequently Asked <span className="text-[#FD5A1E]">Questions</span>
        </h2>
        <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
          Find answers to common questions about our premium vending solutions.
        </p>
      </motion.div>
      
      {/* Search Section */}
      <motion.div 
        className="max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full py-4 pl-14 pr-4 rounded-full bg-[#111111] border border-[#333333] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-transparent"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#A5ACAF]">
            <Search size={20} />
          </div>
        </div> */}
      </motion.div>
      
      {/* FAQ Grid */}
      <motion.div 
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all"
            variants={itemVariants}
          >
            {/* Question */}
            <div className="p-6 border-b border-[#333333] flex items-start gap-4">
              <div className="p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] flex-shrink-0">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">{item.question}</h3>
            </div>
            
            {/* Answer */}
            <div className="p-6">
              <p className="text-[#A5ACAF]">{item.answer}</p>
              
              {/* Category Tag */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs py-1 px-3 bg-[#333333] text-[#A5ACAF] rounded-full">
                  {item.category}
                </span>
                {/* <button className="text-[#FD5A1E] text-sm hover:underline focus:outline-none">
                  Read more
                </button> */}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Additional Questions Section */}
      <motion.div 
        className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333333] mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
          Have More Questions?
        </h3>
        <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
          Our comprehensive FAQ section covers additional topics including machine maintenance, 
          product selection, and service details. If you can&apos;t find what you&apos;re looking for, 
          our team is always ready to help.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* <Link
            href="/faq"
            className="inline-flex items-center px-6 py-3 bg-[#111111] text-[#F5F5F5] rounded-full border border-[#333333] hover:bg-[#222222] transition-colors"
          >
            <span>View all FAQs</span>
            <ChevronRight size={16} className="ml-2" />
          </Link> */}
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#FD5A1E]/10 text-[#FD5A1E] rounded-full border border-[#FD5A1E]/30 hover:bg-[#FD5A1E]/20 transition-colors"
          >
            <span>Contact Support</span>
            <HelpCircle size={16} className="ml-2" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;