<template>
  <div></div>
</template>

<script setup lang="ts">
import type { InvoiceItem } from '../types/invoice'

const props = defineProps<{
  items: InvoiceItem[]
}>()

const emit = defineEmits<{
  'update:items': [items: InvoiceItem[]]
}>()

// update item //
function updateItem(
  index: number,
  field: keyof InvoiceItem,
  value: string | number,
) {
  const updatedItems = [...props.items]

  updatedItems[index] = {
    ...updatedItems[index],
    [field]: value,
  }

  emit('update:items', updatedItems)
}

// add new item //
function addItem() {
  const newItem: InvoiceItem = {
    description: '',
    quantity: 1,
    unitPrice: 0,
  }

  emit('update:items', [...props.items, newItem])
}

// remove item //
function removeItem(index: number) {
  const updatedItems: InvoiceItem[] = []

  for (let i = 0; i < props.items.length; i++) {
    if (i !== index) {
      updatedItems.push(props.items[i])
    }
  }

  emit('update:items', updatedItems)
}
</script>

<style scoped></style>
