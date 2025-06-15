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