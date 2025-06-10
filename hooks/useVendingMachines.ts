'use client';

import { getAllVendingMachines, getVendingMachineById, getVendingMachinesByCategory, MachineData } from '@/lib/data/vendingMachineData';
import { useState, useCallback } from 'react';


/* Re-export the MachineData interface */
export type { MachineData };

/**
 * Custom hook for managing vending machine data and selection
 * Compatible with the vendingMachineData structure
 */
export const useVendingMachines = () => {
  // Get all machines once
  const allMachines = getAllVendingMachines();
  
  // State for selected machine(s)
  const [selectedMachines, setSelectedMachines] = useState<MachineData[]>([]);

  /* Toggle selection of a machine */
  const toggleMachineSelection = useCallback((machineId: string) => {
    setSelectedMachines(prev => {
      const isSelected = prev.some(machine => machine.id === machineId);
      
      if (isSelected) {
        // If already selected, remove it
        return prev.filter(machine => machine.id !== machineId);
      } else {
        // If not selected, add it
        const machineToAdd = getVendingMachineById(machineId);
        if (machineToAdd) {
          return [...prev, machineToAdd];
        }
        return prev;
      }
    });
  }, []);

  /* Select a single machine (replacing any other selections) */
  const selectMachine = useCallback((machineId: string) => {
    const machine = getVendingMachineById(machineId);
    if (machine) {
      setSelectedMachines([machine]);
    }
  }, []);

  /* Clear all selected machines */
  const clearSelections = useCallback(() => {
    setSelectedMachines([]);
  }, []);

  /**
   * Get machines by category
   * Mapping the original categories to our new structure
   */
  const getMachinesByCategory = useCallback((category: 'snack' | 'beverage' | 'combo' | 'food') => {
    // Map the old categories to our new structure
    switch (category) {
      case 'snack':
        return getVendingMachinesByCategory('non-refrigerated');
      case 'beverage':
      case 'food':
      case 'combo':
        return getVendingMachinesByCategory('refrigerated');
      default:
        return allMachines;
    }
  }, [allMachines]);

  /**
   * Check if a machine is selected
   */
  const isSelected = useCallback((machineId: string) => {
    return selectedMachines.some(m => m.id === machineId);
  }, [selectedMachines]);

  return {
    machines: allMachines,
    getMachineById: getVendingMachineById,
    selectedMachines,
    toggleMachineSelection,
    selectMachine,
    clearSelections,
    getMachinesByCategory,
    isSelected
  };
};

export default useVendingMachines;