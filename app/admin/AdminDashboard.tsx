import React from 'react';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import AdminLayout from './AdminLayout';

/**
 * Admin Dashboard component displays key metrics and data for administrators
 */
const AdminDashboard = () => {
  // Sample data - would typically come from an API or other data source
  const stats = [
    { label: 'Total Machines', value: '128', change: '+12.5%', trend: 'up' },
    { label: 'Active Clients', value: '24', change: '+4.2%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$32,450', change: '+8.7%', trend: 'up' },
    { label: 'Service Requests', value: '5', change: '-15.3%', trend: 'down' },
  ];

  const recentClients = [
    { id: 1, name: 'First Student Inc.', location: 'Newman, CA', machines: 4, added: '2025-03-28' },
    { id: 2, name: 'Stanislaus Regional Transit', location: 'Modesto, CA', machines: 6, added: '2025-02-11' },
    { id: 3, name: 'Valley Transportation', location: 'Stockton, CA', machines: 3, added: '2025-01-15' },
  ];

  const recentActivities = [
    { id: 1, type: 'machine-added', client: 'First Student Inc.', location: 'Newman, CA', date: '2025-03-30' },
    { id: 2, type: 'maintenance', client: 'Stanislaus Regional Transit', location: 'Modesto, CA', date: '2025-03-29' },
    { id: 3, type: 'contract-signed', client: 'First Student Inc.', location: 'Newman, CA', date: '2025-03-28' },
    { id: 4, type: 'revenue-shared', client: 'Valley Transportation', location: 'Stockton, CA', date: '2025-03-25' },
    { id: 5, type: 'stock-replenished', client: 'Stanislaus Regional Transit', location: 'Modesto, CA', date: '2025-03-23' },
  ];

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'machine-added':
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'maintenance':
        return (
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'contract-signed':
        return (
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'revenue-shared':
        return (
          <div className="p-2 rounded-full bg-purple-100 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'stock-replenished':
        return (
          <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  // Helper function for activity descriptions
  const getActivityDescription = (activity: typeof recentActivities[0]) => {
    switch (activity.type) {
      case 'machine-added':
        return `New vending machine added at ${activity.client} (${activity.location})`;
      case 'maintenance':
        return `Maintenance performed at ${activity.client} (${activity.location})`;
      case 'contract-signed':
        return `New contract signed with ${activity.client} (${activity.location})`;
      case 'revenue-shared':
        return `Revenue shared with ${activity.client} (${activity.location})`;
      case 'stock-replenished':
        return `Machines restocked at ${activity.client} (${activity.location})`;
      default:
        return `Activity at ${activity.client} (${activity.location})`;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's an overview of your vending machine business.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</div>
            </div>
            {/* Decorative element */}
            <div className={`h-1 w-full ${
              stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Clients</h2>
            <Link href="/admin/clients" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <Card className="outlined">
            <ul className="divide-y divide-gray-200">
              {recentClients.map((client) => (
                <li key={client.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{client.machines} machines</div>
                      <div className="text-xs text-gray-500">Added {formatDate(client.added)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {recentClients.length === 0 && (
              <div className="p-4 text-center text-gray-500">No clients found</div>
            )}
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <Card className="outlined">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {getActivityDescription(activity)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(activity.date)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {recentActivities.length === 0 && (
              <div className="p-4 text-center text-gray-500">No recent activities</div>
            )}
          </Card>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
          <div className="flex items-center space-x-2">
            <select className="rounded-md border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
              <option>Year to date</option>
            </select>
          </div>
        </div>
        <Card className="h-80 p-4 flex items-center justify-center elevated">
          {/* Placeholder for chart - would be actual chart component in production */}
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p className="text-lg font-medium text-gray-900">Revenue Chart</p>
            <p className="text-sm">Data visualization would appear here</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'Add New Client',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              ),
              description: 'Register a new business as a client',
              link: '/admin/clients/new'
            },
            {
              title: 'Add New Machine',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              ),
              description: 'Register a new vending machine',
              link: '/admin/machines/new'
            },
            {
              title: 'View Reports',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              description: 'View analytics and performance reports',
              link: '/admin/reports'
            }
          ].map((action, index) => (
            <Link key={index} href={action.link}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer outlined">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3 text-blue-600">
                      {action.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{action.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;