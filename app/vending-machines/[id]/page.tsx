import { Metadata } from 'next';
import VendingMachineDetail from '@/components/vending/VendingMachineDetail';

// Props type follows Next.js App Router pattern
interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function VendingMachineDetailPage({ params }: PageProps) {
  const { id } = params;
  
  // Note: Make this component async even if you don't need await 
  // This helps Next.js understand the correct type signature
  
  return <VendingMachineDetail id={id} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  
  return {
    title: `Vending Machine ${id} | AMP Vending`,
    description: 'Detailed information about this vending machine model and its features',
  };
}