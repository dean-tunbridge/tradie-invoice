<template>
  <section class="invoice-totals">
    <h2>Invoice Summary</h2>
    <!-- subtotal -->
    <div class="total-row">
      <span>Subtotal</span>
      <span>{{ formatCurrency(subtotalCents) }}</span>
    </div>
    <!-- discount -->
    <div class="total-row">
      <span>Discount</span>
      <span>-{{ formatCurrency(discountCents) }}</span>
    </div>
    <!-- taxable amount -->
    <div class="total-row">
      <span>Taxable Amount</span>
      <span>{{ formatCurrency(taxableAmountCents) }}</span>
    </div>
    <!-- gst -->
    <div class="total-row">
      <span>GST</span>
      <span>{{ formatCurrency(gstCents) }}</span>
    </div>
    <!-- total  -->
    <div class="total-row grand-total">
      <strong>Total Due</strong>
      <strong>{{ formatCurrency(totalCents) }}</strong>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  subtotalCents: number
  discountCents: number
  taxableAmountCents: number
  gstCents: number
  totalCents: number
}>()

// Set currency to NZD using inbuilt JS API //
function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(cents / 100)
}
</script>

<style scoped>
.total-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.grand-total {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 1.5rem;
}
</style>
