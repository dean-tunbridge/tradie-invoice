<template>
  <div></div>
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
