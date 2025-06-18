/**
 * Mock for next-auth/react
 * Provides consistent authentication mocking for tests
 */

const mockNextAuth = {
  useSession: () => ({
    data: null,
    status: 'unauthenticated'
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn().mockResolvedValue(null),
  SessionProvider: ({ children }) => children,
  getProviders: jest.fn().mockResolvedValue({}),
  getCsrfToken: jest.fn().mockResolvedValue('mock-csrf-token'),
  getServerSession: jest.fn().mockResolvedValue(null)
};

module.exports = mockNextAuth;
