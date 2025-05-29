import { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={props.id} className="block text-[#F5F5F5] mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`rounded-md bg-[#000000] border ${
            error ? 'border-red-500' : 'border-[#a4acac]'
          } px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] ${
            fullWidth ? 'w-full' : ''
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;