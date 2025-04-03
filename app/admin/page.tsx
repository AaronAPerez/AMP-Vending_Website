
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Admin Dashboard | AMP Vending',
  description: 'Administrative dashboard for managing vending machines, clients, and business operations',
};

export default function AdminPage() {
  return <AdminDashboard />;
}