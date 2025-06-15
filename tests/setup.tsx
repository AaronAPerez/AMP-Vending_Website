// /**
//  * Enhanced Test Setup Configuration
//  * tests/setup.tsx
//  * 
//  * Comprehensive testing environment setup with:
//  * - React Testing Library configuration
//  * - Next.js mocking (App Router)
//  * - Accessibility testing setup
//  * - Performance monitoring
//  * - Custom render utilities
//  * - Global test utilities
//  */

// import React from 'react';
// import '@testing-library/jest-dom';
// import { configure } from '@testing-library/react';
// import { afterAll, afterEach, beforeAll, beforeEach, jest } from '@jest/globals';

// // Enhanced React Testing Library configuration
// configure({
//   testIdAttribute: 'data-testid',
//   asyncUtilTimeout: 5000,
//   computedStyleSupportsPseudoElements: true,
// });

// // Global test utilities and types
// declare global {
//   var mockFetch: jest.MockedFunction<typeof fetch>;
//   var mockPush: jest.MockedFunction<any>;
//   var mockReplace: jest.MockedFunction<any>;
//   var mockBack: jest.MockedFunction<any>;
//   var mockForward: jest.MockedFunction<any>;
//   var mockRefresh: jest.MockedFunction<any>;
  
//   namespace jest {
//     interface Matchers<R> {
//       toBeInTheDocument(): R;
//       toHaveAccessibleName(name?: string): R;
//       toHaveAccessibleDescription(description?: string): R;
//       toHaveNoViolations(): R;
//     }
//   }
// }

// /**
//  * Next.js App Router Mocking
//  * Comprehensive mocking for Next.js 13+ App Router
//  */

// // Mock Next.js navigation (App Router)
// const mockPush = jest.fn();
// const mockReplace = jest.fn();
// const mockBack = jest.fn();
// const mockForward = jest.fn();
// const mockRefresh = jest.fn();
// const mockPrefetch = jest.fn();

// jest.mock('next/navigation', () => ({
//   useRouter() {
//     return {
//       push: mockPush,
//       replace: mockReplace,
//       prefetch: mockPrefetch,
//       back: mockBack,
//       forward: mockForward,
//       refresh: mockRefresh,
//       query: {},
//       pathname: '/',
//       route: '/',
//       asPath: '/',
//       isReady: true,
//     };
//   },
//   useSearchParams() {
//     return new URLSearchParams();
//   },
//   usePathname() {
//     return '/';
//   },
//   useParams() {
//     return {};
//   },
//   notFound: jest.fn(),
//   redirect: jest.fn(),
//   permanentRedirect: jest.fn(),
// }));

