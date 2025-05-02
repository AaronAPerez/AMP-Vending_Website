import VendingMachinesLayout from '@/components/vending-machines/VendingMachinesLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VendingMachinesLayout>{children}</VendingMachinesLayout>;
}