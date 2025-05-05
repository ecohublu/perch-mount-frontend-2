<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex justify-center p-8" :size="35">
      <PerchMountEditor :id="id"></PerchMountEditor>
    </SplitterPanel>
    <SplitterPanel class="flex justify-center p-8" :size="65">
      <DataTable :value="sections">
        <Column field="id" header="ID">
          <template #body="slotProps">
            <router-link :to="`/admin/sections/${slotProps.data.id}`">
              {{ slotProps.data.id }}
            </router-link>
          </template>
        </Column>
        <Column field="swapped_date" header="回收日期" sortable>
          <template #body="slotProps">
            <router-link :to="`/admin/sections/${slotProps.data.id}`">
              {{ slotProps.data.swapped_date }}
            </router-link>
          </template>
        </Column>
        <Column field="start_time" header="工作開始時間" sortable></Column>
        <Column field="end_time" header="工作結束時間" sortable></Column>
        <Column header="相機">
          <template #body="slotProps">
            {{ slotProps.data.camera.model_name }}
          </template>
        </Column>
        <Column header="支架類型">
          <template #body="slotProps">
            {{ slotProps.data.mount_type.name }}
          </template>
        </Column>
      </DataTable>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSectionsByFilter } from '@/composables/sections/useSectionsByQuery'
import PerchMountEditor from '@/components/adminviews/editors/PerchMountEditor.vue'
const props = defineProps<{ id: string }>()

const {
  data: sections,
  areNew: areSectionNew,
  isLoading: isSectionLoading,
  error: sectionError,
  fetch: fetchSections,
} = useSectionsByFilter({ perch_mount_ids: [props.id] })

onMounted(async () => {
  await fetchSections()
})
</script>
