// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Palette, Sun, Moon } from 'lucide-react';

// /**
//  * BusinessCardSelector Component
//  * 
//  * Allows users to choose between WhiteSmoke and Dark background versions
//  * Includes preview and theme switching functionality
//  */
// interface BusinessCardSelectorProps {
//   onThemeChange: (theme: 'light' | 'dark') => void;
//   currentTheme: 'light' | 'dark';
// }

// const BusinessCardSelector = ({ onThemeChange, currentTheme }: BusinessCardSelectorProps) => {
//   const [isPreviewMode, setIsPreviewMode] = useState(false);

//   return (
//     <motion.div
//       className="theme-selector"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="selector-header">
//         <h3 className="selector-title">
//           <Palette size={20} className="inline mr-2" />
//           Choose Card Style
//         </h3>
//         <p className="selector-description">
//           Select between professional light or elegant dark background
//         </p>
//       </div>

//       <div className="theme-options">
//         {/* Light Theme Option */}
//         <motion.button
//           className={`theme-option ${currentTheme === 'light' ? 'active' : ''}`}
//           onClick={() => onThemeChange('light')}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <div className="theme-preview light-preview">
//             <div className="mini-card light-card">
//               <div className="mini-content">
//                 <div className="mini-name">Andrew Perez</div>
//                 <div className="mini-company">AMP VENDING</div>
//                 <div className="mini-contact">
//                   <div className="mini-line"></div>
//                   <div className="mini-line short"></div>
//                   <div className="mini-line"></div>
//                 </div>
//               </div>
//               <div className="mini-logo light-logo">AMP</div>
//               <div className="mini-accent light-accent"></div>
//             </div>
//           </div>
//           <div className="theme-info">
//             <div className="theme-name">
//               <Sun size={16} className="mr-2" />
//               WhiteSmoke Professional
//             </div>
//             <div className="theme-desc">Clean, modern look perfect for business</div>
//             {currentTheme === 'light' && (
//               <div className="selected-badge">✓ Selected</div>
//             )}
//           </div>
//         </motion.button>

//         {/* Dark Theme Option */}
//         <motion.button
//           className={`theme-option ${currentTheme === 'dark' ? 'active' : ''}`}
//           onClick={() => onThemeChange('dark')}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <div className="theme-preview dark-preview">
//             <div className="mini-card dark-card">
//               <div className="mini-content">
//                 <div className="mini-name dark-text">Andrew Perez</div>
//                 <div className="mini-company dark-text">AMP VENDING</div>
//                 <div className="mini-contact">
//                   <div className="mini-line dark-line"></div>
//                   <div className="mini-line short dark-line"></div>
//                   <div className="mini-line dark-line"></div>
//                 </div>
//               </div>
//               <div className="mini-logo dark-logo">AMP</div>
//               <div className="mini-accent dark-accent"></div>
//             </div>
//           </div>
//           <div className="theme-info">
//             <div className="theme-name">
//               <Moon size={16} className="mr-2" />
//               Dark Elegant
//             </div>
//             <div className="theme-desc">Sophisticated design with premium feel</div>
//             {currentTheme === 'dark' && (
//               <div className="selected-badge">✓ Selected</div>
//             )}
//           </div>
//         </motion.button>
//       </div>

//       {/* Preview Toggle */}
//       <div className="preview-controls">
//         <button
//           className="preview-button"
//           onClick={() => setIsPreviewMode(!isPreviewMode)}
//         >
//           {isPreviewMode ? 'Hide Preview' : 'Show Side-by-Side Preview'}
//         </button>
//       </div>

