import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}

const FeatureItem = ({
  icon,
  title,
  description,
  highlighted = false
}: FeatureItemProps) => {
  return (
    <div className={`p-4 rounded-lg ${highlighted ? 'bg-[#4d4d4d]/30' : 'bg-[#4d4d4d]/10'}`}>
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full mr-3 ${highlighted ? 'bg-[#FD5A1E]/20 text-[#FD5A1E]' : 'bg-[#4d4d4d]/20 text-[#A5ACAF]'}`}>
          {icon}
        </div>
        <h4 className={`font-medium ${highlighted ? 'text-[#FD5A1E]' : 'text-[#F5F5F5]'}`}>{title}</h4>
      </div>
      <p className="text-[#A5ACAF] text-sm ml-10">{description}</p>
    </div>
  );
};

export default FeatureItem;