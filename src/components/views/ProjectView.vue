<template>
  <div class="card mb-6">
    <Panel toggleable>
      <template #header>
        <span class="font-bold text-2xl">{{ project?.name }}</span>
      </template>
      <div class="grid grid-cols-8 gap-4">
        <MediaCountCard title="運作中棲架" :count="workingCount"></MediaCountCard>
        <MediaCountCard title="已撤收棲架" :count="terminatedCount"></MediaCountCard>
      </div>
    </Panel>
  </div>
  <div v-if="isPerchMountLoading" class="flex items-center justify-center h-screen">Loading...</div>
  <div v-else-if="perchMountError">
    <Message severity="error">{{ perchMountError }}</Message>
  </div>
  <div v-else-if="perchMounts" class="grid grid-cols-4 gap-4">
    <PerchMountCard v-for="perchMount in perchMounts" :info="perchMount"></PerchMountCard>
  </div>
</template>
<script setup lang="ts">
import { useProjectByID } from '@/composables/projects/useProjectByID'
import { onMounted } from 'vue'
import { usePerchMountsByQuery } from '@/composables/perchmounts/usePerchMountsByProjectID'
import PerchMountCard from '@/components/cards/PerchMountCard.vue'
import MediaCountCard from '@/components/cards/MediaCountCard.vue'

const props = defineProps<{ id: string }>()

const {
  data: project,
  isLoading: isProjectLoading,
  error: projectError,
  fetch: fetchProject,
} = useProjectByID(props.id)

const {
  data: perchMounts,
  workingCount,
  terminatedCount,
  isLoading: isPerchMountLoading,
  error: perchMountError,
  fetch: fetchPerchMount,
} = usePerchMountsByQuery({ project_ids: [props.id] })

onMounted(fetchProject)
onMounted(() => {
  fetchPerchMount()
})
</script>
