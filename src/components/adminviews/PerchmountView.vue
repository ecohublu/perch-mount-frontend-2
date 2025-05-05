<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex justify-center p-8" :size="35">
      <PerchMountEditor :id="id"></PerchMountEditor>
    </SplitterPanel>
    <SplitterPanel class="flex justify-center p-8" :size="65">
      <SectionsOfPerchMountTable :perchMountId="id"></SectionsOfPerchMountTable>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import PerchMountEditor from '@/components/adminviews/editors/PerchMountEditor.vue'
import SectionsOfPerchMountTable from '@/components/adminviews/tables/SectionsOfPerchMountTable.vue'
const props = defineProps<{ id: string }>()
</script>
