<template>
  <div class="card">
    <DataTable :value="data">
      <Column header="棲架">
        <template #body="slotProps">
          <PerchMountSpan
            :id="slotProps.data.id"
            :name="slotProps.data.perch_mount_name"
          ></PerchMountSpan>
        </template>
      </Column>
      <Column header="認領人">
        <template #body="slotProps">
          <router-link
            v-if="slotProps.data.claim_by_id"
            :to="`/app/members/${slotProps.data.claim_by_id}`"
          >
            <Chip :label="slotProps.data.claimer_name" :image="slotProps.data.claim_picture_url" />
          </router-link>
        </template>
      </Column>
      <Column field="undetected_count" header="等待自動辨識" sortable> </Column>
      <Column field="unchecked_count" header="待空拍檢查" sortable>
        <template #body="slotProps">
          <GoMediaOperationButton
            :value="slotProps.data.unchecked_count"
            operation="emptycheck"
            :perchMountID="slotProps.data.id"
          ></GoMediaOperationButton>
        </template>
      </Column>
      <Column field="unreviewed_count" header="待物種鑑識" sortable>
        <template #body="slotProps">
          <GoMediaOperationButton
            :value="slotProps.data.unreviewed_count"
            operation="review"
            :perchMountID="slotProps.data.id"
          ></GoMediaOperationButton>
        </template>
      </Column>
      <Column field="reviewed_count" header="已完成 " sortable></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { usePerchMountsCounts } from '@/composables/perchmounts/usePengingCounts'
import { onMounted } from 'vue'

import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'
import GoMediaOperationButton from '@/components/GoMediaOperationByCountTag.vue'

const { data, isLoading, error, fetch } = usePerchMountsCounts()
onMounted(fetch)
</script>
