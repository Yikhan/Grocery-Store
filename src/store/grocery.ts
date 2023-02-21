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

    function deleteGrocery(id: number) {
      const index = groceries.value.findIndex((g) => g.id === id)
      if (index < 0) return
      groceries.value.splice(index, 1)
    }

    function updateGrocery(updatedGrocery: Grocery) {
      const index = groceries.value.findIndex((g) => g.id === updatedGrocery.id)
      if (index < 0) return
      groceries.value.splice(index, 1, updatedGrocery)
    }

    function resetGroceries() {
      groceries.value = []
    }

    return {
      groceries,
      addGrocery,
      deleteGrocery,
      updateGrocery,
      resetGroceries
    }
  },
  {
    persist: true,
  }
)
