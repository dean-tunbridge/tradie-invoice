import { describe, it, expect } from 'vitest'

import {
  businessSchema,
  customerSchema,
  invoiceItemSchema,
  invoiceSchema,
} from './invoiceSchema'

// VALID TEST DATA //

const validBusiness = {
  businessName: 'Smith Plumbing',
  address: '123 Queen Street, Auckland',
  email: 'smith@example.com',
  phone: '0211234567',
  nzbn: '9429041234567',
  gstRegistered: true,
  gstNumber: '123-456-789',
}

const validCustomer = {
  customerName: 'John Smith',
  address: '45 King Street, Auckland',
  email: 'john@example.com',
  phone: '0219876543',
}

const validItem = {
  description: 'Plumbing labour',
  quantity: 2,
  unitPrice: 85,
}

const validInvoice = {
  business: validBusiness,
  customer: validCustomer,
  invoiceNumber: 'INV-001',
  invoiceDate: '2026-11-12',
  dueDate: '2026-11-19',
  items: [validItem],
  discountPercentage: 10,
}

// TEST BUSINESS SCHEMA //
describe('Business schema', () => {
  // valid business //
  it('Accepts valid business information', () => {
    const result = businessSchema.safeParse(validBusiness)
    expect(result.success).toBe(true)
  })

  // business name //
  it('Rejects empty business name', () => {
    const result = businessSchema.safeParse({
      ...validBusiness,
      businessName: '',
    })
    expect(result.success).toBe(false)
  })
  // whitespace only //
  it('rejects whitespace-only business names', () => {
    const result = businessSchema.safeParse({
      ...validBusiness,
      businessName: '   ',
    })

    expect(result.success).toBe(false)
  })

  // empty email address //
  it('accepts an empty email address', () => {
    const result = businessSchema.safeParse({
      ...validBusiness,
      email: '',
    })

    expect(result.success).toBe(true)
  })

  // gst //
  it('requires a GST number when GST registered', () => {
    const result = businessSchema.safeParse({
      ...validBusiness,
      gstNumber: '',
    })
    expect(result.success).toBe(false)
  })
  // Unregistered business //
  it('allows an unregistered business without a GST number', () => {
    const result = businessSchema.safeParse({
      ...validBusiness,
      gstRegistered: false,
      gstNumber: '',
    })

    expect(result.success).toBe(true)
  })
})

// TEST CUSTOMER SCHEMA //
describe('Customer schema', () => {
  // customer information //
  it('accepts valid customer information', () => {
    const result = customerSchema.safeParse(validCustomer)

    expect(result.success).toBe(true)
  })
  // empty customer name //
  it('rejects an empty customer name', () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      customerName: '',
    })

    expect(result.success).toBe(false)
  })
  // whitespace only //
  it('rejects whitespace-only customer names', () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      customerName: '   ',
    })

    expect(result.success).toBe(false)
  })
  // empty email address //
  it('accepts an empty email address', () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      email: '',
    })

    expect(result.success).toBe(true)
  })
  // invalid email address //
  it('rejects an invalid email address', () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      email: 'invalid-email',
    })

    expect(result.success).toBe(false)
  })
  // empty customer address
  it('rejects an empty customer address', () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      address: '',
    })

    expect(result.success).toBe(false)
  })
})

