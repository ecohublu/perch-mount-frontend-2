import { ref } from 'vue'
import { getSectionsByFilter } from '@/services/perchAI/sections'
import type { Section, SectionsQuery } from '@/types/sections'

const sections = ref<Section[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useSectionsByFilter(initialFilter: SectionsQuery = {}) {
  const fetch = async (filter: SectionsQuery = initialFilter) => {
    isLoading.value = true
    error.value = null
    try {
      const result = await getSectionsByFilter(filter)
      sections.value = result
    } catch (err) {
      error.value = err as Error
      sections.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: sections,
    isLoading,
    error,
    fetch,
  }
}
