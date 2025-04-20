<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold text-2xl">
            {{ perchMount?.perch_mount_name }} {{ section?.swapped_date }}
          </span>
        </div>
      </template>
      <span>{{ section?.start_time }} ~ {{ section?.end_time }}</span>
      <div class="grid grid-cols-12 grid-rows-3 gap-4 mt-6">
        <div class="col-span-2">
          <MediaCountCard title="等待自動辨識" :count="section?.undetected_count!">
          </MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="待空拍檢查" :count="section?.unchecked_count!">
            <GoMediaOperationTag
              v-if="section?.unchecked_count!"
              operation="emptycheck"
              :sectionID="section?.id"
            >
              去檢查
            </GoMediaOperationTag>
          </MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="待物種檢視" :count="section?.unreviewed_count!">
            <GoMediaOperationTag
              v-if="section?.unreviewed_count!"
              operation="review"
              :sectionID="section?.id"
            >
              去檢查
            </GoMediaOperationTag>
          </MediaCountCard>
        </div>
        <div class="col-span-2">
          <MediaCountCard title="已完成" :count="section?.reviewed_count!"></MediaCountCard>
        </div>
        <div class="col-span-4 row-span-3">
          <Point :point="[perchMount?.latitude!, perchMount?.longitude!]"></Point>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="Section ID">{{ section?.id }}</InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="棲架">
            <PerchMountSpan
              :id="perchMount?.id!"
              :name="perchMount?.perch_mount_name!"
            ></PerchMountSpan>
          </InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="回收日期">{{ section?.swapped_date }}</InfoItemCard>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="工作開始時間">{{ section?.start_time }}</InfoItemCard>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="工作結束時間">{{ section?.end_time }}</InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="相機型號">{{ section?.camera.model_name }}</InfoItemCard>
        </div>
        <div class="col-span-1">
          <InfoItemCard title="支架類型">{{ section?.mount_type.name }}</InfoItemCard>
        </div>
        <div class="col-span-4">
          <InfoItemCard title="回收人員">
            <div class="flex flex-wrap">
              <div v-for="swapper in section?.swappers" class="ms-2">
                <router-link :to="`/app/members/${swapper.id}`">
                  <Chip
                    v-if="swapper.display_name"
                    :label="swapper.display_name"
                    :image="swapper.profile_picture_url"
                  />
                  <Chip v-else :label="`${swapper.last_name} ${swapper.first_name}`" image="" />
                </router-link>
              </div>
            </div>
          </InfoItemCard>
        </div>
        <div class="col-span-2">
          <InfoItemCard title="Note">{{ section?.note }}</InfoItemCard>
        </div>
      </div>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import { usePerchMountByID } from '@/composables/perchmounts/usePerchMount'
import { useSectionsByID } from '@/composables/sections/useSectionsByID'
import { onMounted, ref, watch } from 'vue'
import type { PerchMount } from '@/types/perchMount'

import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'
import GoMediaOperationTag from '@/components/nameSpans/GoMediaOperationTag.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import MediaCountCard from '@/components/cards/MediaCountCard.vue'

const props = defineProps<{
  id: string
}>()

const {
  data: section,
  isLoading: isSectionLoading,
  error: sectionError,
  fetch: fetchSection,
} = useSectionsByID(props.id)

const perchMount = ref<PerchMount | null>(null)
const isPerchMountLoading = ref<boolean | null>(false)
const perchMountError = ref<Error | null>(null)

watch(section, async (updatedSection) => {
  if (updatedSection?.perch_mount_id) {
    try {
      const { data, isLoading, error, fetch } = usePerchMountByID(updatedSection.perch_mount_id!)
      await fetch()
      perchMount.value = data.value
      perchMountError.value = error.value
    } catch (err) {
      perchMountError.value = err as Error
    } finally {
      isPerchMountLoading.value = false
    }
  }
})

onMounted(fetchSection)
</script>
