import { ref } from 'vue'
import { getSectionsByID } from '@/services/perchAI/sections'
import type { Section } from '@/types/sections'

const section = ref<Section | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useSectionsByID(id: string) {
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

  return {
    data: section,
    isLoading,
    error,
    fetch,
  }
}
