<template>
  <Card @click="handleToggle" :class="{ 'card-primary-border-color': checked }">
    <template #title>
      <Checkbox v-model="checked" binary readonly />
    </template>
    <template #content>
      <div @click.stop>
        <S3Medium :id="medium.id" :is-image="medium.medium_type == 'image'"></S3Medium>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Medium } from '@/types/media'
import S3Medium from '@/components/S3Medium.vue'
import { computed } from 'vue'

const props = defineProps<{
  medium: Medium
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'toggle'): void
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const handleToggle = () => {
  emit('toggle')
}
</script>

<style scoped>
.card-primary-border-color {
  border: 2px solid var(--p-primary-400);
}
</style>