//       {/* Side-by-Side Preview */}
//       <AnimatePresence>
//         {isPreviewMode && (
//           <motion.div
//             className="preview-comparison"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="comparison-grid">
//               <div className="comparison-item">
//                 <h4>WhiteSmoke Professional</h4>
//                 <div className="preview-card-container">
//                   <div className="preview-business-card light-theme">
//                     <div className="preview-content">
//                       <div className="preview-name">Andrew Perez - President</div>
//                       <div className="preview-tagline">AMP DESIGN AND CONSULTING LLC</div>
//                       <div className="preview-contact">
//                         <div>📍 4120 Dale Rd, Modesto, CA</div>
//                         <div>📞 (209) 403-5450</div>
//                         <div>✉️ ampdesignandconsulting@gmail.com</div>
//                       </div>
//                     </div>
//                     <div className="preview-logo">AMP</div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="comparison-item">
//                 <h4>Dark Elegant</h4>
//                 <div className="preview-card-container">
//                   <div className="preview-business-card dark-theme">
//                     <div className="preview-content">
//                       <div className="preview-name">Andrew Perez - President</div>
//                       <div className="preview-tagline">AMP DESIGN AND CONSULTING LLC</div>
//                       <div className="preview-contact">
//                         <div>📍 4120 Dale Rd, Modesto, CA</div>
//                         <div>📞 (209) 403-5450</div>
//                         <div>✉️ ampdesignandconsulting@gmail.com</div>
//                       </div>
//                     </div>
//                     <div className="preview-logo">AMP</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .theme-selector {
//           max-width: 700px;
//           background: white;
//           border-radius: 12px;
//           padding: 24px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           border: 1px solid #e9ecef;
//           margin: 20px 0;
//         }

//         .selector-header {
//           text-align: center;
//           margin-bottom: 24px;
//           color: #A5ACAF;
//         }

//         .selector-title {
//           font-size: 20px;
//           font-weight: 700;
//           color: #a4acac;
//           margin-bottom: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .selector-description {
//           color: #999;
//           font-size: 14px;
//         }

//         .theme-options {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//           margin-bottom: 20px;
//         }

//         .theme-option {
//           background: white;
//           border: 2px solid #e9ecef;
//           border-radius: 12px;
//           padding: 16px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: left;
//         }

//         .theme-option:hover {
//           border-color: #FD5A1E;
//           box-shadow: 0 4px 12px rgba(253, 90, 30, 0.1);
//         }

//         .theme-option.active {
//           border-color: #FD5A1E;
//           background: linear-gradient(135deg, #FD5A1E05, #FF7B4705);
//         }

//         .theme-preview {
//           width: 100%;
//           height: 80px;
//           border-radius: 8px;
//           margin-bottom: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }

//         .light-preview {
//           background: linear-gradient(135deg, #f8f9fa, #e9ecef);
//         }

//         .dark-preview {
//           background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
//         }

//         .mini-card {
//           width: 120px;
//           height: 70px;
//           border-radius: 6px;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//         }

//         .light-card {
//           background: WhiteSmoke;
//           border: 1px solid #ddd;
//         }

//         .dark-card {
//           background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
//           border: 1px solid #333;
//         }

//         .mini-content {
//           flex: 1;
//           padding: 8px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//         }

//         .mini-name {
//           font-size: 8px;
//           font-weight: 700;
//           color: #2c2c2c;
//         }

//         .mini-name.dark-text {
//           color: #FD5A1E;
//         }

//         .mini-company {
//           font-size: 6px;
//           color: #666;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .mini-company.dark-text {
//           color: #B8BCC0;
//         }

