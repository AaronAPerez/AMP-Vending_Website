import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout Component
 * Provides consistent layout and styling for page content
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* <ResizableNavbar /> */}
      
      {/* Main content area with responsive padding */}
      <main className={`flex-grow mt-10 ${className}`}>
        {children}
      </main>
      
      {/* <Footer /> */}
      {/* <FeedbackWidget /> */}
    <div className={`bg-[#000000] text-[#F5F5F5] min-h-screen ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;