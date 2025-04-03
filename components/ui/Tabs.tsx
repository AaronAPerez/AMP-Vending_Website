'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { value: string; label: string; content: React.ReactNode }[]
  defaultValue?: string
  className?: string
}

const Tabs = ({ tabs, defaultValue, className }: TabsProps) => {
  return (
    <TabsPrimitive.Root 
      defaultValue={defaultValue || tabs[0]?.value} 
      className={cn('w-full', className)}
    >
      <TabsPrimitive.List className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-4 py-2 -mb-px font-medium text-sm transition-colors',
              'data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600',
              'data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700'
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      
      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className="py-4"
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export default Tabs