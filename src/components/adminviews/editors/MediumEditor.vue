<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-4 items-center">
      <div>
        <InfoItemCard title="Medium ID">{{ medium?.id }}</InfoItemCard>
        <Button size="small" severity="info" variant="outlined">
          <MediumSpan :id="id" name="medium in app"> </MediumSpan>
        </Button>
      </div>
      <div>
        <InfoItemCard title="Status">
          {{ medium?.status }}
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="事件">
          <Select
            class="w-full"
            v-model="selectedEvent"
            :options="eventOptions"
            optionLabel="name"
            showClear
            @change="handleEventChange"
            :disabled="medium?.status !== 'reviewed'"
          ></Select>
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="精選行為">
          <Select
            class="w-full"
            v-model="selectedBehavior"
            :options="behaviorOptions"
            optionLabel="name"
            showClear
            @change="handleBehaviorChange"
            :disabled="medium?.status !== 'reviewed'"
          ></Select>
        </InfoItemCard>
      </div>

      <div>
        <InfoItemCard title="回到 unreviewed">
          <Button
            label="Rollback"
            size="small"
            @click="rollbackVisible = true"
            :disabled="medium?.status !== 'reviewed'"
          ></Button>
        </InfoItemCard>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="rollbackVisible" modal header="警告" :style="{ width: '25rem' }">
    <Message severity="warn"
      >你確定要把這個 medium 回到 unreviewed 的狀態嗎？這個操作會刪除 review 後的所有個體資料。
    </Message>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="rollbackVisible = false" autofocus />
      <Button label="確定" outlined severity="secondary" @click="handleRollbackClick" autofocus />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { useMedium } from '@/composables/media/useMedium'
import { useRollbackReviewMedium } from '@/composables/media/useMediumStatusRollback'
import { onMounted, ref } from 'vue'

import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useToast } from 'primevue'
import { useUpdateMediumEvnet } from '@/composables/media/useUpdateMediumEvent'
import MediumSpan from '@/components/nameSpans/MediumSpan.vue'
import { useUpdateMediumFeature } from '@/composables/media/useUpdateMediumFeature'

const toast = useToast()
const props = defineProps<{ id: string }>()
const rollbackVisible = ref<boolean>(false)

const { data: updatedMedium, isUpdating, error, fetchRollback } = useRollbackReviewMedium()
const {
  data: medium,
  isLoading: isMediumLoading,
  error: mediumError,
  fetch: fetchMedium,
} = useMedium()

const {
  data: eventOptions,
  selectedEvent,
  isLoading: isEventLoading,
  isUpdating: isEventUpdating,
  error: updateEventError,
  initSelectedEvent,
  fetchEventOptions,
  fetchUpdateMediumEvent,
} = useUpdateMediumEvnet(toast)

const {
  data: behaviorOptions,
  selectedBehavior,
  isLoading: isBehaviorLoading,
  isUpdating: isFeatureUpdating,
  error: featureError,
  initSelectedBehavior,
  fetchBehaviorOptions,
  fetchUpdateMediumFeature,
} = useUpdateMediumFeature(toast)

onMounted(async () => {
  await fetchMedium(props.id)
  await fetchEventOptions()
  await fetchBehaviorOptions()
  initSelectedEvent(medium.value!)
  initSelectedBehavior(medium.value!)
})

const handleRollbackClick = async () => {
  await fetchRollback(props.id)
  await fetchMedium(props.id)
  initSelectedEvent(medium.value!)
  initSelectedBehavior(medium.value!)
}

const handleEventChange = async () => {
  await fetchUpdateMediumEvent(props.id)
  await fetchMedium(props.id)
  initSelectedEvent(medium.value!)
}

const handleBehaviorChange = async () => {
  await fetchUpdateMediumFeature(props.id)
  await fetchMedium(props.id)
  initSelectedBehavior(medium.value!)
}
</script>
