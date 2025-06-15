// 'use client';

// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { printBusinessCard, downloadBusinessCard } from '@/lib/business-card-utils';

// /**
//  * BusinessCardControls Component with Theme Support
//  * 
//  * Provides print and download functionality for the business card
//  * Includes keyboard shortcuts and accessibility features
//  * Now properly integrated with theme system
//  */
// interface BusinessCardControlsProps {
//   theme?: 'light' | 'dark';
//   className?: string;
// }

// const BusinessCardControls: React.FC<BusinessCardControlsProps> = ({ 
//   theme = 'light',
//   className = '' 
// }) => {
//   /**
//    * Print only the business card with theme-aware styling
//    */
//   const handlePrintCard = (): void => {
//     printBusinessCard(theme);
//   };

//   /**
//    * Download the business card with theme-aware styling
//    */
//   const handleDownloadCard = (): void => {
//     downloadBusinessCard(theme);
//   };

//   /**
//    * Print the full page
//    */
//   const handlePrintFullPage = (): void => {
//     window.print();
//   };

//   /**
//    * Add keyboard navigation support for better accessibility
//    */
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent): void => {
//       // Allow printing card only with Ctrl+P
//       if (event.ctrlKey && event.key === 'p') {
//         event.preventDefault();
//         handlePrintCard();
//       }

//       // Allow download with Ctrl+D
//       if (event.ctrlKey && event.key === 'd') {
//         event.preventDefault();
//         handleDownloadCard();
//       }

//       // Allow full page print with Ctrl+Shift+P
//       if (event.ctrlKey && event.shiftKey && event.key === 'P') {
//         event.preventDefault();
//         handlePrintFullPage();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
    
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [theme]);

//   // Dynamic styles based on theme
//   const controlsStyle = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column' as const,
//       alignItems: 'center',
//       marginTop: '20px',
//       gap: '12px'
//     },
//     buttonsContainer: {
//       display: 'flex',
//       flexWrap: 'wrap' as const,
//       gap: '16px',
//       justifyContent: 'center'
//     },
//     primaryButton: {
//       padding: '12px 24px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: 600,
//       transition: 'all 0.3s ease',
//       textDecoration: 'none',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minWidth: '140px',
//       fontFamily: 'inherit',
//       background: '#fd5a1e',
//       color: 'white',
//       boxShadow: '0 2px 8px rgba(253, 90, 30, 0.25)'
//     },
//     secondaryButton: {
//       padding: '12px 24px',
//       border: '2px solid #495057',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: 600,
//       transition: 'all 0.3s ease',
//       textDecoration: 'none',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minWidth: '140px',
//       fontFamily: 'inherit',
//       background: 'transparent',
//       color: '#a4a4ac'
//     },
//     shortcutsInfo: {
//       textAlign: 'center' as const,
//       marginTop: '8px'
//     },
//     shortcutsText: {
//       fontSize: '12px',
//       color: theme === 'light' ? '#666' : '#999',
//       margin: 0
//     }
//   };

//   return (
//     <>
//       <motion.div
//         style={controlsStyle.container}
//         className={className}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//       >
//         <div style={controlsStyle.buttonsContainer}>
//           <button
//             onClick={handlePrintCard}
//             style={controlsStyle.primaryButton}
//             aria-label={`Print business card only (${theme} theme)`}
//             type="button"
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#e5511a';
//               e.currentTarget.style.transform = 'translateY(-1px)';
//               e.currentTarget.style.boxShadow = '0 4px 12px rgba(253, 90, 30, 0.35)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = '#fd5a1e';
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = '0 2px 8px rgba(253, 90, 30, 0.25)';
//             }}
//             onFocus={(e) => {
//               e.currentTarget.style.outline = '2px solid #fd5a1e';
//               e.currentTarget.style.outlineOffset = '2px';
//             }}
//             onBlur={(e) => {
//               e.currentTarget.style.outline = 'none';
//             }}
//           >
//             🖨️ Print Card Only
//           </button>
          
//           <button
//             onClick={handleDownloadCard}
//             style={controlsStyle.secondaryButton}
//             aria-label={`Download business card as HTML file (${theme} theme)`}
//             type="button"
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#495057';
//               e.currentTarget.style.color = 'white';
//               e.currentTarget.style.transform = 'translateY(-1px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#a4a4ac';
//               e.currentTarget.style.transform = 'translateY(0)';
//             }}
//             onFocus={(e) => {
//               e.currentTarget.style.outline = '2px solid #fd5a1e';
//               e.currentTarget.style.outlineOffset = '2px';
//             }}
//             onBlur={(e) => {
//               e.currentTarget.style.outline = 'none';
//             }}
//           >
//             📥 Download Card Only
//           </button>
          
//           <button
//             onClick={handlePrintFullPage}
//             style={controlsStyle.secondaryButton}
//             aria-label="Print entire page"
//             type="button"
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#495057';
//               e.currentTarget.style.color = 'white';
//               e.currentTarget.style.transform = 'translateY(-1px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#a4a4ac';
//               e.currentTarget.style.transform = 'translateY(0)';
//             }}
//             onFocus={(e) => {
//               e.currentTarget.style.outline = '2px solid #fd5a1e';
//               e.currentTarget.style.outlineOffset = '2px';
//             }}
//             onBlur={(e) => {
//               e.currentTarget.style.outline = 'none';
//             }}
//           >
//             📄 Print Full Page
//           </button>
//         </div>

//         {/* Keyboard shortcuts info */}
//         <div style={controlsStyle.shortcutsInfo}>
//           <p style={controlsStyle.shortcutsText}>
//             <strong style={{ color: '#fd5a1e' }}>Keyboard shortcuts:</strong> Ctrl+P (Print Card) • Ctrl+D (Download) • Ctrl+Shift+P (Print Page)
//           </p>
//         </div>

//         {/* Theme indicator */}
//         <div style={{
//           fontSize: '11px',
//           color: theme === 'light' ? '#888' : '#aaa',
//           fontStyle: 'italic',
//           marginTop: '4px'
//         }}>
//           Current theme: {theme === 'light' ? 'WhiteSmoke Professional' : 'Dark Elegant'}
//         </div>
//       </motion.div>

//       {/* Hide controls when printing */}
//       <style jsx>{`
//         @media print {
//           div {
//             display: none !important;
//           }
//         }

//         /* Responsive design */
//         @media (max-width: 640px) {
//           div[style*="flex-wrap"] {
//             flex-direction: column !important;
//             align-items: center !important;
//             gap: 12px !important;
//           }

//           button {
//             padding: 10px 16px !important;
//             font-size: 13px !important;
//             min-width: 120px !important;
//             width: 100% !important;
//             max-width: 200px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default BusinessCardControls;