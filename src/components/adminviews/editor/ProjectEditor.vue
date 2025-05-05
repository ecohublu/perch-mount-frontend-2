<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-6 items-center">
      <div>
        <span class="text-xl font-bold">{{ project?.name }}</span>
      </div>
      <div>
        <InfoItemCard title="計畫 ID">{{ project?.id }}</InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="計畫名稱">
          <InputText class="w-full" variant="filled" :default-value="project?.name" />
        </InfoItemCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectByID } from '@/composables/projects/useProjectByID'

const props = defineProps<{ id: string }>()

const {
  data: project,
  isLoading: isProjectLoading,
  error: projectError,
  fetch: fetchProject,
} = useProjectByID(props.id)

onMounted(async () => {
  await fetchProject()
})
</script>
