<template>
  <Button icon="pi pi-check-circle" :label="label" severity="secondary" size="small" rounded />
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>
