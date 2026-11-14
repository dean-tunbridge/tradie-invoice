import { z } from 'zod'

import {
  businessSchema,
  customerSchema,
  invoiceItemSchema,
  invoiceSchema,
} from '../schemas/invoiceSchema'

// INFER TYPES FROM ZOD //
export type Business = z.infer<typeof businessSchema>
export type Customer = z.infer<typeof customerSchema>
export type InvoiceItem = z.infer<typeof invoiceItemSchema>
export type Invoice = z.infer<typeof invoiceSchema>

// VALIDATE ERROR TYPES //
export type InvoiceValidationErrors = ReturnType<
  typeof z.treeifyError<z.infer<typeof invoiceSchema>>
>
