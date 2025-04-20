<template>
  <router-link :to="`/app/media/${id}`">
    <span class="font-mono">{{ id }}</span>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string
}>()
</script>
