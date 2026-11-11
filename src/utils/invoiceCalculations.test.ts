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

// TEST CENT CONVERTER //
describe('Invoice calculations', () => {
  describe('Currency conversion', () => {
    it('Converts dollar values into cents', () => {
      expect(convertToCents(11.73)).toBe(1173)
    })
  })
})

// TEST DOLLAR CONVERTER //
