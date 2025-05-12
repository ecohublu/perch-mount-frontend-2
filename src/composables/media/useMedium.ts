import { getMediumByID } from '@/services/perchAI/media'
import type { Medium } from '@/types/media'
import { ref } from 'vue'

export function useMedium() {
  const medium = ref<Medium | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetch = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      medium.value = await getMediumByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }
  return { data: medium, isLoading, error, fetch }
}
