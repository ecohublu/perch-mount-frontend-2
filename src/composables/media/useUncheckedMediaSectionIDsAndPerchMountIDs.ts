import { ref } from 'vue'
import type { Medium } from '@/types/media'
import { getMediaByFilter } from '@/services/perchAI/media'
import { createMediaQuery } from '@/types/media'
import { OPERATION_MEDIA_LIMIT } from '@/constants/media'

const media = ref<Medium[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useMediaOperationBySectionIDsAndPerchMountIDs(
  status: 'unchecked' | 'unreviewed',
  initSectionID: string[],
  initPerchMountIDs: string[],
) {
  const fetch = async (
    sectionIDs: string[] = initSectionID,
    perchMountIDs: string[] = initPerchMountIDs,
  ) => {
    isLoading.value = true
    error.value = null

    const mediaQuery = createMediaQuery({ status: status })
    mediaQuery.limit = OPERATION_MEDIA_LIMIT
    if (sectionIDs) {
      mediaQuery.section_ids = sectionIDs
    } else if (perchMountIDs) {
      mediaQuery.perch_mount_ids = perchMountIDs
    }

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
