import { computed, ref } from 'vue'
import { getSectionsByID } from '@/services/perchAI/sections'
import type { Section } from '@/types/sections'

export function useSectionsByID(id: string) {
  const section = ref<Section | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      section.value = await getSectionsByID(id)
    } catch (err) {
      error.value = err as Error
      section.value = null
    } finally {
      isLoading.value = false
    }
  }

  const hasAnyMedia = computed(() => {
    if (!section.value) return false
    return (
      section.value.accidental_count > 0 ||
      section.value.unchecked_count > 0 ||
      section.value.unreviewed_count > 0 ||
      section.value.reviewed_count > 0 ||
      section.value.undetected_count > 0
    )
  })

  return {
    data: section,
    hasAnyMedia,
    isLoading,
    error,
    fetch,
  }
}
