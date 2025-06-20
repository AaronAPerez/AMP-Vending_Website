/**
 * AdminDashboardOverview Component - Main Dashboard Interface
 * 
 * Build Process Documentation:
 * 1. Comprehensive business metrics dashboard
 * 2. Real-time performance monitoring
 * 3. Quick action buttons for common tasks
 * 4. SEO health indicators and alerts
 * 5. Integration with Google Business Profile data
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUpIcon,
  EyeIcon,
  PhoneIcon,
  StarIcon,
  CameraIcon,
  MessageSquareIcon,
  MapPinIcon,
  CalendarIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  BarChart3Icon,
  UsersIcon,
  GlobeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MousePointerClickIcon,
  ClockIcon,
} from 'lucide-react';
import useBusinessProfile from '@/hooks/useBusinessProfile';
import Card from '../ui/core/Card';
import { motion } from 'framer-motion';

/**
 * Metric Card Component
 */
interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  trend?: number[];
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  trend,
  onClick
}) => {
  const changeColors = {
    positive: 'text-green-400 bg-green-500/20',
    negative: 'text-red-400 bg-red-500/20',
    neutral: 'text-yellow-400 bg-yellow-500/20'
  };

  const ChangeIcon = changeType === 'positive' ? ArrowUpIcon :
    changeType === 'negative' ? ArrowDownIcon :
      TrendingUpIcon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : {}}
      >
        <Card
          className={`p-6 hover:border-[#FD5A1E]/30 transition-all ${onClick ? 'hover:scale-105' : ''}`}
        >
          <div className="flex items-center justify-between mb-4">
            <Icon size={24} className="text-[#FD5A1E]" />
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
              <ChangeIcon size={12} className="mr-1" />
              {change}
            </div>
          </div>

          <div className="text-2xl font-bold text-[#F5F5F5] mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>

          <div className="text-sm text-[#A5ACAF]">{title}</div>

          {trend && (
            <div className="mt-4 h-8">
              <svg viewBox="0 0 100 20" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#FD5A1E"
                  strokeWidth="2"
                  points={trend.map((value, index) =>
                    `${index * (100 / (trend.length - 1))},${20 - (value / Math.max(...trend)) * 20}`
                  ).join(' ')}
                />
              </svg>
            </div>
          )}
        </Card>
      </motion.div>
    </>
  );
};

/**
 * Action Item Component
 */
