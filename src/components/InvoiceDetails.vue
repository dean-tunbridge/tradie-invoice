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
      </label>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Invoice } from '../types/invoice'

const props = defineProps<{
  invoiceNumber: Invoice['invoiceNumber']
  invoiceDate: Invoice['invoiceDate']
  dueDate: Invoice['dueDate']
}>()

const emit = defineEmits<{
  'update:invoiceNumber': [value: string]
  'update:invoiceDate': [value: string]
  'update:dueDate': [value: string]
}>()
</script>

<style scoped>
.invoice-information {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.invoice-information label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invoice-information input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
