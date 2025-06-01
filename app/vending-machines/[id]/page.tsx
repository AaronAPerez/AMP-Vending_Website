'use client';

import React, { useEffect, useState } from 'react';
import { getVendingMachineById, MachineData } from '@/lib/data/vendingMachineData';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import VendingMachineDetailPage from '@/components/features/vending-machines/VendingMachineDetailPage';
import { Loading } from '@/components/ui/core/Loading';

/**
 * Dynamic Vending Machine Detail Page Component
 * 
 * This page component fetches the machine data using the ID from the URL
 * and renders the VendingMachineDetailPage component with the data
 */
const DynamicMachineDetailPage = () => {
  // Get the machine ID from the URL parameters
  const params = useParams();
  const machineId = params?.id as string;

  // State for the machine data
  const [machineData, setMachineData] = useState<MachineData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // vending machine pages
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "[Machine Name] Vending Machine",
        "image": "https://www.ampvendingmachines.com/images/machines/[Machine-Image]",
        "description": "[Machine description]",
        "brand": {
          "@type": "Brand",
          "name": "AMP Vending"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "description": "Zero-cost installation and maintenance-free operation"
        },
        "features": ["21.5\" touchscreen interface", "Advanced payment systems", "50+ product options", "Maintenance-free operation"]
      })
    }
  }
  />

  // Fetch the machine data when the component mounts
  useEffect(() => {
    if (!machineId) {
      setError('No machine ID provided');
      setIsLoading(false);
      return;
    }

    try {
      // Get the machine data from the data file
      const machine = getVendingMachineById(machineId);

      if (!machine) {
        setError(`Machine with ID ${machineId} not found`);
      } else {
        setMachineData(machine);
      }
    } catch (err) {
      setError('Error fetching machine data');
      console.error('Error fetching machine data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [machineId]);

  // Show loading state
  if (isLoading) {
    return <Loading />;
  }

  // Show error state
  if (error || !machineData) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-[#4d4d4d]/30 rounded-xl border border-[#a4acac]">
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-4">
            {error || 'Machine not found'}
          </h1>
          <p className="text-[#A5ACAF] mb-6">
            We couldn&apos;t find the vending machine you&apos;re looking for. It may have been moved or removed.
          </p>
          <Link
            href="/vending-machines"
            className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors inline-block"
          >
            View All Machines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Add structured data */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${machineData.name} Vending Machine`,
            "image": `https://www.ampvendingmachines.com${machineData.images[0].src}`,
            "description": machineData.description,
            "brand": {
              "@type": "Brand",
              "name": "AMP Vending"
            },
            // "model": machineData.model,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "description": "Zero-cost installation and maintenance-free operation"
            },
            "features": machineData.features.map(feature => feature.title)
          })
        }}
      />

      {/* Add breadcrumb structured data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ampvendingmachines.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Vending Machines",
                "item": "https://www.ampvendingmachines.com/vending-machines"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": machineData.name,
                "item": `https://www.ampvendingmachines.com/vending-machines/${machineData.id}`
              }
            ]
          })
        }}
      />

      {/* Render the detail page component */}
      <VendingMachineDetailPage machine={machineData} />
    </>
  );
};

export default DynamicMachineDetailPage;