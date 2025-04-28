import { ContactFormData, FormErrors } from './formTypes';

export const validateForm = (data: Partial<ContactFormData>): FormErrors => {
  const errors: FormErrors = {};
  
  // Required fields validation
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data.phone)) {
    errors.phone = 'Invalid phone number';
  }
  
  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required';
  }
  
  if (!data.employeeCount) {
    errors.employeeCount = 'Please select employee count';
  }
  
  if (!data.businessType) {
    errors.businessType = 'Please select business type';
  }
  
  if (!data.preferredContact) {
    errors.preferredContact = 'Please select preferred contact method';
  }
  
  // Optional field validation
  if (data.message && data.message.length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }
  
  return errors;
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length >= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length >= 3) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }
  
  return cleaned;
};