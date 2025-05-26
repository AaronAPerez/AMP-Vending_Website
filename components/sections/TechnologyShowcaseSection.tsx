import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, BarChart4, Layers } from 'lucide-react';

/**
 * TechnologyShowcaseSection Component
 * 
 * Showcases the cutting-edge technology features in brand new vending machines
 * Highlights touchscreen interface, payment options, and advanced monitoring
 */
const TechnologyShowcaseSection = () => {
  // State to track active feature tab
  const [activeFeature, setActiveFeature] = useState('touchscreen');
  
  // Feature data
  const features = [
    {
      id: 'touchscreen',
      title: '21.5" Touchscreen Interface',
      description: 'Our machines feature a premium high-definition touchscreen display that enhances the purchasing experience with intuitive navigation and dynamic content.',
      icon: <Smartphone size={24} />,
      details: [
        'High-definition 21.5" display with vibrant color reproduction',
        'Intuitive touch interface for easy product browsing and selection',
        'Product information display with nutritional details',
        'Multi-language support for diverse environments',
        'Seamless software updates for continuous improvement'
      ],
      image: '/images/vending-machines/premium-vending-machines.jpg' // Replace with actual image path
    },
    {
      id: 'payment',
      title: 'Advanced Payment Systems',
      description: 'The latest payment technologies support multiple methods including contactless, mobile payments, and traditional cash for maximum convenience.',
      icon: <CreditCard size={24} />,
      details: [
        'Tap-to-pay functionality with NFC technology',
        'Mobile payment support (Apple Pay, Google Pay, Samsung Pay)',
        'Traditional credit and debit card acceptance',
        'Bill acceptance with advanced validation',
        'Secure transaction processing meeting latest standards'
      ],
      image: '/images/payment-systems.jpg' // Replace with actual image path
    },
    {
      id: 'monitoring',
      title: 'Remote Monitoring',
      description: 'Advanced telemetry and monitoring systems allow us to track machine performance, inventory levels, and maintenance needs in real-time.',
      icon: <BarChart4 size={24} />,
      details: [
        'Real-time inventory tracking for optimal stocking',
        'Temperature monitoring for refrigerated products',
        'Predictive maintenance to prevent downtime',
        'Usage pattern analysis for product optimization',
        'Automated alerts for technical issues'
      ],
      image: '/images/remote-monitoring.jpg' // Replace with actual image path
    },
    {
      id: 'customization',
      title: 'Customizable Configuration',
      description: 'Our machines feature adaptable shelving and temperature zones that can be configured to suit your specific product mix and location needs.',
      icon: <Layers size={24} />,
      details: [
        'Adjustable shelving for various product sizes',
        'Multiple temperature zones in refrigerated models',
        'Programmable planograms for optimal product placement',
        'Energy-efficient LED lighting systems',
        'Modular construction for flexible installation'
      ],
      image: '/images/customizable-config.jpg' // Replace with actual image path
    }
  ];
  
  // Get active feature data
  const activeFeatureData = features.find(feature => feature.id === activeFeature);

  return (
    <section className="py-16 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/5 to-transparent"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0M30 60L60 30M0 30L30 0' stroke='white' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
            <Smartphone size={16} className="text-[#FD5A1E]" />
            Advanced Technology
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Cutting-Edge <span className="text-[#FD5A1E]">Vending Technology</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Our brand new machines feature the latest innovations in vending technology,
            delivering a premium experience for both users and administrators.
          </p>
        </motion.div>
        
        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {features.map(feature => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFeature === feature.id
                  ? 'bg-[#FD5A1E] text-[#F5F5F5]'
                  : 'bg-[#111111] text-[#A5ACAF] hover:bg-[#222222]'
              }`}
              aria-pressed={activeFeature === feature.id}
            >
              <div className="flex items-center gap-2">
                <span className={activeFeature === feature.id ? 'text-[#F5F5F5]' : 'text-[#FD5A1E]'}>
                  {feature.icon}
                </span>
                <span>{feature.title}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Feature Content */}
        {activeFeatureData && (
          <motion.div 
            key={activeFeatureData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12"
          >
            {/* Feature Image */}
            <div className="rounded-xl overflow-hidden border border-[#333333] group">
              <div className="relative h-80 bg-[#111111] flex items-center justify-center">
                {/* Fallback content if image isn't available */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#222222] p-6 rounded-full">
                    <span className="text-[#FD5A1E]" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activeFeatureData.icon}
                    </span>
                  </div>
                </div>
                
                {/* Image with zoom effect */}
                <Image
                  src={activeFeatureData.image}
                  alt={activeFeatureData.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Hide image on error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            {/* Feature Content */}
            <div className="bg-[#111111] rounded-xl p-8 border border-[#333333]">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">{activeFeatureData.title}</h3>
                <p className="text-[#A5ACAF]">{activeFeatureData.description}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[#FD5A1E] font-medium flex items-center">
                  Key Capabilities:
                </h4>
                <ul className="space-y-3">
                  {activeFeatureData.details.map((detail, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-[#FD5A1E] mr-2 mt-1">•</span>
                      <span className="text-[#F5F5F5]">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-xl border border-[#FD5A1E]/30 p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6 text-center">
            Why Advanced Technology <span className="text-[#FD5A1E]">Matters</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Enhanced User Experience */}
            <div className="bg-[#0a0a0a]/80 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-[#FD5A1E] mb-3">Enhanced User Experience</h4>
              <p className="text-[#A5ACAF]">
                Modern touchscreen interfaces and payment options create a seamless, enjoyable experience that encourages repeat use and customer satisfaction.
              </p>
            </div>
            
            {/* Maximum Uptime */}
            <div className="bg-[#0a0a0a]/80 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-[#FD5A1E] mb-3">Maximum Uptime</h4>
              <p className="text-[#A5ACAF]">
                Remote monitoring and predictive maintenance ensure machines remain operational with minimal disruption, providing reliable service at all times.
              </p>
            </div>
            
            {/* Customized for Your Needs */}
            <div className="bg-[#0a0a0a]/80 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-[#FD5A1E] mb-3">Customized for Your Needs</h4>
              <p className="text-[#A5ACAF]">
                Flexible configuration options allow us to tailor each machine to your specific requirements, optimizing the product mix for your users.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Technology Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#111111] p-6 rounded-lg text-center"
          >
            <div className="text-3xl font-bold text-[#FD5A1E] mb-2">21.5&quot;</div>
            <div className="text-[#A5ACAF] text-sm">HD Touchscreen Size</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#111111] p-6 rounded-lg text-center"
          >
            <div className="text-3xl font-bold text-[#FD5A1E] mb-2">5+</div>
            <div className="text-[#A5ACAF] text-sm">Payment Methods</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#111111] p-6 rounded-lg text-center"
          >
            <div className="text-3xl font-bold text-[#FD5A1E] mb-2">24/7</div>
            <div className="text-[#A5ACAF] text-sm">Remote Monitoring</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#111111] p-6 rounded-lg text-center"
          >
            <div className="text-3xl font-bold text-[#FD5A1E] mb-2">50+</div>
            <div className="text-[#A5ACAF] text-sm">Product Capacity</div>
          </motion.div>
        </div>
        
        {/* Technology Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#F5F5F5] text-lg italic max-w-3xl mx-auto">
            &quot;Technology should enhance the vending experience, not complicate it. Our brand new machines bring advanced capabilities while maintaining intuitive simplicity.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcaseSection;