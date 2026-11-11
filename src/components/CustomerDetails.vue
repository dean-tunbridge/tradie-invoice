<template>
  <div>
    <section class="customer-details">
      <h2>Customer Details</h2>
      <!-- customer name -->
      <label>
        Customer Name
        <input
          type="text"
          :value="customer.customerName"
          @input="
            updateCustomer(
              'customerName',
              ($event.target as HTMLInputElement).value,
            )
          " />
      </label>

      <!-- customer address -->
      <label>
        Customer Address
        <input
          type="text"
          :value="customer.address"
          @input="
            updateCustomer('address', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <!-- customer email -->
      <label>
        Email
        <input
          type="email"
          :value="customer.email"
          @input="
            updateCustomer('email', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <!-- customer phone number -->
      <label>
        Phone
        <input
          type="tel"
          :value="customer.phone"
          @input="
            updateCustomer('phone', ($event.target as HTMLInputElement).value)
          " />
      </label>
    </section>
  </div>
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

<style scoped>
.customer-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.customer-details label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.customer-details input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
