
import { Metadata } from 'next';
import AdminDashboard from './AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | AMP Vending',
  description: 'Administrative dashboard for managing vending machines, clients, and business operations',
};

export default function AdminPage() {
  return <AdminDashboard />;
}