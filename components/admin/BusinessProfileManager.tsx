/**
 * BusinessProfileManager Component - Google Business Profile Optimization Interface
 * 
 * Build Process Documentation:
 * 1. Admin interface for managing Google Business Profile optimization
 * 2. SEO content generation and preview functionality
 * 3. Performance metrics tracking and analytics
 * 4. NAP consistency monitoring across platforms
 * 5. Automated content scheduling for maximum visibility
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon,
  StarIcon,
  EyeIcon,
  MousePointerClickIcon,
  CameraIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlusIcon,
  EditIcon,
  CalendarIcon,
  TargetIcon,
  GlobeIcon
} from 'lucide-react';
import useBusinessProfile from '@/hooks/useBusinessProfile';
import Card from '../ui/core/Card';


/**
 * Business Profile Summary Card Component
 */
const BusinessSummaryCard: React.FC<{ businessInfo: any }> = ({ businessInfo }) => (
  <Card className="p-6 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent border-[#FD5A1E]/30">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">{businessInfo.name}</h2>
        <p className="text-[#A5ACAF] text-sm max-w-md">{businessInfo.shortDescription}</p>
      </div>
      <div className="flex items-center bg-[#FD5A1E]/20 px-3 py-1 rounded-full">
        <CheckCircleIcon size={16} className="text-[#FD5A1E] mr-2" />
        <span className="text-[#FD5A1E] text-sm font-medium">Verified</span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex items-center">
          <MapPinIcon size={16} className="text-[#FD5A1E] mr-3" />
          <span className="text-[#F5F5F5] text-sm">{businessInfo.address}</span>
        </div>
        <div className="flex items-center">
          <PhoneIcon size={16} className="text-[#FD5A1E] mr-3" />
          <span className="text-[#F5F5F5] text-sm">{businessInfo.phone}</span>
        </div>
        <div className="flex items-center">
          <GlobeIcon size={16} className="text-[#FD5A1E] mr-3" />
          <span className="text-[#F5F5F5] text-sm">{businessInfo.website}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <ClockIcon size={16} className="text-[#FD5A1E] mr-3" />
          <span className="text-[#F5F5F5] text-sm">Mon-Sun: 8:00 AM - 8:00 PM</span>
        </div>
        <div className="flex items-center">
          <TargetIcon size={16} className="text-[#FD5A1E] mr-3" />
          <span className="text-[#F5F5F5] text-sm">{businessInfo.serviceArea.length} service areas</span>
        </div>
      </div>
    </div>
  </Card>
);

/**
 * Performance Metrics Card Component
 */
