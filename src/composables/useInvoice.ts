import { ref, computed } from 'vue'
import type {
  Invoice,
  InvoiceItem,
  InvoiceValidationErrors,
} from '../types/invoice'
import { calculateInvoiceAmounts } from '../utils/invoiceCalculations'
import { invoiceSchema } from '../schemas/invoiceSchema'
import { z } from 'zod'

// INITIAL INVOICE STATE //
const createInitialInvoice = (): Invoice => ({
  business: {
    businessName: '',
    address: '',
    email: '',
    phone: '',
    nzbn: '',
    gstRegistered: false,
    gstNumber: '',
  },

  customer: {
    customerName: '',
    address: '',
    email: '',
    phone: '',
  },

  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',

  items: [],

  discountPercentage: 0,
})

// INVOICE COMPOSABLE //
export function useInvoice() {
  // reactive invoice state //
  const invoice = ref<Invoice>(createInitialInvoice())

  // validate invoice //
  function validateInvoice() {
    const result = invoiceSchema.safeParse(invoice.value)

    if (result.success) {
      return {
        success: true as const,
        data: result.data,
        error: {
          errors: [],
          properties: {},
        } as InvoiceValidationErrors,
      }
    }

    const error = z.treeifyError(result.error)

    return {
      success: false as const,
      data: null,
      error,
    }
  }

  // invoice totals //
  const invoiceTotals = computed(() => {
    return calculateInvoiceAmounts(
      invoice.value.items,
      invoice.value.discountPercentage,
      invoice.value.business.gstRegistered,
    )
  })

  // add invoice item //
  function addItem() {
    const newItem: InvoiceItem = {
      description: '',
      quantity: 1,
      unitPrice: 0,
    }

    invoice.value.items.push(newItem)
  }

  // remove invoice item //
  function removeItem(index: number) {
    invoice.value.items.splice(index, 1)
  }

  // reset invoice //
  function resetInvoice() {
    invoice.value = createInitialInvoice()
  }

  return {
    invoice,
    invoiceTotals,
    addItem,
    removeItem,
    resetInvoice,
    validateInvoice,
  }
}
