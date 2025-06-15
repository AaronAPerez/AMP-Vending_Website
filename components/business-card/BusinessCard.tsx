// 'use client';

// import React, { useState } from 'react';
// import { MapPin, Phone, Mail, Link as LinkIcon } from 'lucide-react';
// import styles from './BusinessCard.module.css';

// /**
//  * BusinessCard Component Props Interface
//  */
// interface BusinessCardProps {
//   className?: string;
//   companyName?: string;
//   tagline?: string;
//   address?: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   logoSrc?: string;
//   qrCodeSrc?: string;
// }

// /**
//  * BusinessCard Component
//  * 
//  * A reusable business card component with fallback handling for images
//  * and robust accessibility features
//  */
// const BusinessCard: React.FC<BusinessCardProps> = ({
//   className = '',
//   companyName = 'Andrew Perez - President',
//   tagline = 'AMP Design and Consulting LLC',
//   address = '4120 Dale Rd Ste J8 1005,\nModesto, CA 95354',
//   phone = '(209) 403-5450',
//   email = 'ampdesignandconsulting@gmail.com',
//   website = 'www.ampvendingmachines.com',
//   logoSrc = '/images/logo/AMP_logo.png',
//   qrCodeSrc = '/images/logo/AMP-QR-Code.jpg'
// }) => {
//   // State for handling image load errors
//   const [logoError, setLogoError] = useState<boolean>(false);
//   const [qrError, setQrError] = useState<boolean>(false);

//   /**
//    * Handle logo image load error
//    */
//   const handleLogoError = (): void => {
//     console.log('Logo failed to load, switching to fallback');
//     setLogoError(true);
//   };

//   /**
//    * Handle QR code image load error
//    */
//   const handleQrError = (): void => {
//     console.log('QR code failed to load, switching to fallback');
//     setQrError(true);
//   };

//   /**
//    * Handle successful image loads
//    */
//   const handleLogoLoad = (): void => {
//     console.log('Logo loaded successfully');
//   };

//   const handleQrLoad = (): void => {
//     console.log('QR code loaded successfully');
//   };

//   return (
//     <div
//       className={`${styles.businessCardContainer} ${className}`}
//       role="img"
//       aria-label={`${companyName} Business Card`}
//     >
//       {/* Business Card */}
//       <div className={styles.businessCard}>
//         {/* Accent line for visual interest */}
//         <div className={styles.accentLine} aria-hidden="true" />

//         {/* Left side content */}
//         <div className={styles.cardContent}>
//           {/* Company name and tagline */}
//           <div className={styles.headerSection}>
//             <h1 className={styles.companyName}>{companyName}</h1>
//             <p className={styles.tagline}>{tagline}</p>
//           </div>

//           {/* Contact information */}
//           <div className={styles.contactInfo} role="list">
//             {/* Address */}
//             <div className={styles.contactItem} role="listitem">
//               <MapPin 
//                 size={14} 
//                 className={styles.contactIcon} 
//                 aria-hidden="true" 
//               />
//               <span className={styles.contactText}>
//                 {address.split('\n').map((line, index) => (
//                   <React.Fragment key={index}>
//                     {line}
//                     {index < address.split('\n').length - 1 && <br />}
//                   </React.Fragment>
//                 ))}
//               </span>
//             </div>

//             {/* Phone number */}
//             <div className={styles.contactItem} role="listitem">
//               <Phone 
//                 size={14} 
//                 className={styles.contactIcon} 
//                 aria-hidden="true" 
//               />
//               <span className={styles.contactText}>
//                 <a 
//                   href={`tel:${phone}`} 
//                   className={styles.contactLink}
//                   aria-label={`Call ${phone}`}
//                 >
//                   {phone}
//                 </a>
//               </span>
//             </div>

//             {/* Email address */}
//             <div className={styles.contactItem} role="listitem">
//               <Mail 
//                 size={12} 
//                 className={styles.contactIcon} 
//                 aria-hidden="true" 
//               />
//               <span className={styles.contactText}>
//                 <a 
//                   href={`mailto:${email}`} 
//                   className={styles.contactLink}
//                   aria-label={`Email ${email}`}
//                 >
//                   {email}
//                 </a>
//               </span>
//             </div>

//             {/* Website */}
//             <div className={styles.contactItem} role="listitem">
//               <LinkIcon 
//                 size={12} 
//                 className={styles.contactIcon} 
//                 aria-hidden="true" 
//               />
//               <span className={styles.contactText}>
//                 <a 
//                   href={`https://${website}`} 
//                   className={styles.contactLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Visit website ${website}`}
//                 >
//                   {website}
//                 </a>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Logo area - bottom right */}
//         <div className={styles.logoArea}>
//           <div className={styles.logoContainer}>
//             {!logoError ? (
//               <img
//                 src={logoSrc}
//                 alt="Company Logo"
//                 className={styles.logoImage}
//                 onError={handleLogoError}
//                 onLoad={handleLogoLoad}
//               />
//             ) : (
//               <div className={styles.logoFallback}>
//                 <div className={styles.logoGradient}>
//                   AMP<br />
//                   <span className={styles.logoSubtitle}>VENDING</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* QR Code area */}
//         <div className={styles.qrCode}>
//           <div className={styles.qrContainer}>
//             {!qrError ? (
//               <img
//                 src={qrCodeSrc}
//                 alt="QR Code - Scan for contact information"
//                 className={styles.qrImage}
//                 onError={handleQrError}
//                 onLoad={handleQrLoad}
//               />
//             ) : (
//               <div className={styles.qrFallback}>
//                 <div className={styles.qrGradient}>QR</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessCard;