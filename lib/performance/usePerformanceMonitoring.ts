
// // =============================================================================
// // REACT HOOK FOR PERFORMANCE MONITORING
// // =============================================================================

// /**
//  * Custom hook for performance monitoring in React components
//  */
// export function usePerformanceMonitoring(enabled = true) {
//   const [performanceScore, setPerformanceScore] = React.useState<number | null>(null);
//   const [isMonitoring, setIsMonitoring] = React.useState(false);
//   const [suggestions, setSuggestions] = React.useState<string[]>([]);

//   React.useEffect(() => {
//     if (!enabled || typeof window === 'undefined' || isMonitoring) return;

//     const monitor = new PerformanceMonitor((report) => {
//       // Update performance score
//       const score = monitor.getPerformanceScore();
//       setPerformanceScore(score);

//       // Get optimization suggestions
//       const optimizer = new PerformanceOptimizer(monitor);
//       const newSuggestions = optimizer.analyzePage();
//       setSuggestions(newSuggestions);

//       // Send to analytics if configured
//       if (typeof window.gtag !== 'undefined') {
//         window.gtag('event', 'performance_report', {
//           custom_parameter: {
//             lcp: report.metrics.LCP,
//             fid: report.metrics.FID,
//             cls: report.metrics.CLS,
//             score: score
//           }
//         });
//       }
//     });

//     monitor.startMonitoring();
//     setIsMonitoring(true);

//     return () => {
//       setIsMonitoring(false);
//     };
//   }, [enabled, isMonitoring]);

//   return {
//     performanceScore,
//     suggestions,
//     isMonitoring
//   };
// }