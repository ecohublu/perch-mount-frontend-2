<template>
  <Select
    editable
    v-model="selectedSpecies"
    :options="speciesOptions"
    optionLabel="chinese_common_name"
    size="small"
    :invalid="!isValidSpecies"
    @input="search"
    @blur="handleBlur"
  ></Select>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSearchOptions } from '@/composables/species/useSearchOptions'
import { shouldISearch } from '@/utils/species'
import { isSearchResult } from '@/types/species'
import type { SearchResult } from '@/types/species'

const selectedSpecies = ref<SearchResult | null>(null)
const { data: speciesOptions, isLoading, error, fetch } = useSearchOptions()

const isValidSpecies = computed(() => {
  return selectedSpecies.value === null || isSearchResult(selectedSpecies.value)
})

const species = computed<SearchResult | null>(() => {
  return isSearchResult(selectedSpecies.value) ? selectedSpecies.value : null
})

const emit = defineEmits<{
  (e: 'species-selected', value: SearchResult): void
}>()

const search = async (event: any) => {
  const phrase = event.srcElement.value as string
  if (phrase.length == 0) {
    speciesOptions.value = []
    return
  }
  if (!shouldISearch(event)) {
    return
  }

  fetch(event.srcElement.value)
}

const handleBlur = () => {
  if (!isSearchResult(selectedSpecies.value)) {
    selectedSpecies.value = null
  }
  if (species.value !== null) {
    emit('species-selected', species.value)
  }
}
</script>
