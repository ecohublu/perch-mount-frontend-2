<template>
  <router-link :to="`/admin/perchmounts/${id}`">
    <span>{{ name }}</span>
  </router-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string
  name: string
}>()
</script>
