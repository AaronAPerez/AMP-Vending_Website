import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import Link from "next/link";

// Define the props for the button component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string; // Add href prop for link functionality
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      leftIcon,
      rightIcon,
      isLoading = false,
      fullWidth = false,
      href,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base button/link styles
    const baseStyles = cn(
      // Base styles
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      
      // Variant styles
      variant === "primary" &&
        "bg-[#FD5A1E] text-white hover:bg-[#FD5A1E]/90",
      variant === "secondary" &&
        "bg-[#4d4d4d] text-white hover:bg-[#4d4d4d]/90",
      variant === "outline" &&
        "border border-[#A5ACAF] text-[#F5F5F5] hover:bg-[#4d4d4d] hover:border-[#FD5A1E]",
      variant === "ghost" &&
        "text-[#F5F5F5] hover:bg-[#4d4d4d]/20",
      
      // Size styles
      size === "sm" && "px-3 py-1.5 text-sm rounded-md",
      size === "md" && "px-4 py-2 text-base rounded-lg",
      size === "lg" && "px-6 py-3 text-lg rounded-xl",
      
      // Full width
      fullWidth && "w-full",
      
      // Custom className
      className
    );
    
    // Content to show inside button or link
    const content = (
      <>
        {isLoading && (
          <span className="mr-2 animate-spin">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    // Handle click for button variant
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) return;
      onClick?.(event);
    };

    // If href is provided, render a link instead of a button
    if (href) {
      return (
        <Link 
          href={href}
          className={baseStyles}
          // Use a type assertion that preserves the type safety
          // while still allowing for HTML attributes used on links
          {...(props as React.HTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    // Otherwise render a button
    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={baseStyles}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;