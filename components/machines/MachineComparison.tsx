'use client';

import React from 'react';

// Machine comparison component
const MachineComparison = () => {
  return (
    <div className="mt-12 border-t border-[#a4acac] pt-12">
      <h3 className="text-2xl font-bold text-white mb-6">Machine Models Comparison</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#a4acac]">
              <th className="py-4 px-4 text-[#FD5A1E] font-medium">Feature</th>
              <th className="py-4 px-4 text-[#FD5A1E] font-medium">Standard Model</th>
              <th className="py-4 px-4 text-[#FD5A1E] font-medium">Premium Model</th>
              <th className="py-4 px-4 text-[#FD5A1E] font-medium">Combo Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#4d4d4d]">
              <td className="py-3 px-4 text-white">Display</td>
              <td className="py-3 px-4 text-[#A5ACAF]">15&quot; Touchscreen</td>
              <td className="py-3 px-4 text-[#A5ACAF]">21.5&quot; HD Touchscreen</td>
              <td className="py-3 px-4 text-[#A5ACAF]">21.5&quot; HD Touchscreen</td>
            </tr>
            <tr className="border-b border-[#4d4d4d]">
              <td className="py-3 px-4 text-white">Capacity</td>
              <td className="py-3 px-4 text-[#A5ACAF]">35+ Selections</td>
              <td className="py-3 px-4 text-[#A5ACAF]">50+ Selections</td>
              <td className="py-3 px-4 text-[#A5ACAF]">40+ Snacks, 10 Beverages</td>
            </tr>
            <tr className="border-b border-[#4d4d4d]">
              <td className="py-3 px-4 text-white">Payment Options</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Card & Cash</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Card, Cash & Mobile</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Card, Cash & Mobile</td>
            </tr>
            <tr className="border-b border-[#4d4d4d]">
              <td className="py-3 px-4 text-white">Remote Monitoring</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Basic</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Advanced IoT</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Advanced IoT</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-white">Best For</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Small Offices</td>
              <td className="py-3 px-4 text-[#A5ACAF]">Medium-Large Offices</td>
              <td className="py-3 px-4 text-[#A5ACAF]">All-in-one Solution</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineComparison;