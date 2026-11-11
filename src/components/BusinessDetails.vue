<template>
  <div>
    <section class="business-details">
      <h2>Business Details</h2>

      <!-- business name -->
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

      <!-- business address -->
      <label>
        Business Address
        <input
          type="text"
          :value="business.address"
          @input="
            updateBusiness('address', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <!-- email -->
      <label>
        Email
        <input
          type="email"
          :value="business.email"
          @input="
            updateBusiness('email', ($event.target as HTMLInputElement).value)
          " />
      </label>
      <!-- phone number -->
      <label>
        Phone
        <input
          type="tel"
          :value="business.phone"
          @input="
            updateBusiness('phone', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <!-- New Zealand business number -->
      <label>
        NZBN
        <input
          type="text"
          :value="business.nzbn"
          @input="
            updateBusiness('nzbn', ($event.target as HTMLInputElement).value)
          " />
      </label>

      <!-- gst  -->
      <label>
        <input
          type="checkbox"
          :checked="business.gstRegistered"
          @change="
            updateBusiness(
              'gstRegistered',
              ($event.target as HTMLInputElement).checked,
            )
          " />
        GST registered
      </label>

      <!-- check gst registered -->
      <label v-if="business.gstRegistered">
        GST number
        <input
          type="text"
          :value="business.gstNumber"
          @input="
            updateBusiness(
              'gstNumber',
              ($event.target as HTMLInputElement).value,
            )
          " />
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
