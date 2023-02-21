<template>
  <li>
    <span>{{ grocery.name }} x {{ grocery.quantity }}</span>
    <button @click="onDelete(grocery.id)">Delete</button>
  </li>
</template>

<script setup lang="ts">
import { Grocery } from '../store/grocery.ts'

const props = defineProps({
  grocery: Grocery,
})
const emit = defineEmits(['delete-grocery'])

function onDelete(id: string) {
  emit('delete-grocery', id)
}
</script>