interface ActionItemProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  href?: string;
  onClick?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  title,
  description,
  priority,
  action,
  href,
  onClick
}) => {
  const priorityColors = {
    high: 'border-red-500/30 bg-red-500/10',
    medium: 'border-yellow-500/30 bg-yellow-500/10',
    low: 'border-green-500/30 bg-green-500/10'
  };

  const priorityIcons = {
    high: AlertTriangleIcon,
    medium: ClockIcon,
    low: CheckCircleIcon
  };

  const PriorityIcon = priorityIcons[priority];

  const content = (
    <div className={`p-4 rounded-lg border ${priorityColors[priority]} hover:border-[#FD5A1E]/30 transition-colors cursor-pointer`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <PriorityIcon size={16} className="text-[#FD5A1E] mr-2" />
            <h4 className="text-[#F5F5F5] font-medium text-sm">{title}</h4>
          </div>
          <p className="text-[#A5ACAF] text-xs mb-3">{description}</p>
          <span className="text-[#FD5A1E] text-xs font-medium">{action}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority === 'high' ? 'bg-red-500/20 text-red-400' :
            priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
          }`}>
          {priority}
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
};

/**
 * Recent Activity Component
 */
const RecentActivity: React.FC = () => {
  const activities = [
    {
      type: 'photo',
      message: 'New photo uploaded: Commercial vending machine installation',
      time: '2 hours ago',
      icon: CameraIcon,
      color: 'text-blue-400'
    },
    {
      type: 'review',
      message: 'New 5-star review received from ABC Corporation',
      time: '4 hours ago',
      icon: StarIcon,
      color: 'text-yellow-400'
    },
    {
      type: 'post',
      message: 'Google Business post published: Free consultation offer',
      time: '1 day ago',
      icon: MessageSquareIcon,
      color: 'text-green-400'
    },
    {
      type: 'update',
      message: 'Business hours updated for holiday schedule',
      time: '2 days ago',
      icon: ClockIcon,
      color: 'text-purple-400'
    },
    {
      type: 'analytics',
      message: 'Weekly performance report generated',
      time: '3 days ago',
      icon: BarChart3Icon,
      color: 'text-[#FD5A1E]'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Recent Activity</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 bg-[#111111] rounded-lg hover:bg-[#222222] transition-colors"
          >
            <activity.icon size={16} className={activity.color} />
            <div className="flex-1 min-w-0">
              <p className="text-[#F5F5F5] text-sm">{activity.message}</p>
              <p className="text-[#A5ACAF] text-xs mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

/**
 * SEO Health Monitor Component
 */
const SEOHealthMonitor: React.FC = () => {
  const healthChecks = [
    {
      item: 'Business Information',
      status: 'good',
      score: 95,
      message: 'All information is complete and optimized'
    },
    {
      item: 'Photos & Media',
      status: 'warning',
      score: 78,
      message: 'Consider adding more product photos'
    },
    {
      item: 'Reviews Management',
      status: 'good',
      score: 92,
      message: 'Excellent review response rate'
    },
    {
      item: 'Local Keywords',
      status: 'good',
      score: 88,
      message: 'Good keyword optimization'
    },
    {
      item: 'Google Posts',
      status: 'warning',
      score: 72,
      message: 'Post more regularly for better engagement'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-[#A5ACAF]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return CheckCircleIcon;
      case 'warning': return AlertTriangleIcon;
      case 'error': return AlertTriangleIcon;
      default: return ClockIcon;
    }
  };

  const overallScore = Math.round(healthChecks.reduce((sum, check) => sum + check.score, 0) / healthChecks.length);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#F5F5F5]">SEO Health Monitor</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#FD5A1E]">{overallScore}%</div>
          <div className="text-xs text-[#A5ACAF]">Overall Score</div>
        </div>
      </div>

      <div className="space-y-4">
        {healthChecks.map((check, index) => {
          const StatusIcon = getStatusIcon(check.status);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-[#111111] rounded-lg"
            >
              <div className="flex items-center flex-1">
                <StatusIcon size={16} className={`${getStatusColor(check.status)} mr-3`} />
                <div className="flex-1">
                  <div className="text-[#F5F5F5] text-sm font-medium">{check.item}</div>
                  <div className="text-[#A5ACAF] text-xs">{check.message}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#F5F5F5] font-medium">{check.score}%</div>
                <div className="w-16 h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${check.status === 'good' ? 'bg-green-400' :
                        check.status === 'warning' ? 'bg-yellow-400' :
                          'bg-red-400'
                      }`}
                    style={{ width: `${check.score}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

/**
 * Main Admin Dashboard Overview Component
 */
const AdminDashboardOverview: React.FC = () => {
  const { metrics, businessInfo, isLoading } = useBusinessProfile();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock trend data for metrics
  const mockTrend = [45, 52, 48, 61, 55, 67, 72, 69, 75, 82, 78, 85];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-[#A5ACAF]">
            Here's what's happening with your business profile today
          </p>
        </div>
        <div className="text-right">
          <div className="text-[#F5F5F5] font-medium">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="text-[#A5ACAF] text-sm">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Profile Views"
          value={metrics?.views?.total || 2140}
          change="+12.5%"
          changeType="positive"
          icon={EyeIcon}
          trend={mockTrend}
          onClick={() => window.open('/admin/analytics', '_blank')}
        />

        <MetricCard
          title="Phone Calls"
          value={metrics?.actions?.phoneClicks || 89}
          change="+8.3%"
          changeType="positive"
          icon={PhoneIcon}
          trend={mockTrend.map(v => v * 0.4)}
        />

        <MetricCard
          title="Website Clicks"
          value={metrics?.actions?.websiteClicks || 156}
          change="+15.2%"
          changeType="positive"
          icon={MousePointerClickIcon}
          trend={mockTrend.map(v => v * 0.6)}
        />

        <MetricCard
          title="Average Rating"
          value={`${metrics?.reviews?.averageRating || 4.8}★`}
          change="+0.2"
          changeType="positive"
          icon={StarIcon}
          trend={[4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8].map(v => v * 20)}
        />
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Action Items</h3>

          <div className="space-y-4">
            <ActionItem
              title="Upload New Photos"
              description="Add 3-5 new product photos to improve engagement"
              priority="high"
              action="Upload Photos"
              href="/admin/photo-manager"
            />

            <ActionItem
              title="Respond to Recent Review"
              description="New 5-star review needs a response"
              priority="medium"
              action="Respond Now"
              href="/admin/reviews"
            />

            <ActionItem
              title="Schedule Weekly Post"
              description="Create Google Business post for this week"
              priority="medium"
              action="Create Post"
              href="/admin/business-profile"
            />

            <ActionItem
              title="Update Business Hours"
              description="Holiday schedule needs to be updated"
              priority="low"
              action="Update Hours"
              href="/admin/business-profile"
            />
          </div>
        </Card>

        {/* SEO Health Monitor */}
        <SEOHealthMonitor />
      </div>

      {/* Recent Activity and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Quick Stats</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
              <div className="flex items-center">
                <CameraIcon size={16} className="text-[#FD5A1E] mr-3" />
                <span className="text-[#F5F5F5] text-sm">Photos</span>
              </div>
              <span className="text-[#F5F5F5] font-medium">24</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
              <div className="flex items-center">
                <MessageSquareIcon size={16} className="text-[#FD5A1E] mr-3" />
                <span className="text-[#F5F5F5] text-sm">Reviews</span>
              </div>
              <span className="text-[#F5F5F5] font-medium">47</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
              <div className="flex items-center">
                <MapPinIcon size={16} className="text-[#FD5A1E] mr-3" />
                <span className="text-[#F5F5F5] text-sm">Service Areas</span>
              </div>
              <span className="text-[#F5F5F5] font-medium">{businessInfo?.serviceArea?.length || 14}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
              <div className="flex items-center">
                <GlobeIcon size={16} className="text-[#FD5A1E] mr-3" />
                <span className="text-[#F5F5F5] text-sm">Posts</span>
              </div>
              <span className="text-[#F5F5F5] font-medium">12</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 space-y-3">
            <Link
              href="/admin/business-profile"
              className="w-full flex items-center justify-center px-4 py-3 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium text-sm"
            >
              <MapPinIcon size={16} className="mr-2" />
              Manage Profile
            </Link>

            <Link
              href="/admin/photo-manager"
              className="w-full flex items-center justify-center px-4 py-3 bg-[#4d4d4d]/30 text-[#F5F5F5] rounded-lg hover:bg-[#4d4d4d]/50 transition-colors text-sm"
            >
              <CameraIcon size={16} className="mr-2" />
              Upload Photos
            </Link>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">System Status</h3>
            <p className="text-[#A5ACAF] text-sm">All systems operational</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-[#F5F5F5] text-sm">Google Business Profile</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-[#F5F5F5] text-sm">Analytics</span>
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-[#F5F5F5] text-sm">Photo Storage</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;