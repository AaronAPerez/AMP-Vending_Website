import { useCallback } from 'react';

interface UseEmailOptions {
  subject?: string;
  body?: string;
  onError?: (error: Error) => void;
}

const useEmail = (email: string, options: UseEmailOptions = {}) => {
  const { subject, body, onError } = options;

  const sendEmail = useCallback(() => {
    try {
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      
      const mailtoUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;
      
      // Create a temporary anchor element to handle the mailto
      const anchor = document.createElement('a');
      anchor.href = mailtoUrl;
      anchor.rel = 'noopener noreferrer';
      
      // Trigger the click
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        console.error('Failed to open email client:', error);
      }
    }
  }, [email, subject, body, onError]);

  return { sendEmail };
};

