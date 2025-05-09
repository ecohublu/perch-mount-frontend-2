<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex justify-center p-8" :size="35">
      <PerchMountEditor :id="id"></PerchMountEditor>
    </SplitterPanel>
    <SplitterPanel class="flex justify-center p-8" :size="65">
      <div>
        <Button
          label="新增 Section"
          icon="pi pi-plus"
          rounded
          text
          @click="AddSectionVisible = !AddSectionVisible"
        />
        <SectionsOfPerchMountTable :perchMountId="id"></SectionsOfPerchMountTable>
      </div>
    </SplitterPanel>
  </Splitter>
  <Dialog
    v-model:visible="AddSectionVisible"
    modal
    header="新增 Section"
    :style="{ width: '30rem' }"
  >
    <AddSectionForm :perch-mount-id="id"></AddSectionForm>
  </Dialog>
</template>
<script setup lang="ts">
import PerchMountEditor from '@/components/adminviews/editors/PerchMountEditor.vue'
import SectionsOfPerchMountTable from '@/components/adminviews/tables/SectionsOfPerchMountTable.vue'
import AddSectionForm from '@/components/forms/AddSectionForm.vue'
import { ref } from 'vue'
const props = defineProps<{ id: string }>()
const AddSectionVisible = ref<boolean>(false)
</script>
