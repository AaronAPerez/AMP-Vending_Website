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
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const pathname = usePathname();
  
  // Navigation links with their paths and labels
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/vending-machines', label: 'Solutions' },
    { path: '/proposal', label: 'Proposal' },
    { path: '/contact', label: 'Contact' },
  ];
  
  // Admin navigation links
  const adminLinks = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/clients', label: 'Clients' },
    { path: '/admin/metrics', label: 'Metrics' },
    { path: '/admin/settings', label: 'Settings' },
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
          ? 'bg-gray-100 shadow-md py-2' 
          : 'bg-black/20 backdrop-blur-sm py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="AMP Vending - Home page">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-indigo-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1"  width="512" height="512" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
<g id="food_machine">
	<path fill="#424953" d="M96.007,501.339c0,5.891-4.773,10.656-10.664,10.656c-5.891,0-10.672-4.766-10.672-10.656   s4.781-10.671,10.672-10.671C91.233,490.668,96.007,495.448,96.007,501.339z"/>
	<path fill="#424953" d="M437.345,501.339c0,5.891-4.781,10.656-10.688,10.656c-5.875,0-10.656-4.766-10.656-10.656   s4.781-10.671,10.656-10.671C432.563,490.668,437.345,495.448,437.345,501.339z"/>
	<rect x="64.008" y="10.677" fill="#646C77" width="383.992" height="479.991"/>
	<path fill="#A9B1BC" d="M362.658,202.673c0,5.891-4.766,10.672-10.656,10.672s-10.655-4.781-10.655-10.672   s4.765-10.672,10.655-10.672S362.658,196.782,362.658,202.673z"/>
	<path fill="#A9B1BC" d="M394.657,202.673c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672   s4.766-10.672,10.656-10.672S394.657,196.782,394.657,202.673z"/>
	<path fill="#A9B1BC" d="M426.657,202.673c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672   s4.766-10.672,10.656-10.672S426.657,196.782,426.657,202.673z"/>
	<path fill="#A9B1BC" d="M362.658,234.672c0,5.891-4.766,10.672-10.656,10.672s-10.655-4.781-10.655-10.672   c0-5.89,4.765-10.671,10.655-10.671S362.658,228.782,362.658,234.672z"/>
	<path fill="#A9B1BC" d="M394.657,234.672c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672   c0-5.89,4.766-10.671,10.656-10.671S394.657,228.782,394.657,234.672z"/>
	<path fill="#A9B1BC" d="M426.657,234.672c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672   c0-5.89,4.766-10.671,10.656-10.671S426.657,228.782,426.657,234.672z"/>
	<path fill="#A9B1BC" d="M362.658,266.672c0,5.891-4.766,10.672-10.656,10.672s-10.655-4.781-10.655-10.672S346.111,256,352.002,256   S362.658,260.781,362.658,266.672z"/>
	<path fill="#A9B1BC" d="M394.657,266.672c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672S378.11,256,384.001,256   S394.657,260.781,394.657,266.672z"/>
	<path fill="#A9B1BC" d="M426.657,266.672c0,5.891-4.766,10.672-10.656,10.672s-10.656-4.781-10.656-10.672S410.11,256,416.001,256   S426.657,260.781,426.657,266.672z"/>
	<path fill="#4FC0E8" d="M416.001,149.346h-63.999l0,0c-5.891,0-10.655,4.766-10.655,10.656s4.765,10.671,10.655,10.671l0,0h63.999   c5.891,0,10.656-4.781,10.656-10.671S421.892,149.346,416.001,149.346z"/>
	<rect x="351.893" y="362.67" fill="#646C77" width="64.218" height="63.998"/>
	<path fill="#A9B1BC" d="M394.657,373.342c0,5.891-4.766,10.656-10.656,10.656s-10.656-4.766-10.656-10.656   s4.766-10.672,10.656-10.672S394.657,367.451,394.657,373.342z"/>
	<rect x="74.671" y="21.348" fill="#F4F6F9" width="234.675" height="319.994"/>
	<path fill="#A9B1BC" d="M128.006,426.668c-11.766,0-21.335-9.562-21.335-21.327c0-11.766,9.57-21.343,21.335-21.343h127.998   c11.766,0,21.343,9.577,21.343,21.343c0,11.765-9.577,21.327-21.343,21.327H128.006z"/>
	<g>
		<rect x="85.343" y="42.676" fill="#AC92EA" width="63.999" height="85.327"/>
	</g>
	<g>
		<rect x="160.006" y="149.346" fill="#46CEAD" width="63.999" height="85.326"/>
	</g>
	<g>
		<polygon fill="#5E9CEA" points="224.004,42.676 160.006,42.676 170.669,63.926 160.006,128.002 224.004,128.002 213.341,63.926       "/>
	</g>
	<g>
		<polygon fill="#4FC0E8" points="298.659,149.346 234.668,149.346 245.34,170.595 234.668,234.672 298.659,234.672     288.003,170.595   "/>
	</g>
	<g>
		<path fill="#FECD57" d="M298.659,53.348c0-5.891-14.312-10.672-31.991-10.672c-17.672,0-32,4.781-32,10.672    c0,0.031,0,74.655,0,74.655h63.991C298.659,128.002,298.659,53.379,298.659,53.348z"/>
	</g>
	<g>
		<rect x="234.668" y="256" fill="#5E9CEA" width="63.991" height="85.342"/>
	</g>
	<g>
		<polygon fill="#FB6D51" points="149.342,256 85.343,256 96.007,277.25 85.343,341.342 149.342,341.342 138.67,277.25   "/>
	</g>
	<g>
		<path fill="#9ED36A" d="M224.004,266.672c0-5.891-14.328-10.672-32-10.672c-17.671,0-31.999,4.781-31.999,10.672    c0,0.047,0,74.67,0,74.67h63.999C224.004,341.342,224.004,266.719,224.004,266.672z"/>
	</g>
	<g>
		<path fill="#ED5564" d="M149.342,160.018c0-5.906-14.328-10.672-32-10.672c-17.671,0-31.999,4.766-31.999,10.672    c0,0.031,0,74.654,0,74.654h63.999C149.342,234.672,149.342,160.049,149.342,160.018z"/>
	</g>
	<path fill="#424953" d="M53.344,0.005v501.334h405.312V0.005H53.344z M309.347,21.348v85.327H74.671V21.348H309.347z    M74.671,213.345v-85.342h234.675v85.342H74.671z M309.347,234.672v85.326H74.671v-85.326H309.347z M74.671,479.996V341.342   h234.675v138.654H74.671z M437.345,479.996H330.659V21.348h106.686V479.996z"/>
	<path fill="#424953" d="M341.222,351.998v85.342h85.561v-85.342H341.222z M405.438,415.997h-42.874v-42.655h42.874V415.997z"/>
</g>
</svg>





              </div>
              <div className="ml-2">
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
            
            {/* Admin dropdown */}
            <div className="relative ml-3">
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="group p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={showAdminMenu}
                aria-haspopup="true"
              >
                <span className="sr-only">Open admin menu</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-gray-600 group-hover:text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </button>
              
              {/* Admin dropdown menu */}
              {showAdminMenu && (
                <div 
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setShowAdminMenu(false)}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                      Admin Area
                    </div>
                    {adminLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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