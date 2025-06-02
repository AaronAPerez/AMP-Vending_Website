// import { render, screen, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'
// import ContactForm from '@/components/contact/ContactForm'

// // Mock toast notifications
// jest.mock('sonner', () => ({
//   toast: {
//     loading: jest.fn(),
//     success: jest.fn(),
//     error: jest.fn(),
//     dismiss: jest.fn(),
//   },
// }))

// describe('ContactForm', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks()
//   })

//   it('renders all required form fields', () => {
//     render(<ContactForm />)
    
//     expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: /request information/i })).toBeInTheDocument()
//   })

//   it('validates required fields on submit', async () => {
//     const user = userEvent.setup()
//     render(<ContactForm />)
    
//     const submitButton = screen.getByRole('button', { name: /request information/i })
//     await user.click(submitButton)
    
//     await waitFor(() => {
//       expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
//       expect(screen.getByText(/last name is required/i)).toBeInTheDocument()
//       expect(screen.getByText(/email is required/i)).toBeInTheDocument()
//       expect(screen.getByText(/company name is required/i)).toBeInTheDocument()
//     })
//   })

//   it('validates email format', async () => {
//     const user = userEvent.setup()
//     render(<ContactForm />)
    
//     const emailInput = screen.getByLabelText(/email address/i)
//     await user.type(emailInput, 'invalid-email')
    
//     const submitButton = screen.getByRole('button', { name: /request information/i })
//     await user.click(submitButton)
    
//     await waitFor(() => {
//       expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
//     })
//   })
// })