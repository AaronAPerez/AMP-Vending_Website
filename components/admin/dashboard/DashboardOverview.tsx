// import Card from "@/components/ui/core/Card";
// import useBusinessProfile from "@/hooks/useBusinessProfile";
// import { EyeIcon, PhoneIcon, MousePointerClickIcon, StarIcon, CameraIcon, MessageSquareIcon, MapPinIcon, GlobeIcon, Link } from "lucide-react";
// import { useState, useEffect } from "react";

// /**
//  * Main Admin Dashboard Overview Component
//  */
// const AdminDashboardOverview: React.FC = () => {
//   const { metrics, businessInfo, isLoading } = useBusinessProfile();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Update current time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     return () => clearInterval(timer);
//   }, []);

//   // Mock trend data for metrics
//   const mockTrend = [45, 52, 48, 61, 55, 67, 72, 69, 75, 82, 78, 85];

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
//             Welcome back! 👋
//           </h1>
//           <p className="text-[#A5ACAF]">
//             Here's what's happening with your business profile today
//           </p>
//         </div>
//         <div className="text-right">
//           <div className="text-[#F5F5F5] font-medium">
//             {currentTime.toLocaleDateString('en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             })}
//           </div>
//           <div className="text-[#A5ACAF] text-sm">
//             {currentTime.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Key Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <MetricCard
//           title="Profile Views"
//           value={metrics?.views?.total || 2140}
//           change="+12.5%"
//           changeType="positive"
//           icon={EyeIcon}
//           trend={mockTrend}
//           onClick={() => window.open('/admin/analytics', '_blank')}
//         />

//         <MetricCard
//           title="Phone Calls"
//           value={metrics?.actions?.phoneClicks || 89}
//           change="+8.3%"
//           changeType="positive"
//           icon={PhoneIcon}
//           trend={mockTrend.map(v => v * 0.4)}
//         />

//         <MetricCard
//           title="Website Clicks"
//           value={metrics?.actions?.websiteClicks || 156}
//           change="+15.2%"
//           changeType="positive"
//           icon={MousePointerClickIcon}
//           trend={mockTrend.map(v => v * 0.6)}
//         />

//         <MetricCard
//           title="Average Rating"
//           value={`${metrics?.reviews?.averageRating || 4.8}★`}
//           change="+0.2"
//           changeType="positive"
//           icon={StarIcon}
//           trend={[4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8].map(v => v * 20)}
//         />
//       </div>

//       {/* Action Items */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="p-6">
//           <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Action Items</h3>

//           <div className="space-y-4">
//             <ActionItem
//               title="Upload New Photos"
//               description="Add 3-5 new product photos to improve engagement"
//               priority="high"
//               action="Upload Photos"
//               href="/admin/photo-manager"
//             />

//             <ActionItem
//               title="Respond to Recent Review"
//               description="New 5-star review needs a response"
//               priority="medium"
//               action="Respond Now"
//               href="/admin/reviews"
//             />

//             <ActionItem
//               title="Schedule Weekly Post"
//               description="Create Google Business post for this week"
//               priority="medium"
//               action="Create Post"
//               href="/admin/business-profile"
//             />

//             <ActionItem
//               title="Update Business Hours"
//               description="Holiday schedule needs to be updated"
//               priority="low"
//               action="Update Hours"
//               href="/admin/business-profile"
//             />
//           </div>
//         </Card>

//         {/* SEO Health Monitor */}
//         <SEOHealthMonitor />
//       </div>

//       {/* Recent Activity and Quick Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Activity */}
//         <div className="lg:col-span-2">
//           <RecentActivity />
//         </div>

//         {/* Quick Stats */}
//         <Card className="p-6">
//           <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Quick Stats</h3>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
//               <div className="flex items-center">
//                 <CameraIcon size={16} className="text-[#FD5A1E] mr-3" />
//                 <span className="text-[#F5F5F5] text-sm">Photos</span>
//               </div>
//               <span className="text-[#F5F5F5] font-medium">24</span>
//             </div>

//             <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
//               <div className="flex items-center">
//                 <MessageSquareIcon size={16} className="text-[#FD5A1E] mr-3" />
//                 <span className="text-[#F5F5F5] text-sm">Reviews</span>
//               </div>
//               <span className="text-[#F5F5F5] font-medium">47</span>
//             </div>

//             <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
//               <div className="flex items-center">
//                 <MapPinIcon size={16} className="text-[#FD5A1E] mr-3" />
//                 <span className="text-[#F5F5F5] text-sm">Service Areas</span>
//               </div>
//               <span className="text-[#F5F5F5] font-medium">{businessInfo?.serviceArea?.length || 14}</span>
//             </div>

//             <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
//               <div className="flex items-center">
//                 <GlobeIcon size={16} className="text-[#FD5A1E] mr-3" />
//                 <span className="text-[#F5F5F5] text-sm">Posts</span>
//               </div>
//               <span className="text-[#F5F5F5] font-medium">12</span>
//             </div>
//           </div>

//           {/* Quick Action Buttons */}
//           <div className="mt-6 space-y-3">
//             <Link
//               href="/admin/business-profile"
//               className="w-full flex items-center justify-center px-4 py-3 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium text-sm"
//             >
//               <MapPinIcon size={16} className="mr-2" />
//               Manage Profile
//             </Link>

//             <Link
//               href="/admin/photo-manager"
//               className="w-full flex items-center justify-center px-4 py-3 bg-[#4d4d4d]/30 text-[#F5F5F5] rounded-lg hover:bg-[#4d4d4d]/50 transition-colors text-sm"
//             >
//               <CameraIcon size={16} className="mr-2" />
//               Upload Photos
//             </Link>
//           </div>
//         </Card>
//       </div>

//       {/* System Status */}
//       <Card className="p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">System Status</h3>
//             <p className="text-[#A5ACAF] text-sm">All systems operational</p>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <span className="text-[#F5F5F5] text-sm">Google Business Profile</span>
//             </div>

//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <span className="text-[#F5F5F5] text-sm">Analytics</span>
//             </div>

//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <span className="text-[#F5F5F5] text-sm">Photo Storage</span>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboardOverview;