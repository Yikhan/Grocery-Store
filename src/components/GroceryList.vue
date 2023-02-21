<template>
  <div>
    <h2>Grocery List</h2>
    <GroceryItem v-for="grocery in groceries" :key="grocery.id" />
    <form @submit.prevent="addGrocery">
      <label>
        Name:
        <input v-model="newGroceryName" type="text" required />
      </label>
      <label>
        Quantity:
        <input v-model.number="newGroceryQuantity" type="number" min="1" required />
      </label>
      <button type="submit">Add Grocery</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGroceryStore } from '../store/grocery'
import GroceryItem from './GroceryItem.vue'

const groceryStore = useGroceryStore()
const { groceries } = storeToRefs(groceryStore)

const newGroceryName = ref('')
const newGroceryQuantity = ref(1)

function addGrocery() {
  groceryStore.addGrocery({
    id: new Date().getTime(),
    name: newGroceryName.value,
    quantity: newGroceryQuantity.value,
  })
  newGroceryName.value = ''
  newGroceryQuantity.value = 1
}

function deleteGrocery(index: number) {
  groceryStore.deleteGrocery(index)
}
</script>
