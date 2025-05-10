<template>
  <Select
    class="w-full"
    filter
    v-model="localSelected"
    :options="options"
    optionLabel="chinese_common_name"
    size="small"
    :invalid="!isValidSpecies"
    showClear
  ></Select>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useSpeciesOptionsStore } from '@/stores/speciesOptions'
import { isSearchResult } from '@/types/species'
import type { SearchResult } from '@/types/species'
import { storeToRefs } from 'pinia'

const speciesOptionsStore = useSpeciesOptionsStore()

const { options, isLoading } = storeToRefs(speciesOptionsStore)

const props = defineProps<{
  selected: SearchResult | null
}>()

const emit = defineEmits<{
  (e: 'species-selected', value: SearchResult): void
  (e: 'update:selected', value: SearchResult | null): void
}>()

const isValidSpecies = computed(() => {
  return localSelected.value === null || isSearchResult(localSelected.value)
})

const localSelected = computed({
  get: () => props.selected,
  set: (val: SearchResult | null) => {
    if (isSearchResult(val)) {
      emit('update:selected', val)
    } else {
      emit('update:selected', null)
    }
  },
})

watch(
  () => props.selected,
  (newVal) => {
    localSelected.value = newVal
  },
)

onMounted(() => {
  speciesOptionsStore.fetch()
})
</script>
