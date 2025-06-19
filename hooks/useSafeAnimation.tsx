/**
 * Quick Fix for Tailwind CSS Dynamic Class Warnings
 * 
 * Replace any usage of these patterns in your components:
 * - duration-[var(--duration)]
 * - ease-[var(--easing)]
 * - delay-[var(--delay)]
 */

import React from 'react';

/**
 * SafeAnimationProps - Clean animation properties without warnings
 */
interface SafeAnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
  enabled?: boolean;
}

/**
 * useSafeAnimation - Hook to generate clean animation styles
 * 
 * Instead of using dynamic Tailwind classes that cause warnings,
 * this hook returns inline styles that work perfectly.
 */
export const useSafeAnimation = ({
  duration = 300,
  delay = 0,
  easing = 'ease-out',
  enabled = true,
}: SafeAnimationProps = {}) => {
  const styles = React.useMemo(() => {
    if (!enabled) return {};

    return {
      transitionProperty: 'all',
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: easing,
    };
  }, [duration, delay, easing, enabled]);

  return styles;
};

/**
 * SafeAnimatedDiv - Drop-in replacement for divs with problematic classes
 * 
 * Usage:
 * Instead of:
 * <div className="duration-[var(--duration)] ease-[var(--easing)]">
 * 
 * Use:
 * <SafeAnimatedDiv duration={300} easing="ease-out">
 */
interface SafeAnimatedDivProps extends SafeAnimationProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // For other HTML attributes
}

export const SafeAnimatedDiv = ({
  children,
  className = '',
  style = {},
  duration,
  delay,
  easing,
  enabled,
  ...props
}: SafeAnimatedDivProps) => {
  const animationStyles = useSafeAnimation({
    duration: duration ?? 300,
    delay: delay ?? 0,
    easing: easing ?? 'ease-out',
    enabled: enabled ?? true,
  });
  
  return (
    <div
      className={`transition-all ${className}`}
      style={{ ...animationStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * REPLACEMENT PATTERNS
 * 
 * Find and replace these patterns in your codebase:
 */

// ❌ PROBLEMATIC (causes warnings):
// className="duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)]"

// ✅ SOLUTION 1: Use inline styles
// style={{
//   transitionDuration: 'var(--duration)',
//   transitionTimingFunction: 'var(--easing)',
//   transitionDelay: 'var(--delay)',
// }}

// ✅ SOLUTION 2: Use the SafeAnimatedDiv component
// <SafeAnimatedDiv duration={300} easing="ease-out" delay={100}>

// ✅ SOLUTION 3: Use predefined Tailwind classes
// className="duration-300 ease-out delay-100"

/**
 * QUICK SEARCH AND REPLACE COMMANDS
 * 
 * Run these in your terminal to find the problematic files:
 * 
 * grep -r "duration-\[var(" components/
 * grep -r "ease-\[var(" components/
 * grep -r "delay-\[var(" components/
 */

/**
 * Example component showing the fix in action
 */
const ExampleFixedComponent = () => {
  // ❌ OLD WAY (causes warnings):
  // const oldClassName = "duration-[var(--duration)] ease-[var(--easing)]";

  // ✅ NEW WAY (no warnings):
  const animationStyles = useSafeAnimation({
    duration: 300,
    easing: 'ease-out',
    delay: 0,
  });

  return (
    <div
      className="transition-all bg-black text-white p-4 rounded-lg"
      style={animationStyles}
    >
      <p>This component uses clean animations without Tailwind warnings!</p>
    </div>
  );
};

export default ExampleFixedComponent;