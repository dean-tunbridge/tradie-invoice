<template>
  <div>
    <form class="invoice-form" @submit.prevent="handleSubmit">
      <h1>Create Invoice</h1>

      <!-- Business details component -->
      <BusinessDetails
        v-model:business="invoice.business"
        :errors="validationErrors.properties?.business?.properties" />

      <!-- invoice details -->
      <InvoiceDetails
        v-model:invoice-number="invoice.invoiceNumber"
        v-model:invoice-date="invoice.invoiceDate"
        v-model:due-date="invoice.dueDate" />

      <!-- Customer details -->
      <CustomerDetails
        v-model:customer="invoice.customer"
        :errors="validationErrors.properties?.customer?.properties" />

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
      <button type="submit">Create Invoice</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BusinessDetails from './BusinessDetails.vue'
import CustomerDetails from './CustomerDetails.vue'
import InvoiceLineItems from './InvoiceLineItems.vue'
import InvoiceDetails from './InvoiceDetails.vue'
import InvoiceDiscount from './InvoiceDiscount.vue'
import InvoiceTotals from './InvoiceTotals.vue'
import { useInvoice } from '../composables/useInvoice.ts'

// useInvoice //
const { invoice, invoiceTotals, resetInvoice, validateInvoice } = useInvoice()

// validate errors //
const validationErrors = ref<ReturnType<typeof validateInvoice>['error']>({})

// handle form submission //
function handleSubmit() {
  const result = validateInvoice()

  if (!result.success) {
    validationErrors.value = result.error

    console.log('Validation errors:', JSON.stringify(result.error, null, 2))

    return
  }

  validationErrors.value = { errors: [], properties: {} }

  console.log('Invoice is valid:', result.data)
}
</script>

<style scoped></style>
