<template>
  <div>
    {{ medium }}
  </div>
</template>
<script setup lang="ts">
import type { Medium, ReviewingMedium } from '@/types/media'

const props = defineProps<{
  medium: Medium
  reviewingMedium: ReviewingMedium
}>()
</script>
