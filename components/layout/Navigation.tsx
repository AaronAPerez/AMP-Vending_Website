'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Types for our navigation items
interface NavItem {
  name: string;
  path: string;
  ariaLabel?: string;
  children?: NavItem[];
}

// Props for our Navigation component
// interface NavigationProps {
//   logo: string;
//   altText: string;
// }

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Navigation items structure
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Vending Machines', path: '/vending-machines' },
    // { name: 'Products', path: '/products' },
    // { 
    //   name: 'Benefits', 
    //   path: '/benefits',
    //   children: [
    //     { name: 'For Employees', path: '/benefits/employees' },
    //     { name: 'For Management', path: '/benefits/management' },
    //     { name: 'Revenue Generation', path: '/benefits/revenue' },
    //   ]
    // },
    // { name: 'Case Studies', path: '/case-studies' },
    // { name: 'Contact', path: '/contact' },
    // { name: 'Client Portal', path: '/client-portal', ariaLabel: 'Access client portal' }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (item.children) {
        setActiveSubmenu(activeSubmenu === item.name ? null : item.name);
      }
    } else if (e.key === 'Escape') {
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <header className="bg-[#000000] text-[#F5F5F5]" role="banner">
      {/* Skip to content link - only visible when focused */}
      <a 
        href="#main-content" 
        className="absolute left-0 p-3 -translate-y-full focus:translate-y-0 bg-[#FD5A1E] text-[#F5F5F5] z-50 transition-transform"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      
      <div className="container mx-auto px-4 py-3" ref={navRef}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="AMP Vending home page">
          <Image
                src="/images/logo/AMP_logo.png"
                alt="AMP Vending Logo"
                width={80}
                height={80}
                className="w-24 min-w-12 max-w-24 h-auto"
              />
            {/* <span className="ml-2 text-xl font-bold">
              </span> */}
          </Link>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-[#F5F5F5] hover:text-[#FD5A1E] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FD5A1E]"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
            {/* Hamburger icon */}
            <svg
              className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-8" 
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  // Items with dropdown
                  <div>
                    <button
                      className={`flex items-center text-[#F5F5F5] hover:text-[#FD5A1E] focus:outline-none focus:text-[#FD5A1E] ${
                        pathname.startsWith(item.path) ? 'text-[#FD5A1E] font-medium' : ''
                      }`}
                      onMouseEnter={() => toggleSubmenu(item.name)}
                      onClick={() => toggleSubmenu(item.name)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      aria-expanded={activeSubmenu === item.name}
                      aria-controls={`submenu-${item.name}`}
                      aria-label={item.ariaLabel || `${item.name} menu`}
                    >
                      {item.name}
                      <svg
                        className="ml-2 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    {activeSubmenu === item.name && (
                      <div
                        id={`submenu-${item.name}`}
                        className="absolute z-10 mt-2 w-48 rounded-full shadow-lg bg-[#4d4d4d] ring-1 ring-[#A5ACAF] focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`${item.name.toLowerCase()}-button`}
                      >
                        <div className="py-1" role="none">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.path}
                              className="block px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#000000] hover:text-[#FD5A1E] focus:bg-[#000000] focus:text-[#FD5A1E] focus:outline-none"
                              role="menuitem"
                              tabIndex={0}
                              aria-label={child.ariaLabel || child.name}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular nav items
                  <Link
                    href={item.path}
                    className={`text-[#F5F5F5] hover:text-[#FD5A1E] focus:outline-none focus:text-[#FD5A1E] ${
                      pathname === item.path ? 'text-[#FD5A1E] font-medium border-b-2 border-[#FD5A1E]' : ''
                    }`}
                    aria-label={item.ariaLabel || item.name}
                    aria-current={pathname === item.path ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-[#FD5A1E] text-[#F5F5F5] px-4 py-2 rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] transition-colors"
              aria-label="Get a free consultation"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:hidden absolute left-0 right-0 top-16 bg-[#000000] shadow-md z-20`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name} className="py-1">
                {item.children ? (
                  <div>
                    <button
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-[#F5F5F5] hover:bg-[#4d4d4d] hover:text-[#FD5A1E] focus:outline-none focus:bg-[#4d4d4d] focus:text-[#FD5A1E] ${
                        pathname.startsWith(item.path) ? 'bg-[#4d4d4d] text-[#FD5A1E]' : ''
                      }`}
                      onClick={() => toggleSubmenu(item.name)}
                      aria-expanded={activeSubmenu === item.name}
                      aria-controls={`mobile-submenu-${item.name}`}
                      aria-label={item.ariaLabel || `${item.name} menu`}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`${
                          activeSubmenu === item.name ? 'transform rotate-180' : ''
                        } w-4 h-4 transition-transform`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {activeSubmenu === item.name && (
                      <div
                        id={`mobile-submenu-${item.name}`}
                        className="mt-1 ml-4 space-y-1"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.path}
                            className="block px-3 py-2 rounded-full text-sm text-[#F5F5F5] hover:bg-[#4d4d4d] hover:text-[#FD5A1E] focus:outline-none focus:bg-[#4d4d4d] focus:text-[#FD5A1E]"
                            aria-label={child.ariaLabel || child.name}
                            aria-current={pathname === child.path ? 'page' : undefined}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-3 py-2 rounded-full text-[#F5F5F5] hover:bg-[#4d4d4d] hover:text-[#FD5A1E] focus:outline-none focus:bg-[#4d4d4d] focus:text-[#FD5A1E] ${
                      pathname === item.path ? 'bg-[#4d4d4d] text-[#FD5A1E]' : ''
                    }`}
                    aria-label={item.ariaLabel || item.name}
                    aria-current={pathname === item.path ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="block w-full text-center bg-[#FD5A1E] text-[#F5F5F5] px-4 py-2 rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] transition-colors"
                aria-label="Get a free consultation"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;