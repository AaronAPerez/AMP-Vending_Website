'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Link as LinkIcon } from 'lucide-react';

/**
 * Enhanced BusinessCard Component with Dynamic Theme Support
 * 
 * Uses inline styles for dynamic theming instead of CSS modules
 * This allows for proper theme switching functionality
 */
export interface BusinessCardProps {
  theme?: 'light' | 'dark';
  className?: string;
  companyName?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoSrc?: string;
  qrCodeSrc?: string;
}

const BusinessCardTheme: React.FC<BusinessCardProps> = ({
  theme = 'light',
  className = '',
  companyName = 'Andrew Perez - President',
  tagline = 'AMP Design and Consulting LLC',
  address = '4120 Dale Rd Ste J8 1005,\nModesto, CA 95354',
  phone = '(209) 403-5450',
  email = 'ampdesignandconsulting@gmail.com',
  website = 'www.ampvendingmachines.com',
  logoSrc = '/images/logo/AMP_logo.png',
  qrCodeSrc = '/images/logo/AMP-QR-Code.jpg'
}) => {
  // State for handling image load errors
  const [logoError, setLogoError] = useState<boolean>(false);
  const [qrError, setQrError] = useState<boolean>(false);

  // Theme configuration
  const themeStyles = {
    light: {
      cardBg: 'whitesmoke',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      textContact: '#333333',
      border: '2px solid rgba(253, 90, 30, 0.3)',
      logoBg: 'rgba(255, 255, 255, 0.95)',
      qrBg: 'rgba(255, 255, 255, 0.95)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(253, 90, 30, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      beforeBg: 'radial-gradient(circle at 20% 20%, rgba(253, 90, 30, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(253, 90, 30, 0.05) 0%, transparent 50%)',
      afterBg: 'linear-gradient(135deg, rgba(253, 90, 30, 0.15), rgba(253, 90, 30, 0.05))',
      accentShadow: '-2px 0 8px rgba(253, 90, 30, 0.2)'
    },
    dark: {
      cardBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
      textPrimary: '#FD5A1E',
      textSecondary: '#B8BCC0',
      textContact: '#f5f5f5',
      border: '1px solid rgba(253, 90, 30, 0.2)',
      logoBg: 'rgba(0, 0, 0, 0.6)',
      qrBg: 'rgba(0, 0, 0, 0.6)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(253, 90, 30, 0.2)',
      beforeBg: 'radial-gradient(circle at 20% 20%, rgba(253, 90, 30, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(253, 90, 30, 0.08) 0%, transparent 50%)',
      afterBg: 'linear-gradient(135deg, rgba(253, 90, 30, 0.3), rgba(253, 90, 30, 0.1))',
      accentShadow: '-2px 0 8px rgba(253, 90, 30, 0.4)'
    }
  };

  const currentTheme = themeStyles[theme];

  /**
   * Handle image loading errors
   */
  const handleLogoError = (): void => {
    console.log('Logo failed to load, switching to fallback');
    setLogoError(true);
  };

  const handleQrError = (): void => {
    console.log('QR code failed to load, switching to fallback');
    setQrError(true);
  };

  const handleLogoLoad = (): void => {
    console.log('Logo loaded successfully');
    setLogoError(false);
  };

  const handleQrLoad = (): void => {
    console.log('QR code loaded successfully');
    setQrError(false);
  };

  // Base styles that don't change between themes
  const baseStyles = {
    container: {
      display: 'inline-block',
      transition: 'transform 0.3s ease'
    },
    businessCard: {
      width: '350px',
      height: '200px',
      position: 'relative' as const,
      overflow: 'hidden',
      display: 'flex',
      padding: '20px',
      transition: 'all 0.3s ease',
      background: currentTheme.cardBg,
      border: currentTheme.border,
      boxShadow: currentTheme.shadow,
      color: currentTheme.textContact
    },
    cardContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      zIndex: 2,
      position: 'relative' as const,
      paddingRight: '12px',
    },
    companyName: {
      fontSize: '16px',
      fontWeight: 700,
      color: currentTheme.textPrimary,
      margin: '0 0 5px 0',
      letterSpacing: '0.5px',
      position: 'relative' as const
    },
    tagline: {
      fontSize: '9px',
      color: currentTheme.textSecondary,
      margin: '2px 0 0 0',
      lineHeight: 2.0,
      fontWeight: 400,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '3px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '11px',
      color: currentTheme.textContact,
      lineHeight: 1.4,
      transition: 'all 0.2s ease',
      fontWeight: 500,
      marginBottom: '1px'
    },
    addressNumber: {
      margin: '0 0 10px 0',
    },
    contactIcon: {
      marginRight: '8px',
      flexShrink: 0,
      color: '#FD5A1E',
      transition: 'all 0.2s ease'
    },
    contactLink: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    logoArea: {
      position: 'absolute' as const,
      bottom: '75px',
      right: '-2px',
      width: '130px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3,
      background: currentTheme.logoBg,
      borderRadius: '10px 0px 0px 10px',
      border: `2px solid ${theme === 'light' ? 'rgba(253, 90, 30, 0.4)' : '#FD5A1E'}`,
      backdropFilter: 'blur(5px)',
      boxShadow: theme === 'light'
        ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        : '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    logoContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      padding: '6px'
    },
    logoGradient: {
      background: 'linear-gradient(135deg, #FD5A1E, #FF7B47)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      fontWeight: 700,
      fontSize: '16px',
      textAlign: 'center' as const,
      lineHeight: 1.1,
      letterSpacing: '0.5px',
      boxShadow: '0 2px 8px rgba(253, 90, 30, 0.25)'
    },
    logoSubtitle: {
      fontSize: '12px',
      fontWeight: 500
    },
    qrCode: {
      position: 'absolute' as const,
      bottom: '19px',
      right: '44px',
      width: '13%',
      height: '23%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3,
      background: currentTheme.qrBg,
      borderRadius: '4px',
      border: `2px solid ${theme === 'light' ? 'rgba(253, 90, 30, 0.4)' : 'rgba(253, 90, 30, 0.6)'}`,
      backdropFilter: 'blur(5px)',
      boxShadow: theme === 'light'
        ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        : '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    qrContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      padding: '2px'
    },
    qrGradient: {
      background: 'linear-gradient(135deg, #333, #666)',
      color: 'white',
      padding: '4px 6px',
      borderRadius: '3px',
      fontWeight: 700,
      fontSize: '8px',
      textAlign: 'center' as const,
      lineHeight: 1,
      letterSpacing: '0.5px'
    },
    accentLine: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
      width: '10px',
      height: '100%',
      background: 'linear-gradient(to bottom, #FD5A1E 0%, #FF7A47 25%, #FD5A1E 50%, #E54E1B 75%, #FD5A1E 100%)',
      boxShadow: currentTheme.accentShadow
    }
  };

  return (
    <div
      style={baseStyles.container}
      className={`business-card-container ${className}`}
      role="img"
      aria-label={`${companyName} Business Card`}
    >
      {/* Business Card */}
      <div style={baseStyles.businessCard} data-theme={theme}>
        {/* Background decorative elements */}
        <div
          style={{
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: currentTheme.beforeBg,
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        />

        <div
          style={{
            content: '',
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: currentTheme.afterBg,
            borderRadius: '50%',
            filter: 'blur(20px)',
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        />

        {/* Accent line */}
        <div style={baseStyles.accentLine} aria-hidden="true" />

        {/* Left side content */}
        <div style={baseStyles.cardContent}>
          {/* Company name and tagline */}
          <div style={{ marginBottom: '15px' }}>
            <h1 style={baseStyles.companyName}>
              {companyName}
              <div
                style={{
                  content: '',
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '180px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #FD5A1E, rgba(253, 90, 30, 0.4))',
                  borderRadius: '1px'
                }}
              />
            </h1>
            <p style={baseStyles.tagline}>{tagline}</p>
          </div>

          {/* Contact information */}
          <div style={baseStyles.contactInfo} role="list">
            <div style={baseStyles.addressNumber} role="contactNumberitem">
              {/* Address */}
              <div style={baseStyles.contactItem} role="listitem">
                <MapPin
                  size={14}
                  style={baseStyles.contactIcon}
                  aria-hidden="true"
                />
                <span>
                  {address.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < address.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>

              </div>

              {/* Phone number */}
              <div style={baseStyles.contactItem} role="listitem">
                <Phone
                  size={14}
                  style={baseStyles.contactIcon}
                  aria-hidden="true"
                />
                <span>
                  <a
                    href={`tel:${phone}`}
                    style={baseStyles.contactLink}
                    aria-label={`Call ${phone}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FD5A1E';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'inherit';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {phone}
                  </a>
                </span>
              </div>
            </div>

            {/* Email address */}
            <div style={baseStyles.contactItem} role="listitem">
              <Mail
                size={12}
                style={baseStyles.contactIcon}
                aria-hidden="true"
              />
              <span>
                <a
                  href={`mailto:${email}`}
                  style={baseStyles.contactLink}
                  aria-label={`Email ${email}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FD5A1E';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {email}
                </a>
              </span>
            </div>

            {/* Website */}
            <div style={baseStyles.contactItem} role="listitem">
              <LinkIcon
                size={12}
                style={baseStyles.contactIcon}
                aria-hidden="true"
              />
              <span>
                <a
                  href={`https://${website}`}
                  style={baseStyles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit website ${website}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FD5A1E';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {website}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Logo area */}
        <div style={baseStyles.logoArea}>
          <div style={baseStyles.logoContainer}>
            {!logoError ? (
              <Image
                src={logoSrc}
                alt="Company Logo"
                width={110}
                height={60}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
                onError={handleLogoError}
                onLoad={handleLogoLoad}
                priority
              />
            ) : (
              <div style={baseStyles.logoGradient}>
                AMP<br />
                <span style={baseStyles.logoSubtitle}>VENDING</span>
              </div>
            )}
          </div>
        </div>

        {/* QR Code area */}
        <div style={baseStyles.qrCode}>
          <div style={baseStyles.qrContainer}>
            {!qrError ? (
              <Image
                src={qrCodeSrc}
                alt="QR Code - Scan for contact information"
                width={45}
                height={45}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '2px'
                }}
                onError={handleQrError}
                onLoad={handleQrLoad}
              />
            ) : (
              <div style={baseStyles.qrGradient}>QR</div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive and print styles */}
      <style jsx>{`
        @media (max-width: 400px) {
          .business-card-container [data-theme] {
            width: 300px !important;
            height: 171px !important;
            padding: 16px !important;
          }
        }

        @media print {
          .business-card-container [data-theme] {
            box-shadow: none !important;
            border: 1px solid #000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        /* Hover effects for contact items */
        .business-card-container [data-theme] [role="listitem"]:hover {
          color: #FD5A1E;
          transform: translateX(2px);
        }

        .business-card-container [data-theme] [role="listitem"]:hover svg {
          color: #E54E1B;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default BusinessCardTheme;