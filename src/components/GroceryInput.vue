<template>
  <var-form ref="form" class="grocery-input">
    <var-space justify="center">
      <var-input class="input-grocery-name" v-model="newGroceryName" type="text" placeholder="Grocery title"
        :rules="[(v) => v.length > 0 || 'Can not be empty']" />
      <var-input class="input-grocery-quantity" v-model="newGroceryQuantity" type="number" placeholder="Grocery quantity"
        :rules="[v => parseInt(v) > 0 || 'Positive integer only']" />
    </var-space>

    <div class="input-button-group">
      <var-space justify="center">
        <var-button type="success" @click="onAdd">Add Grocery</var-button>
        <var-button type="warning" @click="onReset">Reset List</var-button>
      </var-space>
    </div>

  </var-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@varlet/ui'
import { Grocery } from '@/store/grocery';

const form = ref<Form>()
const emit = defineEmits(['add', 'reset'])

const newGroceryName = ref('')
const newGroceryQuantity = ref('1')

async function onAdd () {
  const valid = await form.value?.validate() || false
  if (!valid) return

  emit('add', {
    id: new Date().getTime(),
    name: newGroceryName.value,
    quantity: parseInt(newGroceryQuantity.value) || 1
  } as Grocery)

  newGroceryName.value = ''
  newGroceryQuantity.value = '1'
}

function onReset () {
  emit('reset')
}
</script>

<style>
.grocery-input input {
  text-align: center;
}

.input-grocery-quantity {
  margin-right: 5px;
}

.input-grocery-name {
  margin-right: 15px;
}

.input-button-group {
  margin-top: 20px;
}
</style>
