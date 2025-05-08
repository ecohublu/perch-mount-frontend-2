<template>
  <Splitter>
    <SplitterPanel class="flex justify-center p-8" :size="25" :minSize="10">
      <ProjectEditor :id="id"></ProjectEditor>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :size="75">
      <div>
        <Button label="新增棲架" icon="pi pi-plus" rounded text />
        <PerchMountsOfProjectTable :projectId="id"></PerchMountsOfProjectTable>
      </div>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import ProjectEditor from '@/components/adminviews/editors/ProjectEditor.vue'
import PerchMountsOfProjectTable from '@/components/adminviews/tables/PerchMountsOfProjectTable.vue'

const props = defineProps<{
  id: string
}>()
</script>
