<template>
  <div class="card">
    <div v-if="!isLoading && data.length && reviewingMedia.length" class="grid grid-cols-4 gap-4">
      <ReviewingMediumCard
        v-for="(medium, index) of data"
        :medium="medium"
        v-model:checked="selects[index]"
        v-model:reviewing-medium="reviewingMedia[index]"
        @medium-editor-clicked="handleMediumEditorClicked(index)"
        @feature-editor-clicked="handleFeatureEditorClicked(index)"
        @selected="handleSelected(index)"
        @shift-selected="handleShiftSelected(index)"
        :class="{
          'border-rose-300': failedMarks[index],
          'border-2': failedMarks[index],
        }"
      ></ReviewingMediumCard>
    </div>

    <div v-else><Loading></Loading></div>
  </div>

  <Button class="my-8" label="送出" @click="handleSubmitClicked()" />

  <Dialog v-model:visible="submitVisible" modal header="確認要送出嗎?" :style="{ width: '25rem' }">
    <div class="my-8">
      <div v-if="validatetionError"></div>
      <div v-else-if="anyUnvalidated">Review 尚未完成，請繼續努力。</div>
      <div v-else-if="submitted"></div>
      <div v-else-if="submitting"></div>
      <div v-else>
        <span>你選了：</span>
        <ul>
          <li v-for="name in selectingSpecies" class="list-disc">{{ name }}</li>
        </ul>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="取消"
        severity="secondary"
        @click="submitVisible = false"
      ></Button>
      <Button
        v-if="!anyUnvalidated"
        type="button"
        label="確認"
        @click="submitVisible = false"
      ></Button>
    </div>
  </Dialog>

  <Drawer v-model:visible="mediumEditorVisible" header="影像資訊" position="full">
    <MediumEditor
      :medium="data[editingIndex]"
      v-model:reviewing-medium="reviewingMedia[editingIndex]"
    ></MediumEditor>
  </Drawer>
  <Dialog
    modal
    v-model:visible="featureEditorVisible"
    header="精選資訊"
    :style="{ width: '25rem' }"
  >
    <FeatureEditor
      v-model:selected-behavior="reviewingMedia[featrueingIndex].selected_behavior"
      :options="behaviorOptions"
    ></FeatureEditor>
  </Dialog>
  <div class="fixed bottom-4 right-4 z-50">
    <Button icon="pi pi-pencil" @click="batchUpdatorVisible = true" rounded />
  </div>

  <Drawer
    v-model:visible="batchUpdatorVisible"
    header="批次編輯"
    position="right"
    class="!w-full md:!w-80 lg:!w-[25rem]"
  >
    <ReviewBatchUpdatorPanel
      @species-requested="handleSpeciesRequested"
      @prey-requested="handlePreyRequested"
      @ring-requested="handleRingRequested"
      @tag-requested="handleTagRequested"
      @ring-number-requested="handleRingNumberRequested"
      @cancel-requested="handleCancelRequested"
    ></ReviewBatchUpdatorPanel>
  </Drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { convertToReviewingMedia } from '@/types/media'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'
import { type ReviewingMedium, type UncheckedMediaQuery } from '@/types/media'
import { useReviewingMediaBySectionIDsAndPerchMountIDs } from '@/composables/media/useReviewingMediaSectionIDAndPerchMountID'
import { useBehaviors } from '@/composables/options/useBehaviors'
import { useBooleansSelector } from '@/composables/useABooleansSelector'
import { useReviewValidation } from '@/composables/media/useReviewValidation'

import ReviewingMediumCard from '@/components/cards/ReviewingMediumCard.vue'
import MediumEditor from '@/components/forms/MediumEditor.vue'
import FeatureEditor from '@/components/forms/FeatureEditor.vue'
import Loading from '@/components/Loading.vue'
import ReviewBatchUpdatorPanel from '@/components/forms/ReviewBatchUpdatorPanel.vue'
import type { SearchResult } from '@/types/species'

