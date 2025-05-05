<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">待自動辨識</Tab>
      <Tab value="1">待空拍檢查</Tab>
      <Tab value="2">待物種檢視</Tab>
      <Tab value="3">已完成</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <AdminMediaTableWithStatus
          :media="undetectedMedia"
          media_status="undetected"
        ></AdminMediaTableWithStatus>
      </TabPanel>
      <TabPanel value="1">
        <AdminMediaTableWithStatus
          :media="uncheckedMedia"
          media_status="unchecked"
        ></AdminMediaTableWithStatus>
      </TabPanel>
      <TabPanel value="2">
        <AdminMediaTableWithStatus
          :media="unreviewedMedia"
          media_status="unreviewed"
        ></AdminMediaTableWithStatus>
      </TabPanel>
      <TabPanel value="3">
        <AdminMediaTableWithStatus
          :media="reviewedMedia"
          media_status="reviewed"
        ></AdminMediaTableWithStatus>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import { useUndetectedMediaBySectionID } from '@/composables/media/useUndetectedMediaBySectionID'
import { useUncheckedMediaBySectionID } from '@/composables/media/useUncheckedMediaBySectionID'
import { useUnreviewedMediaBySectionID } from '@/composables/media/useUnreviewedMediaBySectionID'
import { useReviewedMediaBySectionID } from '@/composables/media/useReviewedMediaBySectionID'
import { onMounted } from 'vue'

import AdminMediaTableWithStatus from '@/components/adminviews/tables/AdminMediaTableWithStatus.vue'

const props = defineProps<{
  sectionId: string
}>()

const {
  data: undetectedMedia,
  isLoading: isUndetectedMediaLoading,
  error: undetectedMediaError,
  fetch: fetchUndetectedMedia,
} = useUndetectedMediaBySectionID(props.sectionId)

const {
  data: uncheckedMedia,
  isLoading: isUncheckedMediaLoading,
  error: uncheckedMediaError,
  fetch: fetchUncheckedMedia,
} = useUncheckedMediaBySectionID(props.sectionId)

const {
  data: unreviewedMedia,
  isLoading: isUnreviewedMediaLoading,
  error: unreviewedMediaError,
  fetch: fetchUnreviewedMedia,
} = useUnreviewedMediaBySectionID(props.sectionId)

const {
  data: reviewedMedia,
  isLoading: isReviewedMediaLoading,
  error: reviewedMediaError,
  fetch: fetchReviewedMedia,
} = useReviewedMediaBySectionID(props.sectionId)

onMounted(fetchUndetectedMedia)
onMounted(fetchUncheckedMedia)
onMounted(fetchUnreviewedMedia)
onMounted(fetchReviewedMedia)
</script>
