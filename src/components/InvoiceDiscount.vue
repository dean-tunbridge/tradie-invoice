<template>
  <section class="invoice-discount">
    <h2>Discount</h2>
    <!-- discount -->
    <label>
      Discount Percentage
      <input
        type="number"
        min="0"
        max="100"
        step="0.01"
        :value="discountPercentage"
        @input="
          emit(
            'update:discountPercentage',
            Number(($event.target as HTMLInputElement).value),
          )
        " />
    </label>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  discountPercentage: number
}>()

const emit = defineEmits<{
  'update:discountPercentage': [value: number]
}>()
</script>

<style scoped>
.invoice-discount {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.invoice-discount label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invoice-discount input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
