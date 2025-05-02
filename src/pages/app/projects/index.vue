<template>
  <div class="grid grid-cols-2 gap-4">
    <ProjectCard v-for="project in projects" :info="project"></ProjectCard>
  </div>
  <Button label="新增計畫" icon="pi pi-plus" class="mt-6" @click="addProjectVisiable = true" />
  <Dialog v-model:visible="addProjectVisiable" modal header="新增計畫" :style="{ width: '25rem' }">
    <AddProjectForm @added="handleProjectAdded"></AddProjectForm>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProjects } from '@/composables/projects/useProjects'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import AddProjectForm from '@/components/forms/AddProjectForm.vue'

const addProjectVisiable = ref<boolean>(false)

const { data: projects, isLoading, error, fetch } = useProjects()
onMounted(fetch)

const handleProjectAdded = () => {
  fetch()
}
</script>
