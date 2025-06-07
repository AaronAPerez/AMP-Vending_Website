// Footer.tsx - Fixed text wrapping for email and long content

/**
 * Contact Information Section with Text Wrapping Fix
 */
const ContactInfoSection = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">
      Contact Info
    </h3>
    
    {/* Address with proper line breaks */}
    <div className="text-[#A5ACAF] text-sm leading-relaxed">
      <p className="mb-2">4120 Dale Rd ste j8 1005</p>
      <p className="mb-2">Modesto, CA 95354</p>
    </div>
    
    {/* Phone with click-to-call */}
    <div className="text-[#A5ACAF] text-sm">
      <a 
        href="tel:+12094035450"
        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
        aria-label="Call us at (209) 403-5450"
      >
        (209) 403-5450
      </a>
    </div>
    
    {/* Email with proper text wrapping - KEY FIX */}
    <div className="text-[#A5ACAF] text-sm">
      <a 
        href="mailto:ampdesignandconsulting@gmail.com"
        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]
                   break-all        /* Forces word breaking for long emails */
                   sm:break-words   /* More natural breaking on larger screens */
                   leading-relaxed  /* Better line spacing */
                   max-w-full      /* Prevents overflow */"
        aria-label="Email us at ampdesignandconsulting@gmail.com"
      >
        ampdesignandconsulting@gmail.com
      </a>
    </div>
  </div>
);


/**
 * Alternative approach with word-break CSS
 */
const ContactInfoAlternative = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">
      Contact Info
    </h3>
    
    <div className="text-[#A5ACAF] text-sm space-y-2">
      <p>4120 Dale Rd ste j8 1005</p>
      <p>Modesto, CA 95354</p>
      
      <a 
        href="tel:+12094035450"
        className="block hover:text-[#FD5A1E] transition-colors"
      >
        (209) 403-5450
      </a>
      
      {/* Email with overflow-wrap for better breaking */}
      <a 
        href="mailto:ampdesignandconsulting@gmail.com"
        className="block hover:text-[#FD5A1E] transition-colors"
        style={{
          wordBreak: 'break-all',      // CSS property for aggressive breaking
          overflowWrap: 'break-word',  // More intelligent word breaking
          hyphens: 'auto'              // Add hyphens where appropriate
        }}
      >
        ampdesignandconsulting@gmail.com
      </a>
    </div>
  </div>
);

/**
 * Complete Footer Component with Text Wrapping Fixes
 */
const Footer = () => {
  return (
    <footer className="bg-[#111111] border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/logo/AMP_logo.png" 
                alt="AMP Vending Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-[#A5ACAF] text-sm leading-relaxed max-w-xs">
              Premium vending solutions with zero-cost installation 
              and maintenance-free operation for modern workplaces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Quick Links
            </h3>
            <nav className="space-y-2">
              <a href="/" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Home
              </a>
              <a href="/vending-machines" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Vending Machines
              </a>
              <a href="/contact" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Contact Us
              </a>
              <a href="/feedback" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Feedback
              </a>
            </nav>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Our Services
            </h3>
            <nav className="space-y-2">
              <span className="block text-[#A5ACAF] text-sm">Zero-Cost Installation</span>
              <span className="block text-[#A5ACAF] text-sm">Maintenance-Free Operation</span>
              <span className="block text-[#A5ACAF] text-sm">Product Restocking</span>
              <span className="block text-[#A5ACAF] text-sm">24/7 Customer Support</span>
            </nav>
          </div>

          {/* Contact Info - FIXED VERSION */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Contact Info
            </h3>
            
            <div className="text-[#A5ACAF] text-sm space-y-3">
              {/* Address */}
              <div>
                <p>4120 Dale Rd ste j8 1005</p>
                <p>Modesto, CA 95354</p>
              </div>
              
              {/* Phone */}
              <div>
                <a 
                  href="tel:+12094035450"
                  className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                  aria-label="Call us at (209) 403-5450"
                >
                  (209) 403-5450
                </a>
              </div>
              
              {/* Email - MAIN FIX HERE */}
              <div className="min-w-0"> {/* Prevents flex item from growing beyond container */}
                <a 
                  href="mailto:ampdesignandconsulting@gmail.com"
                  className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]
                             break-all       /* Break anywhere if needed */
                             sm:break-words  /* More natural breaking on larger screens */
                             leading-relaxed /* Better line spacing */
                             inline-block    /* Better text flow */
                             max-w-full     /* Respect container width */"
                  aria-label="Email us at ampdesignandconsulting@gmail.com"
                >
                  ampdesignandconsulting@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-[#333333]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-[#A5ACAF] text-sm">
              © 2025 AMP Design and Consulting LLC. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
              <a 
                href="/privacy-policy" 
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Terms of Service
              </a>
              <a 
                href="/accessibility" 
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Accessibility
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;