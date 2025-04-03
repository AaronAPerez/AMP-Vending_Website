import React from 'react';
import { Metadata } from 'next';


// Import the hook function directly for server component use
import { machines } from '@/lib/vendingMachineData';

// Define types for route parameters
interface VendingMachineDetailPageProps {
  params: {
    machineId: string;
  };
}

/**
 * Generate metadata for vending machine detail pages
 */
export async function generateMetadata({ 
  params 
}: VendingMachineDetailPageProps): Promise<Metadata> {
  // Find the machine by ID
  const machine = machines.find(m => m.id === params.machineId);
  
  // Default metadata if machine not found
  if (!machine) {
    return {
      title: 'Vending Machine Not Found | AMP Design and Consulting',
      description: 'The requested vending machine could not be found.'
    };
  }
  
  // Machine-specific metadata
  return {
    title: `${machine.name} | AMP Design and Consulting`,
    description: machine.description,
  };
}

/**
 * Generate static paths for all vending machines
 */
export async function generateStaticParams() {
  return machines.map(machine => ({
    machineId: machine.id,
  }));
}

/**
 * Individual vending machine detail page component
 */
export default function VendingMachineDetailPage({ params }: VendingMachineDetailPageProps) {
  return ;
  // return <VendingMachineDetail machineId={params.machineId} />;
}