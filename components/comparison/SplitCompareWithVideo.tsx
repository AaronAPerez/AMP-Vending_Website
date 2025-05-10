'use client';

import React, { useState, useRef } from 'react';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import Image from 'next/image';


/**
 * Props for SplitCompareWithVideo component
 */
interface SplitCompareWithVideoProps {
  /**
   * Source URL for the before image
   */
  beforeSrc: string;

  /**
   * Alt text for the before image
   */
  beforeAlt: string;

  /**
   * Source URL for the after image
   */
  afterSrc: string;

  /**
   * Alt text for the after image
   */
  afterAlt: string;

  /**
   * Source URL for the video
   */
  videoSrc: string;

  /**
   * Description text for the video
   */
  videoDescription?: string;

  /**
   * Optional poster image for the video
   */
  videoPoster?: string;

  /**
   * Whether to show the comparison first on mobile (defaults to true)
   */
  compareFirstOnMobile?: boolean;

  /**
   * Layout direction (horizontal or vertical)
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Whether to autoplay the video (muted is required for autoplay)
   */
  autoplayVideo?: boolean;

  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * SplitCompareWithVideo Component
 * 
 * A component that splits the screen with a before/after comparison on one half
 * and a video on the other half.
 */
const SplitCompareWithVideo: React.FC<SplitCompareWithVideoProps> = ({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  videoSrc,
  videoDescription = "Experience our premium vending machine in action",
  videoPoster,
  compareFirstOnMobile = true,
  direction = 'horizontal',
  autoplayVideo = true,
  className = '',
}) => {
  // State for the comparison slider position
  const [sliderPosition, setSliderPosition] = useState(50);

  // State for video playback status
  const [isPlaying, setIsPlaying] = useState(autoplayVideo);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Refs for the container and video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handler for slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // Toggle video playback
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle when video has loaded metadata
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Layout classes based on direction
  const layoutClasses = direction === 'horizontal'
    ? 'grid grid-cols-1 lg:grid-cols-2 gap-8'
    : 'flex flex-col gap-8';

  // Mobile order classes based on compareFirstOnMobile
  const compareOrderClass = compareFirstOnMobile ? 'order-1 lg:order-1' : 'order-2 lg:order-1';
  const videoOrderClass = compareFirstOnMobile ? 'order-2 lg:order-2' : 'order-1 lg:order-2';

  return (
    <div className={`${layoutClasses} ${className}`}>
      {/* Before/After Comparison Section */}
      <div className={`${compareOrderClass}`}>
<<<<<<< HEAD
        <HeroHighlight containerClassName="rounded-xl overflow-hidden">
=======
        <HeroHighlight containerClassName="rounded-xl overflow-hidden h-full">
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
          <div className="p-4 bg-dark-gray/20">
            <h3 className="text-xl font-bold text-orange mb-4">Workplace Transformation</h3>

            {/* Comparison Container */}
<<<<<<< HEAD
            <div className="relative w-100 aspect-[1/1] overflow-hidden rounded-lg">
=======
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
              {/* Before Image (Full width) */}
              <div className="absolute inset-0">
                <Image
                  src={beforeSrc}
                  alt={beforeAlt}
                  className="w-full h-full object-cover"
<<<<<<< HEAD
                  width={200}
                  height={200}
=======
                  width={100}
                  height={100}
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
                />
              </div>

              {/* After Image (Shown based on slider) */}
              <div
                className="absolute inset-0 overflow-hidden border-r border-white"
                style={{ width: `${sliderPosition}%` }}
              >
                <Image
                  src={afterSrc}
                  alt={afterAlt}
<<<<<<< HEAD
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
=======
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  width={100}
                  height={100}
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
                />
              </div>

              {/* Slider indicator line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                aria-hidden="true"
              >
                {/* Slider handle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                  <div className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 text-sm rounded">
                Before
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 text-sm rounded">
                After
              </div>

              {/* Slider input (for accessibility) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute bottom-0 w-full opacity-0 cursor-pointer h-full z-10"
                aria-label="Comparison slider position"
              />
            </div>

            {/* Description */}
            <div className="mt-4 text-sm text-silver">
              <p className="mb-2">Drag the slider to see how our premium vending machines transform the workplace environment.</p>
              <div className="flex space-x-4 mt-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Before</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>After</span>
                </div>
              </div>
            </div>
          </div>
        </HeroHighlight>
      </div>

      {/* Video Section */}
      <div className={`${videoOrderClass}`}>
        <HeroHighlight containerClassName="rounded-xl overflow-hidden h-full">
          <div className="p-4 bg-dark-gray/20 h-full flex flex-col">
            <h3 className="text-xl font-bold text-orange mb-4">Premium Experience</h3>

            {/* Video Container */}
            <div className="relative flex-grow rounded-lg overflow-hidden bg-primary-black/50">
              {/* Poster (shown until video is loaded) */}
              {!isVideoLoaded && videoPoster && (
                <div className="absolute inset-0 bg-primary-black flex items-center justify-center">
                  <Image
                    src={videoPoster}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-70"
                    width={100}
                    height={100}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg"
                poster={videoPoster}
                controls={false}
                playsInline
                muted={autoplayVideo}
                autoPlay={autoplayVideo}
                loop
                onLoadedMetadata={handleVideoLoaded}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center">
                  <button
                    onClick={toggleVideoPlayback}
                    className="w-10 h-10 rounded-full bg-orange/90 hover:bg-orange flex items-center justify-center text-white mr-3 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-primary-black"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-grow text-whitesmoke text-sm">
                    <p>{videoDescription}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.muted) {
                          videoRef.current.muted = false;
                        } else {
                          videoRef.current.muted = true;
                        }
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-white ml-3 focus:outline-none focus:ring-2 focus:ring-silver focus:ring-offset-2 focus:ring-offset-primary-black"
                    aria-label={videoRef.current?.muted ? "Unmute video" : "Mute video"}
                  >
                    {videoRef.current?.muted ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.27 5L2 6.27l4.22 4.22L2 14h5l6 6V9.27l2 2V20c0 1.66-1.34 3-3 3s-3-1.34-3-3v-7h-4v7c0 2.76 2.24 5 5 5s5-2.24 5-5V9.27l4.73 4.73L20 12h-7L3.27 5z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="mt-4">
              <h4 className="font-semibold text-whitesmoke text-sm mb-2">Premium Features Showcase:</h4>
              <ul className="text-sm text-silver grid grid-cols-2 gap-2">
                <li className="flex items-center">
                  <div className="w-4 h-4 text-orange mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  21.5&quot; Touchscreen
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 text-orange mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  Tap-to-Pay
                </li>
                <iframe
                  data-video-id="something"
                  data-block-on-consent="_till_activated"
                >

                </iframe>

                <li className="flex items-center">
                  <div className="w-4 h-4 text-orange mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  50+ Product Options
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 text-orange mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Zero-Cost Installation
                </li>
              </ul>
            </div>
          </div>
        </HeroHighlight>
      </div>
    </div>
  );
};

export default SplitCompareWithVideo;