<template>
  <Card class="flex-1 border border-surface shadow-none">
    <template #content>
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <span class="text-surface-500 dark:text-surface-400 text-sm">{{ title }}</span>
          <span class="font-bold text-lg">{{ count }}</span>
        </div>
        <div>
          <slot />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: String
  count: number
}>()
</script>
