"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * ShineButton Component
 * 
 * A button with a shimmering gradient shine effect
 * Inspired by Aceternity UI
 */
export const ShineButton = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <button
      className={cn(
        "inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-[#A5ACAF]/20 bg-[linear-gradient(110deg,#000000,45%,#FD5A1E,55%,#000000)] bg-[length:200%_100%] px-8 font-medium text-[#F5F5F5] transition-colors hover:bg-[#000000] hover:text-[#FD5A1E] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};