import { MachineData } from "../data/vendingMachineData";


export function isMachineData(machine: any): machine is MachineData {
  return (
    machine &&
    typeof machine === 'object' &&
    typeof machine.id === 'string' &&
    typeof machine.name === 'string' &&
    typeof machine.model === 'string' &&
    Array.isArray(machine.images) &&
    machine.images.length > 0
  );
}

export function filterValidMachines(machines: (MachineData | undefined)[]): MachineData[] {
  return machines.filter((machine): machine is MachineData => 
    machine !== undefined && isMachineData(machine)
  );
}