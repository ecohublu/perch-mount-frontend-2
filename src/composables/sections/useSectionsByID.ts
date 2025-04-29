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

  const isNew = computed(() => {
    if (!section.value) return false

    return section.value.start_time === null && section.value.end_time === null
  })

  return {
    data: section,
    isNew,
    isLoading,
    error,
    fetch,
  }
}
