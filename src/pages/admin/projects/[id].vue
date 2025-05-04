<template>
  <ProjectView :id="id!"></ProjectView>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProjectView from '@/components/adminviews/ProjectView.vue'
import { ref } from 'vue'
const route = useRoute()

const id = ref<string | null>(route.params.id as string)
</script>
