'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Download, FileText, Lightbulb, Target } from 'lucide-react';

/**
 * BusinessCardInstructions Component
 * 
 * Displays comprehensive instructions for printing and downloading the business card
 * Includes professional printing tips and recommended workflow
 */
const BusinessCardInstructions = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="instructions-panel"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="instructions-title"
        variants={itemVariants}
      >
        📋 Print & Download Instructions
      </motion.h3>
      
      <div className="instructions-grid">
        {/* Print Card Only */}
        <motion.div 
          className="instruction-item"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className="instruction-icon">
            <Printer size={20} />
          </div>
          <div className="instruction-content">
            <h4>Print Card Only</h4>
            <p>Prints just the business card without buttons or extra content. Perfect for immediate use.</p>
            <small><strong>Shortcut:</strong> Ctrl+P (Cmd+P on Mac)</small>
          </div>
        </motion.div>

        {/* Download Card Only */}
        <motion.div 
          className="instruction-item"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className="instruction-icon">
            <Download size={20} />
          </div>
          <div className="instruction-content">
            <h4>Download Card Only</h4>
            <p>Downloads a clean HTML file with just the business card. Perfect for sharing, emailing, or printing later.</p>
            <small><strong>Shortcut:</strong> Ctrl+D (Cmd+D on Mac)</small>
          </div>
        </motion.div>

        {/* Print Full Page */}
        <motion.div 
          className="instruction-item"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <div className="instruction-icon">
            <FileText size={20} />
          </div>
          <div className="instruction-content">
            <h4>Print Full Page</h4>
            <p>Prints the entire page including buttons and instructions for reference.</p>
            <small><strong>Shortcut:</strong> Ctrl+Shift+P</small>
          </div>
        </motion.div>
      </div>

      {/* Professional Printing Tips */}
      <motion.div 
        className="printing-tips"
        variants={itemVariants}
      >
        <h4>
          <Lightbulb size={16} className="inline mr-2" />
          Professional Printing Tips
        </h4>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Paper:</strong> Use cardstock (200-300gsm) for professional feel
          </div>
          <div className="tip-item">
            <strong>Size:</strong> Standard business card size (3.5" × 2")
          </div>
          <div className="tip-item">
            <strong>Settings:</strong> Choose "Actual size" or "100%" in print settings
          </div>
          <div className="tip-item">
            <strong>Quality:</strong> Set printer to highest quality for best results
          </div>
          <div className="tip-item">
            <strong>Color:</strong> Both themes print well in color or black & white
          </div>
          <div className="tip-item">
            <strong>Margins:</strong> Ensure "Borderless" or minimal margins for full bleed
          </div>
        </div>
      </motion.div>

      {/* Recommended Workflow */}
      <motion.div 
        className="workflow-section"
        variants={itemVariants}
      >
        <h4>
          <Target size={16} className="inline mr-2" />
          Recommended Workflow
        </h4>
        <ol className="workflow-list">
          <li><strong>For immediate printing:</strong> Use "Print Card Only" for quick single cards</li>
          <li><strong>For saving/sharing:</strong> Use "Download Card Only" to get a clean HTML file</li>
          <li><strong>For multiple copies:</strong> Download first, then print the saved file multiple times</li>
          <li><strong>For professional printing:</strong> Use downloaded file with commercial printing services</li>
          <li><strong>For digital sharing:</strong> Email the HTML file or share the website link</li>
        </ol>
      </motion.div>

      {/* Theme Selection Guide */}
      <motion.div 
        className="theme-guide"
        variants={itemVariants}
      >
        <h4>🎨 Theme Selection Guide</h4>
        <div className="theme-comparison">
          <div className="theme-option-info">
            <h5>WhiteSmoke Professional</h5>
            <ul>
              <li>Clean, traditional business aesthetic</li>
              <li>Excellent for corporate environments</li>
              <li>High contrast for easy reading</li>
              <li>Works well with any printer type</li>
            </ul>
          </div>
          <div className="theme-option-info">
            <h5>Dark Elegant</h5>
            <ul>
              <li>Modern, sophisticated design</li>
              <li>Perfect for creative industries</li>
              <li>Eye-catching premium appearance</li>
              <li>Best with high-quality color printing</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Troubleshooting Section */}
      <motion.div 
        className="troubleshooting"
        variants={itemVariants}
      >
        <h4>🔧 Troubleshooting</h4>
        <div className="troubleshooting-grid">
          <div className="troubleshooting-item">
            <strong>Card appears too small:</strong>
            <p>Ensure print scaling is set to "Actual size" or "100%" in your browser's print dialog.</p>
          </div>
          <div className="troubleshooting-item">
            <strong>Colors look different:</strong>
            <p>Check your printer's color settings and ensure you're using high-quality paper for best color reproduction.</p>
          </div>
          <div className="troubleshooting-item">
            <strong>Download not working:</strong>
            <p>Check your browser's download settings and ensure pop-ups are allowed for this site.</p>
          </div>
          <div className="troubleshooting-item">
            <strong>Print cut off:</strong>
            <p>Adjust printer margins to minimum or select "Borderless" printing if available.</p>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .instructions-panel {
          max-width: 800px;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          margin-top: 20px;
        }

        .instructions-title {
          color: gray-300: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
          border-bottom: 2px solid #FD5A1E;
          padding-bottom: 10px;
        }

        .instructions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .instruction-item {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e9ecef;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .instruction-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(253, 90, 30, 0.1);
        }

        .instruction-icon {
          background: linear-gradient(135deg, #FD5A1E, #FF7B47);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        h4 {
          color: #a4acac;
        }
          
        .instruction-content h4 {
          color: #A5ACAF;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .instruction-content p {
          color: #999;
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .instruction-content small {
          color: #FD5A1E;
          font-size: 12px;
          font-weight: 500;
        }

        .printing-tips,
        .workflow-section,
        .theme-guide,
        .troubleshooting {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          border-left: 4px solid #FD5A1E;
        }

        .printing-tips h4,
        .workflow-section h4,
        .theme-guide h4,
        .troubleshooting h4 {
          color: #2c2c2c;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .tip-item {
          background: white;
          padding: 12px;
          border-radius: 6px;
          font-size: 14px;
          color: #666;
          border: 1px solid #e9ecef;
        }

        .tip-item strong {
          color: #FD5A1E;
          font-weight: 600;
        }

        .workflow-list {
          list-style: none;
          padding: 0;
          margin: 0;
          counter-reset: workflow-counter;
        }

        .workflow-list li {
          counter-increment: workflow-counter;
          padding: 8px 0 8px 32px;
          position: relative;
          color: #999;
          font-size: 14px;
          line-height: 1.4;
        }

        .workflow-list li::before {
          content: counter(workflow-counter);
          position: absolute;
          left: 0;
          top: 8px;
          background: linear-gradient(135deg, #FD5A1E, #FF7B47);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .workflow-list li strong {
          color: #2c2c2c;
          font-weight: 600;
          color: #a4acac;
        }

        .theme-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .theme-option-info {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .theme-option-info h5 {
          color: #2c2c2c;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          border-bottom: 1px solid #FD5A1E;
          padding-bottom: 4px;
        }

        .theme-option-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .theme-option-info li {
          color: #666;
          font-size: 13px;
          padding: 2px 0;
          position: relative;
          padding-left: 16px;
        }

        .theme-option-info li::before {
          content: "•";
          color: #FD5A1E;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .troubleshooting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .troubleshooting-item {
          background: white;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }

        .troubleshooting-item strong {
          color: #FD5A1E;
          font-size: 13px;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .troubleshooting-item p {
          color: #666;
          font-size: 12px;
          line-height: 1.3;
          margin: 0;
        }

        /* Hide instructions when printing */
        @media print {
          .instructions-panel {
            display: none !important;
          }
        }

        /* Responsive design for instructions */
        @media (max-width: 768px) {
          .instructions-panel {
            padding: 16px;
            margin-top: 15px;
          }

          .instructions-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .tips-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .theme-comparison {
            grid-template-columns: 1fr;
          }

          .troubleshooting-grid {
            grid-template-columns: 1fr;
          }

          .instruction-item {
            padding: 12px;
          }

          .instructions-title {
            font-size: 20px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default BusinessCardInstructions;