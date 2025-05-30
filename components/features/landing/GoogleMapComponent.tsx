'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';


interface GoogleMapComponentProps {
  apiKey: string;
  mapContainerStyle?: React.CSSProperties;
  center: { lat: number; lng: number };
  zoom: number;
  onLoad?: () => void;
  onUnmount?: () => void;
  options?: google.maps.MapOptions;
}

export default function GoogleMapComponent({ apiKey }: GoogleMapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // This effect runs after the component is mounted
    // Web components will be initialized via Script tags
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      scriptLoaded.current = true;
    }
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      {/* Load the Google Maps Web Components script */}
      <Script
        id="google-maps-web-components"
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js"
        strategy="afterInteractive"
      />

      {/* Container for the map */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full" 
        dangerouslySetInnerHTML={{
          __html: `
            <!-- Google Maps API loader -->
            <gmpx-api-loader 
              key="${apiKey}" 
              solution-channel="GMP_GE_mapsandplacesautocomplete_v2">
            </gmpx-api-loader>
            
            <!-- Map component -->
            <gmp-map 
              center="37.6390972,-120.9968782" 
              zoom="15" 
              map-id="DEMO_MAP_ID"
              style="width: 100%; height: 100%;">
              
              <!-- Place picker search box -->
              <div slot="control-block-start-inline-start" style="padding: 10px; background: rgba(0,0,0,0.7); margin: 10px; border-radius: 8px;">
                <gmpx-place-picker placeholder="Search for a location"></gmpx-place-picker>
              </div>
              
              <!-- Marker -->
              <gmp-advanced-marker position="37.6390972,-120.9968782"></gmp-advanced-marker>
            </gmp-map>
          `
        }}
      />

      {/* Add initialization script */}
      <Script
        id="google-maps-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            async function initMap() {
              // Wait for web components to be defined
              if (typeof customElements === 'undefined') return;
              
              try {
                await customElements.whenDefined('gmp-map');
                const map = document.querySelector('gmp-map');
                const marker = document.querySelector('gmp-advanced-marker');
                const placePicker = document.querySelector('gmpx-place-picker');
                
                if (!map || !marker || !placePicker) {
                  console.warn('Map components not found');
                  return;
                }
                
                // Wait for Google Maps to be available
                if (!window.google || !window.google.maps) {
                  console.warn('Google Maps not loaded yet');
                  return;
                }
                
                const infowindow = new google.maps.InfoWindow();
                
                placePicker.addEventListener('gmpx-placechange', () => {
                  const place = placePicker.value;
                  
                  if (!place || !place.location) {
                    console.log('No location selected');
                    marker.position = null;
                    return;
                  }
                  
                  if (place.viewport) {
                    map.innerMap.fitBounds(place.viewport);
                  } else {
                    map.center = place.location;
                    map.zoom = 17;
                  }
                  
                  marker.position = place.location;
                  
                  if (place.displayName) {
                    infowindow.setContent(
                      \`<div style="padding: 8px; color: #F5F5F5;">
                        <strong style="color: #FD5A1E; font-size: 16px;">\${place.displayName}</strong>
                        <p style="margin-top: 4px; font-size: 14px;">\${place.formattedAddress || ''}</p>
                      </div>\`
                    );
                    infowindow.open(map.innerMap, marker);
                  }
                });
              } catch (error) {
                console.error('Error initializing map:', error);
              }
            }
            
            // Call initMap when DOM is ready or after a slight delay to ensure components are loaded
            if (document.readyState === 'complete') {
              setTimeout(initMap, 1000);
            } else {
              window.addEventListener('load', () => setTimeout(initMap, 1000));
            }
          `
        }}
      />
    </div>
  );
}