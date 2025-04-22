<template>
  <div v-show="visible" class="absolute border-round border-3 border-white-alpha-50"></div>
</template>
<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()
</script>
