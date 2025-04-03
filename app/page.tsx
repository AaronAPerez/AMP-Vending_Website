'use client';

import Hero from '../components/hero/Hero';
import BusinessSuccessFeatures from '../components/business/BusinessSuccessFeatures';
import LocationFinder from '../components/business/LocationFinder';
import ImplementationTimeline from '../components/business/ImplementationTimeline';
import Header from '@/components/layout/Header';
// import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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
      <Header/>
      <Hero />
      <BusinessSuccessFeatures />
      <LocationFinder />
      <ImplementationTimeline />
    </>
  );
}