import { ref } from 'vue'
import { getPerchMountByID } from '@/services/perchAI/perchMounts'
import type { PerchMount } from '@/types/perchMount'

const perchMount = ref<PerchMount | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function usePerchMountByID(id: String) {
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMount.value = await getPerchMountByID(id)
    } catch (err) {
      error.value = err as Error
      perchMount.value = null
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMount,
    isLoading,
    error,
    fetch,
  }
}