//         .mini-contact {
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .mini-line {
//           height: 2px;
//           background: #ccc;
//           border-radius: 1px;
//         }

//         .mini-line.dark-line {
//           background: #555;
//         }

//         .mini-line.short {
//           width: 70%;
//         }

//         .mini-logo {
//           position: absolute;
//           bottom: 4px;
//           right: 4px;
//           width: 24px;
//           height: 16px;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 6px;
//           font-weight: 700;
//           color: white;
//         }

//         .light-logo {
//           background: linear-gradient(135deg, #FD5A1E, #FF7B47);
//         }

//         .dark-logo {
//           background: linear-gradient(135deg, #FD5A1E, #FF7B47);
//         }

//         .mini-accent {
//           position: absolute;
//           top: 0;
//           right: 0;
//           width: 4px;
//           height: 100%;
//         }

//         .light-accent,
//         .dark-accent {
//           background: linear-gradient(to bottom, #FD5A1E, #FF7B47);
//         }

//         .theme-info {
//           position: relative;
//         }

//         .theme-name {
//           font-size: 14px;
//           font-weight: 600;
//           color: #a4acac;
//           margin-bottom: 4px;
//           display: flex;
//           align-items: center;
//         }

//         .theme-desc {
//           font-size: 12px;
//           color: #A5ACAF;
//         }

//         .selected-badge {
//           position: absolute;
//           top: 0;
//           right: 0;
//           background: #FD5A1E;
//           color: white;
//           padding: 2px 8px;
//           border-radius: 12px;
//           font-size: 10px;
//           font-weight: 600;
//         }

//         .preview-controls {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .preview-button {
//           background: transparent;
//           border: 2px solid #FD5A1E;
//           color: #FD5A1E;
//           padding: 8px 16px;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 14px;
//           font-weight: 500;
//           transition: all 0.3s ease;
//         }

//         .preview-button:hover {
//           background: #FD5A1E;
//           color: white;
//         }

//         .preview-comparison {
//           overflow: hidden;
//         }

//         .comparison-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 20px;
//         }

//         .comparison-item h4 {
//           text-align: center;
//           margin-bottom: 12px;
//           color: #2c2c2c;
//           font-size: 16px;
//           font-weight: 600;
//         }

//         .preview-card-container {
//           display: flex;
//           justify-content: center;
//         }

//         .preview-business-card {
//           width: 200px;
//           height: 115px;
//           border-radius: 8px;
//           padding: 12px;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//         }

//         .preview-business-card.light-theme {
//           background: WhiteSmoke;
//           border: 1px solid #ddd;
//           color: #2c2c2c;
//         }

//         .preview-business-card.dark-theme {
//           background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
//           border: 1px solid #333;
//           color: #F5F5F5;
//         }

//         .preview-content {
//           flex: 1;
//         }

//         .preview-name {
//           font-size: 10px;
//           font-weight: 700;
//           margin-bottom: 2px;
//         }

//         .preview-business-card.light-theme .preview-name {
//           color: #1a1a1a;
//         }

//         .preview-business-card.dark-theme .preview-name {
//           color: #FD5A1E;
//         }

//         .preview-tagline {
//           font-size: 6px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 6px;
//         }

//         .preview-business-card.light-theme .preview-tagline {
//           color: #666;
//         }

//         .preview-business-card.dark-theme .preview-tagline {
//           color: #B8BCC0;
//         }

//         .preview-contact {
//           font-size: 6px;
//           line-height: 1.3;
//         }

//         .preview-contact div {
//           margin-bottom: 1px;
//         }

//         .preview-logo {
//           position: absolute;
//           bottom: 8px;
//           right: 8px;
//           width: 32px;
//           height: 20px;
//           background: linear-gradient(135deg, #FD5A1E, #FF7B47);
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 8px;
//           font-weight: 700;
//           color: white;
//         }

//         .preview-business-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           right: 0;
//           width: 6px;
//           height: 100%;
//           background: linear-gradient(to bottom, #FD5A1E, #FF7B47);
//         }

//         /* Responsive design */
//         @media (max-width: 640px) {
//           .theme-options {
//             grid-template-columns: 1fr;
//           }

//           .comparison-grid {
//             grid-template-columns: 1fr;
//           }

//           .theme-selector {
//             padding: 16px;
//           }

//           .mini-card {
//             width: 100px;
//             height: 60px;
//           }

//           .preview-business-card {
//             width: 160px;
//             height: 92px;
//           }
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// export default BusinessCardSelector;