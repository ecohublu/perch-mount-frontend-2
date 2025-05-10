<template>
  <Message v-if="submitError" severity="error">{{ submitError }}</Message>
  <Message v-if="!valid" severity="warn">棲架資料還沒填完</Message>
  <Message v-if="submitted" severity="success">
    棲架新增成功，去
    <Tag
      ><PerchMountSpan :id="addedPerchMount?.id!" :name="addedPerchMount?.perch_mount_name!">
      </PerchMountSpan> </Tag
    >看看
  </Message>
  <div v-else-if="submitting">棲架新增中...</div>
  <div v-else class="grid grid-cols-1 gap-4">
    <div>
      <InfoItemCard title="計畫 *">
        <Select
          class="w-full"
          v-model="perchMount.selectedProject"
          :options="projectOptionsForDisplay!"
          optionLabel="name"
          :disabled="projectId !== null"
        ></Select>
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="棲架名稱 *">
        <InputText class="w-full" type="text" v-model="perchMount.perch_mount_name" />
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="座標 *">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <InputNumber
              v-model="perchMount.latitude"
              inputId="integeronly"
              :maxFractionDigits="6"
              fluid
              placeholder="經度"
            />
          </div>
          <div>
            <InputNumber
              v-model="perchMount.longitude"
              inputId="integeronly"
              :maxFractionDigits="6"
              fluid
              placeholder="緯度"
            />
          </div>
        </div>
        <a
          :href="parseGoogleMapPointURL(perchMount.latitude!, perchMount.longitude!)"
          target="_blank"
        >
          <i class="pi pi-map-marker"></i>
          {{ perchMount.latitude! }}, {{ perchMount.longitude! }}
        </a>
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="棲地 *">
        <Select
          class="w-full"
          v-model="perchMount.selectedHabitat"
          :options="habitatOptions"
          optionLabel="name"
        ></Select>
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="棲架分層 *">
        <Select
          class="w-full"
          v-model="perchMount.selectedMountLayer"
          :options="mountLayerOptions"
          optionLabel="name"
        ></Select>
      </InfoItemCard>
    </div>
    <div>
      <Button type="button" label="確認新增" @click="handleSubmitClick"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAddingPerchMount } from '@/composables/perchmounts/useAddingPerchMount'
import { useProjectByID } from '@/composables/projects/useProjectByID'
import { useProjects } from '@/composables/projects/useProjects'
import type { SelectedOption } from '@/types/options'
import { parseGoogleMapPointURL } from '@/utils/googleMap'

import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useHabitatOptions } from '@/composables/options/useHabitats'
import { useMountLayerOptions } from '@/composables/options/useMountLayers'

const projectOptionsForDisplay = ref<SelectedOption[] | null>(null)

const props = withDefaults(defineProps<{ projectId?: string | null }>(), {
  projectId: null,
})

const {
  data: project,
  isLoading: isProjectLoading,
  error: projectError,
  fetch: fetchProject,
} = useProjectByID(props.projectId!)

const {
  data: projects,
  isLoading: isProjectsLoading,
  error: projectsError,
  fetch: fetchProjects,
} = useProjects()

const {
  data: habitatOptions,
  isLoading: isHabitatsLoading,
  error: habitatError,
  fetch: fetchHabitats,
} = useHabitatOptions()

const {
  data: mountLayerOptions,
  isLoading: isMountLayersLoading,
  error: mountLayersError,
  fetch: fetchMountLayers,
} = useMountLayerOptions()

const { perchMount, valid, validate, submitting, submitted, addedPerchMount, submitError, submit } =
  useAddingPerchMount()

onMounted(async () => {
  await fetchHabitats()
  await fetchMountLayers()
  await fetchProjects()
  if (props.projectId) {
    await fetchProject()
  }
  projectOptionsForDisplay.value = projects.value.map((p) => ({
    code: p.id,
    name: p.name,
  }))
  perchMount.value.selectedProject = { code: project.value?.id!, name: project.value?.name! }
})

const handleSubmitClick = async () => {
  validate()
  if (valid.value) {
    await submit()
  }
}
</script>
