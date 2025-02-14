import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This allows for conditional classes and proper Tailwind class merging
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
