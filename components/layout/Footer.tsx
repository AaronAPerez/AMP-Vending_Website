import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* Footer includes navigation links, contact information, and copyright */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer navigation links
  const footerLinks = [
    {
      title: 'Vending Solutions',
      links: [
        { label: 'All Machines', href: '/vending-machines' },
        // { label: 'Compact Refrigerated', href: '/vending-machines/km-vmr-30-b' },
        { label: 'Standard Refrigerated', href: '/vending-machines/km-vmr-40-b' },
        { label: 'Non-Refrigerated Snack Machine', href: '/vending-machines/km-vmnt-50-b' },
        // { label: 'Premium Refrigerated Machine', href: '/vending-machines/km-vmrt-50-b' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        // { label: 'Our Clients', href: '/about#clients' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Resources',
      links: [
        // { label: 'Profit Calculator', href: '/#profit-calculator' },
        // { label: 'Location Finder', href: '/contact#locations' },
        // { label: 'Product Catalog', href: '/vending-machines#products' },
        { label: 'FAQ', href: '/about#faq' },
      ]
    }
  ];

  return (
    <footer className="bg-[#000000] border-t border-[#4d4d4d] text-[#A5ACAF]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">



        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2" aria-label="AMP Vending - Home">
                <Image
                  src="/images/logo/AMP_logo.png"
                  alt="AMP Vending Logo"
                  width={80}
                  height={40}
                  className="w-26 min-w-12 max-w-26 h-auto"
                />
                {/* <AMPVendingLogo variant="horizontal" size="lg" /> */}
              </Link>
            </div>
          </div>



          {/* Footer link sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((section) => (
                <div key={section.title} className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-[#F5F5F5] tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  <ul role="list" className="space-y-4">
                    {section.links.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(2).map((section) => (
                <div key={section.title} className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-[#F5F5F5] tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  <ul role="list" className="space-y-4">
                    {section.links.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact info */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#F5F5F5] tracking-wider uppercase mb-4">
                  Contact Us
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-[#A5ACAF]">
                    <a href="tel:2094035450" className="hover:text-[#FD5A1E] transition-colors">
                      (209) 403-5450
                    </a>
                  </p>
                  <p className="text-sm text-[#A5ACAF]">
                    <a href="mailto:ampdesignandconsulting@gmail.com" className="hover:text-[rgb(253,90,30)] transition-colors ">
                      ampdesignandconsulting<br></br>@gmail.com
                    </a>
                  </p>
                  <p className="text-sm text-[#A5ACAF]">
                    Serving Central California
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#4d4d4d] text-sm text-[#A5ACAF]">
          <p className="text-center">
            &copy; {currentYear} AMP Vending Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;