import { ref } from 'vue'
import { getPerchMountsCounts } from '@/services/perchAI/perchMounts'
import type { PerchMountCount } from '@/types/perchMount'

const perchMountsCounts = ref<Array<PerchMountCount>>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function usePerchMountsCounts() {
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMountsCounts.value = await getPerchMountsCounts()
    } catch (err) {
      error.value = err as Error
      perchMountsCounts.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMountsCounts,
    isLoading,
    error,
    fetch,
  }
}
