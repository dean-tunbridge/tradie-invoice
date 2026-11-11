import { z } from 'zod'

export const businessSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),

  address: z.string().min(1, 'Business address is required'),

  email: z.string().email('Please enter a valid email address'),

  phone: z.string().optional(),

  nzbn: z.string().optional(),

  gstRegistered: z.boolean(),

  gstNumber: z.string().optional(),
})
