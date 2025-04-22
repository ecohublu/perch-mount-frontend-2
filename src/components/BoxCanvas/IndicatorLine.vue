<template>
  <div
    class="absolute absolute border-white-500 opacity-50"
    :class="type == 'horizontal' ? ' border-b-1' : ' border-r-1'"
  ></div>
</template>
<script setup lang="ts">
const props = defineProps<{
  type: 'horizontal' | 'vertical'
}>()
</script>
