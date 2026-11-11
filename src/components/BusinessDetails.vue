<template>
  <div></div>
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
