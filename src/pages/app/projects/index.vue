<template>
  <div class="grid grid-cols-2 gap-4">
    <ProjectCard v-for="project in projects" :info="project"></ProjectCard>
  </div>
  <Button label="新增計畫" icon="pi pi-plus" class="mt-6" />
</template>
<script setup lang="ts">
import { useProjects } from '@/composables/projects/useProjects'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import { onMounted } from 'vue'

const { data: projects, isLoading, error, fetch } = useProjects()
onMounted(fetch)
</script>
