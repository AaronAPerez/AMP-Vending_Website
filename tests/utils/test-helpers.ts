// /**
//  * Test Helper Utilities
//  * Common functions and utilities for testing
//  */

// import { render, RenderOptions } from '@testing-library/react';
// import { ReactElement, ReactNode } from 'react';
// import userEvent from '@testing-library/user-event';

// /**
//  * Enhanced render function with common providers
//  */
// interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
//   /**
//    * Initial route for router mock
//    */
//   initialRoute?: string;
//   /**
//    * Mock user session data
//    */
//   session?: any;
//   /**
//    * Theme provider props
//    */
//   theme?: any;
// }

// export const renderWithProviders = (
//   ui: ReactElement,
//   options: CustomRenderOptions = {}
// ) => {
//   const { initialRoute = '/', session = null, theme = {}, ...renderOptions } = options;

//   // Wrapper component with all providers
//   const Wrapper = ({ children }: { children: ReactNode }) => {
//     return (
//       <div data-testid="test-wrapper" data-route={initialRoute}>
//         {children}
//       </div>
//     );
//   };

//   return {
//     user: userEvent.setup(),
//     ...render(ui, { wrapper: Wrapper, ...renderOptions }),
//   };
// };

// /**
//  * Mock fetch response helper
//  */
// export const createMockResponse = (data: any, status = 200, ok = true) => ({
//   ok,
//   status,
//   statusText: ok ? 'OK' : 'Error',
//   json: async () => data,
//   text: async () => JSON.stringify(data),
//   headers: new Headers({
//     'content-type': 'application/json',
//   }),
//   url: 'http://localhost:3000/api/test',
//   redirected: false,
//   type: 'basic' as ResponseType,
//   body: null,
//   bodyUsed: false,
//   clone: jest.fn(),
//   arrayBuffer: jest.fn(),
//   blob: jest.fn(),
//   formData: jest.fn(),
// });

// /**
//  * Wait for async operations to complete
//  */
// export const waitForAsyncOperations = () => 
//   new Promise(resolve => setTimeout(resolve, 0));

// /**
//  * Simulate realistic user typing with delays
//  */
// export const typeRealistic = async (
//   element: HTMLElement, 
//   text: string, 
//   options: { delay?: number } = {}
// ) => {
//   const { delay = 50 } = options;
//   const user = userEvent.setup({ delay });
  
//   await user.clear(element);
//   await user.type(element, text);
// };

// /**
//  * Test responsive behavior by mocking window.matchMedia
//  */
// export const mockMatchMedia = (query: string, matches: boolean) => {
//   const mockMatchMedia = jest.fn().mockImplementation((q: string) => ({
//     matches: q === query ? matches : false,
//     media: q,
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   }));

//   Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: mockMatchMedia,
//   });

//   return mockMatchMedia;
// };

// /**
//  * Trigger resize event for responsive testing
//  */
// export const triggerResize = (width: number, height: number) => {
//   Object.defineProperty(window, 'innerWidth', {
//     writable: true,
//     configurable: true,
//     value: width,
//   });
//   Object.defineProperty(window, 'innerHeight', {
//     writable: true,
//     configurable: true,
//     value: height,
//   });

//   window.dispatchEvent(new Event('resize'));
// };

// /**
//  * Mock intersection observer for lazy loading tests
//  */
// export const mockIntersectionObserver = (isIntersecting = true) => {
//   const mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
//     observe: jest.fn().mockImplementation((element) => {
//       callback([{ 
//         target: element, 
//         isIntersecting,
//         intersectionRatio: isIntersecting ? 1 : 0,
//         boundingClientRect: element.getBoundingClientRect(),
//         intersectionRect: isIntersecting ? element.getBoundingClientRect() : null,
//         rootBounds: null,
//         time: Date.now()
//       }]);
//     }),
//     unobserve: jest.fn(),
//     disconnect: jest.fn(),
//   }));

//   global.IntersectionObserver = mockIntersectionObserver;
//   return mockIntersectionObserver;
// };

// /**
//  * Create form validation test helper
//  */
// export const createFormTester = (formElement: HTMLElement) => {
//   return {
//     async fillField(name: string, value: string) {
//       const field = formElement.querySelector(`[name="${name}"]`) as HTMLInputElement;
//       if (!field) throw new Error(`Field ${name} not found`);
      
//       const user = userEvent.setup();
//       await user.clear(field);
//       await user.type(field, value);
//       return field;
//     },

//     async submitForm() {
//       const submitButton = formElement.querySelector('button[type="submit"]') as HTMLButtonElement;
//       if (!submitButton) throw new Error('Submit button not found');
      
//       const user = userEvent.setup();
//       await user.click(submitButton);
//     },

//     getValidationErrors() {
//       return Array.from(formElement.querySelectorAll('[role="alert"]'))
//         .map(el => el.textContent)
//         .filter(Boolean);
//     },

//     async expectFieldError(fieldName: string, errorMessage: string) {
//       const field = formElement.querySelector(`[name="${fieldName}"]`) as HTMLElement;
//       const errorElement = field?.parentElement?.querySelector('[role="alert"]');
//       expect(errorElement).toHaveTextContent(errorMessage);
//     }
//   };
// };

// /**
//  * Performance testing utilities
//  */
// export const measureRenderTime = (renderFn: () => void) => {
//   const start = performance.now();
//   renderFn();
//   const end = performance.now();
//   return end - start;
// };

// export const measureAsyncRenderTime = async (renderFn: () => Promise<void>) => {
//   const start = performance.now();
//   await renderFn();
//   const end = performance.now();
//   return end - start;
// };

