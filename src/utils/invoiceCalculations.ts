import type { InvoiceItem } from '../types/invoice'

// CONVERT AMOUNT TO CENTS //
export function convertToCents(amount: number) {
  return Math.round(amount * 100)
}

// CONVERT AMOUNT TO DOLLARS //
export function convertToDollars(cents: number) {
  return cents / 100
}

export function calculateTotalCents(item: InvoiceItem) {
  const unitPriceCents = convertToCents(item.unitPrice)

  return Math.round(item.quantity * unitPriceCents)
}
