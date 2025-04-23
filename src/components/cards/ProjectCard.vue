<template>
  <div class="card">
    <Panel toggleable collapsed>
      <template #header>
        <div class="flex items-center gap-2">
          <ProjectSpan :id="info.id" :name="info.name"></ProjectSpan>
          <Badge :value="perchMounts.length" size="xlarge" severity="secondary"></Badge>
        </div>
      </template>
      <template #icons>
        <Button label="新增棲架" icon="pi pi-plus" rounded text />
      </template>
      <p class="m-0">
        <div class="grid grid-cols-2 gap-4">
            <PerchMountCard  v-for="perchMount in perchMounts" :info="perchMount"></PerchMountCard>
        </div>
      </p>
    </Panel>
  </div>
  
</template>
<script setup lang="ts">
import type { Project } from '@/types/project'
import { usePerchMountsByQuery } from '@/composables/perchmounts/usePerchMountsByProjectID'
import { onMounted } from 'vue'
import ProjectSpan from '@/components/nameSpans/ProjectSpan.vue'
import PerchMountCard from '@/components/cards/PerchMountCard.vue'

const props = defineProps<{ info: Project }>()

const {
  data: perchMounts,
  isLoading,
  error,
  fetch,
} = usePerchMountsByQuery({ project_ids: [props.info.id] })
onMounted(fetch)
</script>
