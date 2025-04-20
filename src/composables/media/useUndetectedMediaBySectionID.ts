import { ref } from 'vue'
import type { Medium } from '@/types/media'
import { getMediaByFilter } from '@/services/perchAI/media'
import { createMediaQuery } from '@/types/media'

const media = ref<Medium[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useUndetectedMediaBySectionID(initSectionID: string) {
  const fetch = async (sectionID: string = initSectionID) => {
    isLoading.value = true
    error.value = null
    const mediaQuery = createMediaQuery({ status: 'undetected', section_ids: [sectionID] })
    try {
      const result = await getMediaByFilter(mediaQuery)
      media.value = result
    } catch (err) {
      error.value = err as Error
      media.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: media,
    isLoading,
    error,
    fetch,
  }
}