const PerformanceMetricsCard: React.FC<{ metrics: any; isLoading: boolean }> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-[#4d4d4d] rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-[#4d4d4d] rounded"></div>
            <div className="h-4 bg-[#4d4d4d] rounded"></div>
            <div className="h-4 bg-[#4d4d4d] rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!metrics) return null;

  const metricsData = [
    {
      label: 'Profile Views',
      value: metrics.views.total.toLocaleString(),
      icon: EyeIcon,
      change: '+12%',
      positive: true,
    },
    {
      label: 'Total Actions',
      value: metrics.actions.total.toLocaleString(),
      icon: MousePointerClickIcon,
      change: '+8%',
      positive: true,
    },
    {
      label: 'Photo Views',
      value: metrics.photos.views.toLocaleString(),
      icon: CameraIcon,
      change: '+15%',
      positive: true,
    },
    {
      label: 'Avg Rating',
      value: metrics.reviews.averageRating.toFixed(1),
      icon: StarIcon,
      change: '+0.2',
      positive: true,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#F5F5F5]">Profile Performance</h3>
        <TrendingUpIcon size={20} className="text-[#FD5A1E]" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-[#111111] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon size={16} className="text-[#FD5A1E]" />
              <span className={`text-xs font-medium ${
                metric.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-xl font-bold text-[#F5F5F5] mb-1">{metric.value}</div>
            <div className="text-xs text-[#A5ACAF]">{metric.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/**
 * SEO Posts Management Component
 */
const SEOPostsManager: React.FC<{ posts: any[]; onGenerateWeekly: () => void }> = ({ 
  posts, 
  onGenerateWeekly 
}) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#F5F5F5]">Google Business Posts</h3>
        <button
          onClick={onGenerateWeekly}
          className="flex items-center px-4 py-2 bg-[#FD5A1E] text-[#000000] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors font-medium"
        >
          <PlusIcon size={16} className="mr-2" />
          Generate Weekly Content
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.slice(0, 4).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#111111] rounded-lg p-4 hover:bg-[#222222] transition-colors cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                    post.type === 'PRODUCT' ? 'bg-blue-500/20 text-blue-400' :
                    post.type === 'OFFER' ? 'bg-green-500/20 text-green-400' :
                    post.type === 'UPDATE' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {post.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {post.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h4 className="text-[#F5F5F5] font-medium mb-2">{post.title}</h4>
                <p className="text-[#A5ACAF] text-sm line-clamp-2">{post.description}</p>
              </div>
              <EditIcon size={16} className="text-[#A5ACAF] ml-4" />
            </div>
            
            <div className="flex items-center justify-between text-xs text-[#A5ACAF]">
              <div className="flex items-center">
                <CalendarIcon size={12} className="mr-1" />
                {post.publishDate.toLocaleDateString()}
              </div>
              <div className="flex flex-wrap gap-1">
                {post.targetKeywords.slice(0, 2).map((keyword: string, idx: number) => (
                  <span key={idx} className="bg-[#4d4d4d]/50 px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

/**
 * FAQ Management Component
 */
const FAQManager: React.FC<{ faqs: any[]; onUpdateFAQ: (id: string, updates: any) => void }> = ({ 
  faqs, 
  onUpdateFAQ 
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#F5F5F5]">Q&A Management</h3>
        <div className="flex items-center text-sm text-[#A5ACAF]">
          <CheckCircleIcon size={16} className="text-green-400 mr-2" />
          {faqs.filter(faq => faq.isPublished).length} Published
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#111111] rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                    faq.category === 'general' ? 'bg-blue-500/20 text-blue-400' :
                    faq.category === 'pricing' ? 'bg-green-500/20 text-green-400' :
                    faq.category === 'service' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {faq.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    faq.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {faq.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h4 className="text-[#F5F5F5] font-medium mb-2">{faq.question}</h4>
                <p className="text-[#A5ACAF] text-sm line-clamp-2">{faq.answer}</p>
              </div>
              <button
                onClick={() => onUpdateFAQ(faq.id, { isPublished: !faq.isPublished })}
                className="ml-4 p-2 hover:bg-[#4d4d4d]/30 rounded transition-colors"
              >
                <EditIcon size={16} className="text-[#A5ACAF]" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {faq.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                <span key={idx} className="bg-[#4d4d4d]/50 px-2 py-1 rounded text-xs text-[#A5ACAF]">
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

/**
 * Main Business Profile Manager Component
 */
const BusinessProfileManager: React.FC = () => {
  const {
    businessInfo,
    services,
    posts,
    faqs,
    metrics,
    isLoading,
    error,
    generateWeeklyContent,
    updateFAQ,
    trackBusinessProfilePerformance,
  } = useBusinessProfile();

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div className="flex items-center">
          <AlertCircleIcon size={20} className="text-red-500 mr-3" />
          <span className="text-red-400">Error loading business profile data: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
            Google Business Profile Manager
          </h1>
          <p className="text-[#A5ACAF]">
            Optimize your local SEO presence and track performance metrics
          </p>
        </div>
        <button
          onClick={trackBusinessProfilePerformance}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-[#4d4d4d]/30 text-[#F5F5F5] rounded-lg hover:bg-[#4d4d4d]/50 transition-colors disabled:opacity-50"
        >
          <TrendingUpIcon size={16} className="mr-2" />
          {isLoading ? 'Refreshing...' : 'Refresh Metrics'}
        </button>
      </div>

      {/* Business Summary */}
      <BusinessSummaryCard businessInfo={businessInfo} />

      {/* Performance Metrics */}
      <PerformanceMetricsCard metrics={metrics} isLoading={isLoading} />

      {/* Content Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Posts */}
        <SEOPostsManager 
          posts={posts} 
          onGenerateWeekly={generateWeeklyContent} 
        />

        {/* FAQ Management */}
        <FAQManager 
          faqs={faqs} 
          onUpdateFAQ={updateFAQ} 
        />
      </div>

      {/* Services Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">Featured Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#111111] rounded-lg p-4"
            >
              <h4 className="text-[#F5F5F5] font-medium mb-2">{service.name}</h4>
              <p className="text-[#A5ACAF] text-sm line-clamp-3">{service.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {service.keywords.slice(0, 2).map((keyword, idx) => (
                  <span key={idx} className="bg-[#FD5A1E]/20 text-[#FD5A1E] px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-[#111111] rounded-lg hover:bg-[#222222] transition-colors">
            <CameraIcon size={20} className="text-[#FD5A1E] mr-3" />
            <span className="text-[#F5F5F5]">Upload Photos</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-[#111111] rounded-lg hover:bg-[#222222] transition-colors">
            <MessageSquareIcon size={20} className="text-[#FD5A1E] mr-3" />
            <span className="text-[#F5F5F5]">Respond to Reviews</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-[#111111] rounded-lg hover:bg-[#222222] transition-colors">
            <EditIcon size={20} className="text-[#FD5A1E] mr-3" />
            <span className="text-[#F5F5F5]">Update Business Info</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default BusinessProfileManager;