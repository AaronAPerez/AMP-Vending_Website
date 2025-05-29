/**
 * Script to generate placeholder images for vending machines
 * 
 * Run this script to create consistent placeholder images
 * for your vending machine gallery and other image-heavy components
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface PlaceholderConfig {
  width: number;
  height: number;
  filename: string;
}

const placeholders: PlaceholderConfig[] = [
  { width: 400, height: 600, filename: 'vending-machine-placeholder' },
  { width: 800, height: 400, filename: 'service-area-placeholder' },
  { width: 1200, height: 630, filename: 'og-image-placeholder' },
  { width: 600, height: 400, filename: 'product-placeholder' },
];

function generateSVG(width: number, height: number): string {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #000000; }
    .text { font-family: system-ui, -apple-system, sans-serif; fill: #A5ACAF; font-size: 16px; }
    .icon { fill: #FD5A1E; }
  </style>
  
  <!-- Background -->
  <rect width="100%" height="100%" class="bg"/>
  
  <!-- Vending Machine Icon -->
  <path class="icon" transform="translate(${width/2 - 30}, ${height/2 - 40})" 
        d="M20,60h20V5c0-2.76-2.24-5-5-5H25c-2.76,0-5,2.24-5,5V60H20z
        M25,10h5v5h-5V10z M25,20h5v5h-5V20z M25,30h5v5h-5V30z M25,40h5v5h-5V40z"/>
  
  <!-- Text -->
  <text x="50%" y="${height/2 + 50}" text-anchor="middle" class="text">
    Image Unavailable
  </text>
  <text x="50%" y="${height/2 + 70}" text-anchor="middle" class="text">
    ${width}x${height}
  </text>
</svg>`;
}

function generatePlaceholders() {
  const placeholderDir = join(process.cwd(), 'public', 'images', 'placeholders');
  
  // Create directory if it doesn't exist
  try {
    mkdirSync(placeholderDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  placeholders.forEach(({ width, height, filename }) => {
    const svg = generateSVG(width, height);
    const filepath = join(placeholderDir, `${filename}.svg`);
    
    writeFileSync(filepath, svg);
    console.log(`Generated: ${filename}.svg`);
    
    // Also save as PNG if you prefer
    // Note: This would require additional dependencies like sharp or node-canvas
  });
}

// Run the script
generatePlaceholders();
console.log('Placeholder images generated successfully!');