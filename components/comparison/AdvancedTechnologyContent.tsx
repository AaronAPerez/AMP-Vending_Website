import Image from 'next/image';
import React from 'react'


/**
 * Advanced Technology Content Component
 */
const AdvancedTechnologyContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-[#F5F5F5]">Cutting-Edge Features</h4>
          <ul className="list-disc pl-5 text-[#A5ACAF] space-y-1 text-sm">
            <li>21.5&quot; HD Touchscreen Interface</li>
            <li>Remote Inventory Monitoring</li>
            <li>Contactless Payment Options</li>
            <li>Digital Product Information</li>
            <li>Energy-Efficient Operations</li>
          </ul>
        </div>
        
        <div className="bg-[#000000]/40 rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/images/vending-machines/touchscreen.jpg"
              alt="Modern vending machine touchscreen interface"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTechnologyContent