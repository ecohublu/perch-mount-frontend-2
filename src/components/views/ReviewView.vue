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
      ></ReviewingMediumCard>
    </div>

    <div v-else><Loading></Loading></div>
  </div>

  <Button class="mt-6" label="送出" @click="handleSubmitClicked()" />

  <Dialog v-model:visible="submitVisible" modal header="確認要送出嗎?" :style="{ width: '25rem' }">
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="取消"
        severity="secondary"
        @click="submitVisible = false"
      ></Button>
      <Button type="button" label="確認" @click="submitVisible = false"></Button>
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
    ></ReviewBatchUpdatorPanel>
  </Drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { convertToReviewingMedia } from '@/types/media'
import { convertBehaviorsToSelectedOptions, type SelectedOption } from '@/types/options'
import { type ReviewingMedium, type UncheckedMediaQuery } from '@/types/media'
import { useReviewingMediaBySectionIDsAndPerchMountIDs } from '@/composables/media/useReviewingMediaSectionIDAndPerchMountID'
import { useBehaviors } from '@/composables/options/useBehaviors'
import { useBooleansSelector } from '@/composables/useABooleansSelector'

import ReviewingMediumCard from '@/components/cards/ReviewingMediumCard.vue'
import MediumEditor from '@/components/forms/MediumEditor.vue'
import FeatureEditor from '@/components/forms/FeatureEditor.vue'
import Loading from '@/components/Loading.vue'
import ReviewBatchUpdatorPanel from '@/components/forms/ReviewBatchUpdatorPanel.vue'

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

const { selects, updatelast, selectFromLast, cancelAll } = useBooleansSelector()

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
  behaviorOptions.value = convertBehaviorsToSelectedOptions(behaviors.value)
})

const submitVisible = ref<boolean>(false)
const mediumEditorVisible = ref<boolean>(false)
const featureEditorVisible = ref<boolean>(false)
const editingIndex = ref<number>(0)
const featrueingIndex = ref<number>(0)

const handleSubmitClicked = () => {
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
const handleSpeciesRequested = () => {}
const handlePreyRequested = () => {}
const handleRingRequested = () => {}
const handleTagRequested = () => {}
const handleRingNumberRequested = () => {}
</script>
