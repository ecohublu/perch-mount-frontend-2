<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex items-center justify-center p-8" :size="35" :minSize="10">
      <MediumEditor :id="id"></MediumEditor>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center p-8" :size="65">
      <IndividualCard
        v-for="individual of medium?.individuals"
        :individual="individual"
      ></IndividualCard>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import IndividualCard from '../cards/IndividualCard.vue'
import MediumEditor from './editors/MediumEditor.vue'
import { useMedium } from '@/composables/media/useMedium'

const props = defineProps<{ id: string }>()
const { data: medium, isLoading, error, fetch } = useMedium()

onMounted(() => {
  fetch(props.id)
})
</script>
