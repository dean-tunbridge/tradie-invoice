<template>
  <div>
    <section class="line-items">
      <h2>Hours and Materials</h2>

      <p v-if="props.errors?.errors?.length">
        {{ props.errors.errors[0] }}
      </p>

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
          <!-- error handling -->
          <p
            v-if="
              props.errors?.items?.[index]?.properties?.description?.errors
                ?.length
            ">
            {{ props.errors.items[index].properties.description.errors[0] }}
          </p>
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
          <!-- error handling -->
          <p
            v-if="
              props.errors?.items?.[index]?.properties?.quantity?.errors?.length
            ">
            {{ props.errors.items[index].properties.quantity.errors[0] }}
          </p>
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
          <!-- error handling -->
          <p
            v-if="
              props.errors?.items?.[index]?.properties?.unitPrice?.errors
                ?.length
            ">
            {{ props.errors.items[index].properties.unitPrice.errors[0] }}
          </p>
        </label>

        <button type="button" @click="removeItem(index)">Remove item</button>
      </div>

      <button type="button" @click="addItem">Add item</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { InvoiceItem, InvoiceItemValidationErrors } from '../types/invoice'

const props = defineProps<{
  items: InvoiceItem[]
  errors?: InvoiceItemValidationErrors
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

<style scoped>
.line-item {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg);
  border: 1px solid var(--border-card);
  border-radius: 10px;
}
</style>
