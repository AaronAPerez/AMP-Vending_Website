// /**
//  * Feedback Form Comprehensive Test Suite
//  * tests/unit/components/FeedbackForm.test.tsx
//  * 
//  * Comprehensive testing covering:
//  * - Component rendering and form structure
//  * - Category selection and validation
//  * - Message length validation and character counting
//  * - Consent checkbox functionality
//  * - API integration and error handling
//  * - Accessibility compliance
//  * - User experience features
//  */

// import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { toast } from 'sonner';
// import FeedbackForm from '@/components/feedback/FeedbackForm';
// import { mockFetchSuccess, mockFetchError, mockNetworkError, setupAccessibilityTesting } from '../../setup';

// // Mock dependencies
// jest.mock('sonner');
// const mockToast = toast as jest.Mocked<typeof toast>;

// describe('FeedbackForm Component', () => {
//   let user: ReturnType<typeof userEvent.setup>;

//   beforeEach(() => {
//     user = userEvent.setup();
//     jest.clearAllMocks();
//   });

//   describe('Component Rendering', () => {
//     it('renders complete feedback form structure', () => {
//       render(<FeedbackForm />);

//       // Check main form elements
//       expect(screen.getByRole('form')).toBeInTheDocument();
//       expect(screen.getByText(/share your feedback/i)).toBeInTheDocument();
      
//       // Check all form fields
//       expect(screen.getByLabelText(/your name.*required/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/email address.*required/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/feedback type.*required/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/vending machine location.*optional/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/your feedback.*required/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/consent.*required/i)).toBeInTheDocument();
      
//       // Check submit button
//       expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
//     });

//     it('displays all feedback categories', () => {
//       render(<FeedbackForm />);

//       const categorySelect = screen.getByLabelText(/feedback type.*required/i);
//       expect(categorySelect).toBeInTheDocument();

//       // Check default selection
//       expect(categorySelect).toHaveValue('Question');

//       // Check all options are available
//       const expectedCategories = [
//         'Question',
//         'Suggestion', 
//         'Compliment',
//         'Complaint',
//         'Technical Issue',
//         'Product Request'
//       ];

//       expectedCategories.forEach(category => {
//         expect(screen.getByDisplayValue(category)).toBeInTheDocument();
//       });
//     });

//     it('shows character counter for message field', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/0\/2000/)).toBeInTheDocument();
//       expect(screen.getByText(/minimum 10 characters required/i)).toBeInTheDocument();
//     });

//     it('displays alternative contact methods', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/having trouble submitting/i)).toBeInTheDocument();
//       expect(screen.getByRole('link', { name: /email your feedback/i })).toBeInTheDocument();
//       expect(screen.getByRole('link', { name: /call us at/i })).toBeInTheDocument();
//     });

//     it('shows privacy notice', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/your feedback helps us improve/i)).toBeInTheDocument();
//       expect(screen.getByText(/never share it with third parties/i)).toBeInTheDocument();
//     });
//   });

//   describe('Form Validation', () => {
//     describe('Required Field Validation', () => {
//       it('validates all required fields on submission', async () => {
//         render(<FeedbackForm />);

//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         await waitFor(() => {
//           expect(screen.getByText(/name is required/i)).toBeInTheDocument();
//           expect(screen.getByText(/email is required/i)).toBeInTheDocument();
//           expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
//           expect(screen.getByText(/you must consent to be contacted/i)).toBeInTheDocument();
//         });
//       });

//       it('requires consent checkbox to be checked', async () => {
//         render(<FeedbackForm />);

//         // Fill all required fields except consent
//         await user.type(screen.getByLabelText(/your name.*required/i), 'John Doe');
//         await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//         await user.type(screen.getByLabelText(/your feedback.*required/i), 'This is my test feedback message.');

//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         await waitFor(() => {
//           expect(screen.getByText(/you must consent to be contacted/i)).toBeInTheDocument();
//         });
//       });

//       it('validates minimum message length', async () => {
//         render(<FeedbackForm />);

//         const messageField = screen.getByLabelText(/your feedback.*required/i);
//         await user.type(messageField, 'Short'); // Less than 10 characters

//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         await waitFor(() => {
//           expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
//         });
//       });

//       it('validates maximum message length', async () => {
//         render(<FeedbackForm />);

//         const longMessage = 'x'.repeat(2001); // Exceeds 2000 character limit
//         const messageField = screen.getByLabelText(/your feedback.*required/i);
        
//         await user.type(messageField, longMessage);

