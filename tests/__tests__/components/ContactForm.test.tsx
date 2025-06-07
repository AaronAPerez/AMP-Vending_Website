// /**
//  * ContactForm Component Unit Tests
//  * 
//  * Comprehensive test suite for the ContactForm component covering:
//  * - Rendering and accessibility
//  * - Form validation
//  * - User interactions
//  * - API integration
//  * - Error handling
//  */

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import ContactForm from '@/components/contact/ContactForm';
// import { mockFetch } from '../../setup';
// import { describe, beforeEach, it, expect } from '@jest/globals';
// import '@testing-library/jest-dom/extend-expect';
// import '@testing-library/jest-dom';

// /**
//  * Mock data for testing form submissions
//  */
// const mockFormData = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   phone: '(555) 123-4567',
//   companyName: 'Test Company',
//   message: 'This is a test message for vending machine inquiry.',
// };

// /**
//  * Helper function to fill out the contact form
//  */
// const fillContactForm = async (user: ReturnType<typeof userEvent.setup>, data = mockFormData) => {
//   await user.type(screen.getByLabelText(/first name/i), data.firstName);
//   await user.type(screen.getByLabelText(/last name/i), data.lastName);
//   await user.type(screen.getByLabelText(/email address/i), data.email);
//   if (data.phone) {
//     await user.type(screen.getByLabelText(/phone number/i), data.phone);
//   }
//   await user.type(screen.getByLabelText(/company name/i), data.companyName);
//   if (data.message) {
//     await user.type(screen.getByLabelText(/message/i), data.message);
//   }
// };

// describe('ContactForm Component', () => {
//   let user: ReturnType<typeof userEvent.setup>;

//   beforeEach(() => {
//     user = userEvent.setup();
//   });

//   describe('Rendering and Accessibility', () => {
//     it('renders all form fields correctly', () => {
//       render(<ContactForm />);

//       // Check for required form fields
//       expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

//       // Check for submit button
//       expect(screen.getByRole('button', { name: /request information/i })).toBeInTheDocument();
//     });

//     it('has proper form accessibility attributes', () => {
//       render(<ContactForm />);

//       // Check for proper labeling
//       const firstNameInput = screen.getByLabelText(/first name/i);
//       expect(firstNameInput).toHaveAttribute('aria-required', 'true');

//       const emailInput = screen.getByLabelText(/email address/i);
//       expect(emailInput).toHaveAttribute('aria-required', 'true');
//       expect(emailInput).toHaveAttribute('type', 'email');

//       const companyInput = screen.getByLabelText(/company name/i);
//       expect(companyInput).toHaveAttribute('aria-required', 'true');
//     });

//     it('displays contact information correctly', () => {
//       render(<ContactForm />);

//       // Check for contact information display
//       expect(screen.getByText(/contact information/i)).toBeInTheDocument();
//       expect(screen.getByText(/(209) 403-5450/i)).toBeInTheDocument();
//       expect(screen.getByText(/ampdesignandconsulting@gmail.com/i)).toBeInTheDocument();
//       expect(screen.getByText(/modesto, ca/i)).toBeInTheDocument();
//     });
//   });

//   describe('Form Validation', () => {
//     it('validates required fields on submission', async () => {
//       render(<ContactForm />);

//       // Try to submit empty form
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       // Check for validation errors
//       await waitFor(() => {
//         expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
//         expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
//         expect(screen.getByText(/email is required/i)).toBeInTheDocument();
//         expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
//       });
//     });

//     it('validates email format', async () => {
//       render(<ContactForm />);

//       // Fill form with invalid email
//       await user.type(screen.getByLabelText(/first name/i), 'John');
//       await user.type(screen.getByLabelText(/last name/i), 'Doe');
//       await user.type(screen.getByLabelText(/email address/i), 'invalid-email');
//       await user.type(screen.getByLabelText(/company name/i), 'Test Company');

//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
//       });
//     });

//     it('clears validation errors when user types', async () => {
//       render(<ContactForm />);

//       // Trigger validation error
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
//       });

//       // Start typing in first name field
//       const firstNameInput = screen.getByLabelText(/first name/i);
//       await user.type(firstNameInput, 'J');

