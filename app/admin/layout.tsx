/**
 * Admin Layout - Fixed for Next.js 15+ without styled-jsx
 * 
 * Build Process Documentation:
 * 1. Removes styled-jsx dependency that causes client-only errors
 * 2. Uses Tailwind CSS classes instead of styled-jsx
 * 3. Implements proper Next.js 15+ metadata structure
 * 4. Includes admin-specific security and accessibility features
 * 5. Provides consistent layout for all admin pages
 */

import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/**
 * Metadata configuration for admin section
 * Note: viewport and themeColor moved to viewport export
 */
export const metadata: Metadata = {
  title: {
    template: '%s | AMP Vending Admin',
    default: 'Admin Dashboard | AMP Vending',
  },
  description: 'Administrative dashboard for AMP Vending management system',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

/**
 * Viewport configuration (Next.js 15+ requirement)
 * This fixes the metadata viewport and themeColor warnings
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FD5A1E' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};

/**
 * Admin Layout Component
 * 
 * Provides consistent layout structure for all admin pages.
 * Uses Tailwind CSS instead of styled-jsx to avoid import issues.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} min-h-screen bg-[#000000] text-[#F5F5F5]`}>
      {/* Custom CSS for admin-specific styles - using globals.css instead of styled-jsx */}
      
      {/* Skip navigation for accessibility */}
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#FD5A1E] focus:text-[#000000] focus:rounded-lg focus:font-medium"
      >
        Skip to admin content
      </a>

      {/* Admin header bar for navigation context */}
      <header className="bg-[#111111] border-b border-[#333333] p-4" role="banner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin"
              className="text-lg font-bold text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
            >
              AMP Vending Admin
            </Link>
            
            <nav aria-label="Admin breadcrumb navigation">
              <ol className="flex items-center space-x-2 text-sm text-[#A5ACAF]">
                <li>
                  <Link 
                    href="/admin" 
                    className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] rounded px-1"
                  >
                    Dashboard
                  </Link>
                </li>
                {/* Additional breadcrumb items would be added here dynamically */}
              </ol>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick admin navigation */}
            <nav aria-label="Quick admin navigation">
              <ul className="flex items-center space-x-3 text-sm">
                <li>
                  <Link
                    href="/admin/photo-manager"
                    className="text-[#A5ACAF] hover:text-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] rounded px-2 py-1"
                  >
                    Photos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings"
                    className="text-[#A5ACAF] hover:text-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] rounded px-2 py-1"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Admin user info */}
            <div className="text-sm text-[#A5ACAF] border-l border-[#333333] pl-4">
              <span>Admin User</span>
            </div>
            
            {/* Back to main site link */}
            <Link
              href="/"
              className="text-sm text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] rounded px-2 py-1"
              aria-label="Return to main website"
            >
              ← Main Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main admin content area */}
      <main 
        id="admin-main-content" 
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#4d4d4d] scrollbar-track-[#111111] hover:scrollbar-thumb-[#FD5A1E]"
        role="main"
        aria-label="Admin dashboard main content"
      >
        {children}
      </main>

      {/* Admin footer with system info */}
      <footer className="bg-[#111111] border-t border-[#333333] p-4 mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-[#A5ACAF]">
          <div className="flex items-center space-x-4">
            <span>AMP Vending Admin System</span>
            <span className="w-1 h-1 bg-[#A5ACAF] rounded-full" aria-hidden="true" />
            <span>Version 1.0.0</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span>
              Last updated: {new Date().toLocaleDateString()}
            </span>
            
            {/* System status indicator */}
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                aria-hidden="true" 
                title="System Status: Online"
              />
              <span>System Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}