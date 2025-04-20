<template>
  <div class="card">
    <div v-if="!isLoading" class="grid grid-cols-4 gap-4">
      <EmptyCheckingMediaCard
        v-for="(medium, index) of data"
        :medium="medium"
        v-model="mediaChecks[index]"
        @toggle="handleToggle(index)"
      ></EmptyCheckingMediaCard>
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
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { UncheckedMediaQuery } from '@/types/media'
import { useMediaOperationBySectionIDsAndPerchMountIDs } from '@/composables/media/useUncheckedMediaSectionIDsAndPerchMountIDs'
import EmptyCheckingMediaCard from '@/components/cards/EmptyCheckingMediumCard.vue'
import Loading from '../Loading.vue'

const props = defineProps<{
  query: UncheckedMediaQuery
}>()
const mediaChecks = ref<Array<boolean>>([])

const { data, isLoading, error, fetch } = useMediaOperationBySectionIDsAndPerchMountIDs(
  'unchecked',
  props.query.section_ids ? props.query.section_ids! : [],
  props.query.perch_mount_ids ? props.query.section_ids! : [],
)
onMounted(fetch)
watch(data, () => {
  if (data.value) {
    mediaChecks.value = Array(data.value.length).fill(false)
  }
})

const selectCounts = ref(0)
const submitVisible = ref(false)
const handleSubmitClicked = () => {
  selectCounts.value = mediaChecks.value.filter((val) => val).length
  submitVisible.value = true
}

const handleToggle = (index: number) => {
  mediaChecks.value[index] = !mediaChecks.value[index]
}
</script>
