<template>
  <div>
    <Select
      class="w-full"
      filter
      v-model="localSelectedBehavior"
      :options="options"
      optionLabel="name"
      showClear
    ></Select>
  </div>
</template>
<script setup lang="ts">
import type { SelectedOption } from '@/types/options'
import { computed, watch } from 'vue'

const props = defineProps<{
  options: SelectedOption[]
  selectedBehavior: SelectedOption | null
}>()

const emit = defineEmits<{
  (e: 'update:selectedBehavior', value: SelectedOption | null): void
}>()

const localSelectedBehavior = computed({
  get: () => props.selectedBehavior,
  set: (val: SelectedOption | null) => emit('update:selectedBehavior', val),
})

watch(
  () => props.selectedBehavior,
  (newVal) => {
    localSelectedBehavior.value = newVal
  },
)
</script>
