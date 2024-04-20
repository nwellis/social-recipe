import clsx from 'clsx'

/**
 * Inteface for using our css merge and conditionals.
 * 
 * We could bring in `twMerge` for better merging in the future, but
 * at the cost of increased complexity. 
 * 
 * ```ts
 * import clsx from 'clsx'
 * import { twMerge } from 'tailwind-merge'
 * 
 * export function cn(...args: any[]) {
 *   return twMerge(cn(args))
 * }
 * ```
 */
export const cn = clsx