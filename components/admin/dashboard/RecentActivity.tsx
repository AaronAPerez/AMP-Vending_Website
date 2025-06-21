import Card from "@/components/ui/core/Card";
import { motion } from "framer-motion";
import { CameraIcon, StarIcon, MessageSquareIcon, ClockIcon, BarChart3Icon } from "lucide-react";

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