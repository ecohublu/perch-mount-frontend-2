<template>
  <class class="card">
    <Panel toggleable>
      <template #header>
        <CardHeader>操作</CardHeader>
      </template>
      <DataTable :value="contributions">
        <Column field="id" header="ID"></Column>
        <Column field="contribute_time" header="操作時間" sortable></Column>
        <Column field="contribution_type" header="操作類型" sortable></Column>
        <Column field="counts" header="檔案數量" sortble></Column>
      </DataTable>
    </Panel>
  </class>
</template>
<script setup lang="ts">
import { useMemberContributions } from '@/composables/contributions/useMemberContributions'
import CardHeader from '../CardHeader.vue'
import { onMounted } from 'vue'

const props = defineProps<{ memberId: string }>()
const { data: contributions, isLoading, error, fetch } = useMemberContributions()
onMounted(() => {
  fetch(props.memberId)
})
</script>
