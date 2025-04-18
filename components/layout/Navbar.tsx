'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AMPVendingLogo from '../AMPVendingLogo';


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // Navigation items
    const navItems = [
      { label: 'Home', path: '/' },
      { label: 'Vending Machines', path: '/vending-machines' },
      // { label: 'About Us', path: '/about' },
      // { label: 'Proposal', path: '/proposal' },
      { label: 'Contact', path: '/contact' },
    ];
  
    // Handle scroll effect
    useEffect(() => {
      const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    // Check if link is active
    const isActive = (path: string) => {
      if (path === '/') {
        return pathname === path;
      }
      return pathname?.startsWith(path);
    };
  
    return (
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md shadow-lg' 
            : 'bg-black/70 backdrop-blur-sm'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" aria-label="AMP Vending - Home">
          <AMPVendingLogo variant="horizontal" size="lg" />
        </Link>
  
            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="relative px-3 py-2 text-[#F5F5F5] hover:text-white rounded-md group"
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover effect */}
                  <span className="absolute inset-0 bg-[#FD5A1E]/0 group-hover:bg-[#FD5A1E]/10 rounded-md transition-all duration-300"></span>
                  
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FD5A1E]"></span>
                  )}
                </Link>
              ))}
              
              {/* CTA Button */}
              <Link
                href="/contact"
                className="ml-4 bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(253,90,30,0.3)] hover:shadow-[0_0_20px_rgba(253,90,30,0.5)]"
                aria-label="Get Started for vending machine services"
              >
                Get Started
              </Link>
            </nav>
  
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-md p-2 text-[#A5ACAF] hover:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
                  }`}
                  style={{ top: '35%' }}
                  aria-hidden="true"
                />
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ top: '50%' }}
                  aria-hidden="true"
                />
                <span 
                  className={`absolute block w-6 h-0.5 bg-current transform transition duration-500 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'
                  }`}
                  style={{ top: '65%' }}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>
  
        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`
            md:hidden bg-[#000000]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-[400px] border-b border-[#A5ACAF]/20' : 'max-h-0'}
          `}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`
                  block px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive(item.path) 
                    ? 'bg-[#4d4d4d] text-[#F5F5F5]' 
                    : 'text-[#A5ACAF] hover:bg-[#4d4d4d]/30 hover:text-[#F5F5F5]'}
                `}
                aria-current={isActive(item.path) ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/contact"
              className="block mt-4 bg-[#FD5A1E] hover:bg-[#FD5A1E]/90 text-white px-4 py-3 rounded-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
    );
  };
  

export default Navbar