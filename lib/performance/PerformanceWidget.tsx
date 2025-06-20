
// // =============================================================================
// // PERFORMANCE MONITORING COMPONENT
// // =============================================================================

// /**
//  * Performance monitoring component for development
//  */
// interface PerformanceWidgetProps {
//   position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
//   enabled?: boolean;
// }

// export function PerformanceWidget({ 
//   position = 'bottom-right', 
//   enabled = process.env.NODE_ENV === 'development' 
// }: PerformanceWidgetProps) {
//   const { performanceScore, suggestions } = usePerformanceMonitoring(enabled);
//   const [isExpanded, setIsExpanded] = React.useState(false);

//   if (!enabled || performanceScore === null) return null;

//   const positionClasses = {
//     'top-left': 'top-4 left-4',
//     'top-right': 'top-4 right-4',
//     'bottom-left': 'bottom-4 left-4',
//     'bottom-right': 'bottom-4 right-4'
//   };

//   const scoreColor = performanceScore >= 90 ? 'text-green-400' : 
//                     performanceScore >= 70 ? 'text-yellow-400' : 'text-red-400';

//   return (
//     <div className={`fixed ${positionClasses[position]} z-50 font-mono text-sm`}>
//       <div className="bg-black/90 border border-gray-700 rounded-lg p-3 backdrop-blur-sm">
//         <div 
//           className="flex items-center cursor-pointer"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           <div className="flex items-center space-x-2">
//             <div className={`w-3 h-3 rounded-full ${
//               performanceScore >= 90 ? 'bg-green-400' : 
//               performanceScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
//             }`} />
//             <span className="text-white">Perf:</span>
//             <span className={scoreColor}>{performanceScore.toFixed(0)}</span>
//           </div>
//           <span className="text-gray-400 ml-2">{isExpanded ? '▼' : '▶'}</span>
//         </div>

//         {isExpanded && suggestions.length > 0 && (
//           <div className="mt-3 space-y-1 max-w-xs">
//             <div className="text-gray-300 text-xs font-semibold">Optimization Tips:</div>
//             {suggestions.slice(0, 3).map((suggestion, index) => (
//               <div key={index} className="text-gray-400 text-xs">
//                 {suggestion}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // =============================================================================
// // EXPORTS
// // =============================================================================

// export { PerformanceMonitor, PerformanceOptimizer, usePerformanceMonitoring, PerformanceWidget };
