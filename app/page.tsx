'use client';

import BusinessSuccessFeatures from '../components/business/BusinessSuccessFeatures';
import LocationFinder from '../components/business/LocationFinder';
import ImplementationTimeline from '../components/business/ImplementationTimeline';
// import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Hero from '@/components/hero/Hero';

// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 

  return (
    <> 
    {/* <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1> */}

        {/* <NoSSR /> */}
      {/* <Header/> */}
      <section id="hero" aria-label='hero'>
      <Hero />
      </section>

      <section id="business-success" aria-label='"business-success'>
      <BusinessSuccessFeatures />
      </section>

      <section id="location-finder" aria-label='location-finder'>
      <LocationFinder />
      </section>

      <section id="implementation-timeline" aria-label='"implementation-timeline'>
      <ImplementationTimeline />
      </section>
    </>
  );
}