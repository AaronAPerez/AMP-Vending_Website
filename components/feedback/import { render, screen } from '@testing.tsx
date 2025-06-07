// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import FeedbackForm from './FeedbackForm';
// import { describe, it, expect } from '@jest/globals';

// // components/features/feedback/FeedbackForm.test.tsx


// const FEEDBACK_CATEGORIES = [
//   'Question',
//   'Suggestion',
//   'Compliment',
//   'Complaint',
//   'Technical Issue',
//   'Product Request'
// ];

// describe('FeedbackForm - Feedback Category Field', () => {
//   it('renders the feedback category select with all options', () => {
//     render(<FeedbackForm />);
//     const select = screen.getByLabelText(/feedback type/i);
//     expect(select).toBeInTheDocument();

//     FEEDBACK_CATEGORIES.forEach(category => {
//       expect(screen.getByRole('option', { name: category })).toBeInTheDocument();
//     });
//   });

//   it('defaults to "Question" as the selected category', () => {
//     render(<FeedbackForm />);
//     const select = screen.getByLabelText(/feedback type/i) as HTMLSelectElement;
//     expect(select.value).toBe('Question');
//   });

//   it('allows selecting each feedback category', async () => {
//     render(<FeedbackForm />);
//     const user = userEvent.setup();
//     const select = screen.getByLabelText(/feedback type/i);

//     for (const category of FEEDBACK_CATEGORIES) {
//       await user.selectOptions(select, category);
//       expect((select as HTMLSelectElement).value).toBe(category);
//     }
//   });
// });