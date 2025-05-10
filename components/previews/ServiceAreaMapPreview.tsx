/**
 * ServiceAreaMapPreview Component
 * 
 * Displays a preview of AMP Vending's service areas on a customized Google Map.
 * Uses hardcoded location data to ensure stability and prevent import errors.
 */

'use client';

<<<<<<< HEAD
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
=======
import React, { useEffect, useRef, useState, useCallback } from 'react';
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
import Link from 'next/link';

interface ServiceAreaMapPreviewProps {
  apiKey?: string;
  className?: string;
}

<<<<<<< HEAD
interface ServiceLocation {
  name: string;
  lat: number;
  lng: number;
  radius: number;
}

/**
 * A standalone map preview component that displays AMP Vending's service areas
 * without relying on external data imports that might cause issues
 */
=======
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
export default function ServiceAreaMapPreview({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  className = ''
}: ServiceAreaMapPreviewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded service area locations for Central California
<<<<<<< HEAD
  // Using useMemo to maintain stable reference across renders
  const serviceLocations = useMemo<ServiceLocation[]>(() => [
=======
  // Using hardcoded values to avoid import issues
  const serviceLocations = [
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
    {
      name: 'Modesto',
      lat: 37.6390972,
      lng: -120.9968782,
      radius: 50
    },
    {
      name: 'Stockton',
      lat: 37.9577016,
      lng: -121.2907796,
      radius: 40
    },
    {
      name: 'Merced',
      lat: 37.3021632,
      lng: -120.4829677,
      radius: 35
    }
<<<<<<< HEAD
  ], []); // Empty dependency array since these values never change
=======
  ];
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

  // Initialize the map (use useCallback to make it stable)
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;

    setIsLoading(true);

    try {
      // Center the map on Central California (Modesto area)
      const centerCoordinates = { lat: 37.6, lng: -120.9 };
      
      // Map styling to match website theme
      const mapOptions: google.maps.MapOptions = {
        center: centerCoordinates,
        zoom: 8.5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
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

      // Add service area circles and markers
      const infoWindow = new google.maps.InfoWindow();
      
      // Add circles and markers for each location
      serviceLocations.forEach((location) => {
<<<<<<< HEAD
        // Create circle for service area (directly use without assignment)
=======
        // Create circle for service area (remove unused assignment)
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c
        new google.maps.Circle({
          strokeColor: '#FD5A1E',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FD5A1E',
          fillOpacity: 0.35,
          map: newMap,
          center: { lat: location.lat, lng: location.lng },
          radius: location.radius * 1000, // Convert km to meters
        });

        // Add marker at center of circle
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          // Use a simple marker with custom color
          icon: {
            url: `data:image/svg+xml;utf-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" fill="#FD5A1E" stroke="#F5F5F5" stroke-width="2" />
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(16, 16),
            anchor: new google.maps.Point(8, 8)
          }
        });

        // Add click event to marker
        marker.addListener('click', () => {
          infoWindow.setContent(`
            <div style="color: #000000; padding: 5px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${location.name}</h3>
              <p style="margin: 0;">Service radius: ${location.radius} km</p>
            </div>
          `);
          infoWindow.open(newMap, marker);
        });
      });

      // Fit bounds to show all service areas
      const bounds = new google.maps.LatLngBounds();
      serviceLocations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      
      // Extend bounds slightly to give some padding
      newMap.fitBounds(bounds, 20);
      
      // Limit zoom level to prevent excessive zoom on small areas
      const listener = google.maps.event.addListener(newMap, 'idle', () => {
        const currentZoom = newMap.getZoom();
        if (currentZoom !== undefined && currentZoom > 10) {
          newMap.setZoom(10);
        }
        google.maps.event.removeListener(listener);
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Error initializing map. Please try again later.');
      setIsLoading(false);
    }
<<<<<<< HEAD
  }, [serviceLocations]); // Now serviceLocations is a stable reference
=======
  }, []); 
>>>>>>> a228a893c55835008002ef550579f1f56bfc520c

  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is missing');
      setIsLoading(false);
      return;
    }

    // Don't reload if already loaded
    if (window.google?.maps) {
      setMapLoaded(true);
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
    script.onerror = () => {
      setError('Failed to load Google Maps. Please try again later.');
      setIsLoading(false);
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
  }, [mapLoaded, initMap]); // Include initMap in dependencies

  return (
    <div className={`rounded-lg overflow-hidden bg-[#4d4d4d] border border-[#a4acac] ${className}`}>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Service Coverage Areas</h3>
        <p className="text-[#A5ACAF] mb-4">
          Zero-cost vending machine solutions available throughout Central California
        </p>
        
        {/* Map Container with loading and error states */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-72 md:h-80 bg-[#000000] rounded-lg"
            aria-label="Map showing AMP Vending service areas in Central California"
            role="img"
            tabIndex={0}
          />
          
          {isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#FD5A1E] border-t-transparent rounded-full animate-spin"></div>
                <span className="mt-2 text-[#F5F5F5]">Loading map...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/80 rounded-lg">
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="mt-2 text-[#F5F5F5]">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Legend and Call-to-Action */}
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#FD5A1E] opacity-60 mr-2"></div>
            <span className="text-[#A5ACAF] text-sm">Service Coverage</span>
          </div>
          
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center text-[#FD5A1E] hover:text-[#FD5A1E]/80 text-sm font-medium focus:outline-none focus:underline"
            aria-label="Contact us to check if your location is eligible for zero-cost vending"
          >
            Check Your Eligibility
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}