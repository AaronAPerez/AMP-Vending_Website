import React from 'react';
import Card from '../ui/Card';

/**
 * WorkplaceBenefits section component that highlights the advantages 
 * of installing vending machines for workplaces
 */
const WorkplaceBenefits = () => {
  // Benefits data for different stakeholders
  const benefitCategories = [
    {
      title: 'For Employees',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      benefits: [
        {
          title: 'Convenient Access During Breaks',
          description: 'Quick access to refreshments during short, unpredictable breaks without leaving the premises.'
        },
        {
          title: 'Healthy Snack Options',
          description: 'Nutritious alternatives to help maintain energy levels and focus during long shifts.'
        },
        {
          title: 'Personalized Selection',
          description: 'Curated selection of items based on employee feedback and preferences.'
        }
      ]
    },
    {
      title: 'For Management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      benefits: [
        {
          title: 'Zero Maintenance',
          description: 'No operational burden as our company handles all aspects of machine maintenance and stocking.'
        },
        {
          title: 'Enhanced Workplace Experience',
          description: 'Improved job satisfaction and employee retention through modern amenities.'
        },
        {
          title: 'Professional Image',
          description: 'Reflects positively on the workplace by demonstrating commitment to employee comfort.'
        }
      ]
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "Our bus drivers love having access to snacks and drinks during their breaks. It's made a noticeable difference in workplace satisfaction.",
      author: "Transit Center Manager",
      company: "Regional Transit Authority",
      avatar: "/images/testimonial-1.jpg" // This would be an actual image path
    },
    {
      quote: "The variety of payment options and selection of products makes this such a convenient solution for our break room.",
      author: "Operations Director",
      company: "School Transportation Services",
      avatar: "/images/testimonial-2.jpg" // This would be an actual image path
    }
  ];

  return (
    <section className="py-16 bg-white" id="workplace-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits for Your Workplace
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Installing our vending machines offers substantial advantages for both employees and management at your workplace.
          </p>
        </div>

        {/* Benefits Grid with visual enhancements */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {benefitCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative">
              {/* Decorative element */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 z-10">
                {category.icon}
              </div>
              
              <Card
                title={
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900 ml-6">{category.title}</span>
                  </div>
                }
                className="h-full pt-8"
                variant="elevated"
              >
                <ul className="space-y-6">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="mt-1 text-gray-600">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="my-20 bg-gray-50 rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Why Our Vending Solution Works
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25%', label: 'Increase in break room usage' },
              { value: '94%', label: 'Employee satisfaction rate' },
              { value: '0', label: 'Upfront cost to your business' },
              { value: '5%', label: 'Revenue share for your location' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
                  <div className="relative">
                    <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                    <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
            What Our Clients Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-visible outlined">
                <div className="relative">
                  {/* Quote mark decorative element */}
                  <div className="absolute -top-8 -left-2 text-6xl text-blue-200 font-serif">"</div>
                  
                  <blockquote className="relative z-10">
                    <p className="text-gray-700 italic mb-4 pl-4">{testimonial.quote}</p>
                    <div className="flex items-center">
                      {/* Avatar placeholder - would be an actual image in production */}
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.company}</div>
                      </div>
                    </div>
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to enhance your workplace?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create a more convenient and satisfying environment for your bus drivers with our state-of-the-art vending solution.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkplaceBenefits;