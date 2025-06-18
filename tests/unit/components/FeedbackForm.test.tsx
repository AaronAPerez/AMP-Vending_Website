// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import FeedbackForm from '@/components/feedback/FeedbackForm';

// describe('FeedbackForm', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders all feedback categories', () => {
//     render(<FeedbackForm />);
    
//     expect(screen.getByDisplayValue('Question')).toBeInTheDocument();
    
//     // Test category options
//     const categorySelect = screen.getByLabelText(/feedback type/i);
//     fireEvent.click(categorySelect);
    
//     expect(screen.getByText('Question')).toBeInTheDocument();
//     expect(screen.getByText('Suggestion')).toBeInTheDocument();
//     expect(screen.getByText('Compliment')).toBeInTheDocument();
//     expect(screen.getByText('Complaint')).toBeInTheDocument();
//   });

//   it('validates required fields', async () => {
//     const user = userEvent.setup();
//     render(<FeedbackForm />);
    
//     const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//     await user.click(submitButton);
    
//     await waitFor(() => {
//       expect(screen.getByText(/name is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/email is required/i)).toBeInTheDocument();
//       expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
//     });
//   });

//   it('requires consent checkbox', async () => {
//     const user = userEvent.setup();
//     render(<FeedbackForm />);
    
//     // Fill required fields but not consent
//     await user.type(screen.getByLabelText(/your name/i), 'John Doe');
//     await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
//     await user.type(screen.getByLabelText(/your feedback/i), 'This is test feedback message');
    
//     const submitButton = screen.getByRole('button', { name: /submit feedback/i });
//     await user.click(submitButton);
    
//     await waitFor(() => {
//       expect(screen.getByText(/you must consent to be contacted/i)).toBeInTheDocument();
//     });
//   });
// });