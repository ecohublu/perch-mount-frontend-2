<template>
  <SectionView class="mb-6" :id="sectionID"></SectionView>
  <MediaTablesOfSection class="mb-6" :id="sectionID"></MediaTablesOfSection>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import SectionView from '@/components/views/SectionView.vue'
import MediaTablesOfSection from '@/components/MediaTablesOfSection.vue'

const route = useRoute()
const sectionID = ref<string>(route.params.id as string)
</script>
