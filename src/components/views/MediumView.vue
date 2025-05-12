<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2">
          <CardHeader>{{ medium?.medium_datetime }}</CardHeader>
        </div>
      </template>
      <div class="grid grid-cols-2 gap-8">
        <S3Medium :id="medium?.id!" :is-image="medium?.medium_type == 'image'"></S3Medium>
        <div class="card">
          <div class="grid grid-cols-4 gap-4">
            <div class="col-span-2">
              <InfoItemCard title="ID">
                {{ medium?.id }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="影像類型">
                {{ medium?.medium_type }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="資料狀態">
                <a
                  href="https://github.com/Chendada-8474/perch-mount-documentation/blob/main/media_status.md"
                  target="_blank"
                >
                  {{ medium?.status }}
                </a>
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="上傳時間">
                {{ medium?.created_at }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="自動辨識時間">
                {{ medium?.detected_contents?.detected_at }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="空拍檢查時間">
                {{ medium?.checked_contents?.empty_checked_at }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="物種檢視時間">
                {{ medium?.reviewed_contents?.reviewed_at }}
              </InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="空拍檢查 by">
                <MemberNameWithPhoto
                  v-if="emptyChecker !== null"
                  :member="emptyChecker!"
                ></MemberNameWithPhoto>
              </InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="物種檢視 by">
                <MemberNameWithPhoto
                  v-if="reviewer !== null"
                  :member="reviewer!"
                ></MemberNameWithPhoto>
              </InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="精選 by">
                <MemberNameWithPhoto
                  v-if="featuredBy !== null"
                  :member="featuredBy!"
                ></MemberNameWithPhoto>
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="精選行為">
                {{ medium?.reviewed_contents?.behavior?.name }}
              </InfoItemCard>
            </div>
            <div>
              <InfoItemCard title="事件">
                {{ medium?.reviewed_contents?.event?.name }}
              </InfoItemCard>
            </div>
            <div class="col-span-4">
              <InfoItemCard title="NAS 位置">
                {{ medium?.nas_path }}
              </InfoItemCard>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <router-link :to="`/admin/media/${medium?.id}`">
          <Button icon="pi pi-pencil" label="編輯" severity="secondary" rounded text></Button>
        </router-link>
      </template>
    </Panel>
  </div>
  <div class="card mt-8">
    <Panel toggleable>
      <template #header>
        <div class="flex gap-2">
          <CardHeader>Individuals</CardHeader>
          <Badge :value="medium?.individuals.length" size="xlarge" severity="secondary"></Badge>
        </div>
      </template>
      <div class="grid grid-cols-2 gap-4">
        <IndividualCard
          v-for="individual of medium?.individuals"
          :individual="individual"
        ></IndividualCard>
      </div>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import { useMedium } from '@/composables/media/useMedium'
import { onMounted } from 'vue'
import S3Medium from '@/components/S3Medium.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useMember } from '@/composables/members/useMemberByID'
import MemberNameWithPhoto from '@/components/MemberNameWithPhoto.vue'
import IndividualCard from '@/components/cards/IndividualCard.vue'
import CardHeader from '@/components/CardHeader.vue'
const props = defineProps<{ id: string }>()

const {
  data: medium,
  isLoading: isMediumLoading,
  error: mediumError,
  fetch: fetchMedium,
} = useMedium()
const {
  data: emptyChecker,
  isLoading: isEmptyCheckerLoading,
  error: emptyCheckerError,
  fetch: fetchEmptyChecker,
} = useMember()
const {
  data: reviewer,
  isLoading: isReviewerLoading,
  error: reviewerError,
  fetch: fetchReviewer,
} = useMember()

const {
  data: featuredBy,
  isLoading: isFeaturedByLoading,
  error: featuredByError,
  fetch: fetchfeaturedBy,
} = useMember()

onMounted(async () => {
  await fetchMedium(props.id)
  if (medium.value?.checked_contents !== null) {
    await fetchEmptyChecker(medium.value?.checked_contents?.empty_checker_id!)
  }
  if (medium.value?.reviewed_contents !== null) {
    await fetchReviewer(medium.value?.reviewed_contents?.reviewer_id!)
    if (medium.value?.reviewed_contents?.featured_by_id) {
      await fetchfeaturedBy(medium.value?.reviewed_contents?.featured_by_id!)
    }
  }
})
</script>
