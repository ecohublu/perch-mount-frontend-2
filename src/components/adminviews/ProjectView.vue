<template>
  <Splitter>
    <SplitterPanel class="flex justify-center p-8" :size="25" :minSize="10">
      <ProjectEditor :id="id"></ProjectEditor>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :size="75">
      <div>
        <Button
          label="新增棲架"
          icon="pi pi-plus"
          rounded
          text
          @click="newPerchMountVisible = !newPerchMountVisible"
        />
        <PerchMountsOfProjectTable :projectId="id"></PerchMountsOfProjectTable>
      </div>
    </SplitterPanel>
  </Splitter>
  <Dialog
    v-model:visible="newPerchMountVisible"
    modal
    header="新增棲架"
    :style="{ width: '25rem' }"
  >
    <NewPerchMountEditor :projectId="id"></NewPerchMountEditor>
  </Dialog>
</template>
<script setup lang="ts">
import ProjectEditor from '@/components/adminviews/editors/ProjectEditor.vue'
import PerchMountsOfProjectTable from '@/components/adminviews/tables/PerchMountsOfProjectTable.vue'
import NewPerchMountEditor from '@/components/adminviews/editors/NewPerchMountEditor.vue'
import { useAddingPerchMount } from '@/composables/perchmounts/useAddingPerchMount'
import { ref } from 'vue'

const newPerchMountVisible = ref<boolean>(false)

const props = defineProps<{
  id: string
}>()

const { perchMount, valid, validate, submitting, addedPerchMount, submitError, submit } =
  useAddingPerchMount()
</script>
