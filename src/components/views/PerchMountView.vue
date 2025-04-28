<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold text-2xl">{{ perchMount?.perch_mount_name }}</span>
          <Tag v-if="perchMount?.terminated" severity="secondary">已撤除</Tag>
          <Tag v-if="perchMount?.is_priority" severity="danger">優先處裡</Tag>
        </div>
      </template>

      <div class="card">
        <MeterGroup :value="progressValues" />
      </div>
      <div class="grid grid-cols-12 grid-rows-3 gap-4 mt-6">
        <div class="col-span-2">
          <MediaCountCard
            title="等待自動辨識"
            :count="perchMountCount?.undetected_count!"
          ></MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="待空拍檢查" :count="perchMountCount?.unchecked_count!">
            <GoMediaOperationSpan
              v-if="perchMountCount?.unchecked_count!"
              operation="emptycheck"
              :perchMountID="perchMount?.id"
            >
              去檢查
            </GoMediaOperationSpan>
          </MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="待物種檢視" :count="perchMountCount?.unreviewed_count!">
            <GoMediaOperationSpan
              v-if="perchMountCount?.unreviewed_count!"
              operation="review"
              :perchMountID="perchMount?.id"
            >
              去檢視
            </GoMediaOperationSpan>
          </MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="已完成" :count="perchMountCount?.reviewed_count!"></MediaCountCard>
        </div>

        <div class="col-span-4 row-span-3">
          <Point :point="[perchMount?.latitude!, perchMount?.longitude!]"></Point>
        </div>

        <div class="col-span-1">
          <InfoItemCard title="計畫">
            <router-link :to="`/app/projects/${perchMount?.project.id}`">
              {{ perchMount?.project.name }}
            </router-link>
          </InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="棲地類型">{{ perchMount?.habitat }}</InfoItemCard>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="座標">
            <a
              :href="parseGoogleMapPointURL(perchMount?.latitude!, perchMount?.longitude!)"
              target="_blank"
            >
              <i class="pi pi-map-marker"></i>
              {{ perchMount?.latitude }}, {{ perchMount?.longitude }}
            </a>
          </InfoItemCard>
        </div>
        <div class="col-span-4">
          <InfoItemCard title="棲架 ID">{{ perchMount?.id }}</InfoItemCard>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="認領人">
            <router-link v-if="perchMount?.claimer" :to="`/app/members/${perchMount?.claimer?.id}`">
              <MemberNameWithPhoto :member="perchMount?.claimer"></MemberNameWithPhoto>
            </router-link>
            <ClaimButton v-else label="我要認領~"></ClaimButton>
          </InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="棲架分層">{{ perchMount?.mount_layer }}</InfoItemCard>
        </div>
        <div class="col-span-1"></div>
        <div class="col-span-2">
          <InfoItemCard title="Note">{{ perchMount?.note }}</InfoItemCard>
        </div>
      </div>
      <template #footer>
        <div
          v-if="!perchMount?.terminated"
          class="flex flex-wrap items-center justify-between gap-4"
        >
          <div class="flex items-center gap-2">
            <div v-if="auth.currentUser?.is_admin">
              <Button icon="pi pi-pencil" label="編輯" severity="secondary" rounded text></Button>
              <Button
                v-if="!perchMount?.is_priority"
                icon="pi pi-bookmark-fill"
                label="設定為優先"
                severity="secondary"
                rounded
                text
              ></Button>
              <Button
                v-else="!perchMount?.is_priority"
                icon="pi pi-bookmark"
                label="取消優先"
                severity="secondary"
                rounded
                text
              ></Button>
            </div>
            <div v-if="auth.currentUser?.is_super_admin">
              <Button icon="pi pi-trash" label="撤銷" severity="secondary" rounded text></Button>
            </div>
          </div>
          <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePerchMountByID } from '@/composables/perchmounts/usePerchMount'
import { usePerchMountCountByID } from '@/composables/perchmounts/usePengingCount'
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'
import { convertToProportion } from '@/types/perchMount'
import { parseGoogleMapPointURL } from '@/utils/googleMap'

import Point from '@/components/Point.vue'
import MediaCountCard from '@/components/cards/MediaCountCard.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import MemberNameWithPhoto from '@/components/MemberNameWithPhoto.vue'
import ClaimButton from '@/components/ClaimButton.vue'
import GoMediaOperationSpan from '@/components/nameSpans/GoMediaOperationTag.vue'

const props = defineProps<{ id: String }>()

const auth = useAuth()

const {
  data: perchMount,
  isLoading: isPerchMountLoading,
  error: perchMountError,
  fetch: fetchPerchMount,
} = usePerchMountByID(props.id)

const {
  data: perchMountCount,
  isLoading: isPerchMountCountLoading,
  error: perchMountCountError,
  fetch: fetchPerchMountCount,
} = usePerchMountCountByID(props.id)

onMounted(fetchPerchMount)
onMounted(fetchPerchMountCount)

const defaultProgressValues = [
  { label: '等待自動辨識', color: '#34d399', value: 0 },
  { label: '待空拍檢查', color: '#fbbf24', value: 0 },
  { label: '待物種檢視', color: '#60a5fa', value: 0 },
  { label: '已完成', color: '#c084fc', value: 0 },
]

const progressValues = ref(defaultProgressValues)

watch(perchMountCount, (updatedData) => {
  if (updatedData) {
    const proportion = convertToProportion(updatedData)
    progressValues.value = [
      { label: '等待自動辨識', color: '#34d399', value: proportion.undetected },
      { label: '待空拍檢查', color: '#fbbf24', value: proportion.unchecked },
      { label: '待物種檢視', color: '#60a5fa', value: proportion.unreviewed },
      { label: '已完成', color: '#c084fc', value: proportion.reviewed },
    ]
  } else {
    progressValues.value = defaultProgressValues
  }
})
</script>