// TEST INVOICE ITEM SCHEMA //
describe('Invoice item schema', () => {
  // valid item //
  it('accepts valid invoice item information', () => {
    const result = invoiceItemSchema.safeParse(validItem)

    expect(result.success).toBe(true)
  })

  // description //
  it('rejects an empty description', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      description: '',
    })

    expect(result.success).toBe(false)
  })

  it('rejects whitespace-only descriptions', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      description: '   ',
    })

    expect(result.success).toBe(false)
  })

  it('trims whitespace from descriptions', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      description: '  Plumbing labour  ',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.description).toBe('Plumbing labour')
    }
  })

  // quantity //
  it('rejects a quantity of zero', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      quantity: 0,
    })

    expect(result.success).toBe(false)
  })

  it('rejects a negative quantity', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      quantity: -2,
    })

    expect(result.success).toBe(false)
  })

  it('accepts a decimal quantity', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      quantity: 1.5,
    })

    expect(result.success).toBe(true)
  })

  // unit price //
  it('accepts a unit price of zero', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      unitPrice: 0,
    })

    expect(result.success).toBe(true)
  })

  it('rejects a negative unit price', () => {
    const result = invoiceItemSchema.safeParse({
      ...validItem,
      unitPrice: -85,
    })

    expect(result.success).toBe(false)
  })
})

// TEST INVOICE SCHEMA //
describe('Invoice schema', () => {
  // valid invoice //
  it('accepts valid invoice information', () => {
    const result = invoiceSchema.safeParse(validInvoice)

    expect(result.success).toBe(true)
  })

  // business //
  it('rejects an invoice with invalid business information', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      business: {
        ...validBusiness,
        businessName: '',
      },
    })

    expect(result.success).toBe(false)
  })

  // customer //
  it('rejects an invoice with invalid customer information', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      customer: {
        ...validCustomer,
        customerName: '',
      },
    })

    expect(result.success).toBe(false)
  })

  // invoice number //
  it('rejects an empty invoice number', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceNumber: '',
    })

    expect(result.success).toBe(false)
  })

  it('rejects whitespace-only invoice numbers', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceNumber: '   ',
    })

    expect(result.success).toBe(false)
  })

  // invoice date //
  it('rejects an invalid invoice date', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceDate: 'not-a-date',
    })

    expect(result.success).toBe(false)
  })

  it('rejects an invalid due date', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      dueDate: '2026-13-45',
    })

    expect(result.success).toBe(false)
  })

  // due date validation //
  it('rejects a due date before the invoice date', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceDate: '2026-11-19',
      dueDate: '2026-11-12',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes('dueDate') &&
            issue.message === 'Due date cannot be before invoice date',
        ),
      ).toBe(true)
    }
  })

  it('accepts a due date equal to the invoice date', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceDate: '2026-11-12',
      dueDate: '2026-11-12',
    })

    expect(result.success).toBe(true)
  })

  it('accepts a due date after the invoice date', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      invoiceDate: '2026-11-12',
      dueDate: '2026-12-12',
    })

    expect(result.success).toBe(true)
  })

  // invoice items //
  it('rejects an invoice with no items', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      items: [],
    })

    expect(result.success).toBe(false)
  })

  it('rejects an invoice containing an invalid item', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      items: [
        {
          ...validItem,
          quantity: -1,
        },
      ],
    })

    expect(result.success).toBe(false)
  })

  it('accepts an invoice with multiple valid items', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      items: [
        validItem,
        {
          description: 'Materials',
          quantity: 3,
          unitPrice: 25,
        },
      ],
    })

    expect(result.success).toBe(true)
  })

  // discount percentage //
  it('accepts a discount percentage of zero', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      discountPercentage: 0,
    })

    expect(result.success).toBe(true)
  })

  it('accepts a discount percentage of 100', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      discountPercentage: 100,
    })

    expect(result.success).toBe(true)
  })

  it('rejects a negative discount percentage', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      discountPercentage: -1,
    })

    expect(result.success).toBe(false)
  })

  it('rejects a discount percentage over 100', () => {
    const result = invoiceSchema.safeParse({
      ...validInvoice,
      discountPercentage: 101,
    })

    expect(result.success).toBe(false)
  })

  it('defaults discount percentage to zero when omitted', () => {
    const { discountPercentage, ...invoiceWithoutDiscount } = validInvoice

    const result = invoiceSchema.safeParse(invoiceWithoutDiscount)

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.discountPercentage).toBe(0)
    }
  })
})
