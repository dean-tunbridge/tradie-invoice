<template>
  <div></div>
</template>

<script setup lang="ts">
import type { Customer } from '../types/invoice'

// Declare what values (properties) the parent component must provide
const props = defineProps<{
  customer: Customer
}>()

// Declare which events the child component can send back to parent component
const emit = defineEmits<{
  'update:customer': [customer: Customer]
}>()

function updateCustomer(field: keyof Customer, value: string) {
  emit('update:customer', {
    ...props.customer,
    [field]: value,
  })
}
</script>

<style scoped></style>
