<script setup lang="ts">
defineProps<{
  subtotalCents: number
  discountCents: number
  taxableAmountCents: number
  gstCents: number
  totalCents: number
}>()

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(cents / 100)
}
</script>

<template>
  <section class="invoice-totals">
    <h2>Invoice Summary</h2>

    <div class="total-row">
      <span>Subtotal</span>
      <span>{{ formatCurrency(subtotalCents) }}</span>
    </div>

    <div class="total-row">
      <span>Discount</span>
      <span>-{{ formatCurrency(discountCents) }}</span>
    </div>

    <div class="total-row">
      <span>Taxable Amount</span>
      <span>{{ formatCurrency(taxableAmountCents) }}</span>
    </div>

    <div class="total-row">
      <span>GST</span>
      <span>{{ formatCurrency(gstCents) }}</span>
    </div>

    <div class="total-row grand-total">
      <strong>Total Due</strong>
      <strong>{{ formatCurrency(totalCents) }}</strong>
    </div>
  </section>
</template>

<style scoped>
.invoice-totals {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.grand-total {
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  font-size: 1rem;
}
</style>
