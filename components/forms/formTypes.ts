export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
    placeholder?: string;
    required?: boolean;
    options?: Array<{
      value: string;
      label: string;
    }>;
    validation?: {
      pattern?: RegExp;
      message?: string;
      minLength?: number;
      maxLength?: number;
    };
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    employeeCount: string;
    businessType: string;
    message: string;
    preferredContact: string;
    interests: string[];
    hearAboutUs: string;
    propertyType?: string;
    currentVending?: boolean;
    bestTimeToCall?: string;
    urgency?: string;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }