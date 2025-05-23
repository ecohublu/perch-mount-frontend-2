<template>
  <div class="grid grid-cols-4 gap-6">
    <div v-if="invalid" class="col-span-4">
      <Message severity="warn">請至少填一個條件！</Message>
    </div>
    <div>
      <InfoItemCard title="從">
        <DatePicker v-model="filter.mediumDatetimeFrom" showTime hourFormat="24" fluid />
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="至">
        <DatePicker v-model="filter.mediumDatetimeTo" showTime hourFormat="24" fluid />
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="行為">
        <MultiSelect
          v-model="filter.selectedBehaviors"
          :options="behaviorsOptions"
          optionLabel="name"
          placeholder="選擇行為"
          display="chip"
          class="w-full"
        />
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="計畫">
        <MultiSelect
          v-model="filter.selectedProjects"
          :options="projectOptions"
          optionLabel="name"
          placeholder="計畫"
          display="chip"
          class="w-full"
          filter
        />
      </InfoItemCard>
    </div>
    <div class="col-span-2">
      <InfoItemCard title="棲架">
        <MultiSelect
          v-model="filter.selectedPerchMounts"
          :options="perchMountOptions"
          optionLabel="name"
          placeholder="棲架"
          display="chip"
          class="w-full"
          filter
        />
      </InfoItemCard>
    </div>

    <div>
      <InfoItemCard title="物種">
        <SpeciesSelector v-model:selected="filter.selectedTaxonOrder"></SpeciesSelector>
      </InfoItemCard>
    </div>
    <div></div>
    <div>
      <Button label="搜尋" icon="pi pi-search" @click="handleSearchButton"></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useHighlightFilter } from '@/composables/media/useHighlightFilter'
import { useBehaviorOptions } from '@/composables/options/useBehaviors'
import { useProjectOptions } from '@/composables/projects/useProjects'
import { usePerchMountOptions } from '@/composables/perchmounts/usePerchMounts'

import InfoItemCard from '../cards/InfoItemCard.vue'
import SpeciesSelector from '../forms/SpeciesSelector.vue'

const emit = defineEmits<{
  (e: 'search', payload: typeof filter.value): void
}>()

const { invalid, filter } = useHighlightFilter()
const {
  data: behaviorsOptions,
  isLoading: isBehaviorsLoading,
  error: behaviorError,
  fetch: fetchBehaviors,
} = useBehaviorOptions()

const {
  data: projectOptions,
  isLoading: isProjectsLoading,
  error: projectsError,
  fetch: fetchProjects,
} = useProjectOptions()

const {
  data: perchMountOptions,
  isLoading: isPerchMountsLoading,
  error: perchMountsError,
  fetch: fetchPerchMounts,
} = usePerchMountOptions()

onMounted(async () => {
  await fetchBehaviors()
  await fetchProjects()
  await fetchPerchMounts()
})

const handleSearchButton = () => {
  if (invalid.value) {
    return
  }
  emit('search', filter.value)
}
</script>
