import React from 'react'

// EmailLink Component with proper handling
interface EmailLinkProps {
  email: string;
  subject?: string;
  body?: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

const EmailLink = ({ 
  email, 
  subject, 
  body, 
  className = '', 
  children, 
  'aria-label': ariaLabel 
}: EmailLinkProps) => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Build mailto URL programmatically to avoid CORS issues
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    
    const mailtoUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;
    
    // Use window.location.href instead of direct mailto
    window.location.href = mailtoUrl;
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleEmailClick}
      className={className}
      aria-label={ariaLabel || `Email ${email}`}
      // Added rel attributes to prevent referrer issues
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};


export default EmailLink