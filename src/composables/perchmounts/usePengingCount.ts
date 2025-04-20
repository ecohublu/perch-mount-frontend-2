import { ref } from 'vue'
import { getPerchMountCountByID } from '@/services/perchAI/perchMounts'
import type { PerchMountCount } from '@/types/perchMount'

const perchMountCount = ref<PerchMountCount | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function usePerchMountCountByID(id: String) {
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMountCount.value = await getPerchMountCountByID(id)
    } catch (err) {
      error.value = err as Error
      perchMountCount.value = null
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMountCount,
    isLoading,
    error,
    fetch,
  }
}
