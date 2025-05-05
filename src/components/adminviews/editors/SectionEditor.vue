<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-6 items-center">
      <div>
        <InfoItemCard title="Section ID">
          {{ section?.id }}
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="回收日期">
          <DatePicker class="w-full" />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="工作開始時間">
          <DatePicker class="w-full" id="datepicker-24h" showTime hourFormat="24" fluid />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="工作開始時間">
          <DatePicker class="w-full" id="datepicker-24h" showTime hourFormat="24" fluid disabled />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="相機">
          <Select class="w-full"></Select>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="支架類型">
          <Select class="w-full"></Select>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="回收人員">
          <MultiSelect class="w-full"></MultiSelect>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="Note">
          <Textarea class="w-full" rows="5" />
        </InfoItemCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useSectionsByID } from '@/composables/sections/useSectionsByID'
import { InputText } from 'primevue'
import { onMounted } from 'vue'
const props = defineProps<{
  id: string
}>()

const {
  data: section,
  isNew: isSectionNew,
  durationDay: sectionDurationDays,
  isLoading: isSectionLoading,
  error: sectionError,
  fetch: fetchSection,
} = useSectionsByID(props.id)

onMounted(async () => {
  await fetchSection()
})
</script>
