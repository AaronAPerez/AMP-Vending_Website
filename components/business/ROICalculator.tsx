import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'; 


const ROICalculator = () => {
  // State for user inputs
  const [inputs, setInputs] = useState({
    machineCount: 5,
    averageRevenuePerMachine: 500,
    productCostPercentage: 50,
    maintenanceCostPerMachine: 50,
    clientRevenueSharePercentage: 5,
    monthsToProject: 12
  });

  // State for calculated results
  const [results, setResults] = useState({
    totalRevenue: 0,
    totalProductCost: 0,
    totalMaintenanceCost: 0,
    totalClientShare: 0,
    totalProfit: 0,
    profitMargin: 0,
    monthlyProfit: 0,
    annualProfit: 0
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: parseFloat(value)
    });
  };

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const {
      machineCount,
      averageRevenuePerMachine,
      productCostPercentage,
      maintenanceCostPerMachine,
      clientRevenueSharePercentage,
      monthsToProject
    } = inputs;

    // Calculate monthly values
    const monthlyRevenue = machineCount * averageRevenuePerMachine;
    const monthlyProductCost = monthlyRevenue * (productCostPercentage / 100);
    const monthlyMaintenanceCost = machineCount * maintenanceCostPerMachine;
    const monthlyClientShare = monthlyRevenue * (clientRevenueSharePercentage / 100);
    const monthlyProfit = monthlyRevenue - monthlyProductCost - monthlyMaintenanceCost - monthlyClientShare;

    // Project over specified months
    const totalRevenue = monthlyRevenue * monthsToProject;
    const totalProductCost = monthlyProductCost * monthsToProject;
    const totalMaintenanceCost = monthlyMaintenanceCost * monthsToProject;
    const totalClientShare = monthlyClientShare * monthsToProject;
    const totalProfit = monthlyProfit * monthsToProject;
    
    // Calculate profit margin
    const profitMargin = monthlyProfit / monthlyRevenue * 100;
    
    // Update results
    setResults({
      totalRevenue,
      totalProductCost,
      totalMaintenanceCost,
      totalClientShare,
      totalProfit,
      profitMargin,
      monthlyProfit,
      annualProfit: monthlyProfit * 12
    });
  }, [inputs]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="text-center text-blue-800">Vending Business ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2">
          {/* Inputs Section */}
          <div className="p-6 border-r border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Business Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Machines
                </label>
                <input
                  type="number"
                  name="machineCount"
                  value={inputs.machineCount}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Monthly Revenue Per Machine ($)
                </label>
                <input
                  type="number"
                  name="averageRevenuePerMachine"
                  value={inputs.averageRevenuePerMachine}
                  onChange={handleInputChange}
                  min="100"
                  max="2000"
                  step="50"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Cost (% of Revenue)
                </label>
                <input
                  type="number"
                  name="productCostPercentage"
                  value={inputs.productCostPercentage}
                  onChange={handleInputChange}
                  min="30"
                  max="70"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Maintenance Cost Per Machine ($)
                </label>
                <input
                  type="number"
                  name="maintenanceCostPerMachine"
                  value={inputs.maintenanceCostPerMachine}
                  onChange={handleInputChange}
                  min="0"
                  max="200"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Revenue Share (%)
                </label>
                <input
                  type="number"
                  name="clientRevenueSharePercentage"
                  value={inputs.clientRevenueSharePercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Projection Period (Months)
                </label>
                <input
                  type="number"
                  name="monthsToProject"
                  value={inputs.monthsToProject}
                  onChange={handleInputChange}
                  min="1"
                  max="60"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Projected Results</h3>
            
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-700 mb-1">Monthly Profit</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.monthlyProfit)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-700 mb-1">Annual Profit</p>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(results.annualProfit)}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Total for {inputs.monthsToProject} month period:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="text-sm">Total Revenue:</div>
                  <div className="text-sm font-semibold text-right">{formatCurrency(results.totalRevenue)}</div>
                  
                  <div className="text-sm">Product Cost:</div>
                  <div className="text-sm font-semibold text-right text-red-600">-{formatCurrency(results.totalProductCost)}</div>
                  
                  <div className="text-sm">Maintenance Cost:</div>
                  <div className="text-sm font-semibold text-right text-red-600">-{formatCurrency(results.totalMaintenanceCost)}</div>
                  
                  <div className="text-sm">Client Revenue Share:</div>
                  <div className="text-sm font-semibold text-right text-red-600">-{formatCurrency(results.totalClientShare)}</div>
                  
                  <div className="text-base pt-2 border-t border-gray-300 font-semibold">Total Profit:</div>
                  <div className="text-base pt-2 border-t border-gray-300 font-bold text-right text-green-600">{formatCurrency(results.totalProfit)}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Profit Margin:</span>
                <span className="text-sm font-semibold">{results.profitMargin.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    results.profitMargin < 15 ? 'bg-red-500' : 
                    results.profitMargin < 25 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${Math.min(results.profitMargin, 50) * 2}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 italic">
                This calculator provides estimated projections based on industry averages. 
                Actual results may vary based on location, product selection, and operational factors.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;