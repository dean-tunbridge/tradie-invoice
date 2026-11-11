<template>
  <div>
    <section class="line-items">
      <h2>Hours and Materials</h2>

      <div v-for="(item, index) in items" :key="index" class="line-item">
        <h3>Item: {{ index + 1 }}</h3>
        <!-- description -->
        <label>
          Description
          <input
            type="text"
            :value="item.description"
            @input="
              updateItem(
                index,
                'description',
                ($event.target as HTMLInputElement).value,
              )
            " />
        </label>

        <!-- quantity -->
        <label>
          Quantity
          <input
            type="number"
            min="0"
            step="any"
            :value="item.quantity"
            @input="
              updateItem(
                index,
                'quantity',
                Number(($event.target as HTMLInputElement).value),
              )
            " />
        </label>

        <!-- unit price -->
        <label>
          Unit Price ($)
          <input
            type="number"
            min="0"
            step="0.01"
            :value="item.unitPrice"
            @input="
              updateItem(
                index,
                'unitPrice',
                Number(($event.target as HTMLInputElement).value),
              )
            " />
        </label>

        <button type="button" @click="removeItem(index)">Remove item</button>
      </div>

      <button type="button" @click="addItem">Add item</button>
    </section>
  </div>
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
