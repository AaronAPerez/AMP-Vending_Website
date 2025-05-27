/**
 * ContactForm Component Unit Tests
 * 
 * Comprehensive test suite for the ContactForm component covering:
 * - Rendering and accessibility
 * - Form validation
 * - User interactions
 * - API integration
 * - Error handling
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact/ContactForm';
import { mockFetch } from '../../setup';

/**
 * Mock data for testing form submissions
 */
const mockFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  companyName: 'Test Company',
  message: 'This is a test message for vending machine inquiry.',
};

/**
 * Helper function to fill out the contact form
 */
const fillContactForm = async (user: ReturnType<typeof userEvent.setup>, data = mockFormData) => {
  await user.type(screen.getByLabelText(/first name/i), data.firstName);
  await user.type(screen.getByLabelText(/last name/i), data.lastName);
  await user.type(screen.getByLabelText(/email address/i), data.email);
  if (data.phone) {
    await user.type(screen.getByLabelText(/phone number/i), data.phone);
  }
  await user.type(screen.getByLabelText(/company name/i), data.companyName);
  if (data.message) {
    await user.type(screen.getByLabelText(/message/i), data.message);
  }
};

describe('ContactForm Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Rendering and Accessibility', () => {
    it('renders all form fields correctly', () => {
      render(<ContactForm />);
      
      // Check for required form fields
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      
      // Check for submit button
      expect(screen.getByRole('button', { name: /request information/i })).toBeInTheDocument();
    });

    it('has proper form accessibility attributes', () => {
      render(<ContactForm />);
      
      // Check for proper labeling
      const firstNameInput = screen.getByLabelText(/first name/i);
      expect(firstNameInput).toHaveAttribute('aria-required', 'true');
      
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const companyInput = screen.getByLabelText(/company name/i);
      expect(companyInput).toHaveAttribute('aria-required', 'true');
    });

    it('displays contact information correctly', () => {
      render(<ContactForm />);
      
      // Check for contact information display
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/(209) 403-5450/i)).toBeInTheDocument();
      expect(screen.getByText(/ampdesignandconsulting@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/modesto, ca/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('validates required fields on submission', async () => {
      render(<ContactForm />);
      
      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      render(<ContactForm />);
      
      // Fill form with invalid email
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email address/i), 'invalid-email');
      await user.type(screen.getByLabelText(/company name/i), 'Test Company');
      
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('clears validation errors when user types', async () => {
      render(<ContactForm />);
      
      // Trigger validation error
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      });
      
      // Start typing in first name field
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.type(firstNameInput, 'J');
      
      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form successfully with valid data', async () => {
      render(<ContactForm />);
      
      // Mock successful API response
      mockFetch({ success: true, message: 'Form submitted successfully' });
      
      // Fill out the form
      await fillContactForm(user);
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      // Check that fetch was called with correct data
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"firstName":"John"'),
        });
      });
    });

    it('handles API errors gracefully', async () => {
      render(<ContactForm />);
      
      // Mock API error response
      mockFetch({ error: 'Server error occurred' }, false);
      
      // Fill out and submit form
      await fillContactForm(user);
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      // Should handle error without crashing
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('disables submit button while submitting', async () => {
      render(<ContactForm />);
      
      // Mock a delayed response
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        }), 100))
      );
      
      await fillContactForm(user);
      const submitButton = screen.getByRole('button', { name: /request information/i });
      
      // Click submit
      await user.click(submitButton);
      
      // Button should show loading state
      await waitFor(() => {
        expect(screen.getByText(/sending.../i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
      });
    });

    it('resets form after successful submission', async () => {
      render(<ContactForm />);
      
      // Mock successful response
      mockFetch({ success: true });
      
      // Fill and submit form
      await fillContactForm(user);
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      // Wait for successful submission and form reset
      await waitFor(() => {
        const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
        expect(firstNameInput.value).toBe('');
      });
    });
  });

  describe('User Experience', () => {
    it('provides helpful placeholder text', () => {
      render(<ContactForm />);
      
      expect(screen.getByPlaceholderText(/your first name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your last name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/you@company.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your company/i)).toBeInTheDocument();
    });

    it('shows optional field indicators', () => {
      render(<ContactForm />);
      
      // Phone should be marked as optional
      expect(screen.getByText(/phone number/i).parentElement).toHaveTextContent(/optional/i);
      expect(screen.getByText(/message/i).parentElement).toHaveTextContent(/optional/i);
    });

    it('maintains focus management for accessibility', async () => {
      render(<ContactForm />);
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      
      // Focus first input
      firstNameInput.focus();
      expect(firstNameInput).toHaveFocus();
      
      // Tab to next input
      await user.tab();
      expect(lastNameInput).toHaveFocus();
    });
  });

  describe('Integration with Toast Notifications', () => {
    it('calls toast.success on successful submission', async () => {
      const { toast } = require('sonner');
      render(<ContactForm />);
      
      mockFetch({ success: true });
      
      await fillContactForm(user);
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          expect.stringContaining('Thank you')
        );
      });
    });

    it('calls toast.error on validation failure', async () => {
      const { toast } = require('sonner');
      render(<ContactForm />);
      
      // Submit empty form
      const submitButton = screen.getByRole('button', { name: /request information/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          expect.stringContaining('fill in all required fields')
        );
      });
    });
  });
});