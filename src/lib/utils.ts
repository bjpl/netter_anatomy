/**
 * Utility Functions
 *
 * Common utility functions used throughout the application.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 *
 * Combines clsx for conditional class names with tailwind-merge
 * to handle Tailwind class conflicts properly.
 *
 * @example
 * ```ts
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': isActive })
 * // => 'px-4 py-2 bg-blue-500 text-white'
 *
 * cn('px-4', 'px-6') // tailwind-merge handles conflict
 * // => 'px-6'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
