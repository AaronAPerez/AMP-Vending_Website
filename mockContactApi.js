import { rest } from 'msw'
import { setupServer } from 'msw/node'

/**
 * Setup a mock server for local development and testing
 * This allows the contact form to work without a real backend
 */

// Create mock handlers for API endpoints
const handlers = [
  rest.post('/api/contact', (req, res, ctx) => {
    // Log the request for debugging
    console.log('Mock server received contact form submission:', req.body)
    
    // Return a successful response
    return res(
      ctx.delay(500), // Add a small delay to simulate network
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Email sent successfully (mock response)'
      })
    )
  })
]

// Set up the mock server
export const mockServer = setupServer(...handlers)