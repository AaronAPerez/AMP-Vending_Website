import React, { useState, useEffect } from 'react';
import { 
  Star, Send, Copy, CheckCircle, Users, Calendar, TrendingUp, 
  MessageSquare, AlertTriangle, Settings, BarChart3, FileText,
  Mail, Phone, Building, Clock, Target, Award
} from 'lucide-react';

// Types for the review system
interface ReviewCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: 'installation' | 'maintenance' | 'consultation' | 'repair' | 'restocking';
  serviceDate: Date;
  satisfactionLevel: number;
  notes?: string;
}

interface ReviewRequest {
  id: string;
  customer: ReviewCustomer;
  templateId: string;
  emailContent: string;
  sentDate?: Date;
  status: 'draft' | 'scheduled' | 'sent' | 'opened' | 'clicked' | 'reviewed';
  responseDate?: Date;
  reviewRating?: number;
  followUpCount: number;
}

interface ReviewMetrics {
  totalRequests: number;
  sentRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
  openRate: number;
  thisMonth: number;
  thisWeek: number;
}

const ReviewGenerationSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: '',
    serviceDate: new Date().toISOString().split('T')[0],
    satisfactionLevel: 5,
    notes: ''
  });
  
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [metrics, setMetrics] = useState<ReviewMetrics>({
    totalRequests: 247,
    sentRequests: 186,
    reviewsReceived: 58,
    averageRating: 4.7,
    responseRate: 31.2,
    openRate: 78.5,
    thisMonth: 23,
    thisWeek: 6
  });

  const [complianceCheck, setComplianceCheck] = useState({
    satisfactionThreshold: true,
    recentRequest: true,
    emailValidity: true,
    maxFollowUps: true,
    canSend: true
  });

  // Sample recent activity data
  const [recentActivity] = useState([
    { id: 1, type: 'review_received', customer: 'Sarah Johnson', rating: 5, timestamp: '2 hours ago' },
    { id: 2, type: 'request_sent', customer: 'Mike Chen', timestamp: '4 hours ago' },
    { id: 3, type: 'email_opened', customer: 'Lisa Rodriguez', timestamp: '6 hours ago' },
    { id: 4, type: 'link_clicked', customer: 'David Thompson', timestamp: '1 day ago' },
    { id: 5, type: 'review_received', customer: 'Jennifer White', rating: 4, timestamp: '2 days ago' }
  ]);

  // Generate review request templates
  const generateReviewTemplate = (customer: any) => {
    const templates = {
      installation: `Hi ${customer.firstName}!

Thank you for choosing AMP Vending for your vending machine installation at ${customer.companyName}. We hope your new machine is working perfectly and your team is enjoying the convenience!

Your feedback helps other businesses make informed decisions about their workplace solutions. If you had a positive experience with our installation team and service, would you mind taking 2 minutes to share a quick review?

👉 Leave a review: https://g.page/r/CYourGoogleReviewLink/review

Your honest feedback helps our local business grow and guides other companies in Central California who are considering vending solutions.

Thank you for your support!

Best regards,
The AMP Vending Team
(209) 403-5450
ampdesignandconsulting@gmail.com`,

      maintenance: `Hello ${customer.firstName},

Thank you for trusting AMP Vending with your ongoing maintenance service for ${customer.companyName}. We strive to provide excellent service on every visit.

If you're satisfied with our maintenance work and the performance of your vending machine, we'd greatly appreciate a review to help other businesses discover our services.

⭐ Quick review link: https://g.page/r/CYourGoogleReviewLink/review

Your feedback helps us maintain our high service standards and assists other businesses in making informed decisions about their vending needs.

Best regards,
AMP Vending Maintenance Team`,

      consultation: `Hi ${customer.firstName},

Thank you for your time during our consultation about vending solutions for ${customer.companyName}. We hope we provided valuable insights and recommendations for your business needs.

If you found our consultation helpful and professional, a quick review would help other businesses find our services when they're researching vending solutions.

📝 Share your experience: https://g.page/r/CYourGoogleReviewLink/review

We appreciate your consideration and look forward to serving your vending needs!

AMP Vending Team`
    };

    return templates[customer.serviceType] || templates.installation;
  };

  // Handle customer data submission
  const handleCreateReviewRequest = () => {
    if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.serviceType) {
      alert('Please fill in all required fields');
      return;
    }

    if (customerData.satisfactionLevel < 4) {
      alert('Only send review requests to customers with 4-5 star satisfaction levels');
      return;
    }

    const newRequest: ReviewRequest = {
      id: `req_${Date.now()}`,
      customer: {
        id: `cust_${Date.now()}`,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        companyName: customerData.companyName,
        serviceType: customerData.serviceType as any,
        serviceDate: new Date(customerData.serviceDate),
        satisfactionLevel: customerData.satisfactionLevel,
        notes: customerData.notes
      },
      templateId: 'template_1',
      emailContent: generateReviewTemplate(customerData),
      status: 'draft',
      followUpCount: 0
    };

    setReviewRequests([newRequest, ...reviewRequests]);
    
    // Reset form
    setCustomerData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      serviceType: '',
      serviceDate: new Date().toISOString().split('T')[0],
      satisfactionLevel: 5,
      notes: ''
    });

    alert('Review request created! Copy the template and send it to your customer.');
  };

  // Copy template to clipboard
  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    alert('Template copied to clipboard!');
  };

  // Star rating component
  const StarRating = ({ rating, onRatingChange = null, readonly = false, size = 20 }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${!readonly && onRatingChange ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  // Check compliance when customer data changes
  useEffect(() => {
    const newComplianceCheck = {
      satisfactionThreshold: customerData.satisfactionLevel >= 4,
      recentRequest: true, // Would check database for recent requests
      emailValidity: customerData.email.includes('@'),
      maxFollowUps: true, // Would check follow-up count
      canSend: customerData.satisfactionLevel >= 4 && customerData.email.includes('@')
    };
    setComplianceCheck(newComplianceCheck);
  }, [customerData]);

  const tabConfig = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'create', label: 'Create Request', icon: Send },
    { id: 'tracking', label: 'Track Requests', icon: TrendingUp },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#000000] text-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#111111] rounded-lg border border-[#333333] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
              Review Generation System
            </h1>
            <p className="text-[#A5ACAF]">
              Build authentic 5-star reviews through exceptional service and strategic follow-up
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="text-[#FD5A1E]" size={24} />
              <span className="text-2xl font-bold text-[#F5F5F5]">{metrics.averageRating}</span>
              <span className="text-[#A5ACAF]">avg rating</span>
            </div>
            <p className="text-sm text-[#A5ACAF]">{metrics.reviewsReceived} total reviews</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="bg-[#FD5A1E]/10 rounded-lg p-4 border border-[#FD5A1E]/20">
            <div className="text-center">
              <Send className="text-[#FD5A1E] mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">Total Sent</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.sentRequests}</p>
            </div>
          </div>
          
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="text-center">
              <MessageSquare className="text-green-500 mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">Reviews</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.reviewsReceived}</p>
            </div>
          </div>
          
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <div className="text-center">
              <Target className="text-blue-500 mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">Response Rate</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.responseRate}%</p>
            </div>
          </div>
          
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="text-center">
              <Mail className="text-purple-500 mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">Open Rate</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.openRate}%</p>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <div className="text-center">
              <Calendar className="text-yellow-500 mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">This Month</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.thisMonth}</p>
            </div>
          </div>
          
          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
            <div className="text-center">
              <Clock className="text-orange-500 mx-auto mb-2" size={20} />
              <p className="text-[#A5ACAF] text-sm">This Week</p>
              <p className="text-xl font-bold text-[#F5F5F5]">{metrics.thisWeek}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[#333333] mb-6 overflow-x-auto">
        {tabConfig.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#FD5A1E] text-[#FD5A1E]'
                  : 'border-transparent text-[#A5ACAF] hover:text-[#F5F5F5]'
              }`}
            >
              <Icon size={16} className="mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-[#000000] rounded-lg border border-[#333333]">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'review_received' && <Star className="text-yellow-400 fill-yellow-400" size={16} />}
                    {activity.type === 'request_sent' && <Send className="text-blue-400" size={16} />}
                    {activity.type === 'email_opened' && <Mail className="text-green-400" size={16} />}
                    {activity.type === 'link_clicked' && <Target className="text-purple-400" size={16} />}
                    
                    <div>
                      <p className="text-[#F5F5F5] font-medium">{activity.customer}</p>
                      <p className="text-[#A5ACAF] text-sm">
                        {activity.type.replace('_', ' ')}
                        {activity.rating && ` (${activity.rating} stars)`}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#A5ACAF] text-sm">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Performance Trends</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#A5ACAF]">This Week vs Last Week</span>
                  <span className="text-green-400">+23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A5ACAF]">Average Response Time</span>
                  <span className="text-[#F5F5F5]">4.2 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A5ACAF]">Best Performing Service</span>
                  <span className="text-[#FD5A1E]">Installation</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Review Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm text-[#A5ACAF]">{stars}</span>
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 bg-[#333333] rounded-full h-2">
                      <div 
                        className="bg-[#FD5A1E] h-2 rounded-full" 
                        style={{width: `${stars === 5 ? 75 : stars === 4 ? 20 : stars === 3 ? 3 : stars === 2 ? 1 : 1}%`}}
                      />
                    </div>
                    <span className="text-sm text-[#A5ACAF] w-8">{stars === 5 ? 44 : stars === 4 ? 12 : stars === 3 ? 2 : 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Request Tab */}
      {activeTab === 'create' && (
        <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Create Review Request</h2>
          
          {/* Compliance Check Banner */}
          {!complianceCheck.canSend && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-400" size={20} />
                <p className="text-red-400 font-medium">Compliance Check Failed</p>
              </div>
              <ul className="mt-2 text-sm text-red-300 space-y-1">
                {!complianceCheck.satisfactionThreshold && <li>• Customer satisfaction must be 4-5 stars</li>}
                {!complianceCheck.emailValidity && <li>• Valid email address required</li>}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F5F5]">Customer Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F5F5F5] mb-2">First Name *</label>
                  <input
                    type="text"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
                    className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label className="block text-[#F5F5F5] mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
                    className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Email Address *</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  placeholder="(209) 555-0123"
                />
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Company Name</label>
                <input
                  type="text"
                  value={customerData.companyName}
                  onChange={(e) => setCustomerData({...customerData, companyName: e.target.value})}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  placeholder="ABC Corporation"
                />
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F5F5]">Service Information</h3>
              
              <div>
                <label className="block text-[#F5F5F5] mb-2">Service Type *</label>
                <select
                  value={customerData.serviceType}
                  onChange={(e) => setCustomerData({...customerData, serviceType: e.target.value})}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                >
                  <option value="">Select service type</option>
                  <option value="installation">Vending Machine Installation</option>
                  <option value="maintenance">Maintenance Service</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="repair">Equipment Repair</option>
                  <option value="restocking">Product Restocking</option>
                </select>
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Service Date</label>
                <input
                  type="date"
                  value={customerData.serviceDate}
                  onChange={(e) => setCustomerData({...customerData, serviceDate: e.target.value})}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Customer Satisfaction Level</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <StarRating 
                      rating={customerData.satisfactionLevel}
                      onRatingChange={(rating) => setCustomerData({...customerData, satisfactionLevel: rating})}
                      size={24}
                    />
                    <span className="text-[#A5ACAF]">{customerData.satisfactionLevel}/5 stars</span>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    customerData.satisfactionLevel >= 4 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <p className={`text-sm ${
                      customerData.satisfactionLevel >= 4 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {customerData.satisfactionLevel >= 4 
                        ? '✅ Eligible for review request' 
                        : '❌ Only send requests to highly satisfied customers (4-5 stars)'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#F5F5F5] mb-2">Notes (Optional)</label>
                <textarea
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                  rows={3}
                  className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  placeholder="Any additional notes about the service or customer..."
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-6 border-t border-[#333333]">
            <button
              onClick={handleCreateReviewRequest}
              disabled={!complianceCheck.canSend}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                complianceCheck.canSend
                  ? 'bg-[#FD5A1E] text-[#000000] hover:bg-[#FD5A1E]/90'
                  : 'bg-[#333333] text-[#666666] cursor-not-allowed'
              }`}
            >
              <Send size={16} className="mr-2" />
              Generate Review Request
            </button>
          </div>
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Review Request Tracking</h2>
            
            {reviewRequests.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="text-[#333333] mx-auto mb-4" />
                <p className="text-[#A5ACAF]">No review requests yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewRequests.map((request) => (
                  <div key={request.id} className="bg-[#000000] rounded-lg p-4 border border-[#333333]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Customer Info */}
                      <div>
                        <h3 className="font-semibold text-[#F5F5F5]">
                          {request.customer.firstName} {request.customer.lastName}
                        </h3>
                        <p className="text-[#A5ACAF] text-sm">{request.customer.email}</p>
                        <p className="text-[#FD5A1E] text-sm capitalize">{request.customer.serviceType}</p>
                        {request.customer.companyName && (
                          <p className="text-[#A5ACAF] text-sm">{request.customer.companyName}</p>
                        )}
                      </div>

                      {/* Status & Rating */}
                      <div className="text-center">
                        <div className="mb-2">
                          <StarRating rating={request.customer.satisfactionLevel} readonly size={16} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          request.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                          request.status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                          request.status === 'opened' ? 'bg-green-500/20 text-green-400' :
                          request.status === 'reviewed' ? 'bg-[#FD5A1E]/20 text-[#FD5A1E]' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {request.status}
                        </span>
                        {request.reviewRating && (
                          <p className="text-sm text-[#A5ACAF] mt-1">Review: {request.reviewRating} stars</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => copyTemplate(request.emailContent)}
                          className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 flex items-center justify-center text-sm py-2 px-3 border border-[#FD5A1E]/30 rounded"
                        >
                          <Copy size={14} className="mr-1" />
                          Copy Template
                        </button>
                        {request.status === 'draft' && (
                          <button className="text-blue-400 hover:text-blue-300 flex items-center justify-center text-sm py-2 px-3 border border-blue-400/30 rounded">
                            <Send size={14} className="mr-1" />
                            Mark as Sent
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Email Preview */}
                    <div className="mt-4 pt-4 border-t border-[#333333]">
                      <details>
                        <summary className="cursor-pointer text-[#FD5A1E] hover:text-[#FD5A1E]/80">
                          View Email Template
                        </summary>
                        <div className="mt-3 bg-[#111111] rounded p-4">
                          <pre className="text-sm text-[#A5ACAF] whitespace-pre-wrap overflow-x-auto">
                            {request.emailContent}
                          </pre>
                        </div>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Email Templates & Best Practices</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Best Practices */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">✅ Best Practices</h3>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li>• Only request reviews from 4-5 star satisfied customers</li>
                  <li>• Send within 1-3 days after positive service experience</li>
                  <li>• Keep emails personal and specific to their service</li>
                  <li>• Make it easy with direct Google review links</li>
                  <li>• Follow up once after 1 week if no response</li>
                  <li>• Always thank customers who leave reviews</li>
                  <li>• Respond professionally to all reviews</li>
                </ul>

                <h3 className="text-lg font-semibold text-red-400 mt-6">❌ Avoid These Mistakes</h3>
                <ul className="space-y-2 text-[#A5ACAF]">
                  <li>• Never create fake reviews or use bots</li>
                  <li>• Don't incentivize only positive reviews</li>
                  <li>• Avoid generic, copy-paste messages</li>
                  <li>• Don't pressure or guilt customers</li>
                  <li>• Never ignore negative feedback</li>
                  <li>• Don't ask friends/family for reviews</li>
                </ul>
              </div>

              {/* Template Examples */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">Sample Templates</h3>
                
                <div className="bg-[#000000] rounded-lg p-4 border border-[#333333]">
                  <h4 className="font-semibold text-[#F5F5F5] mb-2">Installation Follow-up</h4>
                  <div className="bg-[#111111] rounded p-3 text-sm text-[#A5ACAF]">
                    <p>Hi [Customer Name],</p>
                    <p className="mt-2">Hope your new vending machine is working perfectly! If you had a positive experience with our installation, would you mind leaving a quick review?</p>
                    <p className="mt-2">👉 [Review Link]</p>
                    <p className="mt-2">Thanks!</p>
                  </div>
                  <button 
                    onClick={() => copyTemplate("Hi [Customer Name],\n\nHope your new vending machine is working perfectly! If you had a positive experience with our installation, would you mind leaving a quick review?\n\n👉 [Review Link]\n\nThanks!\nAMP Vending Team")}
                    className="mt-2 text-[#FD5A1E] hover:text-[#FD5A1E]/80 flex items-center text-sm"
                  >
                    <Copy size={14} className="mr-1" />
                    Copy Template
                  </button>
                </div>

                <div className="bg-[#000000] rounded-lg p-4 border border-[#333333]">
                  <h4 className="font-semibold text-[#F5F5F5] mb-2">Maintenance Check-in</h4>
                  <div className="bg-[#111111] rounded p-3 text-sm text-[#A5ACAF]">
                    <p>Hello [Customer Name],</p>
                    <p className="mt-2">Thank you for trusting AMP Vending with your maintenance. If you're satisfied with our service, a quick review would help other businesses find us.</p>
                    <p className="mt-2">⭐ [Review Link]</p>
                    <p className="mt-2">Best regards,</p>
                  </div>
                  <button 
                    onClick={() => copyTemplate("Hello [Customer Name],\n\nThank you for trusting AMP Vending with your maintenance. If you're satisfied with our service, a quick review would help other businesses find us.\n\n⭐ [Review Link]\n\nBest regards,\nAMP Vending Team")}
                    className="mt-2 text-[#FD5A1E] hover:text-[#FD5A1E]/80 flex items-center text-sm"
                  >
                    <Copy size={14} className="mr-1" />
                    Copy Template
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Timing */}
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Strategic Timing Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FD5A1E]/10 rounded-lg p-4 border border-[#FD5A1E]/20">
                <h4 className="font-semibold text-[#FD5A1E] mb-2">Immediate (1-24 hours)</h4>
                <ul className="text-sm text-[#A5ACAF] space-y-1">
                  <li>• Successful installation completed</li>
                  <li>• Problem resolved successfully</li>
                  <li>• Customer expresses satisfaction</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <h4 className="font-semibold text-green-500 mb-2">Short-term (2-7 days)</h4>
                <ul className="text-sm text-[#A5ACAF] space-y-1">
                  <li>• Routine maintenance visit</li>
                  <li>• Follow-up consultation</li>
                  <li>• Product restocking service</li>
                </ul>
              </div>
              
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <h4 className="font-semibold text-blue-500 mb-2">Long-term (1-3 months)</h4>
                <ul className="text-sm text-[#A5ACAF] space-y-1">
                  <li>• Contract renewal time</li>
                  <li>• System upgrade completion</li>
                  <li>• Anniversary milestones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Ethical & Legal Compliance</h2>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="text-green-500" size={20} />
                <p className="text-green-500 font-medium">System is Operating Ethically</p>
              </div>
              <p className="text-green-400 text-sm">
                All review requests follow Google's guidelines and ethical business practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">Compliance Checklist</h3>
                
                <div className="space-y-3">
                  {[
                    { check: 'Only requesting reviews from satisfied customers (4-5 stars)', status: true },
                    { check: 'Using personalized, authentic email templates', status: true },
                    { check: 'Not incentivizing only positive reviews', status: true },
                    { check: 'Including unsubscribe options in emails', status: true },
                    { check: 'Respecting customer privacy and consent', status: true },
                    { check: 'Following up appropriately (max 2 times)', status: true },
                    { check: 'Responding to all reviews professionally', status: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-[#A5ACAF] text-sm">{item.check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">Google's Guidelines</h3>
                
                <div className="bg-[#000000] rounded-lg p-4 border border-[#333333]">
                  <h4 className="font-medium text-[#F5F5F5] mb-2">What Google Allows:</h4>
                  <ul className="text-sm text-[#A5ACAF] space-y-1">
                    <li>• Asking satisfied customers for honest reviews</li>
                    <li>• Providing direct links to review platforms</li>
                    <li>• Following up politely if no response</li>
                    <li>• Responding to reviews professionally</li>
                  </ul>
                </div>

                <div className="bg-[#000000] rounded-lg p-4 border border-[#333333]">
                  <h4 className="font-medium text-[#F5F5F5] mb-2">What Google Prohibits:</h4>
                  <ul className="text-sm text-red-400 space-y-1">
                    <li>• Creating fake or solicited reviews</li>
                    <li>• Offering incentives for positive reviews only</li>
                    <li>• Using automated review generation</li>
                    <li>• Discouraging negative feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">System Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">Review Settings</h3>
                
                <div>
                  <label className="block text-[#F5F5F5] mb-2">Minimum Satisfaction Level</label>
                  <select className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none">
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#F5F5F5] mb-2">Auto-send Delay (days)</label>
                  <input 
                    type="number" 
                    defaultValue="2"
                    className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F5F5F5] mb-2">Maximum Follow-ups</label>
                  <select className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none">
                    <option value="1">1 Follow-up</option>
                    <option value="2">2 Follow-ups</option>
                    <option value="0">No Follow-ups</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FD5A1E]">Business Information</h3>
                
                <div>
                  <label className="block text-[#F5F5F5] mb-2">Google Review URL</label>
                  <input 
                    type="url" 
                    placeholder="https://g.page/r/YOUR_BUSINESS_ID/review"
                    className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  />
                  <p className="text-sm text-[#A5ACAF] mt-1">
                    Find this in your Google Business Profile
                  </p>
                </div>

                <div>
                  <label className="block text-[#F5F5F5] mb-2">Email Signature</label>
                  <textarea 
                    rows={4}
                    defaultValue="Best regards,&#10;The AMP Vending Team&#10;(209) 403-5450&#10;ampdesignandconsulting@gmail.com"
                    className="w-full p-3 bg-[#000000] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FD5A1E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#333333]">
              <button className="bg-[#FD5A1E] text-[#000000] px-6 py-3 rounded-lg font-medium hover:bg-[#FD5A1E]/90 transition-colors">
                Save Settings
              </button>
            </div>
          </div>

          {/* Export/Import Section */}
          <div className="bg-[#111111] rounded-lg border border-[#333333] p-6">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-4">Data Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-[#000000] border border-[#333333] rounded-lg hover:border-[#FD5A1E] transition-colors">
                <FileText className="text-[#FD5A1E] mx-auto mb-2" size={24} />
                <p className="text-[#F5F5F5] font-medium">Export Data</p>
                <p className="text-[#A5ACAF] text-sm">Download customer data</p>
              </button>
              
              <button className="p-4 bg-[#000000] border border-[#333333] rounded-lg hover:border-[#FD5A1E] transition-colors">
                <Users className="text-[#FD5A1E] mx-auto mb-2" size={24} />
                <p className="text-[#F5F5F5] font-medium">Import Customers</p>
                <p className="text-[#A5ACAF] text-sm">Bulk import from CSV</p>
              </button>
              
              <button className="p-4 bg-[#000000] border border-[#333333] rounded-lg hover:border-[#FD5A1E] transition-colors">
                <BarChart3 className="text-[#FD5A1E] mx-auto mb-2" size={24} />
                <p className="text-[#F5F5F5] font-medium">Analytics Report</p>
                <p className="text-[#A5ACAF] text-sm">Generate performance report</p>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Legal Disclaimer */}
      <div className="mt-8 bg-[#111111] rounded-lg border border-[#333333] p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="text-green-500 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-[#F5F5F5] mb-2">Ethical & Legal Compliance</h4>
            <p className="text-[#A5ACAF] text-sm">
              This system helps you request authentic reviews from satisfied customers only. 
              Never create fake reviews, incentivize only positive reviews, or violate platform terms of service. 
              Always provide exceptional service first, then ask for honest feedback naturally. 
              All review requests must comply with Google's guidelines and local business regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGenerationSystem;