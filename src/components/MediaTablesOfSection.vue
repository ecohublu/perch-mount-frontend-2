<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <span class="font-bold text-2xl">Media</span>
      </template>
      <Tabs value="0">
        <TabList>
          <Tab value="0">待自動辨識</Tab>
          <Tab value="1">待空拍檢查</Tab>
          <Tab value="2">待物種檢視</Tab>
          <Tab value="3">已完成</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <MediaTable :media="undetectedMedia" media_status="undetected"></MediaTable>
          </TabPanel>
          <TabPanel value="1">
            <MediaTable :media="uncheckedMedia" media_status="unchecked"></MediaTable>
          </TabPanel>
          <TabPanel value="2">
            <MediaTable :media="unreviewedMedia" media_status="unreviewed"></MediaTable>
          </TabPanel>
          <TabPanel value="3">
            <MediaTable :media="reviewedMedia" media_status="reviewed"></MediaTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { useUndetectedMediaBySectionID } from '@/composables/media/useUndetectedMediaBySectionID'
import { useUncheckedMediaBySectionID } from '@/composables/media/useUncheckedMediaBySectionID'
import { useUnreviewedMediaBySectionID } from '@/composables/media/useUnreviewedMediaBySectionID'
import { useReviewedMediaBySectionID } from '@/composables/media/useReviewedMediaBySectionID'
import { onMounted } from 'vue'

import MediaTable from './tables/MediaTable.vue'

const props = defineProps<{
  id: string
}>()

const {
  data: undetectedMedia,
  isLoading: isUndetectedMediaLoading,
  error: undetectedMediaError,
  fetch: fetchUndetectedMedia,
} = useUndetectedMediaBySectionID(props.id)

const {
  data: uncheckedMedia,
  isLoading: isUncheckedMediaLoading,
  error: uncheckedMediaError,
  fetch: fetchUncheckedMedia,
} = useUncheckedMediaBySectionID(props.id)

const {
  data: unreviewedMedia,
  isLoading: isUnreviewedMediaLoading,
  error: unreviewedMediaError,
  fetch: fetchUnreviewedMedia,
} = useUnreviewedMediaBySectionID(props.id)

const {
  data: reviewedMedia,
  isLoading: isReviewedMediaLoading,
  error: reviewedMediaError,
  fetch: fetchReviewedMedia,
} = useReviewedMediaBySectionID(props.id)

onMounted(fetchUndetectedMedia)
onMounted(fetchUncheckedMedia)
onMounted(fetchUnreviewedMedia)
onMounted(fetchReviewedMedia)
</script>
