import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format number in BDT lakh notation: 177778 → ৳1,77,778 */
export function formatBDT(amount: number): string {
  const str = Math.abs(amount).toString()
  const sign = amount < 0 ? '-' : ''
  if (str.length <= 3) return `${sign}৳${str}`
  const last3 = str.slice(-3)
  const rest = str.slice(0, -3)
  const restFormatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return `${sign}৳${restFormatted},${last3}`
}
