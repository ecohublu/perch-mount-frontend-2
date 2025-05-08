<template>
  <DataTable :value="sections">
    <Column field="id" header="ID">
      <template #body="slotProps">
        <AdminSectionSpan :id="slotProps.data.id" :name="slotProps.data.id"></AdminSectionSpan>
      </template>
    </Column>
    <Column field="swapped_date" header="回收日期" sortable>
      <template #body="slotProps">
        <AdminSectionSpan
          :id="slotProps.data.id"
          :name="slotProps.data.swapped_date"
        ></AdminSectionSpan>
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
</template>
<script setup lang="ts">
import { useSectionsByFilter } from '@/composables/sections/useSectionsByQuery'
import { onMounted } from 'vue'
import AdminSectionSpan from '@/components/adminviews/linkSpans/AdminSectionSpan.vue'

const props = defineProps<{ perchMountId: string }>()
const {
  data: sections,
  areNew: areSectionNew,
  isLoading: isSectionLoading,
  error: sectionError,
  fetch: fetchSections,
} = useSectionsByFilter({ perch_mount_ids: [props.perchMountId] })

onMounted(async () => {
  await fetchSections()
})
</script>
