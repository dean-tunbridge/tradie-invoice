import { ref, computed } from 'vue'

import type { Invoice, InvoiceItem } from '../types/invoice'

import { calculateInvoiceAmounts } from '../utils/invoiceCalculations'

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
  // REACTIVE INVOICE STATE //
  const invoice = ref<Invoice>(createInitialInvoice())

  // COMPUTED INVOICE TOTALS //
  const invoiceTotals = computed(() => {
    return calculateInvoiceAmounts(
      invoice.value.items,
      invoice.value.discountPercentage,
      invoice.value.business.gstRegistered,
    )
  })

  // ADD INVOICE ITEM //
  function addItem() {
    const newItem: InvoiceItem = {
      description: '',
      quantity: 1,
      unitPrice: 0,
    }

    invoice.value.items.push(newItem)
  }

  // REMOVE INVOICE ITEM //
  function removeItem(index: number) {
    invoice.value.items.splice(index, 1)
  }

  // RESET INVOICE //
  function resetInvoice() {
    invoice.value = createInitialInvoice()
  }

  // RETURN STATE AND FUNCTIONS //
  return {
    invoice,
    invoiceTotals,
    addItem,
    removeItem,
    resetInvoice,
  }
}
