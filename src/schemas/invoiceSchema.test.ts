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
