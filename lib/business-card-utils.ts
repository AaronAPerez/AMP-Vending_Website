/**
 * Business Card Utility Functions
 * 
 * Helper functions for business card functionality including theme management
 * and download/share capabilities
 */

export interface BusinessCardTheme {
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  textContact: string;
  border: string;
  logoBg: string;
  qrBg: string;
  shadow: string;
  beforeBg: string;
  afterBg: string;
  accentShadow: string;
}

/**
 * Get theme configuration for business card
 */
export const getBusinessCardTheme = (theme: 'light' | 'dark'): BusinessCardTheme => {
  const themes = {
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
  
  return themes[theme];
};

/**
 * Generate CSS styles for business card theme
 */
export const generateThemeCSS = (theme: 'light' | 'dark'): string => {
  const themeConfig = getBusinessCardTheme(theme);
  
  return `
    .business-card-${theme} {
      background: ${themeConfig.cardBg};
      color: ${themeConfig.textContact};
      border: ${themeConfig.border};
      box-shadow: ${themeConfig.shadow};
    }
    
    .business-card-${theme}::before {
      background-image: ${themeConfig.beforeBg};
    }
    
    .business-card-${theme}::after {
      background: ${themeConfig.afterBg};
    }
    
    .business-card-${theme} .company-name {
      color: ${themeConfig.textPrimary};
    }
    
    .business-card-${theme} .tagline {
      color: ${themeConfig.textSecondary};
    }
    
    .business-card-${theme} .contact-item {
      color: ${themeConfig.textContact};
    }
    
    .business-card-${theme} .logo-area {
      background: ${themeConfig.logoBg};
      border: 2px solid ${theme === 'light' ? 'rgba(253, 90, 30, 0.4)' : '#FD5A1E'};
    }
    
    .business-card-${theme} .qr-code {
      background: ${themeConfig.qrBg};
      border: 2px solid ${theme === 'light' ? 'rgba(253, 90, 30, 0.4)' : 'rgba(253, 90, 30, 0.6)'};
    }
    
    .business-card-${theme} .accent-line {
      box-shadow: ${themeConfig.accentShadow};
    }
  `;
};

/**
 * Generate business card HTML for download with theme
 */
export const generateBusinessCardHTML = (theme: 'light' | 'dark', cardHTML: string): string => {
  const themeConfig = getBusinessCardTheme(theme);
  const themeCSS = generateThemeCSS(theme);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AMP Vending Business Card - Andrew Perez (${theme === 'light' ? 'Professional' : 'Elegant'} Theme)</title>
    <meta name="description" content="Professional business card for Andrew Perez, President of AMP Design and Consulting LLC">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: ${theme === 'light' 
              ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
              : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'};
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            color: ${theme === 'light' ? '#333' : '#f5f5f5'};
        }

        .page-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            max-width: 600px;
            width: 100%;
        }

        .theme-info {
            text-align: center;
            color: ${theme === 'light' ? '#666' : '#ccc'};
            font-size: 14px;
            margin-bottom: 10px;
            padding: 12px 24px;
            background: ${theme === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.4)'};
            border-radius: 8px;
            border: 1px solid ${theme === 'light' 
              ? 'rgba(253, 90, 30, 0.2)' 
              : 'rgba(253, 90, 30, 0.3)'};
        }

        .business-card-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: ${theme === 'light' 
              ? 'rgba(255, 255, 255, 0.5)' 
              : 'rgba(0, 0, 0, 0.2)'};
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, ${theme === 'light' ? '0.1' : '0.3'});
        }

        .download-controls {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
        }

        .download-btn {
            background: #FD5A1E;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(253, 90, 30, 0.25);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 140px;
        }

        .download-btn:hover {
            background: #E5511A;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(253, 90, 30, 0.35);
        }

        .download-btn.secondary {
            background: transparent;
            color: ${theme === 'light' ? '#666' : '#ccc'};
            border: 2px solid ${theme === 'light' ? '#666' : '#ccc'};
        }

        .download-btn.secondary:hover {
            background: ${theme === 'light' ? '#666' : '#ccc'};
            color: ${theme === 'light' ? 'white' : '#000'};
        }

        .instructions {
            text-align: center;
            margin-top: 15px;
            padding: 16px;
            background: ${theme === 'light' 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.3)'};
            border-radius: 8px;
            font-size: 13px;
            line-height: 1.5;
        }

        .keyboard-shortcuts {
            margin-top: 10px;
            font-size: 12px;
            color: ${theme === 'light' ? '#888' : '#aaa'};
        }

        .keyboard-shortcuts strong {
            color: #FD5A1E;
        }

        /* Theme-specific styles */
        ${themeCSS}

        /* Print styles */
        @media print {
            body {
                background: white !important;
                margin: 0;
                padding: 0;
            }

            .download-controls,
            .theme-info,
            .instructions {
                display: none !important;
            }

            .page-container {
                margin: 0;
                padding: 0;
            }

            .business-card-container {
                background: none !important;
                box-shadow: none !important;
                padding: 0;
            }

            [data-theme] {
                box-shadow: none !important;
                border: 1px solid #000 !important;
                background: ${theme === 'light' ? 'whitesmoke' : '#1a1a1a'} !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }

        /* Responsive design */
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }

            .download-controls {
                flex-direction: column;
                align-items: center;
            }

            .download-btn {
                width: 100%;
                max-width: 200px;
            }

            .theme-info {
                font-size: 12px;
                padding: 10px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="page-container">
        <div class="theme-info">
            <strong>AMP Vending Business Card</strong><br>
            ${theme === 'light' ? 'WhiteSmoke Professional Theme' : 'Dark Elegant Theme'}<br>
            <small>Andrew Perez - President, AMP Design and Consulting LLC</small>
        </div>
        
        <div class="business-card-container">
            ${cardHTML}
        </div>
        
        <div class="download-controls">
            <button class="download-btn" onclick="window.print()">
                🖨️ Print Business Card
            </button>
            <button class="download-btn secondary" onclick="window.close()">
                ✕ Close Window
            </button>
        </div>
        
        <div class="instructions">
            <p><strong>Print Instructions:</strong></p>
            <p>For best results, use cardstock paper (200-300gsm) and set your printer to highest quality. 
            Choose "Actual size" or "100%" in print settings for correct dimensions.</p>
            
            <div class="keyboard-shortcuts">
                <strong>Keyboard Shortcuts:</strong> Press <strong>Ctrl+P</strong> (Cmd+P on Mac) to print • <strong>Esc</strong> to close
            </div>
        </div>
    </div>
    
    <script>
        // Auto-focus for accessibility
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelector('.download-btn')?.focus();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
                window.print();
            }
            if (event.key === 'Escape') {
                window.close();
            }
        });
        
        // Auto-print if requested via URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('autoprint') === 'true') {
            setTimeout(() => {
                window.print();
            }, 500);
        }
        
        // Theme detection and additional styling
        const theme = '${theme}';
        console.log('Business card loaded with theme:', theme);
    </script>
