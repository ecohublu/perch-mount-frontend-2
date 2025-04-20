<template>
  <div>{{ reviewingMedium }}</div>
</template>
<script setup lang="ts">
import type { ReviewingMedium } from '@/types/media'

const props = defineProps<{
  reviewingMedium: ReviewingMedium
}>()
</script>
