<template>
  <div>
    <section class="business-details">
      <h2>Business Details</h2>

      <label>
        Business Name
        <input
          type="text"
          :value="business.businessName"
          @input="
            updateBusiness(
              'businessName',
              ($event.target as HTMLInputElement).value,
            )
          " />
      </label>

      <label>
        Business Address
        <input
          type="text"
          :value="business.address"
          @input="
            updateBusiness('address', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <label>
        Email
        <input
          type="email"
          :value="business.email"
          @input="
            updateBusiness('email', ($event.target as HTMLInputElement).value)
          " />

        <label>
          Phone
          <input
            type="tel"
            :value="business.phone"
            @input="
              updateBusiness('phone', ($event.target as HTMLInputElement).value)
            " />
        </label>
      </label>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Business } from '../types/invoice'

// Declare what values (properties) the parent component must provide
const props = defineProps<{
  business: Business
}>()
// Declare which events the child component can send back to parent component
const emit = defineEmits<{
  'update:business': [business: Business]
}>()

function updateBusiness(field: keyof Business, value: string | boolean) {
  emit('update:business', {
    ...props.business,
    [field]: value,
  })
}
</script>

<style scoped></style>
