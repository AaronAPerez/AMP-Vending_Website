import Hero from '../components/hero/Hero';
import BusinessSuccessFeatures from '../components/business/BusinessSuccessFeatures';
import LocationFinder from '../components/business/LocationFinder';
import ImplementationTimeline from '../components/business/ImplementationTimeline';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <main>
      <Header/>
      <Hero />
      <BusinessSuccessFeatures />
      <LocationFinder />
      <ImplementationTimeline />
    </main>
  );
}