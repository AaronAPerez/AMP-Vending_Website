import React from 'react';
import { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';


// Define the metadata 
export const metadata: Metadata = {
  title: 'AMP Vending | Premium Vending Solutions',
  description: 'Zero-cost vending machine solutions for workplaces with revenue sharing model.',
};



export default async function Home() {
  

  return (
    <div className="overflow-hidden">
 

<LandingPage/>
      {/* <section id='contact-form'>
        <ContactForm />
      </section> */}
    </div>
  );
}