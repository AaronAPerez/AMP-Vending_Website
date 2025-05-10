import React from 'react';

const EnhancedHighlight = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#000000] border border-[#FD5A1E]/20 p-6 mb-10">
      <div 
        className="absolute inset-0 bg-[#FD5A1E]/5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23FD5A1E' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="text-[#F5F5F5]">Elevate Your </span>
          <span className="text-[#FD5A1E]">Work Environment</span>
        </h2>
        
        <p className="text-[#A5ACAF] text-center max-w-3xl mx-auto">
          Premium vending solutions transform your workplace with zero cost installation and maintenance-free operation. Experience our 21.5" touchscreen technology with customized product selection.
        </p>
      </div>
    </div>
  );
};

export default EnhancedHighlight;