//       // Error should be cleared
//       await waitFor(() => {
//         expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
//       });
//     });
//   });

//   describe('Form Submission', () => {
//     it('submits form successfully with valid data', async () => {
//       render(<ContactForm />);

//       // Mock successful API response
//       mockFetch({ success: true, message: 'Form submitted successfully' });

//       // Fill out the form
//       await fillContactForm(user);

//       // Submit the form
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       // Check that fetch was called with correct data
//       await waitFor(() => {
//         expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: expect.stringContaining('"firstName":"John"'),
//         });
//       });
//     });

//     it('handles API errors gracefully', async () => {
//       render(<ContactForm />);

//       // Mock API error response
//       mockFetch({ error: 'Server error occurred' }, false);

//       // Fill out and submit form
//       await fillContactForm(user);
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       // Should handle error without crashing
//       await waitFor(() => {
//         expect(global.fetch).toHaveBeenCalled();
//       });
//     });

//     it('disables submit button while submitting', async () => {
//       render(<ContactForm />);

//       // Mock a delayed response
//       (global.fetch as jest.Mock).mockImplementation(
//         () => new Promise(resolve => setTimeout(() => resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true })
//         }), 100))
//       );

//       await fillContactForm(user);
//       const submitButton = screen.getByRole('button', { name: /request information/i });

//       // Click submit
//       await user.click(submitButton);

//       // Button should show loading state
//       await waitFor(() => {
//         expect(screen.getByText(/sending.../i)).toBeInTheDocument();
//         expect(submitButton).toBeDisabled();
//       });
//     });

//     it('resets form after successful submission', async () => {
//       render(<ContactForm />);

//       // Mock successful response
//       mockFetch({ success: true });

//       // Fill and submit form
//       await fillContactForm(user);
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       // Wait for successful submission and form reset
//       await waitFor(() => {
//         const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
//         expect(firstNameInput.value).toBe('');
//       });
//     });
//   });

//   describe('User Experience', () => {
//     it('provides helpful placeholder text', () => {
//       render(<ContactForm />);

//       expect(screen.getByPlaceholderText(/your first name/i)).toBeInTheDocument();
//       expect(screen.getByPlaceholderText(/your last name/i)).toBeInTheDocument();
//       expect(screen.getByPlaceholderText(/you@company.com/i)).toBeInTheDocument();
//       expect(screen.getByPlaceholderText(/your company/i)).toBeInTheDocument();
//     });

//     it('shows optional field indicators', () => {
//       render(<ContactForm />);

//       // Phone should be marked as optional
//       expect(screen.getByText(/phone number/i).parentElement).toHaveTextContent(/optional/i);
//       expect(screen.getByText(/message/i).parentElement).toHaveTextContent(/optional/i);
//     });

//     it('maintains focus management for accessibility', async () => {
//       render(<ContactForm />);

//       const firstNameInput = screen.getByLabelText(/first name/i);
//       const lastNameInput = screen.getByLabelText(/last name/i);

//       // Focus first input
//       firstNameInput.focus();
//       expect(firstNameInput).toHaveFocus();

//       // Tab to next input
//       await user.tab();
//       expect(lastNameInput).toHaveFocus();
//     });
//   });

//   describe('Integration with Toast Notifications', () => {
//     it('calls toast.success on successful submission', async () => {
//       const { toast } = require('sonner');
//       render(<ContactForm />);

//       mockFetch({ success: true });

