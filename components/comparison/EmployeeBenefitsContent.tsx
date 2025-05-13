import React from 'react'


/**
 * Employee Benefits Content Component
 */
const EmployeeBenefitsContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="text-[#F5F5F5]">
        Premium vending machines enhance workplace satisfaction through:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-[#4d4d4d]/20 p-3 rounded-lg">
          <h4 className="font-semibold text-[#FD5A1E] mb-2">Time Efficiency</h4>
          <p className="text-sm text-[#A5ACAF]">
            Employees save valuable break time by having refreshments available on-site.
          </p>
        </div>
        
        <div className="bg-[#4d4d4d]/20 p-3 rounded-lg">
          <h4 className="font-semibold text-[#FD5A1E] mb-2">Personalized Options</h4>
          <p className="text-sm text-[#A5ACAF]">
            Customized product selection based on employee preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBenefitsContent