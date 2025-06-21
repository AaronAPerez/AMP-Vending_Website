// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface AdminUser {
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Get user info from API or storage
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F5F5F5]">Admin Dashboard</h1>
        <p className="text-[#A5ACAF] mt-2">
          Welcome back, {user?.email || 'Administrator'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Machines', value: '4', color: 'bg-blue-500' },
          { title: 'Active Locations', value: '12', color: 'bg-green-500' },
          { title: 'Monthly Revenue', value: '$2,450', color: 'bg-purple-500' },
          { title: 'Service Requests', value: '3', color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-[#111111] rounded-lg p-6 border border-[#333333]">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${stat.color} mr-3`}></div>
              <h3 className="text-sm font-medium text-[#A5ACAF]">{stat.title}</h3>
            </div>
            <p className="text-2xl font-bold text-[#F5F5F5] mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#111111] rounded-lg p-6 border border-[#333333]">
        <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Machine installed', location: 'Modesto Office Center', time: '2 hours ago' },
            { action: 'Service completed', location: 'Turlock Business Park', time: '1 day ago' },
            { action: 'New inquiry received', location: 'Stockton Medical Center', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="text-[#F5F5F5] font-medium">{activity.action}</p>
                <p className="text-[#A5ACAF] text-sm">{activity.location}</p>
              </div>
              <span className="text-[#A5ACAF] text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}