const props = defineProps<{
  query: UncheckedMediaQuery
}>()
const reviewingMedia = ref<Array<ReviewingMedium>>([])
const behaviorOptions = ref<Array<SelectedOption>>([])

const { data, isLoading, error, fetch } = useReviewingMediaBySectionIDsAndPerchMountIDs(
  'unreviewed',
  props.query.section_ids ? props.query.section_ids! : [],
  props.query.perch_mount_ids ? props.query.section_ids! : [],
)

const { selects, updatelast, selectFromLast, useTrueIndexes, cancelAll } = useBooleansSelector()

const {
  failedMarks,
  anyUnvalidated,
  submitted,
  submitting,
  selectingSpecies,
  error: validatetionError,
  initfailMarks,
  refreshSelectingSpecies,
  validateReviewingMedia,
  submit,
} = useReviewValidation()

const {
  data: behaviors,
  isLoading: isBehaviorsLoading,
  error: behaviorErrors,
  fetch: fetchBehaviors,
} = useBehaviors()

onMounted(async () => {
  await fetch()
  await fetchBehaviors()
  reviewingMedia.value = convertToReviewingMedia(data.value)
  selects.value = Array(data.value.length).fill(false)
  behaviorOptions.value = convertOptionsToSelectedOptions(behaviors.value)
  initfailMarks(data.value.length)
})

const submitVisible = ref<boolean>(false)
const mediumEditorVisible = ref<boolean>(false)
const featureEditorVisible = ref<boolean>(false)
const editingIndex = ref<number>(0)
const featrueingIndex = ref<number>(0)

const handleSubmitClicked = () => {
  validateReviewingMedia(reviewingMedia.value)
  refreshSelectingSpecies(reviewingMedia.value)
  submitVisible.value = true
}

const handleMediumEditorClicked = (mediumIndex: number) => {
  mediumEditorVisible.value = true
  editingIndex.value = mediumIndex
}
const handleFeatureEditorClicked = (mediumIndex: number) => {
  featureEditorVisible.value = true
  featrueingIndex.value = mediumIndex
}

const handleSelected = (mediumIndex: number) => {
  updatelast(mediumIndex)
}
const handleShiftSelected = (mediumIndex: number) => {
  selectFromLast(mediumIndex)
}

const batchUpdatorVisible = ref<boolean>(false)
const handleSpeciesRequested = (selection: SearchResult | null) => {
  for (const i of useTrueIndexes()) {
    for (const individual of reviewingMedia.value[i].individuals) {
      individual.selected_species = selection
    }
    for (const individual of reviewingMedia.value[i].ai_missed_individuals) {
      individual.selected_species = selection
    }
  }
}
const handlePreyRequested = (hasPrey: boolean) => {
  for (const i of useTrueIndexes()) {
    for (const individual of reviewingMedia.value[i].individuals) {
      individual.has_prey = hasPrey
    }
    for (const individual of reviewingMedia.value[i].ai_missed_individuals) {
      individual.has_prey = hasPrey
    }
  }
}
const handleRingRequested = (hasRing: boolean) => {
  for (const i of useTrueIndexes()) {
    for (const individual of reviewingMedia.value[i].individuals) {
      individual.has_ring = hasRing
    }
    for (const individual of reviewingMedia.value[i].ai_missed_individuals) {
      individual.has_ring = hasRing
    }
  }
}
const handleTagRequested = (tagged: boolean) => {
  for (const i of useTrueIndexes()) {
    for (const individual of reviewingMedia.value[i].individuals) {
      individual.is_tagged = tagged
    }
    for (const individual of reviewingMedia.value[i].ai_missed_individuals) {
      individual.is_tagged = tagged
    }
  }
}
const handleRingNumberRequested = (ringNumber: string | null) => {
  for (const i of useTrueIndexes()) {
    for (const individual of reviewingMedia.value[i].individuals) {
      individual.ring_number = ringNumber
    }
    for (const individual of reviewingMedia.value[i].ai_missed_individuals) {
      individual.ring_number = ringNumber
    }
  }
}
const handleCancelRequested = () => {
  cancelAll()
}
</script>
