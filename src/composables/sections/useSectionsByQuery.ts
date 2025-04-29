import { computed, ref } from 'vue'
import { getSectionsByFilter } from '@/services/perchAI/sections'
import type { Section, SectionsQuery } from '@/types/sections'

export function useSectionsByFilter(initialFilter: SectionsQuery = {}) {
  const sections = ref<Section[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

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

  const areNew = computed(() => {
    const results = []
    for (const section of sections.value) {
      results.push(!section.start_time && !section.end_time)
    }
    return results
  })

  return {
    data: sections,
    areNew,
    isLoading,
    error,
    fetch,
  }
}
