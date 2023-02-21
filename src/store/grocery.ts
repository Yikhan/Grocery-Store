import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Grocery {
  id: number
  name: string
  quantity: number
}

export const useGroceryStore = defineStore(
  'grocery',
  () => {
    const groceries = ref([] as Grocery[])

    function addGrocery(grocery: Grocery) {
      groceries.value.push(grocery)
    }

    function deleteGrocery(index: number) {
      groceries.value.splice(index, 1)
    }

    function updateGrocery(index: number, updatedGrocery: Grocery) {
      groceries.value.splice(index, 1, updatedGrocery)
    }

    return {
      groceries,
      addGrocery,
      deleteGrocery,
      updateGrocery,
    }
  },
  {
    persist: true,
  }
)
