<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-4">
          <Tag v-if="isNew" value="New" severity="success"></Tag>
          <span class="font-bold text-2xl">
            {{ perchMount?.perch_mount_name }} {{ section?.swapped_date }}
          </span>
          <Button
            v-if="isNew"
            icon="pi pi-download"
            label="下載上傳資料檔"
            severity="success"
            variant="outlined"
            rounded
          />
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
          <Point
            :point="[perchMount?.latitude!, perchMount?.longitude!]"
            :center="[perchMount?.latitude!, perchMount?.longitude!]"
          ></Point>
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
      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div v-if="isNew">
              <Button
                icon="pi pi-trash"
                label="刪除"
                severity="secondary"
                rounded
                text
                @click="deleteVisible = true"
              ></Button>
            </div>
          </div>
          <span v-if="durationDay" class="text-surface-500 dark:text-surface-400"
            >運作了 {{ durationDay }} 天</span
          >
          <span v-else class="text-surface-500 dark:text-surface-400">運作了 - 天</span>
        </div>
      </template>
    </Panel>
    <Dialog
      v-model:visible="deleteVisible"
      modal
      header="確定要刪除 Section 嗎？"
      :style="{ width: '25rem' }"
    >
      <div v-if="isDeleting">section deleting...</div>
      <div v-else-if="deleted">
        <Message severity="success">
          <span>刪除成功，</span>
          <span
            >回到
            <Tag severity="success">
              <PerchMountSpan
                :id="perchMount?.id!"
                :name="perchMount?.perch_mount_name!"
              ></PerchMountSpan>
            </Tag>
          </span>
        </Message>
      </div>
      <div v-else-if="deleteError">
        <Message severity="error">{{ deleteError }}</Message>
      </div>
      <div v-if="!deleted" class="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          label="取消"
          severity="secondary"
          @click="deleteVisible = false"
        ></Button>
        <Button type="button" label="確定" @click="deleteClicked"></Button></div
    ></Dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePerchMountByID } from '@/composables/perchmounts/usePerchMount'
import { useSectionsByID } from '@/composables/sections/useSectionsByID'
import { useSectionDeleteByID } from '@/composables/sections/useSectionDelete'
import type { PerchMount } from '@/types/perchMount'

import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'
import GoMediaOperationTag from '@/components/nameSpans/GoMediaOperationTag.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import MediaCountCard from '@/components/cards/MediaCountCard.vue'

const deleteVisible = ref<boolean>(false)

const props = defineProps<{
  id: string
}>()

const {
  data: section,
  isNew,
  durationDay,
  isLoading: isSectionLoading,
  error: sectionError,
  fetch: fetchSection,
} = useSectionsByID(props.id)

const {
  deleted,
  isDeleting,
  error: deleteError,
  fetch: deleteFetch,
} = useSectionDeleteByID(props.id)

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

const deleteClicked = () => {
  deleteFetch()
}
</script>
