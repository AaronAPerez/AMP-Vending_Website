# AMP Vending Website Architecture

> Complete technical documentation for the AMP Vending website build process, architecture, and component functionality.


## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Core Application Structure](#core-application-structure)
4. [Component Architecture](#component-architecture)
5. [Data Management](#data-management)
6. [SEO & Performance](#seo--performance)
7. [Testing Strategy](#testing-strategy)
8. [Build Process](#build-process)
9. [Deployment](#deployment)
10. [Development Workflow](#development-workflow)

## Project Overview

AMP Vending is a modern, responsive website built for a vending machine company that provides professional, maintenance-free vending solutions for workplaces. The website showcases premium vending machines with touchscreen technology and serves as a lead generation platform.

### Key Features
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Premium Branding**: Dark theme with orange accents (#FD5A1E) for professional appearance
- **Lead Generation**: Contact and feedback forms with comprehensive validation
- **Product Showcase**: Detailed vending machine information and specifications
- **SEO Optimized**: Comprehensive meta tags, structured data, and performance optimization
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation

## Architecture & Technology Stack

### Frontend Technologies
```typescript
// Core Framework
Next.js 14 (App Router) - React-based full-stack framework
TypeScript - Type-safe JavaScript with enhanced developer experience
Tailwind CSS - Utility-first CSS framework for rapid styling

// UI & Animation
Framer Motion - Smooth animations and transitions
Lucide React - Modern icon library
Sonner - Toast notifications

// Form Handling
Zod - Runtime type validation and schema validation
React Hook Form - Performant form library with minimal re-renders

// Development Tools
ESLint - Code linting and quality enforcement
Prettier - Code formatting
Husky - Git hooks for pre-commit validation


### Backend Integration

// API Routes (Next.js API)
/api/contact - Contact form submission handler
/api/feedback - Customer feedback submission handler

// Email Service
Nodemailer - Email sending capability
SMTP integration for form submissions

// Database (Optional)
Supabase - PostgreSQL database for storing submissions
Environment-based configuration for database connections


Testing Stack
// Unit Testing
Jest - JavaScript testing framework
React Testing Library - Component testing utilities
@testing-library/user-event - User interaction simulation

// E2E Testing
Playwright - Cross-browser end-to-end testing
Axe-core - Accessibility testing integration

// Performance Testing
Lighthouse CI - Core Web Vitals monitoring
Custom performance utilities

amp-vending-website/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API route handlers
│   ├── contact/                  # Contact page
│   ├── feedback/                 # Feedback page
│   ├── vending-machines/         # Machine catalog pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Homepage
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx            # 404 page
│   └── global-error.tsx         # Global error handler
├── components/                   # Reusable UI components
│   ├── contact/                  # Contact-related components
│   ├── feedback/                 # Feedback components
│   ├── hero/                     # Hero section components
│   ├── landing/                  # Homepage sections
│   ├── layout/                   # Layout components
│   ├── seo/                      # SEO components
│   ├── ui/                       # Base UI components
│   └── vending-machines/         # Product components
├── lib/                          # Utility libraries
│   ├── data/                     # Static data and configurations
│   ├── schema/                   # Zod validation schemas
│   ├── services/                 # External service integrations
│   └── utils/                    # Helper functions
├── hooks/                        # Custom React hooks
├── tests/                        # Test suites
│   ├── __tests__/               # Unit tests
│   ├── e2e/                     # End-to-end tests
│   └── utils/                   # Test utilities
├── public/                       # Static assets
└── scripts/                     # Build and deployment scripts