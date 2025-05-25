<template>
  <div class="card">
    <Panel toggleable>
      <template #header><span class="font-bold text-2xl mr-6">Monthly Counts</span></template>
      <DataTable :value="monthlyCounts">
        <Column field="year_month" header="年月" sortable></Column>
        <Column field="undetected" header="Undetected" sortable></Column>
        <Column field="unchecked" header="Unchecked" sortable></Column>
        <Column field="unreviewed" header="Unreviewed" sortable></Column>
        <Column field="reviewed" header="Reviewed" sortable></Column>
      </DataTable>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import { usePerchMountMonthlyCounts } from '@/composables/perchmounts/useMonthlyCounts'
import { onMounted } from 'vue'

const props = defineProps<{
  id: string
}>()

const {
  data: monthlyCounts,
  isLoading: isCountsLoading,
  error: countsError,
  fetch: fetchCounts,
} = usePerchMountMonthlyCounts()

onMounted(async () => {
  await fetchCounts(props.id)
})
</script>
