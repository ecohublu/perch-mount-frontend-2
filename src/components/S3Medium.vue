<template>
  <Image v-if="isImage" :src="convertIDToS3Link(id, isImage)" alt="Image" preview />
  <video v-else :src="convertIDToS3Link(id, isImage)" controls></video>
</template>

<script setup lang="ts">
import { convertIDToS3Link } from '@/composables/media/s3'

const props = defineProps<{
  id: string
  isImage: boolean
}>()
</script>
