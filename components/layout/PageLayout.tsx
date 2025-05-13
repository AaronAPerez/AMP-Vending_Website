import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout Component
 * 
 * Provides consistent structure for all pages with responsive paddings
 * and proper spacing for different viewport sizes
 */
const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* <ResizableNavbar /> */}
      
      {/* Main content area with responsive padding */}
      <main className={`flex-grow pt-18 md:pt-18 ${className}`}>
        {children}
      </main>
      
      {/* <Footer /> */}
      {/* <FeedbackWidget /> */}
    </div>
  );
};

export default PageLayout;