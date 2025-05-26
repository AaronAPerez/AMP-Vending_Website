import { MachineData } from "../data/vendingMachineData";

export function generateMachineMetadata(machine: MachineData) {
  return {
    title: `${machine.name} | Zero-Cost Installation | AMP Vending`,
    description: `${machine.shortDescription} Features 21.5" touchscreen, tap-to-pay, and maintenance-free operation.`,
    openGraph: {
      title: machine.name,
      description: machine.shortDescription,
      images: [{
        url: machine.images[0].src,
        width: 800,
        height: 600,
        alt: machine.images[0].alt,
      }],
    },
    alternates: {
      canonical: `/vending-machines/${machine.id}`,
    },
  };
}