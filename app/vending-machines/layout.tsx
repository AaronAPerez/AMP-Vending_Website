import VendingMachinesLayout from '@/components/machines/VendingMachinesLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VendingMachinesLayout>{children}</VendingMachinesLayout>;
}