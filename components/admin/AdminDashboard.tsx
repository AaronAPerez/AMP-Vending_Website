import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { AlertCircle, TrendingUp, BarChart3, DollarSign, Package, Map, Users, Settings, Truck, RefreshCw } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import Tabs from '../ui/Tabs';

const AdminDashboard = () => {
  // State for different data sets
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - would be replaced with real API calls
  const revenueData = [
    { name: 'Jan', revenue: 15200, profit: 4800, machines: 32 },
    { name: 'Feb', revenue: 16400, profit: 5100, machines: 34 },
    { name: 'Mar', revenue: 18300, profit: 5900, machines: 38 },
    { name: 'Apr', revenue: 17800, profit: 5600, machines: 38 },
    { name: 'May', revenue: 19500, profit: 6200, machines: 40 },
    { name: 'Jun', revenue: 21200, profit: 6900, machines: 43 },
    { name: 'Jul', revenue: 22800, profit: 7400, machines: 46 },
    { name: 'Aug', revenue: 24100, profit: 7900, machines: 48 },
    { name: 'Sep', revenue: 25600, profit: 8400, machines: 51 },
    { name: 'Oct', revenue: 27200, profit: 9100, machines: 54 },
    { name: 'Nov', revenue: 29100, profit: 9800, machines: 58 },
    { name: 'Dec', revenue: 30500, profit: 10300, machines: 61 }
  ];
  
  const locationData = [
    { name: 'First Student Inc.', machines: 8, revenue: 4200, growth: 12.3 },
    { name: 'Modesto Transit Center', machines: 6, revenue: 3800, growth: 8.7 },
    { name: 'Stanislaus Regional', machines: 5, revenue: 3200, growth: 11.2 },
    { name: 'Valley Bus Depot', machines: 4, revenue: 2800, growth: 6.5 },
    { name: 'Newman Transit', machines: 4, revenue: 2400, growth: -2.1 },
    { name: 'Other Locations', machines: 34, revenue: 14100, growth: 9.3 }
  ];
  
  const productCategoryData = [
    { name: 'Beverages', value: 34 },
    { name: 'Snacks', value: 28 },
    { name: 'Candy', value: 18 },
    { name: 'Healthy Options', value: 12 },
    { name: 'Fresh Food', value: 8 }
  ];

  const serviceRequestsData = [
    { name: 'Restocking', count: 42 },
    { name: 'Machine Repairs', count: 12 },
    { name: 'Payment Issues', count: 8 },
    { name: 'Product Requests', count: 15 },
    { name: 'General Inquiries', count: 23 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Simulated data loading effect
  useEffect(() => {
    if (timeframe === 'week') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [timeframe]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Calculate summary metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);
  const totalMachines = revenueData[revenueData.length - 1].machines;
  const averageRevenuePerMachine = Math.round(totalRevenue / 12 / totalMachines);
  
  // Calculate month-over-month growth
  const lastMonthRevenue = revenueData[revenueData.length - 1].revenue;
  const previousMonthRevenue = revenueData[revenueData.length - 2].revenue;
  const revenueGrowth = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AMP Vending Admin Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-md shadow-sm p-1">
            <select 
              className="text-sm border-0 focus:ring-0"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <button className="text-gray-500 hover:text-gray-700">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</h3>
                <p className={`text-xs mt-1 ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}% from last month
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <DollarSign size={24} className="text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Net Profit</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</h3>
                <p className="text-xs mt-1 text-green-600">
                  {Math.round(totalProfit/totalRevenue*100)}% profit margin
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Machines</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalMachines}</h3>
                <p className="text-xs mt-1 text-green-600">
                  +3 added this month
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Package size={24} className="text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Revenue/Machine</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(averageRevenuePerMachine)}</h3>
                <p className="text-xs mt-1 text-blue-600">
                  Monthly average
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <BarChart3 size={24} className="text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="service">Service Requests</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Profit Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Locations and Product Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={locationData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="revenue" fill="#3b82f6" name="Monthly Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={productCategoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Service Requests Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={serviceRequestsData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Locations Tab */}
        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Location Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machines</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Revenue</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {locationData.map((location, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.machines}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(location.revenue)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${location.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {location.growth >= 0 ? '+' : ''}{location.growth}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would be implemented similarly */}
        <TabsContent value="machines">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">Machine monitoring and management interface would be shown here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">Detailed sales analytics would be shown here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="service">
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">Service request management interface would be shown here.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Truck size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Schedule Restocking</h3>
                <p className="text-sm text-gray-500">8 machines need attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-4">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Service Alerts</h3>
                <p className="text-sm text-gray-500">3 machines reporting issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Settings size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">System Settings</h3>
                <p className="text-sm text-gray-500">Configure dashboard preferences</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;