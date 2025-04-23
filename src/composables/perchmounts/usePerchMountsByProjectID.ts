import { ref } from 'vue'
import { getPerchMountsByQuery } from '@/services/perchAI/perchMounts'
import type { PerchMount, GetPerchMountsParams } from '@/types/perchMount'

export function usePerchMountsByQuery(query: GetPerchMountsParams) {
  const perchMounts = ref<Array<PerchMount>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMounts.value = await getPerchMountsByQuery(query)
    } catch (err) {
      error.value = err as Error
      perchMounts.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMounts,
    isLoading,
    error,
    fetch,
  }
}
