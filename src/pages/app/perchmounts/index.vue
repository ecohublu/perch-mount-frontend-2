<template>
  <div v-if="isLoading" class="flex items-center justify-center h-screen">Loading...</div>
  <div v-else-if="error">
    <Message severity="error">{{ error }}</Message>
  </div>
  <div v-else-if="data" class="grid grid-cols-4 gap-4">
    <PerchMountCard v-for="perchMount in data" :info="perchMount"></PerchMountCard>
  </div>
</template>
<script setup lang="ts">
import PerchMountCard from '@/components/cards/PerchMountCard.vue'
import { usePerchMounts } from '@/composables/perchmounts/usePerchMounts'
import { onMounted } from 'vue'

const { data, isLoading, error, fetch } = usePerchMounts()

onMounted(fetch)
</script>
