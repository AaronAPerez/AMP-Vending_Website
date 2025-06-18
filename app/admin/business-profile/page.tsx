/**
 * Admin Business Profile Management Page
 * 
 * Build Process Documentation:
 * 1. Protected admin route for business profile optimization
 * 2. Comprehensive Google Business Profile management interface
 * 3. SEO performance tracking and analytics
 * 4. Content generation and scheduling tools
 * 5. NAP consistency monitoring across platforms
 */

import { Metadata } from 'next';
import BusinessProfileManager from '@/components/admin/BusinessProfileManager';

/**
 * Metadata for admin business profile page
 */
export const metadata: Metadata = {
  title: 'Business Profile Manager | AMP Vending Admin',
  description: 'Manage Google Business Profile optimization and local SEO for AMP Vending',
  robots: 'noindex, nofollow', // Prevent indexing of admin pages
};

/**
 * Admin Business Profile Management Page Component
 */
export default function AdminBusinessProfilePage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BusinessProfileManager />
      </div>
    </div>
  );
}