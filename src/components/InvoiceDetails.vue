<template>
  <div>
    <section class="invoice-details">
      <h2>Invoice Details</h2>

      <!-- invoice number -->
      <label>
        Invoice number
        <input
          type="text"
          :value="invoiceNumber"
          placeholder="INV-001"
          @input="
            emit(
              'update:invoiceNumber',
              ($event.target as HTMLInputElement).value,
            )
          " />
        <!-- error handling -->
        <p v-if="props.errors?.invoiceNumber?.errors?.length">
          {{ props.errors.invoiceNumber.errors[0] }}
        </p>
      </label>

      <!-- invoice date -->
      <label>
        Invoice Date
        <input
          type="date"
          :value="invoiceDate"
          @input="
            emit(
              'update:invoiceDate',
              ($event.target as HTMLInputElement).value,
            )
          " />
        <!-- error handling -->
        <p v-if="props.errors?.invoiceDate?.errors?.length">
          {{ props.errors.invoiceDate.errors[0] }}
        </p>
      </label>

      <!-- due date -->
      <label>
        Due Date
        <input
          type="date"
          :value="dueDate"
          @input="
            emit('update:dueDate', ($event.target as HTMLInputElement).value)
          " />
        <p v-if="props.errors?.dueDate?.errors?.length">
          {{ props.errors.dueDate.errors[0] }}
        </p>
      </label>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Invoice, InvoiceValidationErrors } from '../types/invoice'

// reusable type alias //
type invoicePropertiesErrors = NonNullable<
  InvoiceValidationErrors['properties']
>

const props = defineProps<{
  invoiceNumber: Invoice['invoiceNumber']
  invoiceDate: Invoice['invoiceDate']
  dueDate: Invoice['dueDate']
  errors?: {
    invoiceNumber?: invoicePropertiesErrors['invoiceNumber']
    invoiceDate?: invoicePropertiesErrors['invoiceDate']
    dueDate?: invoicePropertiesErrors['dueDate']
  }
}>()

const emit = defineEmits<{
  'update:invoiceNumber': [value: string]
  'update:invoiceDate': [value: string]
  'update:dueDate': [value: string]
}>()
</script>

<style scoped>
.invoice-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.invoice-details label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invoice-details input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
