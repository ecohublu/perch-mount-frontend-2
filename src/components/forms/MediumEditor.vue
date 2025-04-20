<template>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <BoxCanvas :id="medium.id" :is-image="medium.medium_type == 'image'"></BoxCanvas>
    </div>
    <div>
      <div class="grid grid-cols-12 gap-4">
        <div></div>
        <div class="col-span-2 font-bold">AI 物種</div>
        <div class="col-span-2 font-bold">更正物種</div>
        <div class="font-bold">xmin</div>
        <div class="font-bold">xmax</div>
        <div class="font-bold">ymin</div>
        <div class="font-bold">ymax</div>
        <div class="font-bold">獵物</div>
        <div class="font-bold">Tag</div>
        <div class="font-bold">刪除</div>
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
          class="grid grid-cols-12 gap-4 mt-6"
        >
          <div>{{ index }}</div>
          <div class="col-span-2">
            {{ individual.unreviewed_contents?.species_by_ai.chinese_common_name }}
          </div>
          <div class="col-span-2">
            <SpeciesSelector
              v-model:selected="localReviewingMedium.individuals[index].selected_species"
            ></SpeciesSelector>
          </div>
          <div>{{ individual.unreviewed_contents?.box_xmin }}</div>
          <div>{{ individual.unreviewed_contents?.box_xmax }}</div>
          <div>{{ individual.unreviewed_contents?.box_ymin }}</div>
          <div>{{ individual.unreviewed_contents?.box_ymax }}</div>
          <div>
            <Checkbox v-model="localReviewingMedium.individuals[index].has_prey" binary></Checkbox>
          </div>
          <div>
            <TaggedRingPopup
              v-model:has_ring="localReviewingMedium.individuals[index].has_ring"
              v-model:is_tagged="localReviewingMedium.individuals[index].is_tagged"
              v-model:ring_number="localReviewingMedium.individuals[index].ring_number"
            ></TaggedRingPopup>
          </div>
          <div>
            <ToggleButton
              v-model="localReviewingMedium.individuals[index].deleted"
              onIcon="pi pi-trash"
              offIcon="pi pi-face-smile"
              :invalid="localReviewingMedium.individuals[index].deleted"
              size="small"
            />
          </div>
        </div>
      </div>
      <Divider />
      <div
        v-for="(individual, index) in localReviewingMedium.ai_missed_individuals"
        class="grid grid-cols-12 gap-4 mt-6"
      >
        <div>{{ index }}</div>
        <div class="col-span-2"></div>
        <div class="col-span-2">
          <SpeciesSelector v-model:selected="individual.selected_species"></SpeciesSelector>
        </div>
        <div>{{ individual.box_xmin }}</div>
        <div>{{ individual.box_xmax }}</div>
        <div>{{ individual.box_ymin }}</div>
        <div>{{ individual.box_ymax }}</div>
        <div>
          <Checkbox v-model="individual.has_prey" binary></Checkbox>
        </div>
        <div>
          <TaggedRingPopup
            v-model:has_ring="individual.has_ring"
            v-model:is_tagged="individual.is_tagged"
            v-model:ring_number="individual.ring_number"
          ></TaggedRingPopup>
        </div>
        <div>
          <Button icon="pi pi-trash" severity="secondary" variant="text" size="small" rounded />
        </div>
      </div>
      <div class="flex justify-center">
        <Button icon="pi pi-plus" variant="text" raised rounded />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Medium, ReviewingMedium } from '@/types/media'
import type { SearchResult } from '@/types/species'
import BoxCanvas from '@/components/BoxCanvas/BoxCanvas.vue'
import TaggedRingPopup from '@/components/forms/TaggedRingPopup.vue'
import SpeciesSelector from '@/components/forms/SpeciesSelector.vue'
import { handle } from '@primeuix/themes/aura/imagecompare'
const props = defineProps<{
  medium: Medium
  reviewingMedium: ReviewingMedium
}>()

const emit = defineEmits<{
  (e: 'update:reviewingMedium', value: ReviewingMedium): void
}>()

const localReviewingMedium = computed({
  get: () => props.reviewingMedium,
  set: (val: ReviewingMedium) => emit('update:reviewingMedium', val),
})
</script>