// /**
//  * Accessibility testing helpers
//  */
// export const testKeyboardNavigation = async (container: HTMLElement) => {
//   const user = userEvent.setup();
//   const focusableElements = container.querySelectorAll(
//     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//   );

//   for (let i = 0; i < focusableElements.length; i++) {
//     await user.tab();
//     expect(focusableElements[i]).toHaveFocus();
//   }
// };

// export const checkAriaLabels = (container: HTMLElement) => {
//   const interactiveElements = container.querySelectorAll(
//     'button, [role="button"], input, select, textarea, a'
//   );

//   interactiveElements.forEach(element => {
//     const hasLabel = 
//       element.hasAttribute('aria-label') ||
//       element.hasAttribute('aria-labelledby') ||
//       element.closest('label') ||
//       element.querySelector('label');

//     if (!hasLabel) {
//       console.warn('Interactive element missing accessible label:', element);
//     }
//   });
// };

// /**
//  * API testing utilities
//  */
// export const mockApiCall = (endpoint: string, response: any, status = 200) => {
//   const mockFetch = jest.fn().mockResolvedValue(createMockResponse(response, status));
//   global.fetch = mockFetch;
//   return mockFetch;
// };

// export const mockApiError = (endpoint: string, error: string, status = 500) => {
//   const mockFetch = jest.fn().mockRejectedValue(new Error(error));
//   global.fetch = mockFetch;
//   return mockFetch;
// };

// /**
//  * Component testing utilities
//  */
// export const getByTestId = (container: HTMLElement, testId: string) => {
//   const element = container.querySelector(`[data-testid="${testId}"]`);
//   if (!element) throw new Error(`Element with testId ${testId} not found`);
//   return element;
// };

// export const getAllByTestId = (container: HTMLElement, testId: string) => {
//   return Array.from(container.querySelectorAll(`[data-testid="${testId}"]`));
// };

// /**
//  * Form testing specific utilities
//  */
// export interface FormTestCase {
//   field: string;
//   value: string;
//   expectedError?: string;
//   shouldPass?: boolean;
// }

// export const runFormValidationTests = async (
//   container: HTMLElement,
//   testCases: FormTestCase[]
// ) => {
//   const formTester = createFormTester(container);

//   for (const testCase of testCases) {
//     await formTester.fillField(testCase.field, testCase.value);
//     await formTester.submitForm();

//     if (testCase.expectedError) {
//       await formTester.expectFieldError(testCase.field, testCase.expectedError);
//     } else if (testCase.shouldPass) {
//       const errors = formTester.getValidationErrors();
//       expect(errors).not.toContain(testCase.expectedError);
//     }
//   }
// };

// /**
//  * Visual regression testing helpers
//  */
// export const hideAnimations = () => {
//   const style = document.createElement('style');
//   style.innerHTML = `
//     *, *::before, *::after {
//       animation-duration: 0s !important;
//       animation-delay: 0s !important;
//       transition-duration: 0s !important;
//       transition-delay: 0s !important;
//     }
//   `;
//   document.head.appendChild(style);
//   return style;
// };

// export const restoreAnimations = (style: HTMLStyleElement) => {
//   document.head.removeChild(style);
// };

// /**
//  * Test data generators
//  */
// export const generateValidContactData = (overrides = {}) => ({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   phone: '(555) 123-4567',
//   companyName: 'Test Company Inc.',
//   message: 'This is a test message for vending machine inquiry.',
//   ...overrides
// });

// export const generateValidFeedbackData = (overrides = {}) => ({
//   name: 'Jane Smith',
//   email: 'jane.smith@example.com',
//   category: 'Suggestion',
//   locationName: 'Main Office Building',
//   message: 'This is test feedback about the vending machine service. It contains enough characters to pass validation.',
//   contactConsent: true,
//   ...overrides
// });

// export const generateInvalidEmailData = () => [
//   'invalid-email',
//   'missing@domain',
//   '@missinglocal.com',
//   'spaces in@email.com',
//   'double@@domain.com',
//   'trailing.dot.@domain.com'
// ];

// /**
//  * Error boundary testing
//  */
// export const TestErrorBoundary = ({ children, onError }: {
//   children: React.ReactNode;
//   onError?: (error: Error) => void;
// }) => {
//   const [hasError, setHasError] = React.useState(false);
//   const [error, setError] = React.useState<Error | null>(null);

//   React.useEffect(() => {
//     const handleError = (event: ErrorEvent) => {
//       setHasError(true);
//       setError(new Error(event.message));
//       onError?.(new Error(event.message));
//     };

//     window.addEventListener('error', handleError);
//     return () => window.removeEventListener('error', handleError);
//   }, [onError]);

//   if (hasError) {
//     return <div data-testid="error-boundary">Error: {error?.message}</div>;
//   }

//   return <>{children}</>;
// };

// /**
//  * Custom hooks testing utilities
//  */
// export const createHookTester = <T extends any[], R>(
//   hook: (...args: T) => R
// ) => {
//   const results: R[] = [];
  
//   const TestComponent = ({ args }: { args: T }) => {
//     const result = hook(...args);
//     results.push(result);
//     return null;
//   };

//   return {
//     render: (args: T) => {
//       results.length = 0; // Clear previous results
//       return render(<TestComponent args={args} />);
//     },
//     getLastResult: () => results[results.length - 1],
//     getAllResults: () => [...results]
//   };
// };

// /**
//  * Re-export commonly used testing utilities
//  */
// export * from '@testing-library/react';
// export { userEvent };