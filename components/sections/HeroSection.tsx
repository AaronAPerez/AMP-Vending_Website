'use client';

import { HeroParallax } from "@/components/ui/aceternity/hero-parallax";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { TypewriterEffect } from "@/components/ui/aceternity/typewriter-effect";
import Link from 'next/link';
import { useState } from 'react';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Product images for parallax effect
  const products = [
    {
      title: "KoolMore Premium Machine",
      thumbnail: "/images/machines/KM-VMRT-50-B_front.png",
      link: "/vending-machines/km-vmrt-50-b"
    },
    {
      title: "21.5 Touchscreen Interface",
      thumbnail: "/images/machines/KM-VMNT-50-B_screen.png",
      link: "/vending-machines"
    },
    {
      title: "Tap-to-Pay Technology",
      thumbnail: "/images/Vending-Screen.jpg",
      link: "/vending-machines"
    },
    {
      title: "Premium Snack Selection",
      thumbnail: "/images/snacks/lays.jpg",
      link: "/vending-machines"
    },
    {
      title: "Healthy Options",
      thumbnail: "/images/products/planters.jpg",
      link: "/vending-machines"
    },
    {
      title: "Energy Drinks",
      thumbnail: "/images/beverages/monster.jpg",
      link: "/vending-machines"
    },
    {
      title: "Refrigerated Beverages",
      thumbnail: "/images/machines/KM-VMR-40-B_front.png",
      link: "/vending-machines/km-vmr-40-b"
    },
    {
      title: "Candy & Treats",
      thumbnail: "/images/snacks/mms.jpg",
      link: "/vending-machines"
    },
    {
      title: "Compact Solutions",
      thumbnail: "/images/machines/KM-VMR-30-B_front.png",
      link: "/vending-machines/km-vmr-30-b"
    },
    {
      title: "Fresh Payment Options",
      thumbnail: "/images/Vending-coin.jpg",
      link: "/vending-machines"
    },
    {
      title: "Easy Access Design",
      thumbnail: "/images/Vending-Push-Door.jpg",
      link: "/vending-machines"
    },
    {
      title: "Bill Acceptor",
      thumbnail: "/images/Vending_Bill-Insert.jpg",
      link: "/vending-machines"
    }
  ];

    


  const typewriterWords = [
    {
      text: "Transform your Workplace",
      className: "text-[#F5F5F5]"
    },
    // {
    //   text: "Your",
    //   className: "text-[#F5F5F5]"
    // },
    // {
    //   text: "Workplace",
    //   className: "text-[#F5F5F5]"
    // },
    // {
    //   text: "with Premium Vending Machines",
    //   className: "text-[#F5F5F5]"
    // },
    {
      text: "Premium Vending Machines",
      className: "text-[#FD5A1E]"
    },
    // {
    //   text: "Vending",
    //   className: "text-[#FD5A1E]"
    // }
  ];

  return (
    <div className="relative">
      {/* Background Sparkles Effect */}
      <SparklesCore
        id="hero-sparkles"
        className="absolute inset-0 w-full h-full"
        background="transparent"
        minSize={0.4}
        maxSize={1.4}
        particleDensity={60}
        particleColor="#FD5A1E"
        speed={0.8}
      />
      
      {/* Hero Parallax with Split Layout */}
      <HeroParallax products={products}/>
         
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          {/* Top Section */}
          <div className="text-center py-32">
            <TypewriterEffect words={typewriterWords} />
            <h2 className="text-xl md:text-2xl text-[#A5ACAF] mt-8">
              Zero Cost Installation • Maintenance-Free • Premium Technology
            </h2>
          </div>
          
          {/* Split Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center py-24">
            {/* Left - Video/Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4d4d4d] shadow-2xl">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src="/videos/vending-machine-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Loading overlay */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 bg-[#000000] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD5A1E]"></div>
                </div>
              )}
            </div>
            
            {/* Right - Content */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#F5F5F5]">
                Transform Your Workplace Today
              </h3>
              <p className="text-lg text-[#A5ACAF]">
                Experience the most advanced vending machines in the industry with 
                touchscreen interfaces, tap-to-pay technology, and customizable options.
              </p>
              <div className="space-y-4">
                {[
                  "21.5 HD Touchscreen Display",
                  "Accept All Payment Methods",
                  "Remote Inventory Management",
                  "24/7 Service & Support"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <svg className="h-6 w-6 text-[#FD5A1E] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#F5F5F5] text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Request Installation
                </Link>
              </div>
            </div>
          </div>
        </div>
  {/* </HeroParallax> */}
    </div>
  );
};

export default HeroSection;