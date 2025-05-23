<template>
  <div class="card">
    <div v-if="data.length === 0">沒有需要檢查的資料</div>
    <div v-else-if="!isLoading" class="grid grid-cols-4 gap-4">
      <EmptyCheckingMediaCard
        v-for="(medium, index) of data"
        :medium="medium"
        v-model="mediaAiMissedMarks[index]"
        @toggle="handleToggle(index)"
      ></EmptyCheckingMediaCard>
    </div>
    <div v-else><Loading></Loading></div>
  </div>

  <Button
    class="mt-6 mb-12"
    label="送出"
    @click="handleSubmitClicked()"
    :disabled="data.length === 0"
  />

  <Dialog v-model:visible="dialogVisible" modal header="確認要送出嗎?" :style="{ width: '25rem' }">
    <div v-if="error">
      <Message severity="error">{{ submitError }}</Message>
    </div>
    <div v-else-if="submitted">
      <Message severity="success">資料已成功送出</Message>
      <div class="flex justify-end gap-2 mt-6">
        <router-link to="/app">
          <Button severity="secondary" label="回到首頁"></Button>
        </router-link>
        <Button label="繼續" @click="handleContinueClicked"></Button>
      </div>
    </div>
    <div v-else-if="submitting">submitting...</div>
    <div v-else>
      <span>你選擇了 {{ aiMissedCount }} 個不是空拍的影像</span>
      <div class="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          label="取消"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="確認" @click="handleConfirmClicked"></Button>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { UncheckedMediaQuery } from '@/types/media'
import { useMediaOperationBySectionIDsAndPerchMountIDs } from '@/composables/media/useUncheckedMediaSectionIDsAndPerchMountIDs'
import EmptyCheckingMediaCard from '@/components/cards/EmptyCheckingMediumCard.vue'
import Loading from '@/components/Loading.vue'
import { useEmptyCheckSubmission } from '@/composables/media/useEmptyCheckValidation'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  query: UncheckedMediaQuery
}>()

const dialogVisible = ref(false)

const {
  mediaAiMissedMarks,
  aiMissedCount,
  submitting,
  submitted,
  error: submitError,
  initCheckes,
  clickMediumByIndex,
  refreshCount,
  submit,
} = useEmptyCheckSubmission()

const { data, isLoading, error, fetch } = useMediaOperationBySectionIDsAndPerchMountIDs(
  'unchecked',
  props.query.section_ids ? props.query.section_ids! : [],
  props.query.perch_mount_ids ? props.query.section_ids! : [],
)

onMounted(async () => {
  await fetch()
  initCheckes(data.value.length)
  mediaAiMissedMarks.value = Array(data.value.length).fill(false)
})

const handleSubmitClicked = () => {
  dialogVisible.value = true
  refreshCount()
}

const handleConfirmClicked = () => {
  submit(data.value)
}

const handleToggle = (index: number) => {
  clickMediumByIndex(index)
}

const handleContinueClicked = () => {
  router.go(0)
}
</script>
