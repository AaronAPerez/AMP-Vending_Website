import React, { useState } from 'react';
import useVendingMachines, { VendingMachine } from '../hooks/useVendingMachines';

interface ComparisonCategoryProps {
  category: {
    id: string;
    label: string;
  };
  machines: VendingMachine[];
}

/**
 * ComparisonCategory component to display a specific category row in the comparison table
 */
function ComparisonCategory({ category, machines }: ComparisonCategoryProps): JSX.Element {
  return (
    <tr className="border-t border-gray-200">
      <th className="py-5 px-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
        {category.label}
      </th>
      {machines.map((machine) => (
        <td key={`${machine.id}-${category.id}`} className="py-5 px-4 text-sm text-gray-900">
          {category.id === 'features' ? (
            <ul className="list-disc pl-5 space-y-1">
              {machine.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
              {machine.features.length > 3 && (
                <li className="text-gray-500">And {machine.features.length - 3} more...</li>
              )}
            </ul>
          ) : category.id === 'paymentOptions' ? (
            <div className="flex flex-wrap gap-1">
              {machine.paymentOptions?.map((option, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {option}
                </span>
              ))}
            </div>
          ) : (
            <span>{machine[category.id as keyof VendingMachine] || 'N/A'}</span>
          )}
        </td>
      ))}
      {/* Add empty cells to fill the table if less than 3 machines are selected */}
      {Array.from({ length: 3 - machines.length }).map((_, idx) => (
        <td key={`empty-${idx}`} className="py-5 px-4 text-sm text-gray-400 italic">
          Select a machine
        </td>
      ))}
    </tr>
  );
}

/**
 * VendingMachineComparison component allows users to select and compare
 * different vending machine options side by side
 */
function VendingMachineComparison(): JSX.Element {
  const { machines, selectedMachines, toggleMachineSelection, clearSelections } = useVendingMachines();
  const [showComparison, setShowComparison] = useState(false);

  // Categories for comparison
  const comparisonCategories = [
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'features', label: 'Key Features' },
    { id: 'paymentOptions', label: 'Payment Options' }
  ];

  // Limit comparisons to maximum 3 machines
  const canSelectMore = selectedMachines.length < 3;

  /**
   * Handle machine selection
   */
  const handleSelect = (machine: VendingMachine) => {
    if (selectedMachines.some(m => m.id === machine.id) || canSelectMore) {
      toggleMachineSelection(machine.id);
    }
  };

  /**
   * Start comparison when at least 2 machines are selected
   */
  const startComparison = () => {
    if (selectedMachines.length >= 1) {
      setShowComparison(true);
    }
  };

  /**
   * Reset the comparison
   */
  const resetComparison = () => {
    clearSelections();
    setShowComparison(false);
  };

  return (
    <section className="py-16 bg-gray-50" id="vending-machine-comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compare Vending Machines
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select up to three machines to compare their features and find the best fit for your needs.
          </p>
        </div>

        {!showComparison ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-700">
                <span className="font-medium">{selectedMachines.length}</span> of 3 machines selected
              </p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="text-gray-700 hover:text-gray-900 text-sm font-medium"
                  onClick={clearSelections}
                  disabled={selectedMachines.length === 0}
                  aria-label="Clear all selections"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                    selectedMachines.length >= 1
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  onClick={startComparison}
                  disabled={selectedMachines.length < 1}
                  aria-label="Compare selected machines"
                >
                  Compare {selectedMachines.length === 1 ? 'Machine' : 'Machines'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Selectable vending machines">
              {machines.map((machine) => {
                const isSelected = selectedMachines.some(m => m.id === machine.id);
                return (
                  <div
                    key={machine.id}
                    className={`bg-white p-4 rounded-lg border transition-all ${
                      isSelected
                        ? 'ring-2 ring-blue-500 border-blue-500'
                        : !canSelectMore && !isSelected
                        ? 'opacity-50 cursor-not-allowed border-gray-200'
                        : 'hover:shadow-md border-gray-200 cursor-pointer'
                    }`}
                    onClick={() => handleSelect(machine)}
                    role="listitem"
                    aria-selected={isSelected}
                    tabIndex={!canSelectMore && !isSelected ? -1 : 0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(machine);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{machine.name}</h3>
                      <div className="flex items-center justify-center w-5 h-5">
                        {isSelected ? (
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : canSelectMore ? (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        machine.category === 'snack' ? 'bg-green-100 text-green-800' :
                        machine.category === 'beverage' ? 'bg-blue-100 text-blue-800' :
                        machine.category === 'combo' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {machine.category.charAt(0).toUpperCase() + machine.category.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{machine.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{machine.dimensions}</p>
                    <p className="text-xs text-gray-500">{machine.capacity}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Machine Comparison</h3>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={resetComparison}
                aria-label="Back to selection"
              >
                ← Back to selection
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200" aria-label="Vending machine comparison table">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Feature
                      </th>
                      {selectedMachines.map((machine) => (
                        <th key={machine.id} scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-1/4">
                          {machine.name}
                        </th>
                      ))}
                      {/* Add empty headers to fill the table if less than 3 machines are selected */}
                      {Array.from({ length: 3 - selectedMachines.length }).map((_, idx) => (
                        <th key={`empty-header-${idx}`} scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/4">
                          -
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <th className="py-5 px-4 text-left text-sm font-medium text-gray-500 bg-gray-50">
                        Category
                      </th>
                      {selectedMachines.map((machine) => (
                        <td key={`${machine.id}-category`} className="py-5 px-4 text-sm text-gray-900">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            machine.category === 'snack' ? 'bg-green-100 text-green-800' :
                            machine.category === 'beverage' ? 'bg-blue-100 text-blue-800' :
                            machine.category === 'combo' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {machine.category.charAt(0).toUpperCase() + machine.category.slice(1)}
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 3 - selectedMachines.length }).map((_, idx) => (
                        <td key={`empty-category-${idx}`} className="py-5 px-4 text-sm text-gray-400 italic">
                          -
                        </td>
                      ))}
                    </tr>

                    {/* Render each comparison category */}
                    {comparisonCategories.map((category) => (
                      <ComparisonCategory 
                        key={category.id} 
                        category={category} 
                        machines={selectedMachines} 
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help Deciding?</h3>
              <p className="text-gray-700 mb-4">
                Our experts can help you choose the best vending machine solution for your specific needs. 
                Contact us for a personalized recommendation.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Contact Us
                </a>
                <a
                  href="tel:2094035450"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Call (209) 403-5450
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default VendingMachineComparison;