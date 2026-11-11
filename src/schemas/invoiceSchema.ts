import { z } from 'zod'

// BUSINESS OWNER SCHEMA //
export const businessSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  address: z.string().min(1, 'Business address is required'),
  email: z.email().optional(),
  phone: z.string().optional(),
  nzbn: z.string().optional(),
  gstRegistered: z.boolean(),
  gstNumber: z.string().optional(),
})

// CUSTOMER SCHEMA //
export const customerSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  address: z.string().min(1, 'Customer address is required'),
  email: z.email().optional(),
  phone: z.string().optional(),
})

// INVOICE ITEMS SCHEMA //
export const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().positive('Quantity must be greater than zero'),
  price: z.number().nonnegative('Unit price cannot be negative'),
})

// INVOICE SCHEMA //

export const invoiceSchema = z.object({
  business: businessSchema,
  customer: customerSchema,
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z
    .array(invoiceItemSchema)
    .min(1, 'At least one invoice item is required'),
})
