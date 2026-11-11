import { describe, it, expect } from 'vitest'

import {
  convertToCents,
  convertToDollars,
  calculateLineTotalCents,
  calculateTotalCents,
  calculateDiscount,
  calculateTaxAfterDiscount,
  calculateGST,
} from './invoiceCalculations'

// TEST CURRENCY CONVERSIONS //
describe('Invoice calculations', () => {
  describe('Currency conversion', () => {
    // TEST CENT CONVERTER //
    it('Converts dollar values into cents', () => {
      expect(convertToCents(11.73)).toBe(1173)
    })
    // TEST DOLLAR CONVERTER //
    it('Converts cent values into dollars', () => {
      expect(convertToDollars(1173)).toBe(11.73)
    })
  })
})

// TEST LINE ITEM CALCULATIONS //
describe('Line item calculations', () => {
  it('Calculates line item totals correctly', () => {
    let item = {
      description: 'sundries',
      quantity: 1,
      unitPrice: 25,
    }
    expect(calculateLineTotalCents(item)).toBe(2500)
  })
})
