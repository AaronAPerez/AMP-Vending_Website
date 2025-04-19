// toast-config.tsx
import { Toaster } from 'react-hot-toast';

export const ToastConfig = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      // General styles for all toasts
      style: {
        background: '#4d4d4d',
        color: '#F5F5F5',
        border: '1px solid #a4acac',
      },
      // Specific styles for success toasts
      success: {
        style: {
            background: 'green',
          border: '1px solid #FD5A1E',
        },
        iconTheme: {
          primary: '#FD5A1E',
          secondary: '#F5F5F5',
        },
      },
      // Specific styles for error toasts
      error: {
        style: {
            background: 'red',
          border: '1px solid #ef4444',
        },
      },
      // Duration for all toasts
      duration: 5000,
    }}
  />
);

export default ToastConfig;