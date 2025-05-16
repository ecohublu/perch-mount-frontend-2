<template>
  <class class="card">
    <Panel toggleable>
      <template #header>
        <CardHeader>認領棲架</CardHeader>
      </template>
      <div class="flex flex-wrap gap-4">
        <PerchMountCard v-for="perchMount of perchMounts" :info="perchMount"></PerchMountCard>
      </div>
    </Panel>
  </class>
</template>
<script setup lang="ts">
import { useMemberClaimedPerchMounts } from '@/composables/perchmounts/useMemberClaimedPerchMounts'
import CardHeader from '../CardHeader.vue'
import { onMounted } from 'vue'
import PerchMountCard from '../cards/PerchMountCard.vue'

const props = defineProps<{ memberId: string }>()

const {
  data: perchMounts,
  workingCount,
  terminatedCount,
  isLoading,
  error,
  fetch,
} = useMemberClaimedPerchMounts()

onMounted(() => {
  fetch(props.memberId)
})
</script>
