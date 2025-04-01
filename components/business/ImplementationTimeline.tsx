'use client';

import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

/**
 * Interface for timeline phase
 */
interface TimelinePhase {
  id: string;
  title: string;
  duration: string;
  milestones: {
    title: string;
    description: string;
    tips?: string[];
  }[];
}

/**
 * ImplementationTimeline component that displays the phased approach to
 * building a successful vending machine business
 */
const ImplementationTimeline = () => {
  // Phases data for the timeline
  const timelinePhases: TimelinePhase[] = [
    {
      id: 'foundation',
      title: 'Foundation Phase',
      duration: 'Month 1-2',
      milestones: [
        {
          title: 'Business Formation',
          description: 'Establish legal structure, obtain necessary permits and licenses.',
          tips: [
            'Form an LLC for liability protection',
            'Apply for business license and sales tax permit',
            'Secure appropriate insurance coverage',
            'Set up business banking account and accounting system'
          ]
        },
        {
          title: 'Market Research',
          description: 'Identify potential locations and conduct initial outreach.',
          tips: [
            'Research transportation companies within 50-mile radius',
            'Prioritize locations with 30+ employees',
            'Focus on facilities with limited nearby food options',
            'Create list of decision-makers at target locations'
          ]
        },
        {
          title: 'Vendor Relationships',
          description: 'Establish relationships with machine suppliers and product distributors.',
          tips: [
            'Research and compare vending machine manufacturers',
            'Identify wholesale product suppliers with competitive pricing',
            'Negotiate initial terms and volume discounts',
            'Create inventory management system'
          ]
        }
      ]
    },
    {
      id: 'launch',
      title: 'Launch Phase',
      duration: 'Month 3-6',
      milestones: [
        {
          title: 'First Location Acquisition',
          description: 'Secure your first 3-5 vending machine locations.',
          tips: [
            'Conduct site assessments for optimal machine placement',
            'Create custom proposals for each location',
            'Present revenue-sharing model to decision makers',
            'Draft and finalize client agreements'
          ]
        },
        {
          title: 'Machine Procurement',
          description: 'Purchase initial machines and customize for client locations.',
          tips: [
            'Select appropriate machine types for each location',
            'Configure payment systems based on client needs',
            'Ensure proper branding and graphics',
            'Test all machines before installation'
          ]
        },
        {
          title: 'Operations Setup',
          description: 'Establish service routines, inventory management, and maintenance protocols.',
          tips: [
            'Design efficient restocking routes',
            'Create preventative maintenance schedule',
            'Implement inventory tracking system',
            'Develop emergency response procedures'
          ]
        }
      ]
    },
    {
      id: 'growth',
      title: 'Growth Phase',
      duration: 'Month 7-18',
      milestones: [
        {
          title: 'Expansion',
          description: 'Scale to 15-30 locations based on proven success model.',
          tips: [
            'Leverage data from initial locations to refine targeting',
            'Implement referral program with existing clients',
            'Optimize product selection based on sales data',
            'Consider complementary service offerings'
          ]
        },
        {
          title: 'Team Building',
          description: 'Hire key personnel to support growing operation.',
          tips: [
            'Hire service technician/route driver',
            'Develop training program for new team members',
            'Create clear roles and responsibilities',
            'Implement performance-based incentives'
          ]
        },
        {
          title: 'Systems Refinement',
          description: 'Optimize operations and implement technology solutions.',
          tips: [
            'Deploy vending management software for remote monitoring',
            'Analyze performance metrics to identify improvement areas',
            'Refine inventory forecasting to minimize stockouts',
            'Develop customer satisfaction measurement system'
          ]
        }
      ]
    },
    {
      id: 'scaling',
      title: 'Scaling Phase',
      duration: 'Month 19-36',
      milestones: [
        {
          title: 'Market Expansion',
          description: 'Expand to 50+ locations and consider new geographic markets.',
          tips: [
            'Analyze data to identify most profitable location types',
            'Consider adjacent markets or geographic expansion',
            'Develop scalable onboarding process for new locations',
            'Create multi-tier service plans for different client sizes'
          ]
        },
        {
          title: 'Service Diversification',
          description: 'Add complementary services to increase revenue per location.',
          tips: [
            'Explore micro-market installations for larger locations',
            'Consider coffee service or fresh food options',
            'Evaluate office pantry service opportunities',
            'Develop custom branded solutions for key clients'
          ]
        },
        {
          title: 'Process Automation',
          description: 'Implement advanced technology for scalable operations.',
          tips: [
            'Integrate IoT solutions for real-time inventory monitoring',
            'Implement route optimization software',
            'Develop dashboards for business performance metrics',
            'Create automated reporting for clients'
          ]
        }
      ]
    }
  ];

  // For responsive design
  const [selectedPhase, setSelectedPhase] = useState<string>(timelinePhases[0].id);

  // Helper function to display an individual milestone
  const renderMilestone = (milestone: TimelinePhase['milestones'][0], index: number) => (
    <div key={index} className="p-6 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h4>
      <p className="text-gray-700 mb-4">{milestone.description}</p>
      
      {milestone.tips && (
        <div className="p-4 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">Pro Tips:</p>
          <ul className="space-y-1">
            {milestone.tips.map((tip, tipIndex) => (
              <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                <svg className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Helper function to handle mobile phase selection
  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPhase(e.target.value);
  };

  return (
    <section className="py-16" id="implementation-timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Implementation Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A strategic, phased approach to building your successful vending machine business,
            from initial setup to full-scale operation.
          </p>
        </div>

        {/* Desktop View - Tab Interface */}
        <div className="hidden md:block">
          <Tab.Group>
            <div className="flex mb-8">
              <div className="w-full border-b border-gray-200">
                <Tab.List className="flex space-x-8 -mb-px">
                  {timelinePhases.map((phase) => (
                    <Tab
                      key={phase.id}
                      className={({ selected }) =>
                        `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                          selected
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`
                      }
                    >
                      <div className="flex flex-col items-center">
                        <span>{phase.title}</span>
                        <span className="text-xs text-gray-500 mt-1">{phase.duration}</span>
                      </div>
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>
            <Tab.Panels className="mt-2">
              {timelinePhases.map((phase) => (
                <Tab.Panel key={phase.id} className="focus:outline-none">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {phase.milestones.map((milestone, index) => renderMilestone(milestone, index))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Mobile View - Dropdown with Cards */}
        <div className="block md:hidden">
          <div className="mb-6">
            <label htmlFor="phase-select" className="sr-only">
              Select a phase
            </label>
            <select
              id="phase-select"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedPhase}
              onChange={handlePhaseChange}
            >
              {timelinePhases.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {phase.title} ({phase.duration})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-6">
            {timelinePhases
              .find(phase => phase.id === selectedPhase)?.milestones
              .map((milestone, index) => renderMilestone(milestone, index))}
          </div>
        </div>

        {/* Success Indicators */}
        <div className="mt-16 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Business Success Indicators by Phase
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  {timelinePhases.map((phase) => (
                    <th key={phase.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {phase.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Number of Locations
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0-5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15-30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    30-50+
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Monthly Revenue
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $0-2,500
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $2,500-7,500
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $7,500-15,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $15,000-30,000+
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Profit Margin
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10-15%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15-20%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    20-30%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    25-35%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Team Size
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 (Owner)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1-2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2-4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4-8+
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Focus Areas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Setup & Planning
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Client Acquisition
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Optimization & Efficiency
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Scale & Diversification
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Start Your Vending Machine Business Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Let us help you implement this proven roadmap for building a successful
            vending machine business with our expertise and support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/download/business-plan-template" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Download Business Plan Template
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;