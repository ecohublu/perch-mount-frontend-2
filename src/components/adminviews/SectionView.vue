<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex justify-center p-8" :size="30">
      <SectionEditor :id="id"></SectionEditor>
    </SplitterPanel>
    <SplitterPanel class="flex justify-center p-8" :size="70">
      <MediaOfSectionTable :sectionId="id"></MediaOfSectionTable>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import SectionEditor from '@/components/adminviews/editors/SectionEditor.vue'
import MediaOfSectionTable from '@/components/adminviews/tables/MediaOfSectionTable.vue'
const props = defineProps<{
  id: string
}>()
</script>
