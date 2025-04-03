import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | AMP Vending Admin',
    default: 'Admin | AMP Vending',
  },
  description: 'Administrative area for AMP Vending machine business management',
};

/**
 * Layout for the admin section
 * Uses the AdminLayout component which is imported by each individual page
 */
export default function AdminSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}