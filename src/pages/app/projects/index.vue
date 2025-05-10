<template>
  <div class="grid grid-cols-2 gap-4">
    <ProjectCard v-for="project in projects" :info="project"></ProjectCard>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProjects } from '@/composables/projects/useProjects'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import AddProjectForm from '@/components/forms/AddProjectForm.vue'

const { data: projects, isLoading, error, fetch } = useProjects()
onMounted(fetch)
</script>
