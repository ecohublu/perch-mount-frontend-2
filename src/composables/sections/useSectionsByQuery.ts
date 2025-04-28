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

  const hasAnyMedia = computed(() => {
    const results = []
    for (const section of sections.value) {
      results.push(
        section.accidental_count > 0 ||
          section.unchecked_count > 0 ||
          section.unreviewed_count > 0 ||
          section.reviewed_count > 0 ||
          section.undetected_count > 0,
      )
    }
    return results
  })

  return {
    data: sections,
    hasAnyMedia,
    isLoading,
    error,
    fetch,
  }
}
