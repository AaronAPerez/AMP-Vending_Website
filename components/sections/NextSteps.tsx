'use client';

import React from 'react';

import Button from '../ui/Button';
import Link from 'next/link';

/**
 * NextSteps section component outlines the process for implementing
 * the vending machine solution at First Student Inc.
 */
const NextSteps = () => {
  // Implementation steps
  const implementationSteps = [
    {
      number: 1,
      title: "Review and Approval",
      description: "Management reviews the proposal and discusses any questions or concerns with our team."
    },
    {
      number: 2,
      title: "Site Assessment",
      description: "Our team conducts a thorough site assessment to determine optimal machine locations."
    },
    {
      number: 3,
      title: "Customization Meeting",
      description: "We meet with management and employee representatives to finalize product selection."
    },
    {
      number: 4,
      title: "Contract Finalization",
      description: "We draft a comprehensive agreement detailing maintenance responsibilities and other key terms."
    },
    {
      number: 5,
      title: "Installation Planning",
      description: "Once the contract is signed, we set a proposed timeline for completing the installation."
    },
    {
      number: 6,
      title: "Installation and Launch",
      description: "Our team handles the physical installation and initial stocking of the machines."
    }
  ];

  return (
    <section className="py-16 bg-white" id="next-steps">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Next Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To move forward with the vending machine installation at First Student Inc., we propose the following action plan.
          </p>
        </div>

        {/* Implementation Steps */}
        <div className="relative">
          {/* Vertical line connecting timeline points */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -ml-0.5"></div>

          <div className="space-y-12">
            {implementationSteps.map((step, index) => (
              <div key={index} className={`relative md:flex items-center ${index % 2 === 0 ? 'md:justify-between' : 'md:justify-between md:flex-row-reverse'}`}>
                {/* Timeline point */}
                <div className="hidden md:block absolute left-1/2 -ml-3">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content box */}
                <div className={`md:w-5/12 bg-gray-50 p-6 rounded-lg shadow-sm ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="md:hidden flex items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-3 shadow-sm">
                      <span className="text-white text-xs font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <h3 className="hidden md:block text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact information */}
        <div className="mt-20 bg-blue-50 rounded-xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our vending solution can benefit First Student Inc. and enhance the workplace experience for your bus drivers.
          </p>
          <div className="mb-8">
            <p className="font-medium text-gray-900">For questions, please contact:</p>
            <p className="text-gray-700">Andrew Perez</p>
            <p className="text-gray-700">Phone: (209) 403-5450</p>
            <p className="text-gray-700">Email: ampdesignandconsulting@gmail.com</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button as={Link} to="/contact" size="lg">
              Contact Us
            </Button>
            <Button as="a" href="tel:2094035450" variant="outline" size="lg">
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextSteps;