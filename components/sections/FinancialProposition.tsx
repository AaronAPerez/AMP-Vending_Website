import React from 'react';
import Card from '../ui/Card';

/**
 * FinancialProposition section component that outlines the financial benefits
 * of the vending machine installation for First Student Inc.
 */
const FinancialProposition = () => {
  // Financial benefit items
  const financialBenefits = [
    {
      title: 'Revenue Sharing',
      description: 'Building owners receive a 5% share of gross revenue from each vending machine',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'No Upfront Costs',
      description: 'Our company covers all expenses related to machine installation, maintenance, and stock replenishment',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Operational Cost Coverage',
      description: 'All operational expenses, including machine upkeep, restocking, and repairs, are fully absorbed by our company',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="financial-proposition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Financial Proposition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our vending machine solution offers a compelling financial proposition for First Student Inc., combining cost-free implementation with quality services.
          </p>
        </div>

        {/* Financial Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {financialBenefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        <Card title="Cost-Benefit Analysis" className="mb-16">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Benefit Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traditional Approach</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMP Design Solution</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Initial Equipment Cost</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$2,000 - $5,000 per machine</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-medium">$0 (Fully covered)</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Maintenance & Repairs</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$100 - $300 monthly</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-medium">$0 (Fully covered)</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Stocking & Inventory</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Staff time + product cost</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-medium">$0 (Fully managed)</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Revenue Share</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">All profits (minus expenses)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-medium">5% of gross revenue, hassle-free</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Revenue Scenario Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Risk, Passive Income</h3>
          <p className="text-gray-700 mb-6">
            By partnering with us, First Student Inc. gains a new stream of passive income without any capital outlay or ongoing responsibilities. Our financial model aligns our interests with those of your workplace.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">
              The combination of revenue sharing, zero upfront costs, and hands-off operations makes our vending solution an attractive proposition for enhancing workplace amenities while contributing positively to the bottom line.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialProposition;