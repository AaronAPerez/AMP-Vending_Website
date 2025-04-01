import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and optimizes them with tailwind-merge
 * @param inputs - Class values to combine
 * @returns - Optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}