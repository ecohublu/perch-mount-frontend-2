<template>
  <Card>
    <template #title>
      <div class="flex justify-between">
        <Checkbox v-model="localChecked" binary />
        <div class="flex">
          <Button
            icon="pi pi-heart"
            variant="text"
            rounded
            size="small"
            severity="danger"
            @click="handleFeatureEditorClicked"
          />
          <Button
            icon="pi pi-window-maximize"
            variant="text"
            rounded
            size="small"
            severity="secondary"
            @click="handleMediumEditorClicked"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div>
        <S3Medium :id="medium.id" :is-image="medium.medium_type == 'image'"></S3Medium>
        <div class="grid grid-cols-12 gap-1 mb-3">
          <div class="col-span-3 font-bold">AI 物種</div>
          <div class="col-span-5 font-bold">更正物種</div>
          <div class="col-span-2 font-bold">獵物</div>
          <div class="col-span-2 font-bold">Tag</div>
        </div>
        <div v-for="(individual, index) in medium.individuals">
          <div
            :class="[
              {
                'line-through': localReviewingMedium.individuals[index].deleted,
                'font-thin': localReviewingMedium.individuals[index].deleted,
                italic: localReviewingMedium.individuals[index].deleted,
              },
            ]"
            class="grid grid-cols-12 gap-3 mb-3"
          >
            <div class="col-span-3">
              {{ individual.unreviewed_contents?.species_by_ai.chinese_common_name }}
            </div>
            <div class="col-span-5">
              <SpeciesSelector
                v-model:selected="localReviewingMedium.individuals[index].selected_species"
              ></SpeciesSelector>
            </div>
            <div class="col-span-2">
              <Checkbox
                v-model="localReviewingMedium.individuals[index].has_prey"
                binary
              ></Checkbox>
            </div>
            <div class="col-span-2">
              <TaggedRingPopup
                v-model:has_ring="localReviewingMedium.individuals[index].has_ring"
                v-model:is_tagged="localReviewingMedium.individuals[index].is_tagged"
                v-model:ring_number="localReviewingMedium.individuals[index].ring_number"
              ></TaggedRingPopup>
            </div>
          </div>
        </div>
        <div
          class="mt-6 grid grid-cols-12 gap-3 mb-3"
          v-for="(individual, index) in localReviewingMedium.ai_missed_individuals"
        >
          <div class="col-span-3"></div>
          <div class="col-span-5">
            <SpeciesSelector v-model:selected="individual.selected_species"></SpeciesSelector>
          </div>
          <div class="col-span-2">
            <Checkbox v-model="individual.has_prey" binary></Checkbox>
          </div>
          <div class="col-span-2">
            <TaggedRingPopup
              v-model:has_ring="individual.has_ring"
              v-model:is_tagged="individual.is_tagged"
              v-model:ring_number="individual.ring_number"
            ></TaggedRingPopup>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Medium, ReviewingMedium } from '@/types/media'
import type { SearchResult } from '@/types/species'
import S3Medium from '@/components/S3Medium.vue'
import SpeciesSelector from '@/components/forms/SpeciesSelector.vue'
import TaggedRingPopup from '@/components/forms/TaggedRingPopup.vue'
const props = defineProps<{
  medium: Medium
  checked: boolean
  reviewingMedium: ReviewingMedium
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'update:reviewingMedium', value: ReviewingMedium): void
  (e: 'medium-editor-clicked'): void
  (e: 'feature-editor-clicked'): void
}>()

const localChecked = computed({
  get: () => props.checked,
  set: (val: boolean) => emit('update:checked', val),
})

const localReviewingMedium = computed({
  get: () => props.reviewingMedium,
  set: (val: ReviewingMedium) => emit('update:reviewingMedium', val),
})

const handleSpeciesSelected = (index: number, selected: SearchResult) => {
  localReviewingMedium.value.individuals[index].selected_species = selected
}
const handleAiMissSpeciesSelected = (index: number, selected: SearchResult) => {
  localReviewingMedium.value.ai_missed_individuals[index].selected_species = selected
}

const handleMediumEditorClicked = () => {
  emit('medium-editor-clicked')
}
const handleFeatureEditorClicked = () => {
  emit('feature-editor-clicked')
}
</script>
