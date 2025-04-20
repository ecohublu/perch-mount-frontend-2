<template>
  <div class="p-2">
    <span class="text-surface-500 dark:text-surface-400 text-sm">
      {{ title }}
    </span>
    <br />
    <span class="text-sm">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: String
}>()
</script>
