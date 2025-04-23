<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex">
          <span class="font-bold text-2xl mr-6">Sections</span>
          <Button label="新增" size="small" variant="text" rounded icon="pi pi-plus" />
        </div>
      </template>
      <DataTable
        v-model:expandedRows="expandedRows"
        dataKey="id"
        :value="sections"
        tableStyle="min-width: 60rem"
      >
        <Column expander style="width: 5rem" />
        <Column field="swapped_date" header="回收日期">
          <template #body="slotProps">
            <SectionSpan :id="slotProps.data.id" :name="slotProps.data.swapped_date"></SectionSpan>
          </template>
        </Column>
        <Column header="回收人員">
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div class="mx-1" v-for="swapper in slotProps.data.swappers">
                <Avatar :image="swapper.profile_picture_url" shape="circle" />
              </div>
            </div>
          </template>
        </Column>
        <Column field="undetected_count" header="未辨識影像"> </Column>
        <Column field="unchecked_count" header="待空拍檢查影像">
          <template #body="slotProps">
            <GoMediaOperationByCountTag
              :value="slotProps.data.unchecked_count"
              operation="emptycheck"
              :sectionID="slotProps.data.id"
            ></GoMediaOperationByCountTag>
          </template>
        </Column>
        <Column field="unreviewed_count" header="待物種檢視影像">
          <template #body="slotProps">
            <GoMediaOperationByCountTag
              :value="slotProps.data.unreviewed_count"
              operation="review"
              :sectionID="slotProps.data.id"
            ></GoMediaOperationByCountTag>
          </template>
        </Column>
        <Column field="reviewed_count" header="已辨識"></Column>
        <template #expansion="slotProps">
          <div class="grid grid-cols-12 grid-rows-2 gap-4">
            <div class="col-span-3">
              <InfoItemCard title="Section ID">{{ slotProps.data.id }}</InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="相機工作開始時間">{{ slotProps.data.start_time }}</InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="相機工作結束時間">{{ slotProps.data.end_time }}</InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="相機型號">{{ slotProps.data.camera.model_name }}</InfoItemCard>
            </div>
            <div class="col-span-2">
              <InfoItemCard title="棲架類型">{{ slotProps.data.mount_type.name }}</InfoItemCard>
            </div>
            <div class="col-span-6">
              <InfoItemCard title="回收人員">
                <div class="flex flex-wrap">
                  <div v-for="swapper in slotProps.data.swappers" class="ms-2">
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
            <div class="col-span-6">
              <InfoItemCard title="Note">
                {{ slotProps.data.note }}
              </InfoItemCard>
            </div>
          </div>
        </template>
      </DataTable>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { useSectionsByFilter } from '@/composables/sections/useSectionsByQuery'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { SectionsQuery } from '@/types/sections'

import InfoItemCard from './cards/InfoItemCard.vue'
import SectionSpan from './nameSpans/SectionSpan.vue'
import GoMediaOperationByCountTag from './GoMediaOperationByCountTag.vue'

const route = useRoute()
const expandedRows = ref({})
const props = defineProps<{
  id: String
}>()

const filter: SectionsQuery = {
  perch_mount_ids: [route.params.id as string],
  swapper_ids: [],
  swapped_date_from: null,
  swapped_date_to: null,
}

const { data: sections, isLoading, error, fetch } = useSectionsByFilter(filter)
onMounted(fetch)
</script>
