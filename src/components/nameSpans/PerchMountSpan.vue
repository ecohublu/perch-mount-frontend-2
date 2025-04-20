<template>
  <router-link :to="`/app/perchmounts/${id}`">
    <span>{{ name }}</span>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string
  name: string
}>()
</script>
