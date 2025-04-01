'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Modern header component with responsive design and accessibility features
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Navigation links with their paths and labels
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/vending-machines', label: 'Solutions' },
    { path: '/proposal', label: 'Proposal' },
    { path: '/contact', label: 'Contact' },
  ];

  // Handle scroll effect for header
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside or changing routes
  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#main-nav') && !target.closest('#mobile-menu-button')) {
        closeMenu();
      }
    });
    return () => {
      setIsMenuOpen(false);
    };
  }, [pathname]);

  // Check if a nav link is active based on current path
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="AMP Vending - Home page">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                A
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900 block">
                  AMP Vending
                </span>
                <span className="text-sm text-blue-600 font-medium">
                  State-of-the-Art Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav 
            className="hidden md:flex items-center space-x-1 lg:space-x-4" 
            id="main-nav"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              id="mobile-menu-button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden transform transition-transform duration-200 ease-in-out ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block w-full text-center mt-3 px-4 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;