</body>
</html>`;
};

/**
 * Download business card with enhanced theme support
 */
export const downloadBusinessCard = (theme: 'light' | 'dark', filename?: string): void => {
  const cardElement = document.querySelector('.business-card-container');
  if (!cardElement) {
    console.warn('Business card element not found');
    alert('Business card not found. Please try again.');
    return;
  }

  const cardHTML = cardElement.outerHTML;
  const htmlContent = generateBusinessCardHTML(theme, cardHTML);
  const defaultFilename = `amp-business-card-andrew-perez-${theme}-theme.html`;
  
  try {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename || defaultFilename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Provide user feedback
    alert(`Business card downloaded! The ${theme} theme version is ready to print.`);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed. Please try again.');
  }
};

/**
 * Print business card with theme-aware styling
 */
export const printBusinessCard = (theme: 'light' | 'dark'): void => {
  const cardElement = document.querySelector('.business-card-container');
  if (!cardElement) {
    console.warn('Business card element not found');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.warn('Failed to open print window');
    return;
  }

  const cardHTML = cardElement.outerHTML;
  const printHTML = generateBusinessCardHTML(theme, cardHTML);
  
  printWindow.document.write(printHTML);
  printWindow.document.close();
  printWindow.focus();
  
  // Delay to ensure content is loaded before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

/**
 * Share business card via Web Share API with theme info
 */
export const shareBusinessCard = async (theme: 'light' | 'dark'): Promise<void> => {
  const themeDescription = theme === 'light' ? 'WhiteSmoke Professional' : 'Dark Elegant';
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Andrew Perez - AMP Vending Business Card (${themeDescription})`,
        text: `Professional business card for Andrew Perez, President of AMP Design and Consulting LLC. ${themeDescription} theme.`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard
      await copyToClipboard(theme);
    }
  } else {
    // Fallback: Copy URL to clipboard
    await copyToClipboard(theme);
  }
};

/**
 * Copy business card URL to clipboard
 */
const copyToClipboard = async (theme: 'light' | 'dark'): Promise<void> => {
  try {
    const url = `${window.location.href}?theme=${theme}`;
    await navigator.clipboard.writeText(url);
    alert(`Business card URL (${theme} theme) copied to clipboard!`);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    alert('Unable to copy URL. Please copy the page URL manually.');
  }
};

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = (currentTheme: 'light' | 'dark'): 'light' | 'dark' => {
  return currentTheme === 'light' ? 'dark' : 'light';
};

/**
 * Get theme from URL parameters or local storage
 */
export const getThemeFromStorage = (): 'light' | 'dark' => {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  if (urlTheme === 'light' || urlTheme === 'dark') {
    return urlTheme;
  }
  
  // Check local storage
  try {
    const savedTheme = localStorage.getItem('business-card-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (error) {
    console.warn('Unable to access localStorage:', error);
  }
  
  // Default to light theme
  return 'light';
};

/**
 * Save theme to local storage
 */
export const saveThemeToStorage = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem('business-card-theme', theme);
  } catch (error) {
    console.warn('Unable to save theme to localStorage:', error);
  }
};

/**
 * Get theme display name
 */
export const getThemeDisplayName = (theme: 'light' | 'dark'): string => {
  return theme === 'light' ? 'WhiteSmoke Professional' : 'Dark Elegant';
};

/**
 * Validate theme value
 */
export const isValidTheme = (theme: string): theme is 'light' | 'dark' => {
  return theme === 'light' || theme === 'dark';
};