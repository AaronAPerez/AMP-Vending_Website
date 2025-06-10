'use client';

import React from 'react';

import { getVendingMachineById, normalizeMachineData } from '@/lib/data/vendingMachineData';
import { MachineGrid } from '../MachineCard';


interface RelatedMachinesProps {
    currentMachineId: string;
    relatedIds: string[];
}

/**
 * RelatedMachines Component
 * Shows related machines on individual machine detail pages
 */
const RelatedMachines = ({ currentMachineId, relatedIds }: RelatedMachinesProps) => {
    // Get related machines data
    const relatedMachines = relatedIds
        .map(id => getVendingMachineById(id))
        .filter(machine => machine && machine.id !== currentMachineId)
        .map(machine => normalizeMachineData(machine!));

    if (relatedMachines.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-[#4d4d4d]/20 border-t border-[#a4acac]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">
                    Related Machines
                </h2>

                <MachineGrid
                    machines={[]}
                    variant="related"
                    maxItems={3}
                    ariaLabel="Related vending machines" />
            </div>
        </section>
    );
};

export default RelatedMachines;