
export function createPlaceholderImage(width: number = 400, height: number = 320) {
    if (typeof window === 'undefined') return '';
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';
  
    // Background
    ctx.fillStyle = '#4d4d4d';
    ctx.fillRect(0, 0, width, height);
  
    // Icon (simplified product box)
    ctx.strokeStyle = '#A5ACAF';
    ctx.lineWidth = 2;
    ctx.strokeRect(width/4, height/3, width/2, height/3);
  
    // Text
    ctx.fillStyle = '#A5ACAF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('No Image', width/2, height * 0.75);
  
    return canvas.toDataURL('image/png');
  }
  