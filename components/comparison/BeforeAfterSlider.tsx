import Image from "next/image";
import { useEffect, useRef, useState } from "react";


interface BeforeAfterSliderProps {
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = ""
}) => {
  // State for slider position (0-100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle mouse and touch events
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    // Get slider dimensions
    const rect = sliderRef.current.getBoundingClientRect();
    
    // Calculate position (mouse or touch)
    let clientX;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    // Calculate percentage
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  // Touch move handler
  const handleTouchMove = (e: TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  // Mouse/touch event setup
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
    
    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp, { once: true });
    };
    
    const handleTouchStart = () => {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp, { once: true });
    };
    
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={sliderRef}
      className={`relative select-none overflow-hidden ${className}`}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Before label */}
        <div className="absolute top-4 left-4 bg-[#000000]/80 text-[#F5F5F5] px-4 py-2 rounded-full text-sm font-medium">
          {beforeLabel}
        </div>
      </div>
      
      {/* After image (dynamically clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden h-full" 
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* After label */}
          <div className="absolute top-4 right-4 bg-[#FD5A1E]/80 text-[#F5F5F5] px-4 py-2 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        </div>
      </div>
      
      {/* Slider control */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[#F5F5F5] z-10 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#F5F5F5] flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-6 h-6 text-[#000000]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};