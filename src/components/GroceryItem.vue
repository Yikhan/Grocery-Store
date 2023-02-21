<template>
  <var-row align="center" class="grocery-item">
    <var-col :span="8" :offset="7">
      <span v-if="!editing" class="item-content">{{ grocery.name }}</span>
      <var-input v-else ref="inputName" v-model="updatedGroceryName" :line="false"
        :rules="[(v) => v.length > 0 || 'Can not be empty']" />
    </var-col>

    <var-col :span="2">
      <span v-if="!editing">{{ grocery.quantity }}</span>
      <var-input v-else ref="inputQuantity" v-model="updatedGroceryQuantity" type="number" :line="false"
        :rules="[v => parseInt(v) > 0 || 'Positive integer only']" />
    </var-col>

    <var-col :span="6">
      <var-space>
        <!-- the edit button group -->
        <var-button v-if="!editing" type="primary" size="small" @click="onEditStart">Edit</var-button>
        <var-button v-else type="success" size="small" @click="onEditDone">Done</var-button>
        <!-- clear button -->
        <var-button type="danger" size="small" @click="onDelete(grocery.id)">Delete</var-button>
      </var-space>
    </var-col>
  </var-row>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { Input } from '@varlet/ui'
import { Grocery } from '@/store/grocery'

const props = defineProps<{ grocery: Grocery }>()
const emit = defineEmits(['delete', 'update'])
// edit
const editing = ref(false)
const updatedGroceryName = ref('')
const updatedGroceryQuantity = ref('1')
// DOM element refs
const inputName = ref<Input>()
const inputQuantity = ref<Input>()

function onDelete (id: number) {
  emit('delete', id)
}

function onEditStart () {
  editing.value = true
  updatedGroceryName.value = props.grocery.name
  updatedGroceryQuantity.value = props.grocery.quantity.toString()

  nextTick(() => {
    inputName.value?.focus()
  })
}

async function onEditDone () {
  const valid = await inputName.value?.validate() && await inputQuantity.value?.validate()
  if (!valid) return

  editing.value = false
  emit('update', {
    id: props.grocery.id,
    name: updatedGroceryName.value,
    quantity: parseInt(updatedGroceryQuantity.value) || 1
  } as Grocery)
}
</script>

<style>
.grocery-item .var-input__wrap {
  padding-top: 0;
}

.grocery-item input {
  max-width: 300px;
}

.grocery-item .item-content {
  max-width: 300px;
  word-break: break-all;
}
</style>
