<template>
  <div class="grid grid-cols-3 gap-8 my-8">
    <div class="col-span-2 flex flex-col gap-2">
      <label for="species">更正物種</label>
      <SpeciesSelector
        v-model:selected="selectedSpecies"
        aria-describedby="species-help"
      ></SpeciesSelector>
    </div>
    <div class="flex items-end h-full">
      <Button label="變更物種" size="small" @click="handleSpeciesUpdateClicked"></Button>
    </div>
  </div>
  <Divider />

  <div class="grid grid-cols-3 gap-8 my-8">
    <div class="col-span-2 flex flex-col gap-2">
      <label>獵物</label>
      <ToggleButton
        v-model="hasPrey"
        onIcon="pi pi-check"
        on-label="有獵物"
        offIcon="pi pi-times"
        off-label="沒有獵物"
        :invalid="!hasPrey"
        size="small"
      />
    </div>
    <div class="flex items-end h-full">
      <Button label="變更獵物" size="small" @click="handlePreyUpdateClicked"></Button>
    </div>
  </div>

  <Divider />

  <div class="grid grid-cols-3 gap-8 my-8">
    <div class="col-span-2 flex flex-col gap-2">
      <label>腳環</label>
      <ToggleButton
        v-model="hasRing"
        onIcon="pi pi-check"
        on-label="有腳環"
        offIcon="pi pi-times"
        off-label="沒有腳環"
        :invalid="!hasRing"
        size="small"
      />
    </div>
    <div class="flex items-end h-full">
      <Button label="變更腳環" size="small" @click="handleRingUpdateClicked"></Button>
    </div>
  </div>

  <Divider />

  <div class="grid grid-cols-3 gap-8 my-8">
    <div class="col-span-2 flex flex-col gap-2">
      <label>發報器</label>
      <ToggleButton
        v-model="isTagged"
        onIcon="pi pi-check"
        on-label="有發報器"
        offIcon="pi pi-times"
        off-label="沒有發報器"
        :invalid="!isTagged"
        size="small"
      />
    </div>
    <div class="flex items-end h-full">
      <Button label="變更發報器" size="small" @click="handleTagUpdateClicked"></Button>
    </div>
  </div>
  <Divider />

  <div class="grid grid-cols-3 gap-8 my-8">
    <div class="col-span-2 flex flex-col gap-2">
      <label for="ringnumber">環號</label>
      <InputText v-model="ringNumber"></InputText>
    </div>
    <div class="flex items-end h-full">
      <Button label="變更環號" size="small" @click="handleRingNumberUpdateClicked"></Button>
    </div>
  </div>
  <Divider />

  <Button label="取消所有選取" severity="secondary" @click="handleCancelClicked"></Button>
</template>
<script setup lang="ts">
import SpeciesSelector from '@/components/forms/SpeciesSelector.vue'
import type { SearchResult } from '@/types/species'

import { ref } from 'vue'

const selectedSpecies = ref<SearchResult | null>(null)
const hasPrey = ref<boolean>(false)
const hasRing = ref<boolean>(false)
const isTagged = ref<boolean>(false)
const ringNumber = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'species-requested', value: SearchResult | null): void
  (e: 'prey-requested', value: boolean): void
  (e: 'ring-requested', value: boolean): void
  (e: 'tag-requested', value: boolean): void
  (e: 'ring-number-requested', value: string | null): void
  (e: 'cancel-requested'): void
}>()

const handleSpeciesUpdateClicked = () => {
  emit('species-requested', selectedSpecies.value)
}

const handlePreyUpdateClicked = () => {
  emit('prey-requested', hasPrey.value)
}
const handleRingUpdateClicked = () => {
  emit('ring-requested', hasRing.value)
}
const handleTagUpdateClicked = () => {
  emit('tag-requested', isTagged.value)
}
const handleRingNumberUpdateClicked = () => {
  emit('ring-number-requested', ringNumber.value)
}

const handleCancelClicked = () => {
  emit('cancel-requested')
}
</script>