//       await fillContactForm(user);
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(toast.success).toHaveBeenCalledWith(
//           expect.stringContaining('Thank you')
//         );
//       });
//     });

//     it('calls toast.error on validation failure', async () => {
//       const { toast } = require('sonner');
//       render(<ContactForm />);

//       // Submit empty form
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(toast.error).toHaveBeenCalledWith(
//           expect.stringContaining('fill in all required fields')
//         );
//       });
//     });
//   });
//   describe('ContactForm - Additional Integration and UI Tests', () => {
//     it('renders contact information with correct links and text', () => {
//       render(<ContactForm />);
//       // Phone
//       const phoneLink = screen.getByRole('link', { name: /call us at \(209\) 403-5450/i });
//       expect(phoneLink).toHaveAttribute('href', 'tel:+12094035450');
//       expect(screen.getByText('(209) 403-5450')).toBeInTheDocument();
//       // Email
//       const emailLink = screen.getByRole('link', { name: /email us at ampdesignandconsulting@gmail.com/i });
//       expect(emailLink).toHaveAttribute('href', 'mailto:ampdesignandconsulting@gmail.com');
//       expect(screen.getByText('ampdesignandconsulting@gmail.com')).toBeInTheDocument();
//       // Location
//       expect(screen.getByText(/modesto, ca 95354/i)).toBeInTheDocument();
//     });

//     it('renders business hours and value proposition', () => {
//       render(<ContactForm />);
//       expect(screen.getByText(/business hours/i)).toBeInTheDocument();
//       expect(screen.getByText(/monday - friday: 8am - 8pm/i)).toBeInTheDocument();
//       expect(screen.getByText(/professional support available/i)).toBeInTheDocument();
//       expect(screen.getByText(/why choose amp vending/i)).toBeInTheDocument();
//       expect(screen.getByText(/21.5" hd touchscreen technology/i)).toBeInTheDocument();
//       expect(screen.getByText(/contactless payment systems/i)).toBeInTheDocument();
//       expect(screen.getByText(/professional installation & maintenance/i)).toBeInTheDocument();
//     });

//     it('shows validation error for missing required fields', async () => {
//       render(<ContactForm />);
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await userEvent.click(submitButton);
//       expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/email is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
//     });

//     it('clears validation error when user types in a field', async () => {
//       render(<ContactForm />);
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await userEvent.click(submitButton);
//       const firstNameInput = screen.getByLabelText(/first name/i);
//       await userEvent.type(firstNameInput, 'A');
//       await waitFor(() => {
//         expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
//       });
//     });

//     it('disables submit button while submitting', async () => {
//       render(<ContactForm />);
//       // Mock fetch to delay
//       global.fetch = jest.fn(() =>
//         new Promise(resolve => setTimeout(() => resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true })
//         }), 100))
//       ) as jest.Mock;
//       await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//       await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//       await userEvent.type(screen.getByLabelText(/email address/i), 'john@doe.com');
//       await userEvent.type(screen.getByLabelText(/company name/i), 'Company');
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await userEvent.click(submitButton);
//       expect(submitButton).toBeDisabled();
//       expect(screen.getByText(/sending.../i)).toBeInTheDocument();
//     });

//     it('shows server-side validation errors if returned', async () => {
//       render(<ContactForm />);
//       // Mock fetch to return error
//       global.fetch = jest.fn(() =>
//         Promise.resolve({
//           ok: false,
//           json: () => Promise.resolve({
//             error: 'Validation failed',
//             details: {
//               email: { _errors: ['Invalid email address'] }
//             }
//           })
//         })
//       ) as jest.Mock;
//       await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//       await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//       await userEvent.type(screen.getByLabelText(/email address/i), 'bad-email');
//       await userEvent.type(screen.getByLabelText(/company name/i), 'Company');
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await userEvent.click(submitButton);
//       expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
//     });

//     it('resets form after successful submission', async () => {
//       render(<ContactForm />);
//       global.fetch = jest.fn(() =>
//         Promise.resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true })
//         })
//       ) as jest.Mock;
//       await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//       await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//       await userEvent.type(screen.getByLabelText(/email address/i), 'john@doe.com');
//       await userEvent.type(screen.getByLabelText(/company name/i), 'Company');
//       const submitButton = screen.getByRole('button', { name: /request information/i });
//       await userEvent.click(submitButton);
//       await waitFor(() => {
//         expect((screen.getByLabelText(/first name/i) as HTMLInputElement).value).toBe('');
//         expect((screen.getByLabelText(/last name/i) as HTMLInputElement).value).toBe('');
//         expect((screen.getByLabelText(/email address/i) as HTMLInputElement).value).toBe('');
//         expect((screen.getByLabelText(/company name/i) as HTMLInputElement).value).toBe('');
//       });
//     });
//   });
// });