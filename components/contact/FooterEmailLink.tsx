'use client';

import React from 'react'
import EmailLink from './EmailLink';

const FooterEmailLink = () => (
  <div className="min-w-0">
    <EmailLink
      email="ampdesignandconsulting@gmail.com"
      subject="Inquiry from AMP Vending Website"
      className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]
                 break-all sm:break-words leading-relaxed inline-block max-w-full"
      aria-label="Email us at ampdesignandconsulting@gmail.com"
    >
      ampdesignandconsulting@gmail.com
    </EmailLink>
  </div>
);

export default FooterEmailLink