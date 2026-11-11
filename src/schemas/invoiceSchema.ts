import { z } from 'zod'

export const businessSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  address: z.string().min(1, 'Business address is required'),
  email: z.email().optional(),
  phone: z.string().optional(),
  nzbn: z.string().optional(),
  gstRegistered: z.boolean(),
  gstNumber: z.string().optional(),
})

export const customerSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  address: z.string().min(1, 'Customer address is required'),
  email: z.email().optional(),
  phone: z.string().optional(),
})
