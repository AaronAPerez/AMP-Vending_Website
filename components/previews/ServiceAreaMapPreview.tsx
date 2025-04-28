'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { serviceLocations } from '@/data/serviceAreas';

interface ServiceAreaMapPreviewProps {
  apiKey?: string;
  className?: string;
}

const ServiceAreaMapPreview: React.FC<ServiceAreaMapPreviewProps> = ({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [, setMap] = useState<google.maps.Map | null>(null);

  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) return;

    // Don't reload if already loaded
    if (window.google?.maps) {
      initMap();
      return;
    }

    // Load the API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  // Initialize map when API is loaded
  useEffect(() => {
    if (mapLoaded) {
      initMap();
    }
  }, [mapLoaded]);

  // Initialize the map
  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    // Center the map on Central California
    const centerCoordinates = { lat: 37.6, lng: -120.9 };
    
    // Map styling to match website theme
    const mapOptions: google.maps.MapOptions = {
      center: centerCoordinates,
      zoom: 8.5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#242f3e' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#242f3e' }, { lightness: -80 }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#A5ACAF' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        }
      ]
    };

    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add service area circles
    serviceLocations.forEach(() => {
      // Create circle

      // Add marker at center of circle
    });
  };

  return (
    <div className={`rounded-lg overflow-hidden bg-[#4d4d4d] border border-[#a4acac] ${className}`}>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Service Coverage Areas</h3>
        <p className="text-[#A5ACAF] mb-4">AMP Vending serves Central California</p>
        
        {/* Map Container */}
        <div
          ref={mapRef}
          className="w-full h-64 bg-[#000000] rounded-lg"
          aria-label="Map showing AMP Vending service areas in Central California"
        />
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#FD5A1E] opacity-60 mr-2"></div>
            <span className="text-[#A5ACAF] text-sm">Service Area</span>
          </div>
          
          <Link
            href="/service-areas"
            className="mt-2 inline-flex items-center text-[#FD5A1E] hover:text-[#FD5A1E]/80 text-sm font-medium"
          >
            Check Your Location
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreaMapPreview;