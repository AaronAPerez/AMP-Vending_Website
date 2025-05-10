import React from 'react';

// Main Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ 
  children, 
  className = '' 
}: CardProps) => {
  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden ${className}`}
      data-testid="card"
    >
      {children}
    </div>
  );
};

// Card Header component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ 
  children, 
  className = '' 
}: CardHeaderProps) => {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Card Title component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ 
  children, 
  className = '' 
}: CardTitleProps) => {
  return (
    <h3 className={`text-xl font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

// Card Content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ 
  children, 
  className = '' 
}: CardContentProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

// Card Footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ 
  children, 
  className = '' 
}: CardFooterProps) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Default export for backwards compatibility
export default Card;

