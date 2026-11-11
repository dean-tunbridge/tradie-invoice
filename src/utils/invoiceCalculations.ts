import type { InvoiceItem } from '../types/invoice'

// CONVERT AMOUNT TO CENTS //
export function convertToCents(amount: number) {
  return Math.round(amount * 100)
}

// CONVERT AMOUNT TO DOLLARS //
export function convertToDollars(cents: number) {
  return cents / 100
}

// LINE ITEM TOTAL //
export function calculateLineTotalCents(item: InvoiceItem) {
  const unitPriceCents = convertToCents(item.unitPrice)

  return Math.round(item.quantity * unitPriceCents)
}

// CALCULATE TOTAL //
export function calculateTotalCents(items: InvoiceItem[]) {
  return items.reduce((curr, acc) => {
    return curr + calculateLineTotalCents(acc)
  }, 0)
}

// CALCULATE DISCOUNT //
export function calculateDiscount(
  subtotalCents: number,
  discountPercentage: number,
): number {
  return Math.round(subtotalCents * (discountPercentage / 100))
}

// CALCULATE TAX AFTER DISCOUNT //
export function calculateTaxAfterDiscount(
  subtotalCents: number,
  discountCents: number,
): number {
  return subtotalCents - discountCents
}

// CALCULATE GST //
export function calculateGST(
  taxableAmountCents: number,
  gstRegistered: boolean,
  gstRate: number = 15,
): number {
  if (!gstRegistered) return 0

  return Math.round(taxableAmountCents * (gstRate / 100))
}
