<template>
  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="`bg-${customColor}`">
    {{ value }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: number | string
  customColor: string
}>()
</script>
