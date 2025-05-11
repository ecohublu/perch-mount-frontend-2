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
            @click="handleDownload"
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
            <router-link :to="`/admin/sections/${section?.id}`">
              <Button icon="pi pi-pencil" label="編輯" severity="secondary" rounded text></Button>
            </router-link>
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

const downloadJsonObjectAsJsonFile = (data: object, filename: string = 'data.json'): void => {
  try {
    // 1. 將物件轉換為 JSON 字串 (美化格式，使用 2 個空格縮排)
    const jsonString = JSON.stringify(data, null, 2)

    // 2. 建立 Blob 物件
    const blob = new Blob([jsonString], { type: 'application/json' })

    // 3. 建立 Blob URL
    const url = URL.createObjectURL(blob)

    // 4. 建立 <a> 元素
    const link = document.createElement('a')

    // 5. 設定 href
    link.href = url

    // 6. 設定 download 屬性 (確保副檔名是 .json)
    link.download = filename.endsWith('.json') ? filename : `${filename}.json`

    // 7. 模擬點擊
    document.body.appendChild(link) // Firefox 需要將連結附加到 DOM 才能正確觸發下載
    link.click()

    // 8. 清理：從 DOM 移除 <a> 元素
    document.body.removeChild(link)

    // 9. 清理：釋放 Blob URL
    URL.revokeObjectURL(url)

    console.log(`已觸發下載檔案: ${link.download}`)
  } catch (error) {
    console.error('下載 JSON 檔案時發生錯誤:', error)
    // 在這裡你可以加入更友好的錯誤提示給使用者
    alert('下載檔案失敗。')
  }
}

const handleDownload = () => {
  // 你可以傳遞任何 JavaScript 物件
  downloadJsonObjectAsJsonFile(
    section.value as Object,
    `${perchMount.value?.perch_mount_name}_${section.value?.swapped_date}`,
  )
  // 如果想使用預設檔名 'data.json':
  // downloadJsonObjectAsJsonFile(myDataObject.value);
}
</script>