// // Mock Next.js Image component with proper TypeScript support
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: function MockImage(props: any) {
//     const { src, alt, width, height, fill, sizes, priority, ...rest } = props;
//     return (
//       <img
//         {...rest}
//         src={src}
//         alt={alt}
//         width={fill ? undefined : width}
//         height={fill ? undefined : height}
//         data-nimg={fill ? 'fill' : '1'}
//         data-priority={priority}
//         data-sizes={sizes}
//         style={fill ? { position: 'absolute', height: '100%', width: '100%', inset: 0 } : undefined}
//       />
//     );
//   },
// }));

// // Mock Next.js Link component
// jest.mock('next/link', () => ({
//   __esModule: true,
//   default: function MockLink({ children, href, ...props }: any) {
//     return (
//       <a href={href} {...props}>
//         {children}
//       </a>
//     );
//   },
// }));

// // Mock Next.js Script component
// jest.mock('next/script', () => ({
//   __esModule: true,
//   default: function MockScript({ children, ...props }: any) {
//     return <script {...props}>{children}</script>;
//   },
// }));

// /**
//  * Motion and Animation Mocking
//  * Disable animations for consistent testing
//  */
// jest.mock('framer-motion', () => ({
//   motion: {
//     div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
//     span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
//     p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
//     h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
//     h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
//     h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
//     h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
//     h5: ({ children, ...props }: any) => <h5 {...props}>{children}</h5>,
//     h6: ({ children, ...props }: any) => <h6 {...props}>{children}</h6>,
//     button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
//     form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
//     section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
//     article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
//     header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
//     footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
//     nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
//     main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
//     aside: ({ children, ...props }: any) => <aside {...props}>{children}</aside>,
//     ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
//     ol: ({ children, ...props }: any) => <ol {...props}>{children}</ol>,
//     li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
//     a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
//   },
//   AnimatePresence: ({ children }: any) => <>{children}</>,
//   useAnimation: () => ({
//     start: jest.fn(),
//     stop: jest.fn(),
//     set: jest.fn(),
//   }),
//   useInView: () => [jest.fn(), true], // Always in view for testing
//   useScroll: () => ({
//     scrollX: { current: 0 },
//     scrollY: { current: 0 },
//     scrollXProgress: { current: 0 },
//     scrollYProgress: { current: 0 },
//   }),
//   useTransform: () => jest.fn(),
//   useMotionValue: (initial: any) => ({ current: initial }),
//   useSpring: (initial: any) => ({ current: initial }),
// }));

// /**
//  * Toast and Notification Mocking
//  */
// jest.mock('sonner', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//     loading: jest.fn(),
//     dismiss: jest.fn(),
//     info: jest.fn(),
//     warning: jest.fn(),
//     custom: jest.fn(),
//   },
//   Toaster: () => null,
// }));

// /**
//  * Lucide React Icons Mocking
//  */
// jest.mock('lucide-react', () => {
//   const mockIcon = ({ size = 24, className = '', ...props }: any) => (
//     <svg
//       width={size}
//       height={size}
//       className={className}
//       data-testid="lucide-icon"
//       {...props}
//     />
//   );
  
//   return new Proxy({}, {
//     get: () => mockIcon,
//   });
// });

// /**
//  * Browser APIs Mocking
//  */

// // Mock window.matchMedia for responsive testing
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

// // Mock IntersectionObserver for lazy loading and scroll animations
// global.IntersectionObserver = class IntersectionObserver implements IntersectionObserver {
//   readonly root: Element | Document | null = null;
//   readonly rootMargin: string = '';
//   readonly thresholds: ReadonlyArray<number> = [];
  
//   constructor(
//     public callback: IntersectionObserverCallback,
//     public options?: IntersectionObserverInit
//   ) {}
  
//   observe = jest.fn();
//   unobserve = jest.fn();
//   disconnect = jest.fn();
//   takeRecords(): IntersectionObserverEntry[] {
//     return [];
//   }
// };

// // Mock ResizeObserver for responsive components
// global.ResizeObserver = class ResizeObserver {
//   constructor(public callback: ResizeObserverCallback) {}
  
//   observe = jest.fn();
//   unobserve = jest.fn();
//   disconnect = jest.fn();
// };

// // Mock requestAnimationFrame and cancelAnimationFrame
// global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
// global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));

// // Mock scroll methods
// Object.defineProperty(window, 'scrollTo', {
//   value: jest.fn(),
//   writable: true,
// });

// Object.defineProperty(Element.prototype, 'scrollIntoView', {
//   value: jest.fn(),
//   writable: true,
// });

// /**
//  * Fetch API Mocking
//  */
// const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
// global.fetch = mockFetch;

// // Expose fetch mock globally for tests
// global.mockFetch = mockFetch;

// /**
//  * Navigation Mocks - Expose globally
//  */
// global.mockPush = mockPush;
// global.mockReplace = mockReplace;
// global.mockBack = mockBack;
// global.mockForward = mockForward;
// global.mockRefresh = mockRefresh;

// /**
//  * Utility Functions for Tests
//  */

// // Mock successful fetch response
// export const mockFetchSuccess = (data: any, status = 200) => {
//   mockFetch.mockResolvedValueOnce({
//     ok: status >= 200 && status < 300,
//     status,
//     statusText: status === 200 ? 'OK' : 'Error',
//     json: async () => data,
//     text: async () => JSON.stringify(data),
//     headers: new Headers({
//       'content-type': 'application/json',
//     }),
//   } as Response);
// };

// // Mock failed fetch response
// export const mockFetchError = (error: string, status = 500) => {
//   mockFetch.mockRejectedValueOnce(new Error(error));
// };

// // Mock network error
// export const mockNetworkError = () => {
//   mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
// };

// /**
//  * Custom Render Utilities
//  */
// import { render, RenderOptions, RenderResult } from '@testing-library/react';
// import { ReactElement } from 'react';

// // Custom render function with providers
// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div data-testid="test-wrapper">
//       {children}
//     </div>
//   );
// };

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>
// ): RenderResult =>
//   render(ui, { wrapper: AllTheProviders, ...options });

// // Re-export everything
// export * from '@testing-library/react';
// export { customRender as render };

// /**
//  * Test Lifecycle Hooks
//  */

// beforeAll(() => {
//   // Global setup before all tests
  
//   // Silence console warnings for specific known issues
//   const originalError = console.error;
//   console.error = (...args: any[]) => {
//     // Filter out known React warnings in test environment
//     if (
//       typeof args[0] === 'string' &&
//       (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
//        args[0].includes('Warning: An invalid form control') ||
//        args[0].includes('validateDOMNesting'))
//     ) {
//       return;
//     }
//     originalError.call(console, ...args);
//   };
// });

// beforeEach(() => {
//   // Reset all mocks before each test
//   jest.clearAllMocks();
  
//   // Reset fetch mock
//   mockFetch.mockClear();
  
//   // Reset router mocks
//   mockPush.mockClear();
//   mockReplace.mockClear();
//   mockBack.mockClear();
//   mockForward.mockClear();
//   mockRefresh.mockClear();
  
//   // Reset DOM state
//   document.head.innerHTML = '';
//   document.body.innerHTML = '<div id="__next"></div>';
  
//   // Reset window properties
//   delete (window as any).location;
//   (window as any).location = new URL('http://localhost:3000');
  
//   // Reset localStorage and sessionStorage
//   localStorage.clear();
//   sessionStorage.clear();
// });

// afterEach(() => {
//   // Cleanup after each test
  
//   // Clear any pending timers
//   jest.runOnlyPendingTimers();
//   jest.useRealTimers();
  
//   // Clear any remaining DOM events
//   document.removeEventListener = jest.fn();
//   window.removeEventListener = jest.fn();
// });

// afterAll(() => {
//   // Global cleanup after all tests
//   jest.restoreAllMocks();
// });

// /**
//  * Global Test Utilities
//  */

// // Utility to wait for async operations
// export const waitForAsyncOperations = () => 
//   new Promise(resolve => setTimeout(resolve, 0));

// // Utility to simulate user typing with realistic timing
// export const typeWithDelay = async (element: HTMLElement, text: string, delay = 50) => {
//   const { userEvent } = await import('@testing-library/user-event');
//   const user = userEvent.setup();
  
//   for (const char of text) {
//     await user.type(element, char);
//     await new Promise(resolve => setTimeout(resolve, delay));
//   }
// };

// // Utility to test responsive behavior
// export const testResponsive = (query: string, matches: boolean) => {
//   (window.matchMedia as jest.Mock).mockImplementation((q: string) => ({
//     matches: q === query ? matches : false,
//     media: q,
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   }));
// };

// // Performance testing utilities
// export const measureRenderTime = (renderFn: () => void) => {
//   const start = performance.now();
//   renderFn();
//   const end = performance.now();
//   return end - start;
// };

// // Accessibility testing helper
// export const setupAccessibilityTesting = async () => {
//   const { axe, toHaveNoViolations } = await import('jest-axe');
//   expect.extend(toHaveNoViolations);
//   return axe;
// };