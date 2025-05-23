<template></template>
<script setup lang="ts">
import { useHighlightMedia } from '@/composables/media/useHighlightFilter'

const {
  data: media,
  isLoading: isMediaLoading,
  error: mediaError,
  fetch: fetchMedia,
} = useHighlightMedia()
</script>
