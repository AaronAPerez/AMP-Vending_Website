/**
 * Global error boundary for the AMP Vending application
 * 
 * This is a last resort error handler that catches errors at the root level
 * Renders without layouts or providers to ensure reliability
 */

'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
            <h1 style={{ 
              color: '#FD5A1E', 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem' 
            }}>
              Application Error
            </h1>
            <p style={{ 
              color: '#A5ACAF', 
              marginBottom: '2rem' 
            }}>
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#FD5A1E',
                color: '#F5F5F5',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}