//         await waitFor(() => {
//           expect(screen.getByText(/message is too long/i)).toBeInTheDocument();
//         });
//       });
//     });

//     describe('Email Validation', () => {
//       it('validates email format', async () => {
//         render(<FeedbackForm />);

//         const emailField = screen.getByLabelText(/email address.*required/i);
//         await user.type(emailField, 'invalid-email-format');

//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         await waitFor(() => {
//           expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
//         });
//       });

//       it('accepts valid email formats', async () => {
//         render(<FeedbackForm />);

//         const emailField = screen.getByLabelText(/email address.*required/i);
//         await user.type(emailField, 'valid@example.com');

//         // Fill other required fields
//         await user.type(screen.getByLabelText(/your name.*required/i), 'John Doe');
//         await user.type(screen.getByLabelText(/your feedback.*required/i), 'Valid feedback message here.');
//         await user.click(screen.getByLabelText(/consent.*required/i));

//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         // Should not show email validation error
//         await waitFor(() => {
//           expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
//         });
//       });
//     });

//     describe('Real-time Validation', () => {
//       it('clears validation errors when user corrects input', async () => {
//         render(<FeedbackForm />);

//         // Trigger validation error
//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         await waitFor(() => {
//           expect(screen.getByText(/name is required/i)).toBeInTheDocument();
//         });

//         // Start typing in name field
//         const nameField = screen.getByLabelText(/your name.*required/i);
//         await user.type(nameField, 'J');

//         await waitFor(() => {
//           expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
//         });
//       });

//       it('updates character count in real-time', async () => {
//         render(<FeedbackForm />);

//         const messageField = screen.getByLabelText(/your feedback.*required/i);
//         const testMessage = 'Hello world';
        
//         await user.type(messageField, testMessage);

//         await waitFor(() => {
//           expect(screen.getByText(`${testMessage.length}/2000`)).toBeInTheDocument();
//         });
//       });

//       it('shows warning when approaching character limit', async () => {
//         render(<FeedbackForm />);

//         const nearLimitMessage = 'x'.repeat(1950); // Close to 2000 limit
//         const messageField = screen.getByLabelText(/your feedback.*required/i);
        
//         await user.type(messageField, nearLimitMessage);

//         await waitFor(() => {
//           const characterCount = screen.getByText(/1950\/2000/);
//           expect(characterCount).toHaveClass('text-yellow-400'); // Warning color
//         });
//       });
//     });
//   });

//   describe('User Interactions', () => {
//     describe('Category Selection', () => {
//       it('allows changing feedback category', async () => {
//         render(<FeedbackForm />);

//         const categorySelect = screen.getByLabelText(/feedback type.*required/i);
        
//         // Change to 'Complaint'
//         await user.selectOptions(categorySelect, 'Complaint');
//         expect(categorySelect).toHaveValue('Complaint');

//         // Change to 'Suggestion'
//         await user.selectOptions(categorySelect, 'Suggestion');
//         expect(categorySelect).toHaveValue('Suggestion');
//       });

//       it('maintains category selection during form validation', async () => {
//         render(<FeedbackForm />);

//         const categorySelect = screen.getByLabelText(/feedback type.*required/i);
//         await user.selectOptions(categorySelect, 'Technical Issue');

//         // Submit form with validation errors
//         const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//         await user.click(submitButton);

//         // Category should remain selected
//         await waitFor(() => {
//           expect(categorySelect).toHaveValue('Technical Issue');
//         });
//       });
//     });

//     describe('Consent Checkbox', () => {
//       it('toggles consent checkbox state', async () => {
//         render(<FeedbackForm />);

//         const consentCheckbox = screen.getByLabelText(/consent.*required/i);
//         expect(consentCheckbox).not.toBeChecked();

//         await user.click(consentCheckbox);
//         expect(consentCheckbox).toBeChecked();

//         await user.click(consentCheckbox);
//         expect(consentCheckbox).not.toBeChecked();
//       });

//       it('shows consent help text', () => {
//         render(<FeedbackForm />);

//         expect(screen.getByText(/we'll only use your contact information to respond/i)).toBeInTheDocument();
//       });
//     });

//     describe('Optional Fields', () => {
//       it('handles optional location field', async () => {
//         render(<FeedbackForm />);

//         const locationField = screen.getByLabelText(/vending machine location.*optional/i);
//         expect(locationField).toBeInTheDocument();

//         await user.type(locationField, 'Main Office Building');
//         expect(locationField).toHaveValue('Main Office Building');
//       });

//       it('enforces location field length limit', async () => {
//         render(<FeedbackForm />);

