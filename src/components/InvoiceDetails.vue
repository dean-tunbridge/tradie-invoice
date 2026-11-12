<template>
  <div>
    <section class="invoice-details">
      <h2>Invoice Details</h2>

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

<style scoped></style>
