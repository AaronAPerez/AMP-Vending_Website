// app/vending-machines/layout.tsx
import VendingMachinesLayout from '@/components/VendingMachinesLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VendingMachinesLayout>{children}</VendingMachinesLayout>;
}