//         const longLocation = 'x'.repeat(201); // Exceeds 200 character limit
//         const locationField = screen.getByLabelText(/vending machine location.*optional/i);
        
//         await user.type(locationField, longLocation);
        
//         // Should be truncated or show validation error
//         expect(locationField.value.length).toBeLessThanOrEqual(200);
//       });
//     });
//   });

//   describe('Form Submission', () => {
//     const validFeedbackData = {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       category: 'Suggestion',
//       locationName: 'Main Office',
//       message: 'This is a detailed feedback message about the vending machine service.'
//     };

//     const fillValidForm = async () => {
//       await user.type(screen.getByLabelText(/your name.*required/i), validFeedbackData.name);
//       await user.type(screen.getByLabelText(/email address.*required/i), validFeedbackData.email);
//       await user.selectOptions(screen.getByLabelText(/feedback type.*required/i), validFeedbackData.category);
//       await user.type(screen.getByLabelText(/vending machine location.*optional/i), validFeedbackData.locationName);
//       await user.type(screen.getByLabelText(/your feedback.*required/i), validFeedbackData.message);
//       await user.click(screen.getByLabelText(/consent.*required/i));
//     };

//     it('submits feedback successfully', async () => {
//       render(<FeedbackForm />);

//       mockFetchSuccess({ success: true, message: 'Feedback submitted successfully' });

//       await fillValidForm();

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       // Check loading state
//       await waitFor(() => {
//         expect(screen.getByText(/submitting.../i)).toBeInTheDocument();
//         expect(submitButton).toBeDisabled();
//       });

//       // Check API call
//       await waitFor(() => {
//         expect(global.fetch).toHaveBeenCalledWith('/api/feedback', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: validFeedbackData.name,
//             email: validFeedbackData.email,
//             category: validFeedbackData.category,
//             locationName: validFeedbackData.locationName,
//             message: validFeedbackData.message,
//             contactConsent: true,
//           }),
//         });
//       });

//       // Check success feedback
//       await waitFor(() => {
//         expect(mockToast.success).toHaveBeenCalledWith(
//           expect.stringContaining('Thank you')
//         );
//       });
//     });

//     it('resets form after successful submission', async () => {
//       render(<FeedbackForm />);

//       mockFetchSuccess({ success: true });

//       await fillValidForm();

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         const nameField = screen.getByLabelText(/your name.*required/i) as HTMLInputElement;
//         const emailField = screen.getByLabelText(/email address.*required/i) as HTMLInputElement;
//         const messageField = screen.getByLabelText(/your feedback.*required/i) as HTMLTextAreaElement;
//         const consentCheckbox = screen.getByLabelText(/consent.*required/i) as HTMLInputElement;

//         expect(nameField.value).toBe('');
//         expect(emailField.value).toBe('');
//         expect(messageField.value).toBe('');
//         expect(consentCheckbox.checked).toBe(false);
//       });
//     });

//     it('handles submission timeout gracefully', async () => {
//       render(<FeedbackForm />);

//       // Mock timeout error
//       global.fetch = jest.fn().mockRejectedValueOnce(
//         Object.assign(new Error('Request timed out'), { name: 'AbortError' })
//       ) as any;

//       await fillValidForm();

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(mockToast.error).toHaveBeenCalledWith('Request timed out. Please try again.');
//       });
//     });

//     it('provides fallback contact information on network failure', async () => {
//       render(<FeedbackForm />);

//       mockNetworkError();

