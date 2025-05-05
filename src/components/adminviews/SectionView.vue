<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex justify-center p-8" :size="25">
      <SectionEditor :id="id"></SectionEditor>
    </SplitterPanel>
    <SplitterPanel class="flex justify-center p-8" :size="75">
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
