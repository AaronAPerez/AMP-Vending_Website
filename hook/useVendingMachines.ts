'use client';

import { useState, useCallback } from 'react';
import { machines, machinesByCategory, VendingMachine } from '@/lib/vendingMachineData';

/**
 * Re-export the VendingMachine interface
 */
export type { VendingMachine };

/**
 * Custom hook for managing vending machine selection and data
 * This provides a reusable way to handle vending machine state across the application
 */
const useVendingMachines = () => {
  // State for selected machine(s)
  const [selectedMachines, setSelectedMachines] = useState<VendingMachine[]>([]);

  /**
   * Toggle selection of a machine
   */
  const toggleMachineSelection = useCallback((machineId: string) => {
    setSelectedMachines(prev => {
      const isSelected = prev.some(machine => machine.id === machineId);
      
      if (isSelected) {
        // If already selected, remove it
        return prev.filter(machine => machine.id !== machineId);
      } else {
        // If not selected, add it
        const machineToAdd = machines.find(machine => machine.id === machineId);
        if (machineToAdd) {
          return [...prev, machineToAdd];
        }
        return prev;
      }
    });
  }, []);

  /**
   * Select a single machine (replacing any other selections)
   */
  const selectMachine = useCallback((machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    if (machine) {
      setSelectedMachines([machine]);
    }
  }, []);

  /**
   * Clear all selected machines
   */
  const clearSelections = useCallback(() => {
    setSelectedMachines([]);
  }, []);

  /**
   * Get machines by category
   */
  const getMachinesByCategory = useCallback((category: 'snack' | 'beverage' | 'combo' | 'food') => {
    return machinesByCategory[category];
  }, []);

  /**
   * Get a single machine by ID
   */
   const getMachineById = (id: string) => {
    return machines.find(machine => machine.id === id) || null;
  };

  return {
    machines,
    getMachineById,
    machinesByCategory,
    selectedMachines,
    toggleMachineSelection,
    selectMachine,
    clearSelections,
    getMachinesByCategory,
    isSelected: (machineId: string) => selectedMachines.some(m => m.id === machineId)
  };
};

export default useVendingMachines;