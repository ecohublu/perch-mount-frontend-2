<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-6 items-center">
      <div>
        <span class="text-xl font-bold">{{ project?.name }}</span>
      </div>
      <div>
        <InfoItemCard title="計畫 ID">{{ project?.id }}</InfoItemCard>
        <Button size="small" severity="info" variant="outlined">
          <ProjectSpan :id="id" :name="`${project?.name} in app`"></ProjectSpan>
        </Button>
      </div>
      <div>
        <InfoItemCard title="計畫名稱">
          <InputText
            v-model="editingName"
            class="w-full"
            variant="filled"
            :default-value="project?.name"
            @blur="handleNameBlur"
          />
        </InfoItemCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProjectByID } from '@/composables/projects/useProjectByID'
import { useProjectEdit } from '@/composables/projects/useProjectEdit'
import { useToast } from 'primevue'
import ProjectSpan from '@/components/nameSpans/ProjectSpan.vue'

const toast = useToast()
const props = defineProps<{ id: string }>()
const editingName = ref<string | null>(null)

const {
  data: project,
  isLoading: isProjectLoading,
  error: projectError,
  fetch: fetchProject,
} = useProjectByID(props.id)

const { error, isUpdating, updateByID } = useProjectEdit(toast)

onMounted(async () => {
  await fetchProject()
  editingName.value = project.value?.name!
})

const handleNameBlur = async () => {
  await updateByID(props.id, { name: editingName.value! })
  fetchProject()
}
</script>
