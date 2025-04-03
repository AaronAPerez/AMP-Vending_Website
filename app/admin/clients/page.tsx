import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clients | AMP Vending Admin',
  description: 'Manage your vending machine clients and locations',
};

/**
 * Admin clients management page
 */
const AdminClientsPage = () => {
  // Sample client data - would come from API in production
  const clients = [
    { 
      id: 1, 
      name: 'First Student Inc.', 
      location: 'Newman, CA', 
      contact: 'Calisha Daniels',
      phone: '(209) 235-8973',
      email: 'calisha.daniels@firstgroup.com',
      machines: 4, 
      added: '2025-03-28',
      revenue: 1234.56,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Stanislaus Regional Transit', 
      location: 'Modesto, CA', 
      contact: 'Adam Barth',
      phone: '(209) 555-1234',
      email: 'abarth@stanrta.org',
      machines: 6, 
      added: '2025-02-11',
      revenue: 2345.67,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Valley Transportation', 
      location: 'Stockton, CA', 
      contact: 'Maria Rodriguez',
      phone: '(209) 555-7890',
      email: 'mrodriguez@valleytransit.org',
      machines: 3, 
      added: '2025-01-15',
      revenue: 987.65,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Central Valley Schools', 
      location: 'Turlock, CA', 
      contact: 'James Wilson',
      phone: '(209) 555-4567',
      email: 'jwilson@cvschools.org',
      machines: 8, 
      added: '2024-12-10',
      revenue: 3456.78,
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Riverbank Municipal Center', 
      location: 'Riverbank, CA', 
      contact: 'Sarah Johnson',
      phone: '(209) 555-8901',
      email: 'sjohnson@riverbank.gov',
      machines: 2, 
      added: '2024-11-22',
      revenue: 765.43,
      status: 'pending'
    },
  ];

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="mt-1 text-gray-600">Manage your vending machine clients and locations.</p>
        </div>
        <Link 
          href="/admin/clients/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg 
            className="-ml-1 mr-2 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Client
        </Link>
      </div>

      {/* Filters and search */}
      <Card className="mb-6" variant="outlined">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search clients..."
              />
            </div>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
            >
              Apply Filters
            </button>
          </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="name">Name</option>
                <option value="machines">Number of Machines</option>
                <option value="revenue">Revenue</option>
                <option value="added">Date Added</option>
              </select>
            </div>
            </div>
            </div>
            </Card>
            </AdminLayout>
  )
};