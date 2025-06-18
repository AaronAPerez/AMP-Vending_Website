/**
 * Jest-axe Setup for Accessibility Testing
 * Configures accessibility testing for all unit tests
 */

import { configureAxe } from 'jest-axe';

// Configure axe for consistent accessibility testing
const axe = configureAxe({
  rules: {
    // Disable color-contrast rule for now as it may have false positives
    'color-contrast': { enabled: false },
    // Custom rules configuration
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true }
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
  // Include only relevant checks
  checks: [],
  // Custom configuration for our design system
  disableOtherRules: false
});

// Export for use in tests
global.axe = axe;

---

// tests/__mocks__/next-auth.js
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

---

// tests/__mocks__/framer-motion.js
/**
 * Enhanced Framer Motion Mock
 * Provides comprehensive mocking for motion components
 */

const React = require('react');

// Create motion component mock that preserves refs and events
const createMotionComponent = (Component) => {
  return React.forwardRef((props, ref) => {
    const {
      animate,
      initial,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileInView,
      drag,
      dragConstraints,
      onAnimationComplete,
      onAnimationStart,
      layoutId,
      layout,
      ...domProps
    } = props;

    // Convert motion props to data attributes for testing
    const testProps = {
      ...domProps,
      ref,
      'data-motion': 'true',
      'data-animate': animate ? JSON.stringify(animate) : undefined,
      'data-initial': initial ? JSON.stringify(initial) : undefined,
      'data-testid': props['data-testid'] || `motion-${Component}`
    };

    return React.createElement(Component, testProps);
  });
};

// Mock all common motion components
const motion = {
  div: createMotionComponent('div'),
  span: createMotionComponent('span'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  h5: createMotionComponent('h5'),
  h6: createMotionComponent('h6'),
  button: createMotionComponent('button'),
  form: createMotionComponent('form'),
  section: createMotionComponent('section'),
  article: createMotionComponent('article'),
  header: createMotionComponent('header'),
  footer: createMotionComponent('footer'),
  nav: createMotionComponent('nav'),
  main: createMotionComponent('main'),
  aside: createMotionComponent('aside'),
  ul: createMotionComponent('ul'),
  ol: createMotionComponent('ol'),
  li: createMotionComponent('li'),
  a: createMotionComponent('a'),
  img: createMotionComponent('img'),
  video: createMotionComponent('video'),
  canvas: createMotionComponent('canvas'),
  svg: createMotionComponent('svg'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  rect: createMotionComponent('rect')
};

// Mock other framer-motion exports
const AnimatePresence = ({ children, mode, onExitComplete, ...props }) => {
  // Render children immediately in tests
  return React.createElement('div', { 
    'data-animate-presence': 'true',
    'data-mode': mode,
    ...props 
  }, children);
};

const useAnimation = () => ({
  start: jest.fn().mockResolvedValue(undefined),
  stop: jest.fn(),
  set: jest.fn(),
  mount: jest.fn(),
  unmount: jest.fn()
});

const useInView = (ref, options = {}) => [
  React.useCallback(() => {}, []),
  true // Always return true for testing
];

const useScroll = () => ({
  scrollX: { current: 0, onChange: jest.fn(), set: jest.fn() },
  scrollY: { current: 0, onChange: jest.fn(), set: jest.fn() },
  scrollXProgress: { current: 0, onChange: jest.fn(), set: jest.fn() },
  scrollYProgress: { current: 0, onChange: jest.fn(), set: jest.fn() }
});

const useTransform = (motionValue, inputRange, outputRange, options) => ({
  current: 0,
  onChange: jest.fn(),
  set: jest.fn()
});

const useMotionValue = (initial) => ({
  current: initial,
  onChange: jest.fn(),
  set: jest.fn(),
  get: jest.fn(() => initial)
});

const useSpring = (initial, config) => ({
  current: initial,
  onChange: jest.fn(),
  set: jest.fn(),
  get: jest.fn(() => initial)
});

const useVelocity = (motionValue) => ({
  current: 0,
  onChange: jest.fn(),
  set: jest.fn()
});

const useDragControls = () => ({
  start: jest.fn(),
  componentControls: new Set()
});

// Layout animation mocks
const LayoutGroup = ({ children, id, ...props }) => 
  React.createElement('div', { 'data-layout-group': id, ...props }, children);

const Reorder = {
  Group: ({ children, axis, values, onReorder, ...props }) =>
    React.createElement('div', { 'data-reorder-group': axis, ...props }, children),
  Item: ({ children, value, ...props }) =>
    React.createElement('div', { 'data-reorder-item': value, ...props }, children)
};

module.exports = {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useVelocity,
  useDragControls,
  LayoutGroup,
  Reorder,
  // Additional exports
  LazyMotion: ({ children }) => children,
  domAnimation: {},
  domMax: {},
  m: motion,
  stagger: jest.fn((delayValue, options) => delayValue),
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  circIn: 'circIn',
  circOut: 'circOut',
  circInOut: 'circInOut',
  backIn: 'backIn',
  backOut: 'backOut',
  backInOut: 'backInOut',
  anticipate: 'anticipate'
};