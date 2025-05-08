<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-6 items-center">
      <div>
        <InfoItemCard title="Section ID">
          {{ section?.id }}
        </InfoItemCard>
        <Button size="small" severity="info" variant="outlined">
          <SectionSpan :id="id" :name="`${section?.swapped_date} in app`"></SectionSpan>
        </Button>
      </div>
      <div>
        <InfoItemCard title="回收日期">
          <DatePicker
            v-model="editingSection.swappedDate"
            class="w-full"
            @blur="handleSwappedDateBlur"
          />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="工作開始時間">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <DatePicker
                class="w-full"
                id="datepicker-24h"
                showTime
                hourFormat="24"
                fluid
                v-model="editingSection.startTime"
              />
            </div>
            <div><Button label="確認變更" size="small" @click="handleStartTimeClick"></Button></div>
          </div>
          <div class="text-sm opacity-50">此操作會改變 section 中所有影像拍攝時間，請三思！</div>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="工作結束時間">
          <DatePicker
            v-model="editingSection.endTime"
            class="w-full"
            id="datepicker-24h"
            showTime
            hourFormat="24"
            fluid
            disabled
          />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="相機">
          <Select
            :options="cameraOptions"
            optionLabel="name"
            v-model="editingSection.selectedCamera"
            class="w-full"
            @change="handleCameraChange"
          ></Select>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="支架類型">
          <Select
            v-model="editingSection.selectedMountType"
            :options="mountTypeOptions"
            optionLabel="name"
            class="w-full"
            @change="handleMountTypeChange"
          ></Select>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="回收人員">
          <MultiSelect
            v-model="editingSection.selectedSwappers"
            class="w-full"
            :showToggleAll="false"
            :options="memberOptions"
            optionLabel="name"
            display="chip"
            @change="handleSwappersChange"
          ></MultiSelect>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="Note">
          <Textarea v-model="editingSection.note" class="w-full" rows="5" @blur="handleNoteBlur" />
        </InfoItemCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useCameraOptions } from '@/composables/options/useCameras'
import { useMemberOptions } from '@/composables/options/useMemberOptions'
import { useMountTypeOptions } from '@/composables/options/useMountTypes'
import { useSectionEdit } from '@/composables/sections/useSectionEdit'
import { useSectionsByID } from '@/composables/sections/useSectionsByID'
import { useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import SectionSpan from '@/components/nameSpans/SectionSpan.vue'
const toast = useToast()

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

const {
  error: editError,
  isUpdating: isEditUpdating,
  editingSection,
  init: initEdit,
  fetchShiftTime,
  fetchUpdateSwappers,
  updateByID,
} = useSectionEdit(toast)

const {
  data: memberOptions,
  isLoading: isMemberOptionsLoading,
  error: memberOptionsError,
  fetch: fetchMemberOptions,
} = useMemberOptions()

const {
  data: mountTypeOptions,
  isLoading: isMountTypeLoading,
  error: mountTypeOptionsError,
  fetch: fetchMountTypeOptions,
} = useMountTypeOptions()

const {
  data: cameraOptions,
  isLoading: isCameraOptionsLoading,
  error: cameraOptionsError,
  fetch: fetchCameraOptions,
} = useCameraOptions()

onMounted(async () => {
  await fetchSection()
  await fetchMemberOptions()
  await fetchMountTypeOptions()
  await fetchCameraOptions()
  initEdit(section.value!)
})

const handleSwappedDateBlur = async () => {
  await updateByID(props.id, {
    swapped_date: editingSection.value.swappedDate?.toISOString().split('T')[0],
  })
  await fetchSection()
  initEdit(section.value!)
}
const handleStartTimeClick = async () => {
  await fetchShiftTime(props.id)
  await fetchSection()
  initEdit(section.value!)
}
const handleCameraChange = async () => {
  await updateByID(props.id, { camera_id: editingSection.value.selectedCamera?.code })
  await fetchSection()
  initEdit(section.value!)
}
const handleMountTypeChange = async () => {
  await updateByID(props.id, { mount_type_id: editingSection.value.selectedMountType?.code })
  await fetchSection()
  initEdit(section.value!)
}
const handleSwappersChange = async () => {
  await fetchUpdateSwappers(props.id)
  await fetchSection()
  initEdit(section.value!)
}
const handleNoteBlur = async () => {
  await updateByID(props.id, { note: editingSection.value.note! })
  await fetchSection()
  initEdit(section.value!)
}
</script>
