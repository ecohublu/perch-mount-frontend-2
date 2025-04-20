import { ref } from 'vue'
import { getPerchMounts } from '@/services/perchAI/perchMounts'
import type { PerchMount } from '@/types/perchMount'

const perchMounts = ref<Array<PerchMount>>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function usePerchMounts() {
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMounts.value = await getPerchMounts()
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
