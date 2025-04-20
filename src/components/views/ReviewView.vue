<template>
  <div class="card" @click="test">
    <div v-if="!isLoading && data.length && reviewingMedia.length" class="grid grid-cols-4 gap-4">
      <ReviewingMediumCard
        v-for="(medium, index) of data"
        :medium="medium"
        v-model:checked="mediaChecks[index]"
        v-model:reviewing-medium="reviewingMedia[index]"
        @medium-editor-clicked="handleMediumEditorClicked(index)"
        @feature-editor-clicked="handleFeatureEditorClicked(index)"
      ></ReviewingMediumCard>
    </div>

    <div v-else><Loading></Loading></div>
  </div>

  <Button class="mt-6" label="送出" @click="handleSubmitClicked()" />

  <Dialog v-model:visible="submitVisible" modal header="確認要送出嗎?" :style="{ width: '25rem' }">
    <span>你選擇了 {{ selectCounts }} 個不是空拍的影像</span>
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
      :reviewing-medium="reviewingMedia[editingIndex]"
    ></MediumEditor>
  </Drawer>
  <Dialog
    modal
    v-model:visible="featureEditorVisible"
    header="精選資訊"
    :style="{ width: '25rem' }"
  >
    <FeatureEditor :reviewing-medium="reviewingMedia[editingIndex]"></FeatureEditor>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ReviewingMedium, type UncheckedMediaQuery } from '@/types/media'
import { useReviewingMediaBySectionIDsAndPerchMountIDs } from '@/composables/media/useReviewingMediaSectionIDAndPerchMountID'
import { convertToReviewingMedia } from '@/types/media'
import ReviewingMediumCard from '@/components/cards/ReviewingMediumCard.vue'
import MediumEditor from '@/components/forms/MediumEditor.vue'
import FeatureEditor from '@/components/forms/FeatureEditor.vue'
import Loading from '@/components/Loading.vue'

const props = defineProps<{
  query: UncheckedMediaQuery
}>()
const mediaChecks = ref<Array<boolean>>([])
const reviewingMedia = ref<Array<ReviewingMedium>>([])

const { data, isLoading, error, fetch } = useReviewingMediaBySectionIDsAndPerchMountIDs(
  'unreviewed',
  props.query.section_ids ? props.query.section_ids! : [],
  props.query.perch_mount_ids ? props.query.section_ids! : [],
)

onMounted(async () => {
  await fetch()
  reviewingMedia.value = convertToReviewingMedia(data.value)
  mediaChecks.value = Array(data.value.length).fill(false)
})

const selectCounts = ref(0)
const submitVisible = ref(false)
const mediumEditorVisible = ref(false)
const featureEditorVisible = ref(false)
const editingIndex = ref(0)
const featrueingIndex = ref(0)

const handleSubmitClicked = () => {
  selectCounts.value = mediaChecks.value.filter((val) => val).length
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

const test = () => {
  console.log(reviewingMedia.value)
}
</script>
