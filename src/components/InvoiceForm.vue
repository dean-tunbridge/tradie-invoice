<template>
  <div>
    <form class="invoice-form">
      <h1>Create Invoice</h1>

      <!-- Business details component -->
      <BusinessDetails v-model:business="invoice.business" />

      <!-- invoice details -->
      <InvoiceDetails
        v-model:invoice-number="invoice.invoiceNumber"
        v-model:invoice-date="invoice.invoiceDate"
        v-model:due-date="invoice.dueDate" />

      <!-- Customer details -->
      <CustomerDetails v-model:customer="invoice.customer" />

      <!-- Invoice line items -->
      <InvoiceLineItems v-model:items="invoice.items" />

      <!-- discounts-->
      <InvoiceDiscount
        v-model:discount-percentage="invoice.discountPercentage" />

      <!-- Invoice totals -->
      <InvoiceTotals
        :subtotal-cents="invoiceTotals.subtotalCents"
        :discount-cents="invoiceTotals.discountCents"
        :taxable-amount-cents="invoiceTotals.taxableAmountCents"
        :gst-cents="invoiceTotals.gstCents"
        :total-cents="invoiceTotals.totalCents" />

      <!-- Invoice actions -->
    </form>

    <section>
      <h2>Invoice Totals</h2>
      <p>Subtotal: {{ invoiceTotals.subtotalCents }} cents</p>

      <p>Discount: {{ invoiceTotals.discountCents }} cents</p>

      <p>GST: {{ invoiceTotals.gstCents }} cents</p>

      <p>Total: {{ invoiceTotals.totalCents }} cents</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Invoice } from '../types/invoice'
import { calculateInvoiceAmounts } from '../utils/invoiceCalculations'
import BusinessDetails from './BusinessDetails.vue'
import CustomerDetails from './CustomerDetails.vue'
import InvoiceLineItems from './InvoiceLineItems.vue'
import InvoiceTotals from './InvoiceTotals.vue'
import InvoiceDetails from './InvoiceDetails.vue'
import InvoiceDiscount from './InvoiceDiscount.vue'

// Create initial state for all values //
const invoice = ref<Invoice>({
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

const invoiceTotals = computed(() => {
  return calculateInvoiceAmounts(
    invoice.value.items,
    invoice.value.discountPercentage,
    invoice.value.business.gstRegistered,
  )
})
</script>

<style scoped></style>
