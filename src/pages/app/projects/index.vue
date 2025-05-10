<template>
  <div class="grid grid-cols-1 gap-4">
    <ProjectCard v-for="project in projects" :info="project"></ProjectCard>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjects } from '@/composables/projects/useProjects'
import ProjectCard from '@/components/cards/ProjectCard.vue'

const { data: projects, isLoading, error, fetch } = useProjects()
onMounted(fetch)
</script>