//       await fillValidForm();

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(mockToast.error).toHaveBeenCalledWith(
//           expect.objectContaining({
//             type: 'jsx',
//             props: expect.objectContaining({
//               children: expect.arrayContaining([
//                 expect.stringContaining('ampdesignandconsulting@gmail.com'),
//                 expect.stringContaining('(209) 403-5450')
//               ])
//             })
//           })
//         );
//       });
//     });
//   });

//   describe('Accessibility Compliance', () => {
//     it('has proper form structure and labeling', () => {
//       render(<FeedbackForm />);

//       // Check form has proper role and labeling
//       const form = screen.getByRole('form');
//       expect(form).toHaveAttribute('aria-labelledby', expect.stringContaining('feedback-form-heading'));

//       // Check required fields have proper attributes
//       const nameField = screen.getByLabelText(/your name.*required/i);
//       expect(nameField).toHaveAttribute('aria-required', 'true');
//       expect(nameField).toHaveAttribute('required');

//       const emailField = screen.getByLabelText(/email address.*required/i);
//       expect(emailField).toHaveAttribute('aria-required', 'true');
//       expect(emailField).toHaveAttribute('type', 'email');
//     });

//     it('provides proper error announcements', async () => {
//       render(<FeedbackForm />);

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         const errorElements = screen.getAllByRole('alert');
//         expect(errorElements.length).toBeGreaterThan(0);

//         errorElements.forEach(error => {
//           expect(error).toHaveAttribute('role', 'alert');
//         });
//       });
//     });

//     it('supports keyboard navigation', async () => {
//       render(<FeedbackForm />);

//       const nameField = screen.getByLabelText(/your name.*required/i);
//       const emailField = screen.getByLabelText(/email address.*required/i);
//       const categoryField = screen.getByLabelText(/feedback type.*required/i);
//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });

//       // Tab through form elements
//       await user.tab();
//       expect(nameField).toHaveFocus();

//       await user.tab();
//       expect(emailField).toHaveFocus();

//       await user.tab();
//       expect(categoryField).toHaveFocus();

//       // Continue tabbing through remaining fields
//       await user.tab(); // location field
//       await user.tab(); // message field
//       await user.tab(); // consent checkbox
//       await user.tab(); // submit button
//       expect(submitButton).toHaveFocus();
//     });

//     it('passes accessibility audit', async () => {
//       const axe = await setupAccessibilityTesting();
//       const { container } = render(<FeedbackForm />);

//       const results = await axe(container);
//       expect(results).toHaveNoViolations();
//     });

//     it('provides appropriate field descriptions', () => {
//       render(<FeedbackForm />);

//       // Check for helpful descriptions
//       expect(screen.getByText(/help us identify the location/i)).toBeInTheDocument();
//       expect(screen.getByText(/we'll respond within 24-48 hours/i)).toBeInTheDocument();
//       expect(screen.getByText(/minimum 10 characters required/i)).toBeInTheDocument();
//     });
//   });

//   describe('Performance and User Experience', () => {
//     it('shows loading state during submission', async () => {
//       render(<FeedbackForm />);

//       // Mock delayed response
//       global.fetch = jest.fn().mockImplementation(
//         () => new Promise(resolve => setTimeout(() => resolve({
//           ok: true,
//           json: () => Promise.resolve({ success: true })
//         }), 500))
//       ) as any;

//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback message');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       // Should show loading state
//       expect(screen.getByText(/submitting.../i)).toBeInTheDocument();
//       expect(submitButton).toBeDisabled();
//       expect(submitButton).toHaveAttribute('aria-busy', 'true');

//       // Should show loading spinner
//       expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument(); // Loading spinner
//     });

//     it('handles rapid form state changes', async () => {
//       render(<FeedbackForm />);

//       const messageField = screen.getByLabelText(/your feedback.*required/i);
      
//       // Rapid typing simulation
//       const testText = 'Quick typing test message for feedback form';
//       await user.type(messageField, testText, { delay: 1 });

//       await waitFor(() => {
//         expect(messageField).toHaveValue(testText);
//         expect(screen.getByText(`${testText.length}/2000`)).toBeInTheDocument();
//       });
//     });

//     it('preserves user input during validation', async () => {
//       render(<FeedbackForm />);

//       const testName = 'John Doe';
//       const testEmail = 'john@example.com';
//       const testMessage = 'Test feedback message';

//       await user.type(screen.getByLabelText(/your name.*required/i), testName);
//       await user.type(screen.getByLabelText(/email address.*required/i), testEmail);
//       await user.type(screen.getByLabelText(/your feedback.*required/i), testMessage);

//       // Submit without consent (should fail validation)
//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       // Form should preserve user input
//       await waitFor(() => {
//         expect(screen.getByDisplayValue(testName)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(testEmail)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(testMessage)).toBeInTheDocument();
//       });
//     });
//   });

//   describe('Status Messages and Feedback', () => {
//     it('shows success status after submission', async () => {
//       render(<FeedbackForm />);

//       mockFetchSuccess({ success: true });

//       // Fill and submit form
//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Great service!');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
//         expect(screen.getByText(/we appreciate your input/i)).toBeInTheDocument();
//       });
//     });

//     it('shows error status on submission failure', async () => {
//       render(<FeedbackForm />);

//       mockFetchError('Server error occurred', 500);

//       // Fill and submit form
//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
//         expect(screen.getByText(/please try again or contact us directly/i)).toBeInTheDocument();
//       });
//     });

//     it('allows status reset after error', async () => {
//       render(<FeedbackForm />);

//       mockFetchError('Server error', 500);

//       // Submit form to trigger error
//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
//       });

//       // Status should clear after some time
//       await waitFor(() => {
//         expect(screen.queryByText(/submission failed/i)).not.toBeInTheDocument();
//       }, { timeout: 6000 });
//     });
//   });

//   describe('Alternative Contact Methods', () => {
//     it('provides email fallback link', () => {
//       render(<FeedbackForm />);

//       const emailLink = screen.getByRole('link', { name: /email your feedback/i });
//       expect(emailLink).toHaveAttribute('href', 'mailto:ampdesignandconsulting@gmail.com?subject=Feedback%20from%20Website');
//     });

//     it('provides phone fallback link', () => {
//       render(<FeedbackForm />);

//       const phoneLink = screen.getByRole('link', { name: /call us at/i });
//       expect(phoneLink).toHaveAttribute('href', 'tel:+12094035450');
//     });

//     it('shows fallback contact info when needed', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/having trouble submitting.*contact us directly/i)).toBeInTheDocument();
//       expect(screen.getByText(/ampdesignandconsulting@gmail.com/i)).toBeInTheDocument();
//       expect(screen.getByText(/\(209\) 403-5450/i)).toBeInTheDocument();
//     });
//   });

//   describe('Data Privacy and Security', () => {
//     it('displays privacy notice prominently', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/your feedback helps us improve/i)).toBeInTheDocument();
//       expect(screen.getByText(/never share it with third parties/i)).toBeInTheDocument();
//     });

//     it('requires explicit consent for contact', () => {
//       render(<FeedbackForm />);

//       const consentText = screen.getByText(/i consent to being contacted/i);
//       expect(consentText).toBeInTheDocument();
      
//       const consentCheckbox = screen.getByLabelText(/consent.*required/i);
//       expect(consentCheckbox).toHaveAttribute('aria-required', 'true');
//     });

//     it('explains how contact information will be used', () => {
//       render(<FeedbackForm />);

//       expect(screen.getByText(/we'll only use your contact information to respond/i)).toBeInTheDocument();
//     });
//   });

//   describe('Integration Features', () => {
//     it('integrates with toast notification system', async () => {
//       render(<FeedbackForm />);

//       mockFetchSuccess({ success: true });

//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       expect(mockToast.loading).toHaveBeenCalledWith('Submitting your feedback...');

//       await waitFor(() => {
//         expect(mockToast.success).toHaveBeenCalledWith(
//           expect.stringContaining('Thank you')
//         );
//       });
//     });

//     it('calls onSubmitSuccess callback when provided', async () => {
//       const mockCallback = jest.fn();
//       render(<FeedbackForm onSubmitSuccess={mockCallback} />);

//       mockFetchSuccess({ success: true });

//       // Fill and submit form
//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(mockCallback).toHaveBeenCalled();
//       });
//     });
//   });

//   describe('Error Recovery and Resilience', () => {
//     it('maintains form state during network interruptions', async () => {
//       render(<FeedbackForm />);

//       const testData = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         message: 'Important feedback message',
//         location: 'Office Building A'
//       };

//       // Fill form
//       await user.type(screen.getByLabelText(/your name.*required/i), testData.name);
//       await user.type(screen.getByLabelText(/email address.*required/i), testData.email);
//       await user.type(screen.getByLabelText(/vending machine location.*optional/i), testData.location);
//       await user.type(screen.getByLabelText(/your feedback.*required/i), testData.message);
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       // Simulate network failure
//       mockNetworkError();

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       // Form should preserve all data after error
//       await waitFor(() => {
//         expect(screen.getByDisplayValue(testData.name)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(testData.email)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(testData.location)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(testData.message)).toBeInTheDocument();
//         expect(screen.getByLabelText(/consent.*required/i)).toBeChecked();
//       });
//     });

//     it('allows retry after submission failure', async () => {
//       render(<FeedbackForm />);

//       // First attempt fails
//       mockNetworkError();

//       await user.type(screen.getByLabelText(/your name.*required/i), 'John');
//       await user.type(screen.getByLabelText(/email address.*required/i), 'john@example.com');
//       await user.type(screen.getByLabelText(/your feedback.*required/i), 'Test feedback');
//       await user.click(screen.getByLabelText(/consent.*required/i));

//       const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(mockToast.error).toHaveBeenCalled();
//       });

//       // Second attempt succeeds
//       mockFetchSuccess({ success: true });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(global.fetch).toHaveBeenCalledTimes(2);
//         expect(mockToast.success).toHaveBeenCalled();
//       });
//     });
//   });
// });