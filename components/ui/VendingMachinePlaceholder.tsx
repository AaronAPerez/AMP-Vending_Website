import { JSX } from "react";

interface PlaceholderProps {
      className?: string;
      width?: string;
      height?: string;
    }
    
    export function VendingMachinePlaceholder({ 
      className = '', 
      width = 'w-24', 
      height = 'h-24' 
    }: PlaceholderProps): JSX.Element {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={`${width} ${height} text-gray-400`}
          >
            <path d="M4 5.25C4 4.007 5.007 3 6.25 3h11.5C18.993 3 20 4.007 20 5.25v13.5c0 1.243-1.007 2.25-2.25 2.25H6.25C5.007 21 4 19.993 4 18.75V5.25zM6.25 4.5c-.414 0-.75.336-.75.75v13.5c0 .414.336.75.75.75h11.5c.414 0 .75-.336.75-.75V5.25c0-.414-.336-.75-.75-.75H6.25z" />
            <path d="M7 8a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zM7 16a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z" />
          </svg>
        </div>
      );
    }
    