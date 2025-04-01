'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Link from 'next/link'; // Changed from React Router's Link

/**
 * Interface for location criteria option
 */
interface LocationCriteriaOption {
  id: string;
  label: string;
  description: string;
}

/**
 * Interface for location type
 */
interface LocationType {
  id: string;
  name: string;
  description: string;
  potentialScore: number;
  criteria: string[];
  icon: React.ReactNode;
  matchScore?: number; // Optional property for calculated match scores
}

/**
 * Strategic Location Finder component helps users identify 
 * high-potential locations for vending machine placement
 */
const LocationFinder = () => {
  // State for selected criteria
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  // State for matched locations
  const [matchedLocations, setMatchedLocations] = useState<LocationType[]>([]);
  // State for displaying results
  const [showResults, setShowResults] = useState(false);
  
  // Available location criteria options
  const criteriaOptions: LocationCriteriaOption[] = [
    {
      id: 'high-traffic',
      label: 'High Foot Traffic',
      description: 'Area receives consistent foot traffic throughout operating hours'
    },
    {
      id: 'captive-audience',
      label: 'Captive Audience',
      description: 'Users have limited or no alternative food/beverage options nearby'
    },
    {
      id: 'extended-hours',
      label: 'Extended Operating Hours',
      description: 'Location operates beyond standard 9-5 business hours'
    },
    {
      id: 'break-area',
      label: 'Designated Break Area',
      description: 'There is a specific break room or rest area for employees'
    },
    {
      id: 'limited-breaks',
      label: 'Limited Break Time',
      description: 'Employees/users have short break periods (30 minutes or less)'
    },
    {
      id: 'no-competition',
      label: 'No Existing Vending',
      description: 'No competing vending machines or only outdated machines present'
    },
    {
      id: 'management-support',
      label: 'Management Support',
      description: 'Location management is receptive to vending machine installation'
    },
    {
      id: 'employee-count',
      label: 'High Employee Count',
      description: '30+ potential users regularly present at the location'
    },
    {
      id: 'security',
      label: 'Secure Environment',
      description: 'Location has adequate security measures to protect equipment'
    },
    {
      id: 'utilities',
      label: 'Easy Utility Access',
      description: 'Electrical outlets and potentially internet connectivity available'
    }
  ];
  
  // Location types with their matching criteria
  const locationTypes: LocationType[] = [
    {
      id: 'transit-center',
      name: 'Transit Center/Bus Depot',
      description: 'Centers where bus drivers take breaks between routes or at shift changes',
      potentialScore: 95,
      criteria: ['high-traffic', 'captive-audience', 'extended-hours', 'limited-breaks', 'no-competition'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'school-transport',
      name: 'School Transportation Office',
      description: 'Facilities where school bus drivers check in, complete paperwork, and take breaks',
      potentialScore: 90,
      criteria: ['captive-audience', 'break-area', 'limited-breaks', 'management-support', 'employee-count'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      id: 'industrial-facility',
      name: 'Industrial Facility',
      description: 'Manufacturing plants, warehouses, or distribution centers with shift workers',
      potentialScore: 85,
      criteria: ['employee-count', 'limited-breaks', 'captive-audience', 'extended-hours', 'break-area'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'truck-stop',
      name: 'Truck Stop/Fleet Center',
      description: 'Locations where truck drivers and fleet vehicles make stops for maintenance or rest',
      potentialScore: 80,
      criteria: ['extended-hours', 'high-traffic', 'captive-audience', 'security', 'utilities'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 'transit-authority',
      name: 'Transit Authority Office',
      description: 'Administrative offices for city or regional transit systems',
      potentialScore: 75,
      criteria: ['employee-count', 'management-support', 'break-area', 'no-competition', 'security'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'vehicle-maintenance',
      name: 'Vehicle Maintenance Facility',
      description: 'Facilities where vehicles are serviced, with mechanics and support staff',
      potentialScore: 70,
      criteria: ['captive-audience', 'employee-count', 'limited-breaks', 'utilities', 'no-competition'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  /**
   * Handles toggling of a criterion selection
   */
  const handleCriteriaToggle = (criterionId: string) => {
    setSelectedCriteria(prev => {
      if (prev.includes(criterionId)) {
        return prev.filter(id => id !== criterionId);
      } else {
        return [...prev, criterionId];
      }
    });
  };
  
  /**
   * Calculates match score for a location based on selected criteria
   */
  const calculateMatchScore = (location: LocationType): number => {
    if (selectedCriteria.length === 0) return 0;
    
    const matchedCriteriaCount = location.criteria.filter(
      criterion => selectedCriteria.includes(criterion)
    ).length;
    
    // Calculate percentage of location's criteria that match selected criteria
    const locationCriteriaMatchPercentage = 
      (matchedCriteriaCount / location.criteria.length) * 100;
      
    // Calculate percentage of selected criteria that match location's criteria
    const selectedCriteriaMatchPercentage = 
      (matchedCriteriaCount / selectedCriteria.length) * 100;
      
    // Combine both percentages with location's base potential score
    return Math.round(
      (locationCriteriaMatchPercentage * 0.4) + 
      (selectedCriteriaMatchPercentage * 0.4) + 
      (location.potentialScore * 0.2)
    );
  };
  
  /**
   * Finds and ranks locations based on selected criteria
   */
  const findMatchingLocations = () => {
    if (selectedCriteria.length === 0) {
      setMatchedLocations([]);
      return;
    }
    
    const scoredLocations = locationTypes.map(location => ({
      ...location,
      matchScore: calculateMatchScore(location)
    }));
    
    // Sort locations by match score (descending)
    const sortedLocations = scoredLocations
      .filter(location => location.matchScore > 0)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
    setMatchedLocations(sortedLocations);
    setShowResults(true);
  };
  
  /**
   * Resets the form and results
   */
  const handleReset = () => {
    setSelectedCriteria([]);
    setMatchedLocations([]);
    setShowResults(false);
  };
  
  return (
    <section className="py-16" id="location-finder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Strategic Location Finder
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify high-potential locations for your vending machine business based on our 
            proven success criteria.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-8">
          {!showResults ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Select the criteria that match your potential location:
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {criteriaOptions.map((criterion) => (
                  <div 
                    key={criterion.id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-colors
                      ${selectedCriteria.includes(criterion.id) 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'bg-white border-gray-200 hover:border-blue-200'}
                    `}
                    onClick={() => handleCriteriaToggle(criterion.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCriteriaToggle(criterion.id);
                      }
                    }}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={selectedCriteria.includes(criterion.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                        <div className={`
                          h-5 w-5 rounded border ${
                            selectedCriteria.includes(criterion.id)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedCriteria.includes(criterion.id) && (
                            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{criterion.label}</p>
                        <p className="text-sm text-gray-600">{criterion.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={findMatchingLocations}
                  disabled={selectedCriteria.length === 0}
                  className={`
                    px-6 py-3 rounded-md font-medium text-white ${
                      selectedCriteria.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }
                  `}
                >
                  Find Matching Locations
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={selectedCriteria.length === 0}
                  className={`
                    px-6 py-3 rounded-md font-medium border ${
                      selectedCriteria.length === 0
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  Reset Selection
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {selectedCriteria.length}/10 criteria selected
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Recommended Locations
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Criteria
                </button>
              </div>
              
              {matchedLocations.length > 0 ? (
                <div className="space-y-6">
                  {matchedLocations.map((location) => (
                    <Card key={location.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                          {location.icon}
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{location.name}</h4>
                              <p className="text-gray-600">{location.description}</p>
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-800 font-bold rounded-full px-3 py-1">
                              {location.matchScore}% Match
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Matching Criteria:</p>
                            <div className="flex flex-wrap gap-2">
                              {location.criteria
                                .filter(criterion => selectedCriteria.includes(criterion))
                                .map(criterionId => {
                                  const criterion = criteriaOptions.find(c => c.id === criterionId);
                                  return criterion ? (
                                    <span 
                                      key={criterion.id}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                                      {criterion.label}
                                    </span>
                                  ) : null;
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-700 mb-4">No matching locations found. Try selecting different criteria.</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reset and try again
                  </button>
                </div>
              )}
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Next Steps:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Conduct a site visit to your matched location type</li>
                  <li>Meet with the location manager to discuss your vending proposal</li>
                  <li>Perform a detailed site assessment (power, space, access)</li>
                  <li>Present your customized vending solution and profit-sharing model</li>
                  <li>Schedule an installation date upon agreement</li>
                </ol>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need help identifying the perfect location for your vending business?
          </p>
          {/* FIX: Changed from React Router Link to Next.js Link */}
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Personalized Location Guidance
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationFinder;