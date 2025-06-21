// /**
//  * AdminDashboardOverview Component - Main Dashboard Interface
//  * 
//  * Build Process Documentation:
//  * 1. Comprehensive business metrics dashboard
//  * 2. Real-time performance monitoring
//  * 3. Quick action buttons for common tasks
//  * 4. SEO health indicators and alerts
//  * 5. Integration with Google Business Profile data
//  */

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import {
//   TrendingUpIcon,
//   EyeIcon,
//   PhoneIcon,
//   StarIcon,
//   CameraIcon,
//   MessageSquareIcon,
//   MapPinIcon,
//   CalendarIcon,
//   AlertTriangleIcon,
//   CheckCircleIcon,
//   BarChart3Icon,
//   UsersIcon,
//   GlobeIcon,
//   ArrowUpIcon,
//   ArrowDownIcon,
//   MousePointerClickIcon,
//   ClockIcon,
// } from 'lucide-react';
// import useBusinessProfile from '@/hooks/useBusinessProfile';
// import Card from '../ui/core/Card';
// import { motion } from 'framer-motion';

// /**
//  * Metric Card Component
//  */
// interface MetricCardProps {
//   title: string;
//   value: string | number;
//   change: string;
//   changeType: 'positive' | 'negative' | 'neutral';
//   icon: React.ComponentType<{ size?: number; className?: string }>;
//   trend?: number[];
//   onClick?: () => void;
// }

// const MetricCard: React.FC<MetricCardProps> = ({
//   title,
//   value,
//   change,
//   changeType,
//   icon: Icon,
//   trend,
//   onClick
// }) => {
//   const changeColors = {
//     positive: 'text-green-400 bg-green-500/20',
//     negative: 'text-red-400 bg-red-500/20',
//     neutral: 'text-yellow-400 bg-yellow-500/20'
//   };

//   const ChangeIcon = changeType === 'positive' ? ArrowUpIcon :
//     changeType === 'negative' ? ArrowDownIcon :
//       TrendingUpIcon;

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         onClick={onClick}
//         style={onClick ? { cursor: 'pointer' } : {}}
//       >
//         <Card
//           className={`p-6 hover:border-[#FD5A1E]/30 transition-all ${onClick ? 'hover:scale-105' : ''}`}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <Icon size={24} className="text-[#FD5A1E]" />
//             <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
//               <ChangeIcon size={12} className="mr-1" />
//               {change}
//             </div>
//           </div>

//           <div className="text-2xl font-bold text-[#F5F5F5] mb-1">
//             {typeof value === 'number' ? value.toLocaleString() : value}
//           </div>

//           <div className="text-sm text-[#A5ACAF]">{title}</div>

//           {trend && (
//             <div className="mt-4 h-8">
//               <svg viewBox="0 0 100 20" className="w-full h-full">
//                 <polyline
//                   fill="none"
//                   stroke="#FD5A1E"
//                   strokeWidth="2"
//                   points={trend.map((value, index) =>
//                     `${index * (100 / (trend.length - 1))},${20 - (value / Math.max(...trend)) * 20}`
//                   ).join(' ')}
//                 />
//               </svg>
//             </div>
//           )}
//         </Card>
//       </motion.div>
//     </>
//   );
// };

// /**
//  * Action Item Component
//  */
// interface ActionItemProps {
//   title: string;
//   description: string;
//   priority: 'high' | 'medium' | 'low';
//   action: string;
//   href?: string;
//   onClick?: () => void;
// }

// const ActionItem: React.FC<ActionItemProps> = ({
//   title,
//   description,
//   priority,
//   action,
//   href,
//   onClick
// }) => {
//   const priorityColors = {
//     high: 'border-red-500/30 bg-red-500/10',
//     medium: 'border-yellow-500/30 bg-yellow-500/10',
//     low: 'border-green-500/30 bg-green-500/10'
//   };

//   const priorityIcons = {
//     high: AlertTriangleIcon,
//     medium: ClockIcon,
//     low: CheckCircleIcon
//   };

//   const PriorityIcon = priorityIcons[priority];

//   const content = (
//     <div className={`p-4 rounded-lg border ${priorityColors[priority]} hover:border-[#FD5A1E]/30 transition-colors cursor-pointer`}>
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center mb-2">
//             <PriorityIcon size={16} className="text-[#FD5A1E] mr-2" />
//             <h4 className="text-[#F5F5F5] font-medium text-sm">{title}</h4>
//           </div>
//           <p className="text-[#A5ACAF] text-xs mb-3">{description}</p>
//           <span className="text-[#FD5A1E] text-xs font-medium">{action}</span>
//         </div>
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority === 'high' ? 'bg-red-500/20 text-red-400' :
//             priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
//               'bg-green-500/20 text-green-400'
//           }`}>
//           {priority}
//         </span>
//       </div>
//     </div>
//   );

//   if (href) {
//     return <Link href={href}>{content}</Link>;
//   }

//   return <div onClick={onClick}>{content}</div>;
// };



// /**
//  * SEO Health Monitor Component
//  */
// const SEOHealthMonitor: React.FC = () => {
//   const healthChecks = [
//     {
//       item: 'Business Information',
//       status: 'good',
//       score: 95,
//       message: 'All information is complete and optimized'
//     },
//     {
//       item: 'Photos & Media',
//       status: 'warning',
//       score: 78,
//       message: 'Consider adding more product photos'
//     },
//     {
//       item: 'Reviews Management',
//       status: 'good',
//       score: 92,
//       message: 'Excellent review response rate'
//     },
//     {
//       item: 'Local Keywords',
//       status: 'good',
//       score: 88,
//       message: 'Good keyword optimization'
//     },
//     {
//       item: 'Google Posts',
//       status: 'warning',
//       score: 72,
//       message: 'Post more regularly for better engagement'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'good': return 'text-green-400';
//       case 'warning': return 'text-yellow-400';
//       case 'error': return 'text-red-400';
//       default: return 'text-[#A5ACAF]';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'good': return CheckCircleIcon;
//       case 'warning': return AlertTriangleIcon;
//       case 'error': return AlertTriangleIcon;
//       default: return ClockIcon;
//     }
//   };

//   const overallScore = Math.round(healthChecks.reduce((sum, check) => sum + check.score, 0) / healthChecks.length);

//   return (
//     <Card className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-bold text-[#F5F5F5]">SEO Health Monitor</h3>
//         <div className="text-right">
//           <div className="text-2xl font-bold text-[#FD5A1E]">{overallScore}%</div>
//           <div className="text-xs text-[#A5ACAF]">Overall Score</div>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {healthChecks.map((check, index) => {
//           const StatusIcon = getStatusIcon(check.status);

//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-center justify-between p-3 bg-[#111111] rounded-lg"
//             >
//               <div className="flex items-center flex-1">
//                 <StatusIcon size={16} className={`${getStatusColor(check.status)} mr-3`} />
//                 <div className="flex-1">
//                   <div className="text-[#F5F5F5] text-sm font-medium">{check.item}</div>
//                   <div className="text-[#A5ACAF] text-xs">{check.message}</div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-[#F5F5F5] font-medium">{check.score}%</div>
//                 <div className="w-16 h-2 bg-[#333333] rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all duration-500 ${check.status === 'good' ? 'bg-green-400' :
//                         check.status === 'warning' ? 'bg-yellow-400' :
//                           'bg-red-400'
//                       }`}
//                     style={{ width: `${check.score}%` }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </Card>
//   );
// };
