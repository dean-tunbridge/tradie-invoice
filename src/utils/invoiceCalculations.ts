import type { invoiceItem } from '../types/invoice'

export function convertToCents(amount: number) {
  return Math.round(amount * 100)
}
