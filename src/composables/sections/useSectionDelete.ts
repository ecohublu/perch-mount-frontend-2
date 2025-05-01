import { ref } from 'vue'
import { deleteSectionByID } from '@/services/perchAI/sections'

export function useSectionDeleteByID(id: string) {
  const deleted = ref<boolean>(false)
  const isDeleting = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    error.value = null
    isDeleting.value = true
    try {
      await deleteSectionByID(id)
      deleted.value = true
    } catch (err) {
      error.value = err as Error
      deleted.value = false
    } finally {
      isDeleting.value = false
    }
  }

  return {
    deleted,
    isDeleting,
    error,
    fetch,
  }
}
