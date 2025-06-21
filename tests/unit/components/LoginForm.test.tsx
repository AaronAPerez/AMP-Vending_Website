// // tests/unit/components/LoginForm.test.tsx
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { toast } from 'sonner';
// import LoginForm from '@/components/admin/auth/LoginForm';

// // Mock sonner toast
// jest.mock('sonner', () => ({
//   toast: {
//     error: jest.fn(),
//     success: jest.fn(),
//   },
// }));

// /**
//  * Comprehensive LoginForm Test Suite
//  * Build Process: Implements accessibility testing and security validation
//  */
// describe('LoginForm Component', () => {
//   const mockOnLogin = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   /**
//    * Accessibility Tests
//    */
//   describe('Accessibility', () => {
//     it('should have proper ARIA labels and roles', () => {
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       expect(screen.getByRole('form')).toBeInTheDocument();
//       expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
//     });

//     it('should support keyboard navigation', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       const passwordInput = screen.getByLabelText(/password/i);
//       const submitButton = screen.getByRole('button', { name: /sign in/i });

//       // Tab navigation
//       await user.tab();
//       expect(emailInput).toHaveFocus();
      
//       await user.tab();
//       expect(passwordInput).toHaveFocus();
      
//       await user.tab();
//       expect(screen.getByLabelText(/keep me signed in/i)).toHaveFocus();
      
//       await user.tab();
//       expect(submitButton).toHaveFocus();
//     });

//     it('should announce errors to screen readers', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
//       await user.click(submitButton);
      
//       const emailError = screen.getByRole('alert');
//       expect(emailError).toHaveTextContent(/email address is required/i);
//       expect(emailError).toHaveAttribute('id', 'email-error');
//     });
//   });

//   /**
//    * Form Validation Tests
//    */
//   describe('Form Validation', () => {
//     it('should validate required fields', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
//       await user.click(submitButton);
      
//       expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/password is required/i)).toBeInTheDocument();
//       expect(mockOnLogin).not.toHaveBeenCalled();
//     });

//     it('should validate email format', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       await user.type(emailInput, 'invalid-email');
      
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
//       await user.click(submitButton);
      
//       expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
//     });

//     it('should validate password length', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const passwordInput = screen.getByLabelText(/password/i);
//       await user.type(passwordInput, '123');
      
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
//       await user.click(submitButton);
      
//       expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
//     });
//   });

//   /**
//    * Security Tests
//    */
//   describe('Security Features', () => {
//     it('should implement rate limiting display', async () => {
//       const user = userEvent.setup();
//       mockOnLogin.mockResolvedValue(false);
      
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       const passwordInput = screen.getByLabelText(/password/i);
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
      
//       // Simulate multiple failed attempts
//       for (let i = 0; i < 3; i++) {
//         await user.type(emailInput, 'test@example.com');
//         await user.type(passwordInput, 'wrongpassword');
//         await user.click(submitButton);
//         await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
//         mockOnLogin.mockClear();
//       }
      
//       expect(screen.getByText(/multiple failed attempts detected/i)).toBeInTheDocument();
//     });

//     it('should clear password on failed login', async () => {
//       const user = userEvent.setup();
//       mockOnLogin.mockResolvedValue(false);
      
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       const passwordInput = screen.getByLabelText(/password/i);
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
      
//       await user.type(emailInput, 'test@example.com');
//       await user.type(passwordInput, 'wrongpassword');
//       await user.click(submitButton);
      
//       await waitFor(() => {
//         expect(passwordInput).toHaveValue('');
//       });
//     });

//     it('should toggle password visibility', async () => {
//       const user = userEvent.setup();
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const passwordInput = screen.getByLabelText(/password/i);
//       const toggleButton = screen.getByLabelText(/show password/i);
      
//       expect(passwordInput).toHaveAttribute('type', 'password');
      
//       await user.click(toggleButton);
//       expect(passwordInput).toHaveAttribute('type', 'text');
//       expect(screen.getByLabelText(/hide password/i)).toBeInTheDocument();
//     });
//   });

//   /**
//    * Integration Tests
//    */
//   describe('Login Flow Integration', () => {
//     it('should call onLogin with correct credentials', async () => {
//       const user = userEvent.setup();
//       mockOnLogin.mockResolvedValue(true);
      
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       const passwordInput = screen.getByLabelText(/password/i);
//       const rememberMeCheckbox = screen.getByLabelText(/keep me signed in/i);
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
      
//       await user.type(emailInput, 'admin@ampvending.com');
//       await user.type(passwordInput, 'securepassword123');
//       await user.click(rememberMeCheckbox);
//       await user.click(submitButton);
      
//       expect(mockOnLogin).toHaveBeenCalledWith({
//         email: 'admin@ampvending.com',
//         password: 'securepassword123',
//         rememberMe: true,
//       });
//     });

//     it('should show loading state during login', async () => {
//       const user = userEvent.setup();
//       let resolveLogin: (value: boolean) => void;
//       const loginPromise = new Promise<boolean>((resolve) => {
//         resolveLogin = resolve;
//       });
//       mockOnLogin.mockReturnValue(loginPromise);
      
//       render(<LoginForm onLogin={mockOnLogin} />);
      
//       const emailInput = screen.getByLabelText(/email address/i);
//       const passwordInput = screen.getByLabelText(/password/i);
//       const submitButton = screen.getByRole('button', { name: /sign in/i });
      
//       await user.type(emailInput, 'admin@ampvending.com');
//       await user.type(passwordInput, 'securepassword123');
//       await user.click(submitButton);
      
//       expect(screen.getByText(/signing in/i)).toBeInTheDocument();
//       expect(submitButton).toBeDisabled();
      
//       resolveLogin!(true);
//       await waitFor(() => {
//         expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument();
//       });
//     });
//   });
// });