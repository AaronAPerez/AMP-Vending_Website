import React from 'react';
import Link from 'next/link';

/**
 * Type definitions for props
 */
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'light' | 'dark';

/**
 * Props for component with common button attributes
 */
interface BaseButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * Button can be either a button element or a link
 */
type ButtonAsButton = BaseButtonProps & 
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = BaseButtonProps & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type ButtonAsNextLink = BaseButtonProps & {
  as: typeof Link;
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsNextLink;

/**
 * Reusable Button component with multiple variants, sizes, and options
 * Can render as button, anchor, or Next.js Link
 * 
 * @param props - Component props
 */
const Button = (props: ButtonProps) => {
  const {
    size = 'md',
    variant = 'primary',
    children,
    className = '',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    ariaLabel,
    ...rest
  } = props;

  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-md',
    xl: 'px-8 py-4 text-xl rounded-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent',
    secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-transparent',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600',
    light: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white border border-transparent',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combined classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${widthClasses}
    ${className}
  `;

  // Loading spinner component
  const Spinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Content with icon and loading state
  const content = (
    <>
      {loading && <Spinner />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // Render as button
  if (props.as === undefined || props.as === 'button') {
    const { as, ...buttonProps } = rest as ButtonAsButton;
    return (
      <button 
        className={combinedClasses} 
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-busy={loading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
  
  // Render as anchor link
  if (props.as === 'a') {
    const { as, href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <a 
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }
  
  // Render as Next.js Link
  const { as: AsComponent, href, ...linkProps } = props as ButtonAsNextLink;
  
  return (
    <AsComponent
      href={href}
      className={combinedClasses}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading ? 'true' : undefined}
      {...linkProps}
    >
      {content}
    </AsComponent>
  );
};

export default Button;