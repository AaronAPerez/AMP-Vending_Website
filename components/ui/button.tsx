import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Button component with consistent styling across the application
 * 
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} - Styled button component
 */
const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps): JSX.Element => {
  // Base styles shared by all variants
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2';
  
  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-[#FD5A1E] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#000000]',
    secondary: 'bg-[#4d4d4d] text-[#F5F5F5] hover:bg-[#4d4d4d]/80',
    outline: 'border border-[#A5ACAF] text-[#F5F5F5] hover:bg-[#4d4d4d] hover:border-[#FD5A1E]'
  };
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Combined styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`;

  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href} 
        className={buttonStyles}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;