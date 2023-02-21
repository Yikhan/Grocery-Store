<template>
  <div>
    <h2>Grocery List</h2>
    <var-list>
      <TransitionGroup name="list">
        <var-cell v-for="grocery in groceries" :key="grocery.id">
          <GroceryItem :grocery="grocery" @delete="deleteGrocery" @update="updateGrocery" />
        </var-cell>
      </TransitionGroup>
    </var-list>
    <var-divider />
    <GroceryInput @add="addGrocery" @reset="resetGroceries" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Grocery, useGroceryStore } from '../store/grocery'
import GroceryItem from './GroceryItem.vue'
import GroceryInput from './GroceryInput.vue'

const groceryStore = useGroceryStore()
const { groceries } = storeToRefs(groceryStore)

function addGrocery (grocery: Grocery) {
  groceryStore.addGrocery(grocery)
}

function deleteGrocery (index: number) {
  groceryStore.deleteGrocery(index)
}

function resetGroceries () {
  groceryStore.resetGroceries()
}

function updateGrocery (grocery: Grocery) {
  groceryStore.updateGrocery(grocery)
}
</script>

<style>
.list-move,
/* transition for moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* make sure the removed elements are taken out of animation flow */
.list-leave-active {
  position: absolute;
}
</style>
