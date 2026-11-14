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
        <!-- error handling -->
        <p v-if="props.errors?.businessName?.errors?.length">
          {{ props.errors.businessName.errors[0] }}
        </p>
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
        <!-- error handling -->
        <p v-if="props.errors?.address?.errors?.length">
          {{ props.errors.address.errors[0] }}
        </p>
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
        <!-- error handling -->
        <p v-if="props.errors?.email?.errors?.length">
          {{ props.errors.email.errors[0] }}
        </p>
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
        <!-- error handling -->
        <p v-if="props.errors?.phone?.errors?.length">
          {{ props.errors.phone.errors[0] }}
        </p>
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
  errors?: {
    businessName?: {
      errors: string[]
    }
    address?: {
      errors: string[]
    }
    email?: {
      errors: string[]
    }
    phone?: {
      errors: string[]
    }
  }
}>()
// Declare which events the child component can send back to parent component
const emit = defineEmits<{
  'update:business': [business: Business]
}>()

function updateBusiness(field: keyof Business, value: string | boolean) {
  const updatedBusiness = {
    ...props.business,
    [field]: value,
  }
  // Ensure gst number is removed when field is unticked //
  if (field === 'gstRegistered' && value === false) {
    updatedBusiness.gstNumber = ''
  }

  emit('update:business', updatedBusiness)
}
</script>

<style scoped>
.business-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.business-details label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.business-details input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
