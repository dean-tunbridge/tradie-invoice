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

// TEST SUBTOTAL CALCULATION //
describe('Subtotal calculations', () => {
  it('Calculates total of multiple items', () => {
    let items = [
      { description: 'labour', quantity: 8, unitPrice: 85.5 },
      { description: 'sundries', quantity: 2, unitPrice: 25 },
    ]

    expect(calculateTotalCents(items)).toBe(73400)
  })
})

// TEST DISCOUNTS //
describe('Discount calculations', () => {
  // TEST PERCENTAGE //
  it('calculates a percentage discount', () => {
    expect(calculateDiscount(73400, 10)).toBe(7340)
  })
  // TEST AMOUNT AFTER DISCOUNT
  it('calculates the taxable amount after discount', () => {
    expect(calculateTaxAfterDiscount(73400, 7340)).toBe(66060)
  })
})

// TEST GST CALCULATIONS //
describe('GST calculations', () => {
  // TEST CALCULATE GST //
  it('calculates GST at 15%', () => {
    expect(calculateGST(66060, true)).toBe(9909)
  })
  // TEST NOT CALCULATING FOR UNREGISTERED BUSINESS' //
  it('does not calculate GST for non-registered businesses', () => {
    expect(calculateGST(66060, false)).toBe(0)
  })
  // TEST DIFFERENT GST RATE
  it('allows a different GST rate', () => {
    expect(calculateGST(66060, true, 10)).toBe(6606)
  })
})

// TEST EDGE CASES //
describe('Calculation edge cases', () => {
  // TEST ZERO VALUE ITEM //
  it('allows zero-value items', () => {
    const item = {
      description: 'Warranty work',
      quantity: 1,
      unitPrice: 0,
    }

    expect(calculateLineTotalCents(item)).toBe(0)
  })
  // TEST 0% DISCOUNT //
  it('handles a zero percent discount', () => {
    expect(calculateDiscount(20000, 0)).toBe(0)
  })
  // TEST 100% DISCOUNT //
  it('handles a 100 percent discount', () => {
    expect(calculateDiscount(20000, 100)).toBe(20000)
  })
  // TEST ROUNDING //
  it('rounds GST to the nearest cent', () => {
    expect(calculateGST(1001, true)).toBe(150)
  })
  // RETURN VALUE FROM EMPTY ARRAY //
  it('returns zero subtotal for an empty item array', () => {
    expect(calculateTotalCents([])).toBe(0)
  })
})
